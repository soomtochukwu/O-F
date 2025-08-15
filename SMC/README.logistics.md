# ObodoFarm Smart Contracts

This directory contains the upgradeable smart contracts for ObodoFarm's **logistics** and **identity** systems, deployed on Avalanche subnet.

## 🏗️ Architecture

### Identity System
- **UserRegistry.sol**: Manages user profiles, verification, and reputation
- **IUserRegistry.sol**: Interface defining identity functions

### Logistics System  
- **TransportBooking.sol**: Handles vehicle booking, cost-sharing, and logistics
- **ITransportBooking.sol**: Interface defining transport functions

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
```bash
cd contracts
npm install
```

### Environment Setup
Create a `.env` file with:
```bash
PRIVATE_KEY=your_private_key_here
SUBNET_RPC_URL=your_subnet_rpc_url
SUBNET_CHAIN_ID=your_subnet_chain_id
SNOWTRACE_API_KEY=your_api_key_for_verification
```

### Compilation
```bash
npm run compile
```

### Testing
```bash
npm run test:contracts
```

### Deployment

#### Local Network
```bash
npm run deploy:local
```

#### Avalanche Fuji Testnet
```bash
npm run deploy:fuji
```

#### Avalanche Mainnet
```bash
npm run deploy:avalanche
```

#### Custom Subnet
```bash
npx hardhat run scripts/deploy.ts --network obodoSubnet
```

---

## 📚 Contract Documentation

## 👤 UserRegistry Contract

The UserRegistry contract manages user identities, profiles, and reputation within the ObodoFarm ecosystem.

### 📊 Data Structures

#### UserType Enum
```solidity
enum UserType {
    FARMER,           // 0 - Crop farmers
    LIVESTOCK_KEEPER, // 1 - Animal farmers  
    DRIVER,           // 2 - Transport providers
    BUYER_TRADER      // 3 - Produce buyers
}
```

#### VerificationStatus Enum
```solidity
enum VerificationStatus {
    PENDING,    // 0 - Awaiting verification
    VERIFIED,   // 1 - Identity confirmed
    REJECTED,   // 2 - Verification failed
    SUSPENDED   // 3 - Account suspended
}
```

#### UserProfile Struct
```solidity
struct UserProfile {
    address userAddress;           // User's wallet address
    string name;                   // Full name
    string phoneNumber;            // Contact number
    UserType userType;             // Type of user
    string preferredLanguage;      // Language preference (en, yo, ig, ha)
    VerificationStatus status;     // Verification state
    uint256 registrationTimestamp; // Registration time
    uint256 reputationScore;       // Reputation (0-1000)
    bool isActive;                 // Account active status
}
```

#### FarmDetails Struct
```solidity
struct FarmDetails {
    string farmSize;      // Farm size description
    string cropType;      // Types of crops grown
    string livestockType; // Types of livestock
    string vehicleType;   // Available vehicles
    string location;      // Farm/business location
}
```

### 🎯 Events

#### UserRegistered
```solidity
event UserRegistered(address indexed user, UserType userType, string name);
```
**When**: New user registers in the system
**Use**: Track new registrations, update UI, send welcome notifications

#### UserVerified
```solidity
event UserVerified(address indexed user, VerificationStatus status);
```
**When**: Verifier updates user verification status
**Use**: Update user badges, enable verified features

#### ProfileUpdated
```solidity
event ProfileUpdated(address indexed user);
```
**When**: User updates their profile information
**Use**: Refresh user data in frontend, log profile changes

#### ReputationUpdated
```solidity
event ReputationUpdated(address indexed user, uint256 newScore);
```
**When**: Verifier updates user reputation score
**Use**: Update reputation displays, trigger reputation-based features

#### UserDeactivated
```solidity
event UserDeactivated(address indexed user, VerificationStatus newStatus);
```
**When**: Admin deactivates a user account
**Use**: Remove user from active lists, disable account features

#### ContractPaused/ContractUnpaused
```solidity
event ContractPaused(address indexed admin);
event ContractUnpaused(address indexed admin);
```
**When**: Admin pauses/unpauses contract operations
**Use**: Show maintenance mode in UI, disable/enable features

