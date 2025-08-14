"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import { Header } from "@/components/header"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import AnimatedFarmBackground from "@/components/animated-farm-background"
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
      color: "bg-blue-500",
    },
    {
      id: "cooperative",
      icon: "🤝",
      title: t.cooperative,
      description: t.cooperativeDescription,
      color: "bg-green-500",
    },
    {
      id: "logistics",
      icon: "🚛",
      title: t.logistics,
      description: t.logisticsDescription,
      color: "bg-orange-500",
    },
    {
      id: "marketplace",
      icon: "🌾",
      title: t.marketplace,
      description: t.marketplaceDescription,
      color: "bg-yellow-500",
    },
    {
      id: "escrow",
      icon: "💰",
      title: t.payments,
      description: t.paymentsDescription,
      color: "bg-purple-500",
    },
    {
      id: "advisory",
      icon: "🌤️",
      title: t.advisory,
      description: t.advisoryDescription,
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header title={t.dashboard || "Dashboard"} />
      
      <div className="relative">
        <AnimatedFarmBackground />

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">{t.welcome} ObodoFarm</h1>
            <p className="text-gray-600">{t.dashboardSubtitle}</p>
            
            {/* Wallet Status Card */}
            {!isConnected && (
              <Card className="mt-4 border-2 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-green-600" />
                      <div>
                        <h3 className="font-medium text-green-800">Connect Your Wallet</h3>
                        <p className="text-sm text-green-600">Unlock secure payments and blockchain features</p>
                      </div>
                    </div>
                    <ConnectButton.Custom>
                      {({ openConnectModal, mounted }) => {
                        // Add debugging
                        console.log('ConnectButton mounted:', mounted);
                        
                        return (
                          <Button
                            onClick={() => {
                              console.log('Connect button clicked');
                              if (openConnectModal) {
                                openConnectModal();
                              } else {
                                console.error('openConnectModal is not available');
                              }
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            Connect Wallet
                          </Button>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center text-2xl text-white font-bold`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-4xl">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      className={`${feature.color} hover:opacity-90 text-white flex-1`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFeatureClick(feature.id)
                      }}
                    >
                      {t.open}
                    </Button>
                    <VoiceButton 
                      text={`${feature.title}. ${feature.description}`} 
                      language={language as SupportedLanguage}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">127</div>
                <div className="text-sm text-gray-600">{t.activeMembers}</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₦45,200</div>
                <div className="text-sm text-gray-600">{t.totalSavings}</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-gray-600">{t.activeDeliveries}</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">{t.openProposals}</div>
              </CardContent>
            </Card>
          </div>

          {/* AI Voice Assistant */}
          <AIVoiceAssistant language={language as SupportedLanguage} />
        </div>
      </div>
    </div>
  )
}
