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
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { defineChain } from "viem";

// Define localhost development chain
const localhost = defineChain({
    id: 31337,
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
        default: {
            name: 'Local Explorer',
            url: 'http://localhost:8080'
        },
    },
    testnet: true,
})


// Determine initial chain based on environment
const getInitialChain = () => {
    // Always use localhost in development
    if (process.env.NODE_ENV === 'development') {
        return localhost;
    }
    return base;
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
        // Prioritize localhost for development
        localhost,
        baseSepolia,
        base,
        // Only include additional chains if explicitly enabled
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [baseSepolia]
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