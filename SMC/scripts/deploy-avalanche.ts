import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const Lock = await ethers.getContractFactory("Lock");
  const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  const lock = await Lock.deploy(unlockTime, { value: ethers.parseEther("0.01") });

  await lock.waitForDeployment();
  const lockAddress = await lock.getAddress();

  console.log("Lock deployed to:", lockAddress);
  console.log("Unlock time:", unlockTime);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });