"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { LogOut } from "lucide-react"
import { Menu } from "lucide-react";
import AnimatedFarmBackground from "@/components/animated-farm-background"

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 p-10 text-white rounded-lg">

      <div className="relative z-10">
       {/* Header */}
        <header className="top-0 max-w-full px-8 py-4 flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">{t.welcome} to ObodoFarm</h1>
            <p className="text-gray-600">{t.dashboardSubtitle}</p>
          </div>
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
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
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 text-green-800" />
          </button>
        </header>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 right-8 bg-white shadow-lg rounded-lg p-4 z-30 flex flex-col gap-4">
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
        )}

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
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
        <div className="overflow-hidden whitespace-nowrap w-full bg-green-100">
          <span className="inline-block animate-marquee">
            <div className="flex flex-wrap flex-row gap-4 p-4">
            <Card className="md:p-10 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">127</div>
                <div className="text-sm text-gray-600">{t.activeMembers}</div>
              </CardContent>
            </Card>
            <Card className="md:p-10 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₦45,200</div>
                <div className="text-sm text-gray-600">{t.totalSavings}</div>
              </CardContent>
            </Card>
            <Card className="md:p-10 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-gray-600">{t.activeDeliveries}</div>
              </CardContent>
            </Card>
            <Card className="md:p-10 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">{t.openProposals}</div>
              </CardContent>
            </Card>
            </div>
          </span>
        </div>


        {/* AI Voice Assistant */}
        <AIVoiceAssistant />
      </div>
    </div>
  )
}