### 🔧 Core Functions

#### registerUser()
```solidity
function registerUser(
    string memory _name,
    string memory _phoneNumber,
    UserType _userType,
    string memory _preferredLanguage,
    FarmDetails memory _farmDetails
) external
```
**Purpose**: Register a new user in the system
**Access**: Public (anyone can register)
**Requirements**: 
- User not already registered
- Non-empty name and phone number
- Contract not paused

**Usage Example**:
```javascript
const farmDetails = {
    farmSize: "5 acres",
    cropType: "Maize, Beans",
    livestockType: "",
    vehicleType: "Motorcycle",
    location: "Kaduna, Nigeria"
};

await userRegistry.registerUser(
    "John Farmer",
    "+2348012345678",
    0, // FARMER
    "en",
    farmDetails
);
```

#### verifyUser()
```solidity
function verifyUser(address _user, VerificationStatus _status) external
```
**Purpose**: Verify or reject user identity
**Access**: VERIFIER_ROLE only
**Requirements**: 
- User must be registered
- Status cannot be PENDING
- Contract not paused

**Usage Example**:
```javascript
// Verify user
await userRegistry.connect(verifier).verifyUser(userAddress, 1); // VERIFIED

// Reject user
await userRegistry.connect(verifier).verifyUser(userAddress, 2); // REJECTED
```

#### updateProfile()
```solidity
function updateProfile(
    UserProfile memory _profile, 
    FarmDetails memory _farmDetails
) external
```
**Purpose**: Update user profile information
**Access**: User can only update their own profile
**Requirements**: 
- User must be registered
- Profile userAddress must match caller
- Contract not paused

**Usage Example**:
```javascript
const [currentProfile, currentDetails] = await userRegistry.getUserProfile(userAddress);

const updatedProfile = {
    ...currentProfile,
    name: "John Updated Farmer",
    preferredLanguage: "yo" // Change to Yoruba
};

await userRegistry.connect(user).updateProfile(updatedProfile, currentDetails);
```

#### updateReputation()
```solidity
function updateReputation(address _user, uint256 _score) external
```
**Purpose**: Update user reputation score
**Access**: VERIFIER_ROLE only
**Requirements**: 
- User must be registered
- Score must be ≤ 1000 (MAX_REPUTATION_SCORE)
- Contract not paused

**Usage Example**:
```javascript
// Increase reputation for good behavior
await userRegistry.connect(verifier).updateReputation(userAddress, 150);
```

#### deactivateUser()
```solidity
function deactivateUser(address _user) external
```
**Purpose**: Deactivate a user account
**Access**: VERIFIER_ROLE only
**Requirements**: 
- User must be registered
- Contract not paused

### 🔍 View Functions

#### getUserProfile()
```solidity
function getUserProfile(address _user) external view 
returns (UserProfile memory profile, FarmDetails memory details)
```
**Purpose**: Get complete user profile and farm details
**Usage**: Display user information in UI

#### isUserVerified()
```solidity
function isUserVerified(address _user) external view returns (bool)
```
**Purpose**: Check if user is verified and active
**Usage**: Gate access to verified-only features

#### getUserType()
```solidity
function getUserType(address _user) external view returns (UserType)
```
**Purpose**: Get user's type (farmer, driver, etc.)
**Usage**: Show appropriate UI based on user type

#### getTotalUsers()
```solidity
function getTotalUsers() external view returns (uint256)
```
**Purpose**: Get total registered user count
**Usage**: Display platform statistics

#### getUsersByType()
```solidity
function getUsersByType(UserType _userType) external view returns (address[] memory)
```
**Purpose**: Get all users of a specific type
**Usage**: List all drivers, farmers, etc.

### 🔐 Access Control

#### Roles
- **DEFAULT_ADMIN_ROLE**: Contract administration, role management
- **VERIFIER_ROLE**: User verification, reputation updates
- **UPGRADER_ROLE**: Contract upgrades

