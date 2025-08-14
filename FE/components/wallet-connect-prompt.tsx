"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { Wallet, X, CheckCircle, Shield, Coins } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

// Add type for supported languages
type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig'

interface WalletConnectPromptProps {
  isOpen: boolean
  onClose: () => void
  onSkip?: () => void
}

export function WalletConnectPrompt({ isOpen, onClose, onSkip }: WalletConnectPromptProps) {
  const { language } = useLanguage()
  // Type assertion to ensure language is a valid key
  const t = translations[language as SupportedLanguage] || translations.en
  const { isConnected } = useAccount()
  const [showBenefits, setShowBenefits] = useState(false)

  const benefits = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All payments and transactions are secured by blockchain technology"
    },
    {
      icon: Coins,
      title: "Cryptocurrency Payments",
      description: "Receive payments in AVAX and other cryptocurrencies"
    },
    {
      icon: CheckCircle,
      title: "Decentralized Identity",
      description: "Your wallet serves as your secure digital identity"
    }
  ]

  if (isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Wallet Connected Successfully!
            </DialogTitle>
            <DialogDescription>
              Your wallet is now connected and ready to use with ObodoFarm.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-sm">
                🎉 You can now make secure payments, participate in cooperative voting, and access all blockchain features!
              </p>
            </div>
            <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-600" />
              Connect Your Wallet
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>
            Connect your cryptocurrency wallet to unlock all ObodoFarm features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Hero Section */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready for Web3 Farming?</h3>
            <p className="text-gray-600 text-sm">
              Connect your wallet to access secure payments, cooperative voting, and decentralized features.
            </p>
          </div>

          {/* Benefits Toggle */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setShowBenefits(!showBenefits)}
              className="w-full justify-between"
            >
              Why connect a wallet?
              <span className={`transform transition-transform ${showBenefits ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </Button>
            
            {showBenefits && (
              <div className="space-y-3 animate-in slide-in-from-top-2">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Connect Button */}
          <div className="space-y-3">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button
                  onClick={openConnectModal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
            
            <VoiceButton
              text="Connect your cryptocurrency wallet to access secure payments, cooperative voting, and all blockchain features on ObodoFarm."
              language={language as SupportedLanguage}
              className="w-full"
            />
          </div>

          {/* Skip Option */}
          {onSkip && (
            <div className="text-center pt-2 border-t">
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Skip for now (you can connect later)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}