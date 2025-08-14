"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { LogOut } from "lucide-react"
import AnimatedFarmBackground from "@/components/animated-farm-background"

export default function DashboardPage() {
  const { language } = useLanguage()
  const t = translations[language]

  function handleLogout() {
    // Clear any stored user data if needed
    localStorage.removeItem("user_session")
    // Redirect to landing page
    window.location.href = "/"
  }

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 relative">
      <AnimatedFarmBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">{t.welcome} ObodoFarm</h1>
            <p className="text-gray-600">{t.dashboardSubtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <VoiceButton text={`${t.welcome} ObodoFarm. ${t.dashboardSubtitle}`} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-300 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </Button>
          </div>
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
                  <VoiceButton text={`${feature.title}. ${feature.description}`} size="sm" />
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
        <AIVoiceAssistant />
      </div>
    </div>
  )
}
