// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "../interfaces/ITransportBooking.sol";
import "../interfaces/IUserRegistry.sol";

/**
 * @title TransportBooking
 * @dev Upgradeable contract for managing ObodoFarm transport bookings and logistics
 * @notice This contract handles vehicle booking, cost sharing, and logistics coordination
 */
contract TransportBooking is 
    Initializable,
    UUPSUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    ITransportBooking
{
    // Role definitions
    bytes32 public constant DRIVER_ROLE = keccak256("DRIVER_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // State variables
    IUserRegistry public userRegistry;
    
    // Storage mappings
    mapping(uint256 => Booking) private bookings;
    mapping(uint256 => Vehicle) private vehicles;
    mapping(address => uint256[]) private userBookings;
    mapping(uint256 => address[]) private sharedRideParticipants;
    mapping(uint256 => mapping(address => bool)) private hasJoinedSharedRide;
    
    // Counters
    uint256 private nextBookingId;
    uint256 private nextVehicleId;
    
    // Constants
    uint256 public constant BOOKING_DEPOSIT_PERCENTAGE = 20; // 20% deposit required
    uint256 public constant CANCELLATION_FEE_PERCENTAGE = 10; // 10% cancellation fee
    uint256 public constant MAX_SHARED_PARTICIPANTS = 4;

    // Base costs per km for different vehicle types (in wei)
    mapping(VehicleType => uint256) public baseCostPerKm;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initialize the contract
     * @param _admin Address of the contract admin
     * @param _userRegistry Address of the UserRegistry contract
     */
    function initialize(address _admin, address _userRegistry) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(OPERATOR_ROLE, _admin);
        _grantRole(UPGRADER_ROLE, _admin);

        userRegistry = IUserRegistry(_userRegistry);
        nextBookingId = 1;
        nextVehicleId = 1;

        // Set default base costs (example values in wei)
        baseCostPerKm[VehicleType.MOTORCYCLE] = 0.001 ether; // 0.001 AVAX per km
        baseCostPerKm[VehicleType.VAN] = 0.003 ether;        // 0.003 AVAX per km
        baseCostPerKm[VehicleType.TRUCK] = 0.005 ether;      // 0.005 AVAX per km
    }


    /**
     * @dev Create a new transport booking
     * @param _vehicleType Type of vehicle needed
     * @param _pickupLocation Pickup location string
     * @param _dropoffLocation Dropoff location string
     * @param _scheduledDate Scheduled date (timestamp)
     * @param _scheduledTime Scheduled time (timestamp)
     * @param _isSharedRide Whether this is a shared ride
     * @return uint256 Booking ID
     */
    function createBooking(
        VehicleType _vehicleType,
        string memory _pickupLocation,
        string memory _dropoffLocation,
        uint256 _scheduledDate,
        uint256 _scheduledTime,
        bool _isSharedRide
    ) external payable override nonReentrant whenNotPaused returns (uint256) {
        require(userRegistry.isUserRegistered(msg.sender), "User not registered");
        require(bytes(_pickupLocation).length > 0, "Pickup location required");
        require(bytes(_dropoffLocation).length > 0, "Dropoff location required");
        require(_scheduledDate >= block.timestamp, "Cannot schedule in the past");

        // Calculate estimated cost
        uint256 estimatedCost = calculateCost(_vehicleType, _pickupLocation, _dropoffLocation);
        uint256 requiredDeposit = (estimatedCost * BOOKING_DEPOSIT_PERCENTAGE) / 100;
        
        require(msg.value >= requiredDeposit, "Insufficient deposit");

        uint256 bookingId = nextBookingId++;

        // Create booking
        Booking storage booking = bookings[bookingId];
        booking.bookingId = bookingId;
        booking.customer = msg.sender;
        booking.vehicleType = _vehicleType;
        booking.pickupLocation = _pickupLocation;
        booking.dropoffLocation = _dropoffLocation;
        booking.scheduledDate = _scheduledDate;
        booking.scheduledTime = _scheduledTime;
        booking.baseCost = estimatedCost;
        booking.finalCost = estimatedCost;
        booking.status = BookingStatus.PENDING;
        booking.createdAt = block.timestamp;
        booking.updatedAt = block.timestamp;
        booking.isSharedRide = _isSharedRide;

        // Add to user's booking list
        userBookings[msg.sender].push(bookingId);

        // Initialize shared ride participants
        if (_isSharedRide) {
            sharedRideParticipants[bookingId].push(msg.sender);
            hasJoinedSharedRide[bookingId][msg.sender] = true;
            booking.sharedWith = 1;
        }

        // Refund excess payment
        if (msg.value > requiredDeposit) {
            payable(msg.sender).transfer(msg.value - requiredDeposit);
        }

        emit BookingCreated(bookingId, msg.sender, _vehicleType);
        return bookingId;
    }



    /**
     * @dev Confirm a booking (only drivers can call this)
     * @param _bookingId ID of the booking to confirm
     */
    function confirmBooking(uint256 _bookingId) external override whenNotPaused {
        require(bookings[_bookingId].bookingId != 0, "Booking does not exist");
        require(bookings[_bookingId].status == BookingStatus.PENDING, "Booking not pending");
        require(userRegistry.isUserRegistered(msg.sender), "Driver not registered");
        
        // Check if user is a driver
        IUserRegistry.UserType userType = userRegistry.getUserType(msg.sender);
        require(userType == IUserRegistry.UserType.DRIVER, "Only drivers can confirm bookings");

        bookings[_bookingId].driver = msg.sender;
        bookings[_bookingId].status = BookingStatus.CONFIRMED;
        bookings[_bookingId].updatedAt = block.timestamp;

        emit BookingConfirmed(_bookingId, msg.sender);
    }



    /**
     * @dev Update booking status (only driver or operator can call this)
     * @param _bookingId ID of the booking
     * @param _status New status
     */
    function updateBookingStatus(uint256 _bookingId, BookingStatus _status) 
        external 
        override 
        whenNotPaused 
    {
        require(bookings[_bookingId].bookingId != 0, "Booking does not exist");
        
        bool isDriver = bookings[_bookingId].driver == msg.sender;
        bool isOperator = hasRole(OPERATOR_ROLE, msg.sender);
        require(isDriver || isOperator, "Unauthorized");

        bookings[_bookingId].status = _status;
        bookings[_bookingId].updatedAt = block.timestamp;

        emit BookingStatusUpdated(_bookingId, _status);
    }



    /**
     * @dev Cancel a booking
     * @param _bookingId ID of the booking to cancel
     */
    function cancelBooking(uint256 _bookingId) external override nonReentrant whenNotPaused {
        require(bookings[_bookingId].bookingId != 0, "Booking does not exist");
        require(bookings[_bookingId].customer == msg.sender, "Only customer can cancel");
        require(
            bookings[_bookingId].status == BookingStatus.PENDING || 
            bookings[_bookingId].status == BookingStatus.CONFIRMED,
            "Cannot cancel booking in current status"
        );

        bookings[_bookingId].status = BookingStatus.CANCELLED;
        bookings[_bookingId].updatedAt = block.timestamp;

        // Calculate refund (minus cancellation fee)
        uint256 deposit = (bookings[_bookingId].baseCost * BOOKING_DEPOSIT_PERCENTAGE) / 100;
        uint256 cancellationFee = (deposit * CANCELLATION_FEE_PERCENTAGE) / 100;
        uint256 refund = deposit - cancellationFee;

        // Process refund
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        emit BookingStatusUpdated(_bookingId, BookingStatus.CANCELLED);
        emit BookingCancelled(_bookingId, msg.sender, refund);
    }

    /**
     * @dev Join a shared ride
     * @param _bookingId ID of the shared ride booking
     */
    function joinSharedRide(uint256 _bookingId) external payable override nonReentrant whenNotPaused {
        require(bookings[_bookingId].bookingId != 0, "Booking does not exist");
        require(bookings[_bookingId].isSharedRide, "Not a shared ride");
        require(bookings[_bookingId].status == BookingStatus.PENDING, "Booking not available");
        require(!hasJoinedSharedRide[_bookingId][msg.sender], "Already joined this ride");
        require(sharedRideParticipants[_bookingId].length < MAX_SHARED_PARTICIPANTS, "Ride is full");
        require(userRegistry.isUserRegistered(msg.sender), "User not registered");

        // Calculate cost per person
        uint256 participantCount = sharedRideParticipants[_bookingId].length + 1;
        uint256 costPerPerson = bookings[_bookingId].baseCost / participantCount;
        uint256 requiredDeposit = (costPerPerson * BOOKING_DEPOSIT_PERCENTAGE) / 100;

        require(msg.value >= requiredDeposit, "Insufficient deposit");

        // Add participant
        sharedRideParticipants[_bookingId].push(msg.sender);
        hasJoinedSharedRide[_bookingId][msg.sender] = true;
        bookings[_bookingId].sharedWith = participantCount;
        userBookings[msg.sender].push(_bookingId);

        // Update final cost for all participants
        bookings[_bookingId].finalCost = costPerPerson;

        // Refund excess payment
        if (msg.value > requiredDeposit) {
            payable(msg.sender).transfer(msg.value - requiredDeposit);
        }

        emit CostShared(_bookingId, participantCount, costPerPerson);
        emit SharedRideJoined(_bookingId, msg.sender, participantCount);
    }


    /**
     * @dev Register a vehicle (only drivers can call this)
     * @param _vehicleType Type of vehicle
     * @param _capacity Vehicle capacity description
     * @param _baseCostPerKm Base cost per kilometer
     * @param _location Current location
     * @return uint256 Vehicle ID
     */
    function registerVehicle(
        VehicleType _vehicleType,
        string memory _capacity,
        uint256 _baseCostPerKm,
        string memory _location
    ) external override whenNotPaused returns (uint256) {
        require(userRegistry.isUserRegistered(msg.sender), "User not registered");
        
        IUserRegistry.UserType userType = userRegistry.getUserType(msg.sender);
        require(userType == IUserRegistry.UserType.DRIVER, "Only drivers can register vehicles");

        uint256 vehicleId = nextVehicleId++;

        vehicles[vehicleId] = Vehicle({
            vehicleId: vehicleId,
            owner: msg.sender,
            vehicleType: _vehicleType,
            capacity: _capacity,
            baseCostPerKm: _baseCostPerKm,
            isAvailable: true,
            location: _location
        });

        emit VehicleRegistered(vehicleId, msg.sender, _vehicleType);
        return vehicleId;
    }


    /**
     * @dev Update vehicle availability
     * @param _vehicleId ID of the vehicle
     * @param _isAvailable New availability status
     */
    function updateVehicleAvailability(uint256 _vehicleId, bool _isAvailable) 
        external 
        override 
        whenNotPaused 
    {
        require(vehicles[_vehicleId].vehicleId != 0, "Vehicle does not exist");
        require(vehicles[_vehicleId].owner == msg.sender, "Only owner can update availability");

        vehicles[_vehicleId].isAvailable = _isAvailable;
    }


    // View Functions

    /**
     * @dev Get booking details
     * @param _bookingId ID of the booking
     * @return Booking struct
     */
    function getBooking(uint256 _bookingId) external view override returns (Booking memory) {
        require(bookings[_bookingId].bookingId != 0, "Booking does not exist");
        return bookings[_bookingId];
    }


    /**
     * @dev Get user's bookings
     * @param _user Address of the user
     * @return uint256[] Array of booking IDs
     */
    function getUserBookings(address _user) external view override returns (uint256[] memory) {
        return userBookings[_user];
    }


    /**
     * @dev Get available vehicles by type and location
     * @param _vehicleType Type of vehicle
     * @param _location Location filter
     * @return uint256[] Array of available vehicle IDs
     */
    function getAvailableVehicles(VehicleType _vehicleType, string memory _location) 
        external 
        view 
        override 
        returns (uint256[] memory) 
    {
        // This is a simplified implementation
        // In a real live system, we'd implement proper location filtering
        uint256[] memory availableVehicles = new uint256[](nextVehicleId - 1);
        uint256 count = 0;

        for (uint256 i = 1; i < nextVehicleId; i++) {
            if (vehicles[i].vehicleType == _vehicleType && 
                vehicles[i].isAvailable &&
                keccak256(bytes(vehicles[i].location)) == keccak256(bytes(_location))) {
                availableVehicles[count] = i;
                count++;
            }
        }

        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = availableVehicles[i];
        }

        return result;
    }

    /**
     * @dev Calculate transport cost (simplified implementation)
     * @param _vehicleType Type of vehicle
     * @return uint256 Estimated cost
     */
    function calculateCost(VehicleType _vehicleType, string memory /* _pickup */, string memory /* _dropoff */) 
        public 
        view 
        override 
        returns (uint256) 
    {
        // Simplified cost calculation
        // In our real live system, we'd integrate with mapping APIs for distance calculation
        uint256 estimatedDistance = 10; // 10 km default
        return baseCostPerKm[_vehicleType] * estimatedDistance;
    }


    /**
     * @dev Get shared ride participants
     * @param _bookingId ID of the booking
     * @return address[] Array of participant addresses
     */
    function getSharedRideParticipants(uint256 _bookingId) 
        external 
        view 
        override 
        returns (address[] memory) 
    {
        require(bookings[_bookingId].isSharedRide, "Not a shared ride");
        return sharedRideParticipants[_bookingId];
    }


    // Admin Functions

    /**
     * @dev Set base cost per km for vehicle type (only admin)
     * @param _vehicleType Vehicle type
     * @param _cost Cost per km in wei
     */
    function setBaseCostPerKm(VehicleType _vehicleType, uint256 _cost) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        baseCostPerKm[_vehicleType] = _cost;
    }

    /**
     * @dev Pause the contract (only admin)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause the contract (only admin)
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Authorize upgrade (only upgrader role)
     * @param newImplementation Address of new implementation
     */
    function _authorizeUpgrade(address newImplementation) 
        internal 
        override 
        onlyRole(UPGRADER_ROLE) 
    {}

    /**
     * @dev Get contract version
     * @return string Version identifier
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }
}
