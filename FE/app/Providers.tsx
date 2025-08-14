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
import { coreWallet, metaMaskWallet, okxWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { defineChain } from "viem";

// Define localhost hardhat chain
const localhost = defineChain({
    id: 1337,
    name: 'Localhost',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'http://localhost:8545' },
    },
})

// Determine initial chain based on environment
const getInitialChain = () => {
    // Check if we're in development mode and prefer testnet
    if (process.env.NODE_ENV === 'development') {
        return avalancheFuji; // Use testnet instead of localhost
    }
    return avalanche; // or avalancheFuji for testnet
};

// Add this missing line
const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: "ObodoFarm",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "b7cfcf662095cd0ee1e06aa9eebd146a",
    wallets: [
        {
            groupName: "Other",
            wallets: [coreWallet, metaMaskWallet, okxWallet, trustWallet],
        },
        ...wallets,
    ],
    chains: [
        avalancheFuji,
        avalanche,
        // Only include localhost if explicitly enabled
        ...(process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_LOCALHOST === 'true' 
            ? [localhost] 
            : []),
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