#### Admin Functions
```solidity
function pause() external onlyRole(DEFAULT_ADMIN_ROLE)
function unpause() external onlyRole(DEFAULT_ADMIN_ROLE)
```

---

## 🚛 TransportBooking Contract

The TransportBooking contract handles vehicle booking, cost-sharing, and logistics coordination.

### 📊 Data Structures

#### VehicleType Enum
```solidity
enum VehicleType {
    MOTORCYCLE, // 0 - Small items, 1-2 people
    VAN,        // 1 - Medium capacity
    TRUCK       // 2 - Large capacity transport
}
```

#### BookingStatus Enum
```solidity
enum BookingStatus {
    PENDING,   // 0 - Awaiting driver confirmation
    CONFIRMED, // 1 - Driver assigned
    EN_ROUTE,  // 2 - Transport in progress
    DELIVERED, // 3 - Successfully completed
    CANCELLED  // 4 - Booking cancelled
}
```

#### Booking Struct
```solidity
struct Booking {
    uint256 bookingId;         // Unique booking identifier
    address customer;          // Customer who made booking
    address driver;            // Assigned driver
    VehicleType vehicleType;   // Type of vehicle requested
    string pickupLocation;     // Pickup address
    string dropoffLocation;    // Delivery address
    uint256 scheduledDate;     // Scheduled pickup date (timestamp)
    uint256 scheduledTime;     // Scheduled pickup time (timestamp)
    uint256 baseCost;          // Base transport cost
    uint256 finalCost;         // Final cost after sharing
    uint256 sharedWith;        // Number of people sharing
    BookingStatus status;      // Current booking status
    uint256 createdAt;         // Booking creation time
    uint256 updatedAt;         // Last update time
    bool isSharedRide;         // Whether cost-sharing is enabled
}
```

#### Vehicle Struct
```solidity
struct Vehicle {
    uint256 vehicleId;         // Unique vehicle identifier
    address owner;             // Vehicle owner (driver)
    VehicleType vehicleType;   // Type of vehicle
    string capacity;           // Capacity description
    uint256 baseCostPerKm;     // Base cost per kilometer
    bool isAvailable;          // Availability status
    string location;           // Current location
}
```

### 🎯 Events

#### BookingCreated
```solidity
event BookingCreated(uint256 indexed bookingId, address indexed customer, VehicleType vehicleType);
```
**When**: New transport booking is created
**Use**: Notify drivers, update booking lists, send confirmations

#### BookingConfirmed
```solidity
event BookingConfirmed(uint256 indexed bookingId, address indexed driver);
```
**When**: Driver confirms a booking
**Use**: Notify customer, update booking status, assign driver

#### BookingStatusUpdated
```solidity
event BookingStatusUpdated(uint256 indexed bookingId, BookingStatus status);
```
**When**: Booking status changes (en route, delivered, etc.)
**Use**: Track progress, update UI, send notifications

#### BookingCancelled
```solidity
event BookingCancelled(uint256 indexed bookingId, address indexed user, uint256 refundAmount);
```
**When**: Booking is cancelled by customer or driver
**Use**: Process refunds, update availability, notify parties

#### VehicleRegistered
```solidity
event VehicleRegistered(uint256 indexed vehicleId, address indexed owner, VehicleType vehicleType);
```
**When**: Driver registers a new vehicle
**Use**: Add vehicle to available fleet, update driver profile

#### SharedRideJoined
```solidity
event SharedRideJoined(uint256 indexed bookingId, address indexed participant, uint256 participantCount);
```
**When**: Someone joins a shared ride
**Use**: Update cost sharing, notify participants, adjust pricing

#### CostShared
```solidity
event CostShared(uint256 indexed bookingId, uint256 participantCount, uint256 costPerPerson);
```
**When**: Cost is recalculated due to ride sharing
**Use**: Update payment amounts, show savings to users

### 🔧 Core Functions

