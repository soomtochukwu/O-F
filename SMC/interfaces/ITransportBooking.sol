// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title ITransportBooking
 * @dev Interface for ObodoFarm Transport Booking System
 */
interface ITransportBooking {
    enum VehicleType {
        MOTORCYCLE,
        VAN,
        TRUCK
    }

    enum BookingStatus {
        PENDING,
        CONFIRMED,
        EN_ROUTE,
        DELIVERED,
        CANCELLED
    }

    struct Booking {
        uint256 bookingId;
        address customer;
        address driver;
        VehicleType vehicleType;
        string pickupLocation;
        string dropoffLocation;
        uint256 scheduledDate;
        uint256 scheduledTime;
        uint256 baseCost;
        uint256 finalCost;
        uint256 sharedWith;
        BookingStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        bool isSharedRide;
    }

    struct Vehicle {
        uint256 vehicleId;
        address owner;
        VehicleType vehicleType;
        string capacity;
        uint256 baseCostPerKm;
        bool isAvailable;
        string location;
    }

    // Events
    event BookingCreated(uint256 indexed bookingId, address indexed customer, VehicleType vehicleType);
    event BookingConfirmed(uint256 indexed bookingId, address indexed driver);
    event BookingStatusUpdated(uint256 indexed bookingId, BookingStatus status);
    event BookingCancelled(uint256 indexed bookingId, address indexed user, uint256 refundAmount);
    event VehicleRegistered(uint256 indexed vehicleId, address indexed owner, VehicleType vehicleType);
    event VehicleAvailabilityUpdated(uint256 indexed vehicleId, address indexed owner, bool isAvailable);
    event CostShared(uint256 indexed bookingId, uint256 participantCount, uint256 costPerPerson);
    event SharedRideJoined(uint256 indexed bookingId, address indexed participant, uint256 participantCount);
    event BaseCostUpdated(VehicleType indexed vehicleType, uint256 newCost);
    event ContractPaused(address indexed admin);
    event ContractUnpaused(address indexed admin);

    // Core Functions
    function createBooking(
        VehicleType _vehicleType,
        string memory _pickupLocation,
        string memory _dropoffLocation,
        uint256 _scheduledDate,
        uint256 _scheduledTime,
        bool _isSharedRide
    ) external payable returns (uint256);

    function confirmBooking(uint256 _bookingId) external;
    function updateBookingStatus(uint256 _bookingId, BookingStatus _status) external;
    function cancelBooking(uint256 _bookingId) external;
    function joinSharedRide(uint256 _bookingId) external payable;

    // Vehicle Management
    function registerVehicle(
        VehicleType _vehicleType,
        string memory _capacity,
        uint256 _baseCostPerKm,
        string memory _location
    ) external returns (uint256);

    function updateVehicleAvailability(uint256 _vehicleId, bool _isAvailable) external;

    // View Functions
    function getBooking(uint256 _bookingId) external view returns (Booking memory);
    function getUserBookings(address _user) external view returns (uint256[] memory);
    function getAvailableVehicles(VehicleType _vehicleType, string memory _location) external view returns (uint256[] memory);
    function calculateCost(VehicleType _vehicleType, string memory _pickup, string memory _dropoff) external view returns (uint256);
    function getSharedRideParticipants(uint256 _bookingId) external view returns (address[] memory);
}
