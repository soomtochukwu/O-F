import { expect } from "chai";
import hre from "hardhat";
import { UserRegistry, TransportBooking } from "../../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

const { ethers, upgrades } = hre;

describe("TransportBooking", function () {
  let userRegistry: UserRegistry;
  let transportBooking: TransportBooking;
  let admin: SignerWithAddress;
  let customer: SignerWithAddress;
  let driver: SignerWithAddress;
  let customer2: SignerWithAddress;

  beforeEach(async function () {
    [admin, customer, driver, customer2] = await ethers.getSigners();

    // Deploy UserRegistry first
    const UserRegistryFactory = await ethers.getContractFactory("UserRegistry");
    userRegistry = await upgrades.deployProxy(
      UserRegistryFactory,
      [admin.address],
      { initializer: "initialize", kind: "uups" }
    ) as unknown as UserRegistry;

    // Deploy TransportBooking
    const TransportBookingFactory = await ethers.getContractFactory("TransportBooking");
    transportBooking = await upgrades.deployProxy(
      TransportBookingFactory,
      [admin.address, await userRegistry.getAddress()],
      { initializer: "initialize", kind: "uups" }
    ) as unknown as TransportBooking;

    // Register users
    const customerDetails = {
      farmSize: "5 acres",
      cropType: "Maize",
      livestockType: "",
      vehicleType: "",
      location: "Lagos, Nigeria"
    };

    const driverDetails = {
      farmSize: "",
      cropType: "",
      livestockType: "",
      vehicleType: "Van",
      location: "Lagos, Nigeria"
    };

    await userRegistry.connect(customer).registerUser(
      "John Customer",
      "+2348012345678",
      0, // FARMER
      "en",
      customerDetails
    );

    await userRegistry.connect(driver).registerUser(
      "Jane Driver",
      "+2348087654321",
      2, // DRIVER
      "en",
      driverDetails
    );

    await userRegistry.connect(customer2).registerUser(
      "Bob Customer",
      "+2348011111111",
      0, // FARMER
      "en",
      customerDetails
    );

    // Verify users
    const VERIFIER_ROLE = await userRegistry.VERIFIER_ROLE();
    await userRegistry.grantRole(VERIFIER_ROLE, admin.address);
    
    await userRegistry.connect(admin).verifyUser(customer.address, 1); // VERIFIED
    await userRegistry.connect(admin).verifyUser(driver.address, 1);   // VERIFIED
    await userRegistry.connect(admin).verifyUser(customer2.address, 1); // VERIFIED
  });

  describe("Booking Creation", function () {
    it("Should create a new booking with correct deposit", async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
      const scheduledTime = scheduledDate + 3600; // 1 hour later
      
      // Calculate required deposit (20% of estimated cost)
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja"); // VAN
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await expect(
        transportBooking.connect(customer).createBooking(
          1, // VAN
          "Lagos, Nigeria",
          "Abuja, Nigeria",
          scheduledDate,
          scheduledTime,
          false, // not shared ride
          { value: requiredDeposit }
        )
      ).to.emit(transportBooking, "BookingCreated")
       .withArgs(1, customer.address, 1);

      const booking = await transportBooking.getBooking(1);
      expect(booking.customer).to.equal(customer.address);
      expect(booking.vehicleType).to.equal(1);
      expect(booking.pickupLocation).to.equal("Lagos, Nigeria");
      expect(booking.dropoffLocation).to.equal("Abuja, Nigeria");
      expect(booking.status).to.equal(0); // PENDING
    });

    it("Should create a shared ride booking", async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(0, "Lagos", "Ibadan"); // MOTORCYCLE
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer).createBooking(
        0, // MOTORCYCLE
        "Lagos, Nigeria",
        "Ibadan, Nigeria",
        scheduledDate,
        scheduledTime,
        true, // shared ride
        { value: requiredDeposit }
      );

      const booking = await transportBooking.getBooking(1);
      expect(booking.isSharedRide).to.be.true;
      expect(booking.sharedWith).to.equal(1);

      const participants = await transportBooking.getSharedRideParticipants(1);
      expect(participants.length).to.equal(1);
      expect(participants[0]).to.equal(customer.address);
    });

    it("Should reject booking with insufficient deposit", async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const insufficientDeposit = (estimatedCost * 10n) / 100n; // Only 10%

      await expect(
        transportBooking.connect(customer).createBooking(
          1,
          "Lagos, Nigeria",
          "Abuja, Nigeria",
          scheduledDate,
          scheduledTime,
          false,
          { value: insufficientDeposit }
        )
      ).to.be.revertedWith("Insufficient deposit");
    });

    it("Should reject booking for unregistered user", async function () {
      const [unregisteredUser] = await ethers.getSigners();
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;

      await expect(
        transportBooking.connect(unregisteredUser).createBooking(
          1,
          "Lagos, Nigeria",
          "Abuja, Nigeria",
          scheduledDate,
          scheduledTime,
          false,
          { value: ethers.parseEther("0.1") }
        )
      ).to.be.revertedWith("User not registered");
    });

    it("Should reject booking scheduled in the past", async function () {
      const pastDate = Math.floor(Date.now() / 1000) - 86400; // Yesterday
      const pastTime = pastDate + 3600;

      await expect(
        transportBooking.connect(customer).createBooking(
          1,
          "Lagos, Nigeria",
          "Abuja, Nigeria",
          pastDate,
          pastTime,
          false,
          { value: ethers.parseEther("0.1") }
        )
      ).to.be.revertedWith("Cannot schedule in the past");
    });
  });

  describe("Booking Confirmation", function () {
    let bookingId: number;

    beforeEach(async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer).createBooking(
        1,
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        scheduledDate,
        scheduledTime,
        false,
        { value: requiredDeposit }
      );
      bookingId = 1;
    });

    it("Should allow driver to confirm booking", async function () {
      await expect(
        transportBooking.connect(driver).confirmBooking(bookingId)
      ).to.emit(transportBooking, "BookingConfirmed")
       .withArgs(bookingId, driver.address);

      const booking = await transportBooking.getBooking(bookingId);
      expect(booking.driver).to.equal(driver.address);
      expect(booking.status).to.equal(1); // CONFIRMED
    });

    it("Should not allow non-driver to confirm booking", async function () {
      await expect(
        transportBooking.connect(customer2).confirmBooking(bookingId)
      ).to.be.revertedWith("Only drivers can confirm bookings");
    });

    it("Should not allow confirming non-existent booking", async function () {
      await expect(
        transportBooking.connect(driver).confirmBooking(999)
      ).to.be.revertedWith("Booking does not exist");
    });
  });

  describe("Shared Ride Functionality", function () {
    let sharedBookingId: number;

    beforeEach(async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer).createBooking(
        1,
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        scheduledDate,
        scheduledTime,
        true, // shared ride
        { value: requiredDeposit }
      );
      sharedBookingId = 1;
    });

    it("Should allow another user to join shared ride", async function () {
      const booking = await transportBooking.getBooking(sharedBookingId);
      const costPerPerson = booking.baseCost / 2n; // Will be 2 participants
      const requiredDeposit = (costPerPerson * 20n) / 100n;

      await expect(
        transportBooking.connect(customer2).joinSharedRide(sharedBookingId, {
          value: requiredDeposit
        })
      ).to.emit(transportBooking, "CostShared")
       .withArgs(sharedBookingId, 2, costPerPerson);

      const updatedBooking = await transportBooking.getBooking(sharedBookingId);
      expect(updatedBooking.sharedWith).to.equal(2);

      const participants = await transportBooking.getSharedRideParticipants(sharedBookingId);
      expect(participants.length).to.equal(2);
      expect(participants).to.include(customer.address);
      expect(participants).to.include(customer2.address);
    });

    it("Should not allow joining non-shared ride", async function () {
      // Create regular booking
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer2).createBooking(
        1,
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        scheduledDate,
        scheduledTime,
        false, // not shared
        { value: requiredDeposit }
      );

      await expect(
        transportBooking.connect(customer).joinSharedRide(2, {
          value: ethers.parseEther("0.01")
        })
      ).to.be.revertedWith("Not a shared ride");
    });

    it("Should not allow joining same ride twice", async function () {
      const booking = await transportBooking.getBooking(sharedBookingId);
      const costPerPerson = booking.baseCost / 2n;
      const requiredDeposit = (costPerPerson * 20n) / 100n;

      await expect(
        transportBooking.connect(customer).joinSharedRide(sharedBookingId, {
          value: requiredDeposit
        })
      ).to.be.revertedWith("Already joined this ride");
    });
  });

  describe("Booking Status Updates", function () {
    let bookingId: number;

    beforeEach(async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer).createBooking(
        1,
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        scheduledDate,
        scheduledTime,
        false,
        { value: requiredDeposit }
      );
      bookingId = 1;

      // Confirm booking
      await transportBooking.connect(driver).confirmBooking(bookingId);
    });

    it("Should allow driver to update booking status", async function () {
      await expect(
        transportBooking.connect(driver).updateBookingStatus(bookingId, 2) // EN_ROUTE
      ).to.emit(transportBooking, "BookingStatusUpdated")
       .withArgs(bookingId, 2);

      const booking = await transportBooking.getBooking(bookingId);
      expect(booking.status).to.equal(2);
    });

    it("Should allow operator to update booking status", async function () {
      const OPERATOR_ROLE = await transportBooking.OPERATOR_ROLE();
      await transportBooking.grantRole(OPERATOR_ROLE, admin.address);

      await transportBooking.connect(admin).updateBookingStatus(bookingId, 3); // DELIVERED

      const booking = await transportBooking.getBooking(bookingId);
      expect(booking.status).to.equal(3);
    });

    it("Should not allow unauthorized user to update status", async function () {
      await expect(
        transportBooking.connect(customer2).updateBookingStatus(bookingId, 2)
      ).to.be.revertedWith("Unauthorized");
    });
  });

  describe("Booking Cancellation", function () {
    let bookingId: number;

    beforeEach(async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await transportBooking.connect(customer).createBooking(
        1,
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        scheduledDate,
        scheduledTime,
        false,
        { value: requiredDeposit }
      );
      bookingId = 1;
    });

    it("Should allow customer to cancel pending booking", async function () {
      const initialBalance = await ethers.provider.getBalance(customer.address);

      await expect(
        transportBooking.connect(customer).cancelBooking(bookingId)
      ).to.emit(transportBooking, "BookingStatusUpdated")
       .withArgs(bookingId, 4); // CANCELLED

      const booking = await transportBooking.getBooking(bookingId);
      expect(booking.status).to.equal(4);

      // Check that partial refund was processed (minus cancellation fee)
      const finalBalance = await ethers.provider.getBalance(customer.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should not allow non-customer to cancel booking", async function () {
      await expect(
        transportBooking.connect(customer2).cancelBooking(bookingId)
      ).to.be.revertedWith("Only customer can cancel");
    });
  });

  describe("Vehicle Management", function () {
    it("Should allow driver to register vehicle", async function () {
      await expect(
        transportBooking.connect(driver).registerVehicle(
          1, // VAN
          "7 passengers",
          ethers.parseEther("0.004"), // 0.004 AVAX per km
          "Lagos, Nigeria"
        )
      ).to.emit(transportBooking, "VehicleRegistered")
       .withArgs(1, driver.address, 1);
    });

    it("Should not allow non-driver to register vehicle", async function () {
      await expect(
        transportBooking.connect(customer).registerVehicle(
          1,
          "7 passengers",
          ethers.parseEther("0.004"),
          "Lagos, Nigeria"
        )
      ).to.be.revertedWith("Only drivers can register vehicles");
    });

    it("Should allow vehicle owner to update availability", async function () {
      await transportBooking.connect(driver).registerVehicle(
        1,
        "7 passengers",
        ethers.parseEther("0.004"),
        "Lagos, Nigeria"
      );

      await transportBooking.connect(driver).updateVehicleAvailability(1, false);
      // Note: We can't directly check availability without a getter function
      // In a real implementation, you'd add a getVehicle function
    });
  });

  describe("Cost Calculation", function () {
    it("Should calculate different costs for different vehicle types", async function () {
      const motorcycleCost = await transportBooking.calculateCost(0, "Lagos", "Abuja"); // MOTORCYCLE
      const vanCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");        // VAN
      const truckCost = await transportBooking.calculateCost(2, "Lagos", "Abuja");      // TRUCK

      expect(vanCost).to.be.gt(motorcycleCost);
      expect(truckCost).to.be.gt(vanCost);
    });
  });

  describe("User Bookings Query", function () {
    it("Should return user's bookings", async function () {
      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      // Create two bookings for the same user
      await transportBooking.connect(customer).createBooking(
        1, "Lagos, Nigeria", "Abuja, Nigeria",
        scheduledDate, scheduledTime, false,
        { value: requiredDeposit }
      );

      await transportBooking.connect(customer).createBooking(
        0, "Lagos, Nigeria", "Ibadan, Nigeria",
        scheduledDate + 86400, scheduledTime + 86400, false,
        { value: requiredDeposit }
      );

      const userBookings = await transportBooking.getUserBookings(customer.address);
      expect(userBookings.length).to.equal(2);
      expect(userBookings[0]).to.equal(1);
      expect(userBookings[1]).to.equal(2);
    });
  });

  describe("Access Control", function () {
    it("Should allow admin to pause/unpause", async function () {
      await transportBooking.connect(admin).pause();

      const scheduledDate = Math.floor(Date.now() / 1000) + 86400;
      const scheduledTime = scheduledDate + 3600;

      await expect(
        transportBooking.connect(customer).createBooking(
          1, "Lagos, Nigeria", "Abuja, Nigeria",
          scheduledDate, scheduledTime, false,
          { value: ethers.parseEther("0.1") }
        )
      ).to.be.revertedWithCustomError(transportBooking, "EnforcedPause");

      await transportBooking.connect(admin).unpause();
      
      const estimatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      const requiredDeposit = (estimatedCost * 20n) / 100n;

      await expect(
        transportBooking.connect(customer).createBooking(
          1, "Lagos, Nigeria", "Abuja, Nigeria",
          scheduledDate, scheduledTime, false,
          { value: requiredDeposit }
        )
      ).to.not.be.reverted;
    });

    it("Should allow admin to set base costs", async function () {
      const newCost = ethers.parseEther("0.01");
      await transportBooking.connect(admin).setBaseCostPerKm(1, newCost); // VAN

      const calculatedCost = await transportBooking.calculateCost(1, "Lagos", "Abuja");
      expect(calculatedCost).to.equal(newCost * 10n); // 10km default distance
    });
  });

  describe("Contract Upgradeability", function () {
    it("Should return correct version", async function () {
      expect(await transportBooking.version()).to.equal("1.0.0");
    });

    it("Should have correct upgrader role", async function () {
      const UPGRADER_ROLE = await transportBooking.UPGRADER_ROLE();
      expect(await transportBooking.hasRole(UPGRADER_ROLE, admin.address)).to.be.true;
    });
  });
});
