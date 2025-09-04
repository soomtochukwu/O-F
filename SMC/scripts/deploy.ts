import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy Lock contract
  const Lock = await ethers.getContractFactory("Lock");
  const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  const lock = await Lock.deploy(unlockTime, { value: ethers.parseEther("0.01") });

  await lock.waitForDeployment();
  const lockAddress = await lock.getAddress();

  console.log("Lock deployed to:", lockAddress);
  console.log("Unlock time:", unlockTime);

  // Deploy UserRegistry contract
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.waitForDeployment();
  const userRegistryAddress = await userRegistry.getAddress();

  console.log("UserRegistry deployed to:", userRegistryAddress);

  // Deploy TransportBooking contract
  const TransportBooking = await ethers.getContractFactory("TransportBooking");
  const transportBooking = await TransportBooking.deploy();
  await transportBooking.waitForDeployment();
  const transportBookingAddress = await transportBooking.getAddress();

  console.log("TransportBooking deployed to:", transportBookingAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });