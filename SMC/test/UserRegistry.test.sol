import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { UserRegistry } from "../../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("UserRegistry", function () {
  let userRegistry: UserRegistry;
  let admin: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let verifier: SignerWithAddress;

  beforeEach(async function () {
    [admin, user1, user2, verifier] = await ethers.getSigners();

    const UserRegistryFactory = await ethers.getContractFactory("UserRegistry");
    userRegistry = await upgrades.deployProxy(
      UserRegistryFactory,
      [admin.address],
      { initializer: "initialize", kind: "uups" }
    ) as unknown as UserRegistry;

    await userRegistry.waitForDeployment();

    // Grant verifier role
    const VERIFIER_ROLE = await userRegistry.VERIFIER_ROLE();
    await userRegistry.grantRole(VERIFIER_ROLE, verifier.address);
  });

  describe("User Registration", function () {
    it("Should register a new farmer", async function () {
      const farmDetails = {
        farmSize: "5 acres",
        cropType: "Maize, Tomatoes",
        livestockType: "",
        vehicleType: "",
        location: "Lagos, Nigeria"
      };

      await expect(
        userRegistry.connect(user1).registerUser(
          "John Farmer",
          "+2348012345678",
          0, // UserType.FARMER
          "en",
          farmDetails
        )
      ).to.emit(userRegistry, "UserRegistered")
       .withArgs(user1.address, 0, "John Farmer");

      expect(await userRegistry.isUserRegistered(user1.address)).to.be.true;
      expect(await userRegistry.getTotalUsers()).to.equal(1);
    });

    it("Should register a driver", async function () {
      const farmDetails = {
        farmSize: "",
        cropType: "",
        livestockType: "",
        vehicleType: "Motorcycle",
        location: "Abuja, Nigeria"
      };

      await userRegistry.connect(user2).registerUser(
        "Jane Driver",
        "+2348087654321",
        2, // UserType.DRIVER
        "en",
        farmDetails
      );

      const [profile, details] = await userRegistry.getUserProfile(user2.address);
      expect(profile.name).to.equal("Jane Driver");
      expect(profile.userType).to.equal(2);
      expect(details.vehicleType).to.equal("Motorcycle");
    });

    it("Should not allow duplicate registration", async function () {
      const farmDetails = {
        farmSize: "2 acres",
        cropType: "Rice",
        livestockType: "",
        vehicleType: "",
        location: "Kano, Nigeria"
      };

      await userRegistry.connect(user1).registerUser(
        "John Farmer",
        "+2348012345678",
        0,
        "en",
        farmDetails
      );

      await expect(
        userRegistry.connect(user1).registerUser(
          "John Farmer Again",
          "+2348012345678",
          0,
          "en",
          farmDetails
        )
      ).to.be.revertedWith("User already registered");
    });

    it("Should require non-empty name and phone", async function () {
      const farmDetails = {
        farmSize: "",
        cropType: "",
        livestockType: "",
        vehicleType: "",
        location: ""
      };

      await expect(
        userRegistry.connect(user1).registerUser(
          "",
          "+2348012345678",
          0,
          "en",
          farmDetails
        )
      ).to.be.revertedWith("Name cannot be empty");

      await expect(
        userRegistry.connect(user1).registerUser(
          "John Farmer",
          "",
          0,
          "en",
          farmDetails
        )
      ).to.be.revertedWith("Phone number cannot be empty");
    });
  });

  describe("User Verification", function () {
    beforeEach(async function () {
      const farmDetails = {
        farmSize: "3 acres",
        cropType: "Cassava",
        livestockType: "",
        vehicleType: "",
        location: "Ogun, Nigeria"
      };

      await userRegistry.connect(user1).registerUser(
        "John Farmer",
        "+2348012345678",
        0,
        "en",
        farmDetails
      );
    });

    it("Should allow verifier to verify user", async function () {
      await expect(
        userRegistry.connect(verifier).verifyUser(user1.address, 1) // VERIFIED
      ).to.emit(userRegistry, "UserVerified")
       .withArgs(user1.address, 1);

      expect(await userRegistry.isUserVerified(user1.address)).to.be.true;
    });

    it("Should not allow non-verifier to verify user", async function () {
      await expect(
        userRegistry.connect(user2).verifyUser(user1.address, 1)
      ).to.be.reverted;
    });

    it("Should deactivate user when rejected", async function () {
      await userRegistry.connect(verifier).verifyUser(user1.address, 2); // REJECTED

      const [profile] = await userRegistry.getUserProfile(user1.address);
      expect(profile.isActive).to.be.false;
      expect(await userRegistry.isUserVerified(user1.address)).to.be.false;
    });
  });

  describe("Profile Management", function () {
    beforeEach(async function () {
      const farmDetails = {
        farmSize: "4 acres",
        cropType: "Yam",
        livestockType: "",
        vehicleType: "",
        location: "Enugu, Nigeria"
      };

      await userRegistry.connect(user1).registerUser(
        "John Farmer",
        "+2348012345678",
        0,
        "en",
        farmDetails
      );
    });

    it("Should allow user to update their own profile", async function () {
      const [originalProfile, originalDetails] = await userRegistry.getUserProfile(user1.address);
      
      const updatedProfile = {
        userAddress: originalProfile.userAddress,
        name: "John Updated Farmer",
        phoneNumber: originalProfile.phoneNumber,
        userType: originalProfile.userType,
        preferredLanguage: "yo", // Yoruba
        status: originalProfile.status,
        registrationTimestamp: originalProfile.registrationTimestamp,
        reputationScore: originalProfile.reputationScore,
        isActive: originalProfile.isActive
      };

      const updatedDetails = {
        farmSize: originalDetails.farmSize,
        cropType: "Yam, Plantain",
        livestockType: originalDetails.livestockType,
        vehicleType: originalDetails.vehicleType,
        location: originalDetails.location
      };

      await expect(
        userRegistry.connect(user1).updateProfile(updatedProfile, updatedDetails)
      ).to.emit(userRegistry, "ProfileUpdated")
       .withArgs(user1.address);

      const [newProfile, newDetails] = await userRegistry.getUserProfile(user1.address);
      expect(newProfile.name).to.equal("John Updated Farmer");
      expect(newProfile.preferredLanguage).to.equal("yo");
      expect(newDetails.cropType).to.equal("Yam, Plantain");
    });

    it("Should not allow user to update another user's profile", async function () {
      const [profile, details] = await userRegistry.getUserProfile(user1.address);
      
      const updatedProfile = {
        userAddress: profile.userAddress,
        name: "Hacked Name",
        phoneNumber: profile.phoneNumber,
        userType: profile.userType,
        preferredLanguage: profile.preferredLanguage,
        status: profile.status,
        registrationTimestamp: profile.registrationTimestamp,
        reputationScore: profile.reputationScore,
        isActive: profile.isActive
      };

      const updatedDetails = {
        farmSize: details.farmSize,
        cropType: details.cropType,
        livestockType: details.livestockType,
        vehicleType: details.vehicleType,
        location: details.location
      };

      await expect(
        userRegistry.connect(user2).updateProfile(updatedProfile, updatedDetails)
      ).to.be.revertedWith("User not registered");
    });
  });

  describe("Reputation System", function () {
    beforeEach(async function () {
      const farmDetails = {
        farmSize: "2 acres",
        cropType: "Pepper",
        livestockType: "",
        vehicleType: "",
        location: "Rivers, Nigeria"
      };

      await userRegistry.connect(user1).registerUser(
        "John Farmer",
        "+2348012345678",
        0,
        "en",
        farmDetails
      );
    });

    it("Should allow verifier to update reputation", async function () {
      await expect(
        userRegistry.connect(verifier).updateReputation(user1.address, 150)
      ).to.emit(userRegistry, "ReputationUpdated")
       .withArgs(user1.address, 150);

      const [profile] = await userRegistry.getUserProfile(user1.address);
      expect(profile.reputationScore).to.equal(150);
    });

    it("Should not allow reputation above maximum", async function () {
      await expect(
        userRegistry.connect(verifier).updateReputation(user1.address, 1001)
      ).to.be.revertedWith("Score exceeds maximum");
    });

    it("Should not allow non-verifier to update reputation", async function () {
      await expect(
        userRegistry.connect(user2).updateReputation(user1.address, 150)
      ).to.be.reverted;
    });
  });

  describe("User Queries", function () {
    beforeEach(async function () {
      // Register multiple users of different types
      const farmerDetails = {
        farmSize: "5 acres",
        cropType: "Maize",
        livestockType: "",
        vehicleType: "",
        location: "Kaduna, Nigeria"
      };

      const driverDetails = {
        farmSize: "",
        cropType: "",
        livestockType: "",
        vehicleType: "Van",
        location: "Lagos, Nigeria"
      };

      await userRegistry.connect(user1).registerUser(
        "John Farmer",
        "+2348012345678",
        0, // FARMER
        "en",
        farmerDetails
      );

      await userRegistry.connect(user2).registerUser(
        "Jane Driver",
        "+2348087654321",
        2, // DRIVER
        "en",
        driverDetails
      );
    });

    it("Should return correct user counts", async function () {
      expect(await userRegistry.getTotalUsers()).to.equal(2);
      expect(await userRegistry.getUserCountByType(0)).to.equal(1); // FARMER
      expect(await userRegistry.getUserCountByType(2)).to.equal(1); // DRIVER
    });

    it("Should return users by type", async function () {
      const farmers = await userRegistry.getUsersByType(0);
      const drivers = await userRegistry.getUsersByType(2);

      expect(farmers.length).to.equal(1);
      expect(drivers.length).to.equal(1);
      expect(farmers[0]).to.equal(user1.address);
      expect(drivers[0]).to.equal(user2.address);
    });

    it("Should return correct user type", async function () {
      expect(await userRegistry.getUserType(user1.address)).to.equal(0); // FARMER
      expect(await userRegistry.getUserType(user2.address)).to.equal(2); // DRIVER
    });
  });

  describe("Access Control", function () {
    it("Should allow admin to pause/unpause", async function () {
      await userRegistry.connect(admin).pause();
      
      const farmDetails = {
        farmSize: "1 acre",
        cropType: "Beans",
        livestockType: "",
        vehicleType: "",
        location: "Benue, Nigeria"
      };

      await expect(
        userRegistry.connect(user1).registerUser(
          "Test User",
          "+2348012345678",
          0,
          "en",
          farmDetails
        )
      ).to.be.revertedWithCustomError(userRegistry, "EnforcedPause");

      await userRegistry.connect(admin).unpause();
      
      await expect(
        userRegistry.connect(user1).registerUser(
          "Test User",
          "+2348012345678",
          0,
          "en",
          farmDetails
        )
      ).to.not.be.reverted;
    });

    it("Should not allow non-admin to pause", async function () {
      await expect(
        userRegistry.connect(user1).pause()
      ).to.be.reverted;
    });
  });

  describe("Contract Upgradeability", function () {
    it("Should return correct version", async function () {
      expect(await userRegistry.version()).to.equal("1.0.0");
    });

    it("Should only allow upgrader to authorize upgrades", async function () {
      // This test would require deploying a new implementation
      // For now, we just verify the role exists
      const UPGRADER_ROLE = await userRegistry.UPGRADER_ROLE();
      expect(await userRegistry.hasRole(UPGRADER_ROLE, admin.address)).to.be.true;
    });
  });
});
