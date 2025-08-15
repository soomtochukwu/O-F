"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    lightTheme,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { coreWallet } from "@rainbow-me/rainbowkit/wallets";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { defineChain } from "viem";

// Define your local Avalanche subnet/L1
const localAvalancheSubnet = defineChain({
    id: 99999, // Use a unique chain ID for your subnet
    name: 'Local Avalanche Subnet',
    nativeCurrency: {
        decimals: 18,
        name: 'AVAX',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:9650/ext/bc/C/rpc'], // Default Avalanche local node RPC
        },
    },
    blockExplorers: {
        default: {
            name: 'Local Explorer',
            url: 'http://localhost:8080' // Adjust if you have a local block explorer
        },
    },
    testnet: true,
})

// Alternative configuration for custom subnet
const customSubnet = defineChain({
    id: 12345, // Replace with your actual subnet chain ID
    name: 'Custom Avalanche Subnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Custom Token', // Replace with your subnet's native token name
        symbol: 'CTK', // Replace with your subnet's native token symbol
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:9650/ext/bc/YOUR_SUBNET_ID/rpc'], // Replace with your subnet RPC URL
        },
    },
    blockExplorers: {
        default: {
            name: 'Subnet Explorer',
            url: 'http://localhost:8080'
        },
    },
    testnet: true,
})

// Determine initial chain based on environment
const getInitialChain = () => {
    // Always use local subnet in development
    if (process.env.NODE_ENV === 'development') {
        return localAvalancheSubnet; // or customSubnet
    }
    return avalanche;
};

// Add this missing line
const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: "ObodoFarm",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "b7cfcf662095cd0ee1e06aa9eebd146a",
    wallets: [
        {
            groupName: "Other",
            wallets: [coreWallet],
        },
    ],
    chains: [
        // Prioritize local subnet for development
        localAvalancheSubnet,
        // customSubnet, // Uncomment if using custom subnet
        avalancheFuji,
        avalanche,
        // Only include additional chains if explicitly enabled
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [avalancheFuji]
            : []),
    ],
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: "#005500",
                        accentColorForeground: "white",
                        fontStack: "system",
                        overlayBlur: "small",
                        borderRadius: "large",
                    })}
                    modalSize="compact"
                    initialChain={getInitialChain()}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}