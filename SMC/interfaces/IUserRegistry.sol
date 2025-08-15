// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title IUserRegistry
 * @dev Interface for ObodoFarm User Registry System
 */
interface IUserRegistry {
    enum UserType {
        FARMER,
        LIVESTOCK_KEEPER,
        DRIVER,
        BUYER_TRADER
    }

    enum VerificationStatus {
        PENDING,
        VERIFIED,
        REJECTED,
        SUSPENDED
    }

    struct UserProfile {
        address userAddress;
        string name;
        string phoneNumber;
        UserType userType;
        string preferredLanguage;
        VerificationStatus status;
        uint256 registrationTimestamp;
        uint256 reputationScore;
        bool isActive;
    }

    struct FarmDetails {
        string farmSize;
        string cropType;
        string livestockType;
        string vehicleType;
        string location;
    }

    // Events
    event UserRegistered(address indexed user, UserType userType, string name);
    event UserVerified(address indexed user, VerificationStatus status);
    event ProfileUpdated(address indexed user);
    event ReputationUpdated(address indexed user, uint256 newScore);
    event UserDeactivated(address indexed user, VerificationStatus newStatus);
    event ContractPaused(address indexed admin);
    event ContractUnpaused(address indexed admin);

    // Core Functions
    function registerUser(
        string memory _name,
        string memory _phoneNumber,
        UserType _userType,
        string memory _preferredLanguage,
        FarmDetails memory _farmDetails
    ) external;

    function verifyUser(address _user, VerificationStatus _status) external;
    function updateProfile(UserProfile memory _profile, FarmDetails memory _farmDetails) external;
    function updateReputation(address _user, uint256 _score) external;
    function deactivateUser(address _user) external;

    // View Functions
    function getUserProfile(address _user) external view returns (UserProfile memory, FarmDetails memory);
    function isUserVerified(address _user) external view returns (bool);
    function getUserType(address _user) external view returns (UserType);
    function getTotalUsers() external view returns (uint256);
    function getUsersByType(UserType _userType) external view returns (address[] memory);
    function isUserRegistered(address _user) external view returns (bool);
}