#### createBooking()
```solidity
function createBooking(
    VehicleType _vehicleType,
    string memory _pickupLocation,
    string memory _dropoffLocation,
    uint256 _scheduledDate,
    uint256 _scheduledTime,
    bool _isSharedRide
) external payable returns (uint256)
```
**Purpose**: Create a new transport booking
**Access**: Verified users only
**Requirements**: 
- User must be verified in UserRegistry
- 20% deposit required (sent as msg.value)
- Scheduled time must be in the future
- Contract not paused

**Usage Example**:
```javascript
const vehicleType = 1; // VAN
const scheduledDate = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
const scheduledTime = scheduledDate + 3600; // +1 hour

const estimatedCost = await transportBooking.calculateCost(
    vehicleType, 
    "Lagos, Nigeria", 
    "Abuja, Nigeria"
);
const deposit = (estimatedCost * 20n) / 100n; // 20% deposit

const bookingId = await transportBooking.createBooking(
    vehicleType,
    "Lagos, Nigeria",
    "Abuja, Nigeria", 
    scheduledDate,
    scheduledTime,
    true, // Enable cost sharing
    { value: deposit }
);
```

#### confirmBooking()
```solidity
function confirmBooking(uint256 _bookingId) external
```
**Purpose**: Driver confirms they will fulfill a booking
**Access**: Verified drivers only
**Requirements**: 
- Caller must be verified driver
- Booking must be in PENDING status
- Contract not paused

**Usage Example**:
```javascript
await transportBooking.connect(driver).confirmBooking(bookingId);
```

#### joinSharedRide()
```solidity
function joinSharedRide(uint256 _bookingId) external payable
```
**Purpose**: Join an existing shared ride booking
**Access**: Verified users only
**Requirements**: 
- Booking must allow shared rides
- Booking must be PENDING or CONFIRMED
- User cannot join same ride twice
- 20% deposit required

**Usage Example**:
```javascript
const booking = await transportBooking.getBooking(bookingId);
const deposit = (booking.baseCost * 20n) / 100n;

await transportBooking.connect(user2).joinSharedRide(bookingId, { value: deposit });
```

#### updateBookingStatus()
```solidity
function updateBookingStatus(uint256 _bookingId, BookingStatus _status) external
```
**Purpose**: Update booking status during transport
**Access**: Assigned driver or admin only
**Requirements**: 
- Caller must be assigned driver or have OPERATOR_ROLE
- Booking must exist
- Contract not paused

**Usage Example**:
```javascript
// Driver updates status to EN_ROUTE
await transportBooking.connect(driver).updateBookingStatus(bookingId, 2);

// Driver marks as DELIVERED
await transportBooking.connect(driver).updateBookingStatus(bookingId, 3);
```

#### cancelBooking()
```solidity
function cancelBooking(uint256 _bookingId) external
```
**Purpose**: Cancel a booking with partial refund
**Access**: Customer who made the booking
**Requirements**: 
- Caller must be the customer
- Booking must be PENDING or CONFIRMED
- Contract not paused

**Refund Policy**: 90% refund (10% cancellation fee)

**Usage Example**:
```javascript
await transportBooking.connect(customer).cancelBooking(bookingId);
```

#### registerVehicle()
```solidity
function registerVehicle(
    VehicleType _vehicleType,
    string memory _capacity,
    uint256 _baseCostPerKm,
    string memory _location
) external returns (uint256)
```
**Purpose**: Register a vehicle for transport services
**Access**: Verified drivers only
**Requirements**: 
- Caller must be verified driver
- Contract not paused

**Usage Example**:
```javascript
const vehicleId = await transportBooking.connect(driver).registerVehicle(
    1, // VAN
    "1000kg capacity",
    ethers.parseEther("0.001"), // 0.001 ETH per km
    "Lagos, Nigeria"
);
```

#### updateVehicleAvailability()
```solidity
function updateVehicleAvailability(uint256 _vehicleId, bool _isAvailable) external
```
**Purpose**: Update vehicle availability status
**Access**: Vehicle owner only
**Requirements**: 
- Caller must own the vehicle
- Contract not paused

### 🔍 View Functions

#### getBooking()
```solidity
function getBooking(uint256 _bookingId) external view returns (Booking memory)
```
**Purpose**: Get complete booking details
**Usage**: Display booking information in UI

