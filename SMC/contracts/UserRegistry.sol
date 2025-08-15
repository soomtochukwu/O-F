// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "../interfaces/IUserRegistry.sol";

/**
 * @title UserRegistry
 * @dev Upgradeable contract for managing ObodoFarm user identities and profiles
 * @notice This contract handles user registration, verification, and profile management
 */
contract UserRegistry is 
    Initializable,
    UUPSUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IUserRegistry
{
    // Role definitions
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // Storage
    mapping(address => UserProfile) private userProfiles;
    mapping(address => FarmDetails) private farmDetails;
    mapping(address => bool) private registeredUsers;
    mapping(UserType => address[]) private usersByType;
    
    // Counters
    uint256 private totalUsersCount;
    mapping(UserType => uint256) private userTypeCount;

    // Constants
    uint256 public constant INITIAL_REPUTATION_SCORE = 100;
    uint256 public constant MAX_REPUTATION_SCORE = 1000;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }



    /**
     * @dev Initialize the contract
     * @param _admin Address of the contract admin
     */
    function initialize(address _admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(VERIFIER_ROLE, _admin);
        _grantRole(UPGRADER_ROLE, _admin);
    }



    /**
     * @dev Register a new user in the system
     * @param _name User's full name
     * @param _phoneNumber User's phone number
     * @param _userType Type of user (farmer, driver, etc.)
     * @param _preferredLanguage User's preferred language
     * @param _farmDetails Additional farm-related details
     */
    function registerUser(
        string memory _name,
        string memory _phoneNumber,
        UserType _userType,
        string memory _preferredLanguage,
        FarmDetails memory _farmDetails
    ) external override nonReentrant whenNotPaused {
        require(!registeredUsers[msg.sender], "User already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_phoneNumber).length > 0, "Phone number cannot be empty");

        // Create user profile
        UserProfile memory profile = UserProfile({
            userAddress: msg.sender,
            name: _name,
            phoneNumber: _phoneNumber,
            userType: _userType,
            preferredLanguage: _preferredLanguage,
            status: VerificationStatus.PENDING,
            registrationTimestamp: block.timestamp,
            reputationScore: INITIAL_REPUTATION_SCORE,
            isActive: true
        });

        // Store user data
        userProfiles[msg.sender] = profile;
        farmDetails[msg.sender] = _farmDetails;
        registeredUsers[msg.sender] = true;
        
        // Update counters
        usersByType[_userType].push(msg.sender);
        totalUsersCount++;
        userTypeCount[_userType]++;

        emit UserRegistered(msg.sender, _userType, _name);
    }

    /**
     * @dev Verify a user's identity (only verifiers can call this)
     * @param _user Address of the user to verify
     * @param _status New verification status
     */
    function verifyUser(address _user, VerificationStatus _status) 
        external 
        override 
        onlyRole(VERIFIER_ROLE) 
        whenNotPaused 
    {
        require(registeredUsers[_user], "User not registered");
        require(_status != VerificationStatus.PENDING, "Cannot set status to pending");

        userProfiles[_user].status = _status;
        
        // Deactivate user if rejected or suspended
        if (_status == VerificationStatus.REJECTED || _status == VerificationStatus.SUSPENDED) {
            userProfiles[_user].isActive = false;
        } else if (_status == VerificationStatus.VERIFIED) {
            userProfiles[_user].isActive = true;
        }

        emit UserVerified(_user, _status);
    }
    



    /**
     * @dev Update user profile (only the user themselves can update)
     * @param _profile Updated profile data
     * @param _farmDetails Updated farm details
     */
    function updateProfile(UserProfile memory _profile, FarmDetails memory _farmDetails) 
        external 
        override 
        nonReentrant 
        whenNotPaused 
    {
        require(registeredUsers[msg.sender], "User not registered");
        require(_profile.userAddress == msg.sender, "Can only update own profile");

        // Preserve certain fields that shouldn't be changed by user
        _profile.registrationTimestamp = userProfiles[msg.sender].registrationTimestamp;
        _profile.status = userProfiles[msg.sender].status;
        _profile.reputationScore = userProfiles[msg.sender].reputationScore;

        userProfiles[msg.sender] = _profile;
        farmDetails[msg.sender] = _farmDetails;

        emit ProfileUpdated(msg.sender);
    }

    /**
     * @dev Update user reputation score (only verifiers can call this)
     * @param _user Address of the user
     * @param _score New reputation score
     */
    function updateReputation(address _user, uint256 _score) 
        external 
        override 
        onlyRole(VERIFIER_ROLE) 
        whenNotPaused 
    {
        require(registeredUsers[_user], "User not registered");
        require(_score <= MAX_REPUTATION_SCORE, "Score exceeds maximum");

        userProfiles[_user].reputationScore = _score;
        emit ReputationUpdated(_user, _score);
    }

    /**
     * @dev Deactivate a user account (only verifiers can call this)
     * @param _user Address of the user to deactivate
     */
    function deactivateUser(address _user) 
        external 
        override 
        onlyRole(VERIFIER_ROLE) 
        whenNotPaused 
    {
        require(registeredUsers[_user], "User not registered");
        
        userProfiles[_user].isActive = false;
        userProfiles[_user].status = VerificationStatus.SUSPENDED;
        
        emit UserDeactivated(_user, VerificationStatus.SUSPENDED);
    }


    // View Functions

    /**
     * @dev Get user profile and farm details
     * @param _user Address of the user
     * @return profile User profile data
     * @return details Farm details data
     */
    function getUserProfile(address _user) 
        external 
        view 
        override 
        returns (UserProfile memory profile, FarmDetails memory details) 
    {
        require(registeredUsers[_user], "User not registered");
        return (userProfiles[_user], farmDetails[_user]);
    }


    /**
     * @dev Check if user is verified
     * @param _user Address of the user
     * @return bool True if user is verified
     */
    function isUserVerified(address _user) external view override returns (bool) {
        return registeredUsers[_user] && 
               userProfiles[_user].status == VerificationStatus.VERIFIED &&
               userProfiles[_user].isActive;
    }


    /**
     * @dev Get user type
     * @param _user Address of the user
     * @return UserType The user's type
     */
    function getUserType(address _user) external view override returns (UserType) {
        require(registeredUsers[_user], "User not registered");
        return userProfiles[_user].userType;
    }


    /**
     * @dev Get total number of registered users
     * @return uint256 Total user count
     */
    function getTotalUsers() external view override returns (uint256) {
        return totalUsersCount;
    }



    /**
     * @dev Get all users of a specific type
     * @param _userType Type of users to retrieve
     * @return address[] Array of user addresses
     */
    function getUsersByType(UserType _userType) external view override returns (address[] memory) {
        return usersByType[_userType];
    }



    /**
     * @dev Get user count by type
     * @param _userType Type of users to count
     * @return uint256 Number of users of this type
     */
    function getUserCountByType(UserType _userType) external view returns (uint256) {
        return userTypeCount[_userType];
    }



    /**
     * @dev Check if user is registered
     * @param _user Address to check
     * @return bool True if user is registered
     */
    function isUserRegistered(address _user) external view returns (bool) {
        return registeredUsers[_user];
    }



    // Admin Functions

    /**
     * @dev Pause the contract (only admin)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
        emit ContractPaused(msg.sender);
    }

    /**
     * @dev Unpause the contract (only admin)
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
        emit ContractUnpaused(msg.sender);
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
