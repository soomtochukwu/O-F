import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

// Private keys for testing (DO NOT use in production)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"; // Default ewoq key
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Avalanche Mainnet C-Chain
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [PRIVATE_KEY]
    },
    // Avalanche Fuji Testnet
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [PRIVATE_KEY]
    },
    // Local Avalanche Network (using avalanche-cli)
    local: {
      url: "http://localhost:9650/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43112,
      accounts: [
        PRIVATE_KEY,
        PRIVATE_KEY_2
      ]
    },
    // Custom L1/Subnet (replace with your subnet details)
    myblockchain: {
      url: "http://localhost:9650/ext/bc/myblockchain/rpc",
      gasPrice: 25000000000,
      chainId: 500500, // Your custom chain ID
      accounts: [
        PRIVATE_KEY,
        PRIVATE_KEY_2
      ]
    }
  },
  etherscan: {
    apiKey: {
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || ""
    }
  }
};

export default config;