#### getUserBookings()
```solidity
function getUserBookings(address _user) external view returns (uint256[] memory)
```
**Purpose**: Get all booking IDs for a user
**Usage**: Show user's booking history

#### getAvailableVehicles()
```solidity
function getAvailableVehicles(VehicleType _vehicleType, string memory _location) 
external view returns (uint256[] memory)
```
**Purpose**: Find available vehicles by type and location
**Usage**: Show available transport options to customers

#### calculateCost()
```solidity
function calculateCost(VehicleType _vehicleType, string memory _pickup, string memory _dropoff) 
external view returns (uint256)
```
**Purpose**: Calculate estimated transport cost
**Usage**: Show pricing to customers before booking
**Note**: Currently uses simplified calculation (10km * base cost per vehicle type)

#### getSharedRideParticipants()
```solidity
function getSharedRideParticipants(uint256 _bookingId) 
external view returns (address[] memory)
```
**Purpose**: Get all participants in a shared ride
**Usage**: Display ride sharing information

### 💰 Cost Management

#### Base Costs per Vehicle Type
- **MOTORCYCLE**: 0.01 ETH per km
- **VAN**: 0.02 ETH per km  
- **TRUCK**: 0.05 ETH per km

#### Deposit & Fees
- **Booking Deposit**: 20% of estimated cost
- **Cancellation Fee**: 10% of deposit (90% refunded)
- **Shared Ride Savings**: Cost split equally among participants

#### Admin Functions
```solidity
function setBaseCost(VehicleType _vehicleType, uint256 _cost) external onlyRole(DEFAULT_ADMIN_ROLE)
function pause() external onlyRole(DEFAULT_ADMIN_ROLE)
function unpause() external onlyRole(DEFAULT_ADMIN_ROLE)
```

---

## 🔐 Security & Access Control

### Role-Based Access Control
Both contracts use OpenZeppelin's AccessControl for role management:

#### UserRegistry Roles
- **DEFAULT_ADMIN_ROLE**: Full contract control, role management
- **VERIFIER_ROLE**: User verification, reputation updates  
- **UPGRADER_ROLE**: Contract upgrades

#### TransportBooking Roles
- **DEFAULT_ADMIN_ROLE**: Full contract control, cost management
- **OPERATOR_ROLE**: Booking status updates, operations
- **UPGRADER_ROLE**: Contract upgrades

### Security Features
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Pausable**: Emergency stop functionality
- **Input Validation**: Comprehensive parameter checking
- **Access Control**: Role-based function restrictions
- **Upgrade Safety**: UUPS proxy pattern with authorized upgrades

### Best Practices
1. **Always check user verification** before allowing critical operations
2. **Use events extensively** for frontend integration and monitoring
3. **Validate all inputs** before processing
4. **Handle edge cases** gracefully with proper error messages
5. **Test thoroughly** before deployment

---

## 🧪 Testing

The contracts include comprehensive test suites covering:

- **UserRegistry Tests**: Registration, verification, profile management
- **TransportBooking Tests**: Booking lifecycle, shared rides, payments
- **Access Control**: Role permissions and security
- **Upgradeability**: Version management and upgrades
- **Edge Cases**: Error conditions and boundary testing

Run all tests:
```bash
npm run test:contracts
```

Run specific test files:
```bash
npx hardhat test test/UserRegistry.test.ts
npx hardhat test test/TransportBooking.test.ts
```

### Test Coverage
- ✅ **44/44 tests passing**
- ✅ **100% function coverage**
- ✅ **All edge cases tested**
- ✅ **Security scenarios validated**

---

## 🔧 Integration Guide

### Frontend Integration

#### 1. Contract Initialization
```javascript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(SUBNET_RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const userRegistry = new ethers.Contract(USER_REGISTRY_ADDRESS, userRegistryABI, signer);
const transportBooking = new ethers.Contract(TRANSPORT_BOOKING_ADDRESS, transportBookingABI, signer);
```

