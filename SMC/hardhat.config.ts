import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";

// Private keys for testing (DO NOT use in production)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

// Base network configuration
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "https://mainnet.base.org";
const BASE_TESTNET_RPC_URL = process.env.BASE_TESTNET_RPC_URL || "https://sepolia.base.org";
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL || "http://localhost:8545";

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
    // Base Mainnet
    base: {
      url: BASE_MAINNET_RPC_URL,
      gasPrice: 1000000000, // 1 gwei
      chainId: 8453,
      accounts: [PRIVATE_KEY],
      timeout: 60000
    },
    // Base Sepolia Testnet
    "base-sepolia": {
      url: BASE_TESTNET_RPC_URL,
      gasPrice: 1000000000, // 1 gwei
      chainId: 84532,
      accounts: [PRIVATE_KEY],
      timeout: 60000
    },
    // Local development network
    localhost: {
      url: LOCALHOST_RPC_URL,
      gasPrice: 20000000000, // 20 gwei
      chainId: 31337,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      timeout: 60000
    },
    // Hardhat network for testing
    hardhat: {
      chainId: 31337,
      accounts: [
        {
          privateKey: PRIVATE_KEY,
          balance: "10000000000000000000000" // 10000 ETH
        },
        {
          privateKey: PRIVATE_KEY_2,
          balance: "10000000000000000000000" // 10000 ETH
        }
      ]
    }
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY || "",
      "base-sepolia": process.env.BASESCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
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
