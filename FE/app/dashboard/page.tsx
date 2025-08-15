"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Wallet } from "lucide-react"

// Add type for supported languages
type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig'

export default function DashboardPage() {
  const { language } = useLanguage()
  const t = translations[language as SupportedLanguage] || translations.en
  const { isConnected } = useAccount()

  function handleFeatureClick(feature: string) {
    if (feature === "ussd") {
      window.location.href = "/ussd"
    } else if (feature === "cooperative") {
      window.location.href = "/cooperative"
    } else if (feature === "logistics") {
      window.location.href = "/logistics"
    } else if (feature === "marketplace") {
      window.location.href = "/marketplace"
    } else if (feature === "escrow") {
      window.location.href = "/payments"
    } else if (feature === "advisory") {
      window.location.href = "/advisory"
    } else {
      console.log(`Navigating to ${feature}`)
    }
  }

  const features = [
    {
      id: "ussd",
      icon: "📱",
      title: t.ussdAccess,
      description: t.ussdDescription,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      id: "cooperative",
      icon: "🤝",
      title: t.cooperative,
      description: t.cooperativeDescription,
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      id: "logistics",
      icon: "🚛",
      title: t.logistics,
      description: t.logisticsDescription,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      id: "marketplace",
      icon: "🌾",
      title: t.marketplace,
      description: t.marketplaceDescription,
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      id: "escrow",
      icon: "💰",
      title: t.payments,
      description: t.paymentsDescription,
      color: "bg-gradient-to-br from-green-600 to-green-800",
    },
    {
      id: "advisory",
      icon: "🌤️",
      title: t.advisory,
      description: t.advisoryDescription,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 mt-8 to-black relative overflow-hidden">
      {/* Sophisticated Black & Green Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Elegant Green Accent Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-green-400/6 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-600/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-2">
              {t.welcome} to ObodoFarm
            </h1>
            <p className="text-gray-300">{t.dashboardSubtitle}</p>

            {/* Wallet Status Card */}
            {!isConnected && (
              <Card className="mt-4 bg-black/70 border border-green-500/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-green-400" />
                      <div>
                        <h3 className="font-semibold text-white">Connect Your Wallet</h3>
                        <p className="text-sm text-gray-400">Connect your wallet to access all features</p>
                      </div>
                    </div>
                    <ConnectButton.Custom>
                      {({ openConnectModal }) => (
                        <Button
                          onClick={openConnectModal}
                          className="bg-green-500 hover:bg-green-600 text-black font-bold"
                        >
                          Connect
                        </Button>
                      )}
                    </ConnectButton.Custom>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className="bg-black/70 border border-green-500/30 hover:bg-black/90 hover:border-green-400/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20`}>
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Voice Assistant */}
          <div className="mb-8">
            <AIVoiceAssistant language={language} />
          </div>
        </div>
      </div>
    </div>
  )
}