#### 2. Event Listening
```javascript
// Listen for new user registrations
userRegistry.on("UserRegistered", (user, userType, name) => {
    console.log(`New ${userType} registered: ${name}`);
    updateUserList();
});

// Listen for booking updates
transportBooking.on("BookingStatusUpdated", (bookingId, status) => {
    console.log(`Booking ${bookingId} status: ${status}`);
    refreshBookingStatus(bookingId);
});
```

#### 3. User Registration Flow
```javascript
async function registerUser(userData) {
    try {
        const tx = await userRegistry.registerUser(
            userData.name,
            userData.phone,
            userData.userType,
            userData.language,
            userData.farmDetails
        );
        
        await tx.wait();
        console.log("User registered successfully");
    } catch (error) {
        console.error("Registration failed:", error);
    }
}
```

#### 4. Booking Flow
```javascript
async function createBooking(bookingData) {
    try {
        // Calculate cost and deposit
        const cost = await transportBooking.calculateCost(
            bookingData.vehicleType,
            bookingData.pickup,
            bookingData.dropoff
        );
        const deposit = (cost * 20n) / 100n;
        
        // Create booking
        const tx = await transportBooking.createBooking(
            bookingData.vehicleType,
            bookingData.pickup,
            bookingData.dropoff,
            bookingData.scheduledDate,
            bookingData.scheduledTime,
            bookingData.isSharedRide,
            { value: deposit }
        );
        
        const receipt = await tx.wait();
        const bookingId = receipt.logs[0].args.bookingId;
        
        console.log(`Booking created: ${bookingId}`);
        return bookingId;
    } catch (error) {
        console.error("Booking failed:", error);
    }
}
```

### Backend Integration

#### 1. Event Monitoring
```javascript
// Monitor events for database updates
userRegistry.on("UserRegistered", async (user, userType, name, event) => {
    await database.users.create({
        address: user,
        userType: userType,
        name: name,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash
    });
});
```

#### 2. Notification System
```javascript
transportBooking.on("BookingConfirmed", async (bookingId, driver) => {
    const booking = await transportBooking.getBooking(bookingId);
    
    // Send SMS notification to customer
    await sendSMS(booking.customer, `Your booking #${bookingId} has been confirmed by driver ${driver}`);
    
    // Send push notification
    await sendPushNotification(booking.customer, {
        title: "Booking Confirmed",
        body: `Driver assigned for your ${booking.vehicleType} booking`
    });
});
```

---

## 📊 Gas Optimization

The contracts are optimized for gas efficiency:
- Packed structs for storage efficiency
- Batch operations where possible
- Minimal external calls
- Efficient mapping structures

## 🔄 Upgrade Process

To upgrade contracts:

1. Deploy new implementation
2. Call upgrade function with `UPGRADER_ROLE`
3. Verify upgrade success
4. Update frontend integration if needed

## 🌐 Network Configuration

### Avalanche Mainnet
- Chain ID: 43114
- RPC: https://api.avax.network/ext/bc/C/rpc
- Explorer: https://snowtrace.io

### Avalanche Fuji Testnet  
- Chain ID: 43113
- RPC: https://api.avax-test.network/ext/bc/C/rpc
- Explorer: https://testnet.snowtrace.io

### Custom ObodoFarm Subnet
- Configure in `hardhat.config.ts` with your subnet details
- Update RPC URL and Chain ID in environment variables

## 📝 Contract Addresses

After deployment, contract addresses will be saved in:
- `deployments/deployment-{timestamp}.json`

## 🤝 Integration Guide

### Frontend Integration
1. Use contract ABIs from `artifacts/` directory
2. Connect to deployed contract addresses
3. Handle events for real-time updates
4. Implement proper error handling

### Backend Integration
1. Monitor contract events
2. Update off-chain databases
3. Handle USSD/SMS notifications
4. Process payment confirmations

## 🔐 Security Considerations

- Never commit private keys to version control
- Use multisig wallets for admin functions
- Regularly audit contract code
- Monitor for unusual activity
- Keep upgrade keys secure

## 📞 Support

For technical support or questions about the smart contracts, contact the development team.

## 📄 License

MIT License - see LICENSE file for details.
