"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import {
  Users,
  Smartphone,
  TrendingUp,
  Shield,
  Globe,
  Mic,
  Truck,
  Coins,
  Brain,
  Warehouse,
  Vote,
  BarChart3,
  Leaf,
  MapPin,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const benefits = [
    {
      icon: Users,
      titleKey: "cooperative_power",
      descKey: "cooperative_desc",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      accent: "border-green-400/40",
    },
    {
      icon: Smartphone,
      titleKey: "mobile_access",
      descKey: "mobile_desc",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      accent: "border-green-500/40",
    },
    {
      icon: TrendingUp,
      titleKey: "market_access",
      descKey: "market_desc",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      accent: "border-green-400/40",
    },
    {
      icon: Shield,
      titleKey: "secure_payments",
      descKey: "secure_desc",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      accent: "border-green-500/40",
    },
    {
      icon: Truck,
      titleKey: "logistics_network",
      descKey: "logistics_desc",
      color: "bg-gradient-to-br from-green-600 to-green-800",
      accent: "border-green-600/40",
    },
    {
      icon: Coins,
      titleKey: "tokenized_futures",
      descKey: "tokenized_desc",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      accent: "border-green-400/40",
    },
  ]

  const coreFeatures = [
    {
      icon: Brain,
      titleKey: "ai_advisor",
      descKey: "ai_advisor_desc",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      accent: "border-green-400/40",
    },
    {
      icon: Vote,
      titleKey: "dao_governance",
      descKey: "dao_desc",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      accent: "border-green-500/40",
    },
    {
      icon: Warehouse,
      titleKey: "shared_storage",
      descKey: "storage_desc",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      accent: "border-green-400/40",
    },
    {
      icon: BarChart3,
      titleKey: "credit_scoring",
      descKey: "credit_desc",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      accent: "border-green-500/40",
    },
  ]

  const impactStats = [
    {
      number: "100K+",
      labelKey: "farmers_served",
      icon: Users,
      color: "text-green-400",
    },
    {
      number: "$15M",
      labelKey: "gmv_processed",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      number: "40%",
      labelKey: "cost_reduction",
      icon: BarChart3,
      color: "text-green-400",
    },
    {
      number: "95%",
      labelKey: "loan_success",
      icon: CheckCircle,
      color: "text-green-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
        {/* Sleek Black Header with Green Accents */}
        {/* <header className="border-b border-green-500/20 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Users className="w-5 h-5 text-black font-bold" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent tracking-tight">ObodoFarm</h1>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
              </div>
            </div>
          </div>
        </header> */}

        {/* Hero Section - Black & Green Elegance */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
                    <Star className="w-4 h-4" />
                    <span>Next-Gen Agricultural Platform</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent leading-tight">
                    {getTranslation("hero_title", selectedLanguage)}
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                    {getTranslation("hero_subtitle", selectedLanguage)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                    onClick={() => (window.location.href = "/onboarding")}
                  >
                    <span>{getTranslation("get_started", selectedLanguage)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-500/60 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm"
                    onClick={() => (window.location.href = "/ussd")}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{getTranslation("ussd_access", selectedLanguage)}</span>
                  </Button>
                </div>

                <div className="pt-4">
                  <VoiceButton
                    text={`${getTranslation("hero_title", selectedLanguage)}. ${getTranslation("hero_subtitle", selectedLanguage)}`}
                    language={selectedLanguage}
                  />
                </div>
              </div>

              {/* Hero Visual - Sophisticated Black & Green */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-black/80 to-gray-900/60 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {impactStats.map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <div key={index} className="bg-black/60 border border-green-500/20 rounded-xl p-4 text-center hover:bg-black/80 hover:border-green-400/40 transition-all duration-300">
                          <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                          <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                          <div className="text-xs text-gray-400">
                            {getTranslation(stat.labelKey, selectedLanguage)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-3xl blur-xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition - Refined Black & Green */}
        <section className="py-16 px-6 bg-gradient-to-r from-black/50 to-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-4">
                {getTranslation("value_prop_title", selectedLanguage)}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {getTranslation("value_prop_desc", selectedLanguage)}
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className={`bg-black/70 border ${benefit.accent} hover:bg-black/90 hover:border-green-400/60 transition-all duration-300 group backdrop-blur-sm`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20`}>
                        <Icon className="w-6 h-6 text-black font-bold" />
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-sm">
                        {getTranslation(benefit.titleKey, selectedLanguage)}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {getTranslation(benefit.descKey, selectedLanguage)}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Core Features - Premium Black & Green */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-4">
                {getTranslation("core_features", selectedLanguage)}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className={`bg-black/70 border ${feature.accent} hover:bg-black/90 hover:border-green-400/60 transition-all duration-300 group h-full backdrop-blur-sm`}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20`}>
                        <Icon className="w-6 h-6 text-black font-bold" />
                      </div>
                      <h3 className="font-semibold text-white mb-3">
                        {getTranslation(feature.titleKey, selectedLanguage)}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {getTranslation(feature.descKey, selectedLanguage)}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works - Elegant Black & Green */}
        <section className="py-16 px-6 bg-gradient-to-r from-black/50 to-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-4">
                {getTranslation("how_it_works", selectedLanguage)}
              </h2>
            </div>

            <div className="space-y-8">
              {[1, 2, 3].map((step) => (
                <Card key={step} className="bg-black/70 border border-green-500/30 hover:bg-black/90 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-black font-bold text-lg flex-shrink-0 shadow-lg shadow-green-500/30">
                        {step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {getTranslation(`step_${step}_title`, selectedLanguage)}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {getTranslation(`step_${step}_desc`, selectedLanguage)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Assistant Section - Sophisticated Design */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-black/80 to-gray-900/60 border border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <Mic className="w-8 h-8 text-black font-bold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {getTranslation("voice_assistant", selectedLanguage)}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {getTranslation("voice_assistant_desc", selectedLanguage)}
                </p>
                <VoiceButton text={getTranslation("voice_assistant_desc", selectedLanguage)} language={selectedLanguage} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section - Premium Black & Green Finish */}
        <section className="py-16 px-6 bg-gradient-to-br from-black/60 to-gray-900/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-4">
              {getTranslation("cta_title", selectedLanguage)}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {getTranslation("cta_desc", selectedLanguage)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                onClick={() => (window.location.href = "/onboarding")}
              >
                <Leaf className="w-5 h-5" />
                <span>{getTranslation("start_farming_smart", selectedLanguage)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-500/60 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm"
                onClick={() => (window.location.href = "/dashboard")}
              >
                <MapPin className="w-5 h-5 mr-2" />
                <span>{getTranslation("find_cooperative", selectedLanguage)}</span>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Voice Assistant */}
        <div className="px-6 pb-8">
          <AIVoiceAssistant language={selectedLanguage} />
        </div>
      </div>
    </div>
  )
}

function getTranslation(key: string, language: string): string {
  const translations = {
    en: {
      hero_title: "Empowering African Farmers",
      hero_subtitle:
        "Join thousands of farmers across Africa using technology to grow together, share resources, and access better markets",
      value_prop_title: "Farmer Cooperative-as-a-Service",
      value_prop_desc: "Digitizing trust, aggregating supply, and unlocking working capital through on-chain governance, tokenized pre-sales, and offline-first access.",
      get_started: "Get Started",
      ussd_access: "USSD Access (*123#)",
      join_cooperative: "Join Cooperative",
      our_impact: "Our Impact",
      farmers_served: "Farmers Served",
      gmv_processed: "GMV Processed",
      cost_reduction: "Cost Reduction",
      loan_success: "Loan Success Rate",
      why_obodofarm: "Why Choose ObodoFarm?",
      cooperative_power: "Cooperative Power",
      cooperative_desc: "Pool resources, share costs, and make decisions together as a community with transparent governance",
      mobile_access: "Mobile First",
      mobile_desc: "Access everything from your phone with voice guidance in your local language, even on feature phones",
      market_access: "Better Markets",
      market_desc: "Sell your future harvests, get fair prices, and access new buyers through our marketplace",
      secure_payments: "Secure Payments",
      secure_desc: "Safe escrow system protects your money until delivery is confirmed with blockchain security",
      logistics_network: "First-Mile Logistics",
      logistics_desc: "Share transport costs with other farmers and get GPS-tracked delivery to reduce costs by up to 40%",
      tokenized_futures: "Tokenized Harvest Futures",
      tokenized_desc: "Pre-sell your harvest with blockchain-backed tokens for immediate working capital and guaranteed buyers",
      core_features: "Core Features",
      ai_advisor: "AI Farming Advisor",
      ai_advisor_desc: "Get personalized farming tips, weather alerts, and market insights via SMS and mobile app",
      dao_governance: "DAO Governance",
      dao_desc: "Vote on cooperative proposals, fund allocation, and community decisions with transparent blockchain voting",
      shared_storage: "Shared Storage & Warehousing",
      storage_desc: "Access community storage facilities and warehouse receipts to reduce post-harvest losses",
      credit_scoring: "F-Credit Scoring",
      credit_desc: "Build your farmer credit score with alternative data to access better loans and investment opportunities",
      how_it_works: "How It Works",
      step_1_title: "Join & Build Credit",
      step_1_desc: "Register via USSD or mobile app, join a cooperative, and start building your farmer credit score",
      step_2_title: "Access Resources & Markets",
      step_2_desc: "Get funding for inputs, book shared logistics, and list your produce on our marketplace",
      step_3_title: "Grow & Earn Together",
      step_3_desc: "Participate in governance, share profits, and scale your farming operations with community support",
      voice_assistant: "AI Voice Assistant",
      voice_assistant_desc:
        "Get help anytime with our smart assistant that speaks your language and can take actions for you",
      cta_title: "Ready to Transform Your Farming?",
      cta_desc: "Join the cooperative revolution and unlock the full potential of your farm with ObodoFarm",
      start_farming_smart: "Start Farming Smart",
      find_cooperative: "Find Local Cooperative",
    },
    yo: {
      hero_title: "Agbara fun Awọn Agbe Afrika",
      hero_subtitle:
        "Darapọ mọ ẹgbẹẹgbẹrun agbe ni gbogbo Afrika ti n lo imọ-ẹrọ lati dagba papọ, pin awọn ohun elo, ati wọle si awọn ọja to dara julọ",
      value_prop_title: "Ajọṣepọ Agbe bi Iṣẹ",
      value_prop_desc: "Ṣiṣe igbẹkẹle digital, ṣajọpọ ipese, ati ṣiṣi owo iṣẹ nipasẹ iṣakoso ori-chain, tita tẹlẹ tokenized, ati wiwọle akọkọ-offline.",
      get_started: "Bẹrẹ",
      ussd_access: "USSD Wiwọle (*123#)",
      join_cooperative: "Darapọ mọ Ajọṣepọ",
      our_impact: "Ipa Wa",
      farmers_served: "Awọn Agbe Ti A Ṣe Iranṣẹ",
      gmv_processed: "GMV Ti A Ṣe",
      cost_reduction: "Idinku Idiyele",
      loan_success: "Oṣuwọn Aṣeyọri Awin",
      why_obodofarm: "Gịnị mere ị ga-eji họrọ ObodoFarm?",
      cooperative_power: "Ƙarfin Haɗin Kai",
      cooperative_desc: "Haɗa albarkatu, raba farashi, kuma yanke shawara tare a matsayin al'umma tare da mulki mai bayyana",
      mobile_access: "Wayar Hannu Ta Farko",
      mobile_desc: "Samun duk abu daga wayar ku tare da jagorar murya a cikin harshen gida, har ma a kan wayoyin fasali",
      market_access: "Kasuwanni Masu Kyau",
      market_desc: "Sayar da girbin nan gaba, samun farashin adalci, da samun damar shiga sababbin masu siye ta hanyar kasuwanmu",
      secure_payments: "Biyan Kuɗi Mai Tsaro",
      secure_desc: "Tsarin escrow mai aminci yana kare kuɗin ku har sai an tabbatar da isar da kaya tare da tsaron blockchain",
      logistics_network: "Hanyoyin Jigilar Farko-Mile",
      logistics_desc: "Raba farashin jigilar kaya tare da sauran manoma kuma ku sami isar da kaya mai bin diddigin GPS don rage farashi har zuwa 40%",
      tokenized_futures: "Girbin Nan gaba na Tokenized",
      tokenized_desc: "Sayar da girbin ku da wuri tare da alamun blockchain-backed don samun babban jari nan take da tabbatattun masu siye",
      core_features: "Mahimman Fasaloli",
      ai_advisor: "Mai Ba da Shawara na Noma AI",
      ai_advisor_desc: "Samun shawarwarin noma na musamman, faɗakarwar yanayi, da bayanan kasuwa ta hanyar SMS da manhajin wayar hannu",
      dao_governance: "Mulkin DAO",
      dao_desc: "Kada kuri'a kan shawarwarin haɗin kai, rabon kuɗi, da yanke shawarar al'umma tare da zaɓen blockchain mai bayyana",
      shared_storage: "Nchekwa Nkekọrịta & Ụlọ Nchekwa",
      storage_desc: "Nweta ohere ịbanye ebe nchekwa obodo na akwụkwọ ụlọ nchekwa iji belata mfu mgbe owuwe gasịrị",
      credit_scoring: "Ntụle F-Credit",
      credit_desc: "Wuo akara kredit onye ọrụ ugbo gị na data ọzọ iji nweta ohere ịnweta mbinye ego ka mma na ohere itinye ego",
      how_it_works: "Otú Ọ Na-arụ Ọrụ",
      step_1_title: "Sonye & Wuo Kredit",
      step_1_desc: "Debanye aha site na USSD ma ọ bụ ngwa ekwentị, sonye na nkwekọrịta, ma malite iwu akara kredit onye ọrụ ugbo gị",
      step_2_title: "Nweta Akụrụngwa & Ahịa",
      step_2_desc: "Nweta ego maka ihe eji arụ ọrụ, debe usoro njem nkekọrịta, ma depụta ngwaahịa gị na ahịa anyị",
      step_3_title: "Too & Rite Ọnụ",
      step_3_desc: "Sonye na ọchịchị, kekọrịta uru, ma gbasaa ọrụ ọrụ ugbo gị na nkwado obodo",
      voice_assistant: "Onye Inyeaka Olu AI",
      voice_assistant_desc:
        "Nweta enyemaka mgbe ọ bụla site na onye inyeaka anyị nwere ọgụgụ isi nke na-asụ asụsụ gị ma nwee ike ime ihe maka gị",
      cta_title: "Ị Dị Njikere Ịgbanwe Ọrụ Ugbo Gị?",
      cta_desc: "Sonye na mgbanwe nkwekọrịta ma meghee ike zuru ezu nke ugbo gị na ObodoFarm",
      start_farming_smart: "Malite Ọrụ Ugbo Amamihe",
      find_cooperative: "Chọta Nkwekọrịta Mpaghara",
    },
  }

  return (
    translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
    translations.en[key as keyof typeof translations.en]
  )
}
