import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";

// Private keys for testing (DO NOT use in production)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"; // Default ewoq key
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07";

// Subnet configuration
const SUBNET_RPC_URL = process.env.SUBNET_RPC_URL || "http://localhost:9650/ext/bc/myblockchain/rpc";
const SUBNET_CHAIN_ID = parseInt(process.env.SUBNET_CHAIN_ID || "500500");
const SUBNET_NAME = process.env.SUBNET_NAME || "myblockchain";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true // Enable for better optimization
    }
  },
  networks: {
    // Avalanche Mainnet C-Chain
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [PRIVATE_KEY],
      timeout: 60000
    },
    // Avalanche Fuji Testnet
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [PRIVATE_KEY],
      timeout: 60000
    },
    // Local Avalanche Network (using avalanche-cli)
    local: {
      url: "http://localhost:9650/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43112,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      timeout: 60000
    },
    // Custom Avalanche Subnet/L1
    subnet: {
      url: SUBNET_RPC_URL,
      gasPrice: 25000000000,
      chainId: SUBNET_CHAIN_ID,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      timeout: 60000
    },
    // Alternative subnet configuration (for multiple subnets)
    myblockchain: {
      url: "http://localhost:9650/ext/bc/myblockchain/rpc",
      gasPrice: 25000000000,
      chainId: 500500,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      timeout: 60000
    }
  },
  etherscan: {
    apiKey: {
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
      // Add custom subnet explorer API key if available
      subnet: process.env.SUBNET_EXPLORER_API_KEY || ""
    },
    customChains: [
      {
        network: "subnet",
        chainId: SUBNET_CHAIN_ID,
        urls: {
          apiURL: process.env.SUBNET_EXPLORER_API_URL || "http://localhost:4000/api",
          browserURL: process.env.SUBNET_EXPLORER_URL || "http://localhost:4000"
        }
      }
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;
