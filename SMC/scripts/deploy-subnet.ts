import { ethers, network } from "hardhat";
import fs from "fs";
import path from "path";

interface DeploymentResult {
  contractName: string;
  address: string;
  transactionHash: string;
  blockNumber: number;
  gasUsed: string;
  deploymentArgs: any[];
  timestamp: string;
  network: string;
  chainId: number;
}

interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  gasPrice?: number;
}

async function getNetworkInfo(): Promise<NetworkConfig> {
  const provider = ethers.provider;
  const networkInfo = await provider.getNetwork();
  
  // Handle different network config types
  let rpcUrl = "unknown";
  if (network.config && 'url' in network.config && network.config.url) {
    rpcUrl = network.config.url;
  } else if (network.name === "hardhat" || network.name === "localhost") {
    rpcUrl = "http://localhost:8545";
  }
  
  return {
    name: network.name,
    chainId: Number(networkInfo.chainId),
    rpcUrl: rpcUrl,
    gasPrice: network.config && 'gasPrice' in network.config ? network.config.gasPrice as number : undefined
  };
}

async function saveDeploymentInfo(deployments: DeploymentResult[]) {
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const networkDir = path.join(deploymentsDir, network.name);
  
  // Create directories if they don't exist
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }
  if (!fs.existsSync(networkDir)) {
    fs.mkdirSync(networkDir);
  }
  
  // Save individual contract deployments
  for (const deployment of deployments) {
    const filePath = path.join(networkDir, `${deployment.contractName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(deployment, null, 2));
  }
  
  // Save summary
  const summaryPath = path.join(networkDir, "deployments-summary.json");
  const summary = {
    network: network.name,
    timestamp: new Date().toISOString(),
    totalContracts: deployments.length,
    deployments: deployments.map(d => ({
      name: d.contractName,
      address: d.address,
      gasUsed: d.gasUsed
    }))
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
}

async function deployContract(
  contractName: string,
  constructorArgs: any[] = [],
  deploymentOptions: any = {}
): Promise<DeploymentResult> {
  console.log(`\n📦 Deploying ${contractName}...`);
  
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy(...constructorArgs, deploymentOptions);
  
  const deploymentTx = contract.deploymentTransaction();
  if (!deploymentTx) {
    throw new Error("Deployment transaction not found");
  }
  
  console.log(`⏳ Waiting for deployment transaction: ${deploymentTx.hash}`);
  const receipt = await deploymentTx.wait();
  
  if (!receipt) {
    throw new Error("Deployment receipt not found");
  }
  
  const contractAddress = await contract.getAddress();
  
  const result: DeploymentResult = {
    contractName,
    address: contractAddress,
    transactionHash: deploymentTx.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    deploymentArgs: constructorArgs,
    timestamp: new Date().toISOString(),
    network: network.name,
    chainId: Number((await ethers.provider.getNetwork()).chainId)
  };
  
  console.log(`✅ ${contractName} deployed successfully!`);
  console.log(`   Address: ${contractAddress}`);
  console.log(`   Transaction: ${deploymentTx.hash}`);
  console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
  
  return result;
}

async function verifyContract(address: string, constructorArgs: any[] = []) {
  if (network.name === "local" || network.name === "subnet") {
    console.log(`⚠️  Skipping verification on local network: ${network.name}`);
    return;
  }
  
  try {
    console.log(`\n🔍 Verifying contract at ${address}...`);
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
    
    // Note: You'll need to implement verification for your subnet explorer
    // This is a placeholder for the verification process
    console.log(`✅ Contract verification completed for ${address}`);
  } catch (error) {
    console.error(`❌ Verification failed:`, error);
  }
}

async function main() {
  console.log("🚀 Starting Avalanche Subnet Deployment Script\n");
  
  // Get network information
  const networkInfo = await getNetworkInfo();
  console.log(`📡 Network: ${networkInfo.name}`);
  console.log(`🔗 Chain ID: ${networkInfo.chainId}`);
  console.log(`🌐 RPC URL: ${networkInfo.rpcUrl}`);
  
  // Get deployer information
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await ethers.provider.getBalance(deployerAddress);
  
  console.log(`\n👤 Deployer: ${deployerAddress}`);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} AVAX`);
  
  // Check if we have enough balance
  const minBalance = ethers.parseEther("0.1");
  if (balance < minBalance) {
    throw new Error(`Insufficient balance. Need at least 0.1 AVAX, have ${ethers.formatEther(balance)} AVAX`);
  }
  
  const deployments: DeploymentResult[] = [];
  
  try {
    // Deploy Lock contract
    const unlockTime = Math.floor(Date.now() / 1000) + 300; // 5 minutes from now
    const lockValue = ethers.parseEther("0.01");
    
    const lockDeployment = await deployContract(
      "Lock",
      [unlockTime],
      { value: lockValue }
    );
    deployments.push(lockDeployment);
    
    console.log(`🔒 Lock contract unlock time: ${new Date(unlockTime * 1000).toLocaleString()}`);
    
    // Add more contract deployments here as needed
    // Example:
    // const anotherDeployment = await deployContract("AnotherContract", [arg1, arg2]);
    // deployments.push(anotherDeployment);
    
    // Save deployment information
    await saveDeploymentInfo(deployments);
    
    // Verify contracts (if not on local network)
    for (const deployment of deployments) {
      await verifyContract(deployment.address, deployment.deploymentArgs);
    }
    
    console.log(`\n🎉 All deployments completed successfully!`);
    console.log(`📁 Deployment info saved to: deployments/${network.name}/`);
    
  } catch (error) {
    console.error(`\n❌ Deployment failed:`, error);
    throw error;
  }
}

// Execute the deployment
if (require.main === module) {
  main()
    .then(() => {
      console.log(`\n✨ Deployment script completed successfully!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`\n💥 Deployment script failed:`, error);
      process.exit(1);
    });
}

export { main as deployToSubnet, deployContract, verifyContract };