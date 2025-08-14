"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import { Users, Smartphone, TrendingUp, Shield, Globe, Mic } from "lucide-react"
import AnimatedFarmBackground from "@/components/animated-farm-background"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const benefits = [
    {
      icon: Users,
      titleKey: "cooperative_power",
      descKey: "cooperative_desc",
      color: "bg-green-500",
    },
    {
      icon: Smartphone,
      titleKey: "mobile_access",
      descKey: "mobile_desc",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      titleKey: "market_access",
      descKey: "market_desc",
      color: "bg-purple-500",
    },
    {
      icon: Shield,
      titleKey: "secure_payments",
      descKey: "secure_desc",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 relative">
      <AnimatedFarmBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">ObodoFarm</h1>
          </div>
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
        </div>

        {/* Hero Section */}
        <div className="px-4 mb-12 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">{getTranslation("hero_title", selectedLanguage)}</h2>
            <p className="text-xl text-green-700 mb-6 leading-relaxed">
              {getTranslation("hero_subtitle", selectedLanguage)}
            </p>
            <VoiceButton
              text={`${getTranslation("hero_title", selectedLanguage)}. ${getTranslation("hero_subtitle", selectedLanguage)}`}
              language={selectedLanguage}
            />
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-8">
            <Button
              size="lg"
              className="w-full text-xl py-4 bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = "/onboarding")}
            >
              <Smartphone className="w-6 h-6 mr-2" />
              {getTranslation("get_started", selectedLanguage)}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full text-xl py-4 bg-transparent"
              onClick={() => (window.location.href = "/ussd")}
            >
              <Globe className="w-6 h-6 mr-2" />
              {getTranslation("ussd_access", selectedLanguage)}
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-4 mb-12">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-8">
            {getTranslation("why_obodofarm", selectedLanguage)}
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="border-2 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${benefit.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {getTranslation(benefit.titleKey, selectedLanguage)}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {getTranslation(benefit.descKey, selectedLanguage)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Voice Assistant Introduction */}
        <Card className="mx-4 mb-8 border-2 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              {getTranslation("voice_assistant", selectedLanguage)}
            </h3>
            <p className="text-blue-700 mb-4">{getTranslation("voice_assistant_desc", selectedLanguage)}</p>
            <VoiceButton text={getTranslation("voice_assistant_desc", selectedLanguage)} language={selectedLanguage} />
          </CardContent>
        </Card>

        {/* AI Voice Assistant */}
        <AIVoiceAssistant language={selectedLanguage} />
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
      get_started: "Get Started",
      ussd_access: "USSD Access (*123#)",
      why_obodofarm: "Why Choose ObodoFarm?",
      cooperative_power: "Cooperative Power",
      cooperative_desc: "Pool resources, share costs, and make decisions together as a community",
      mobile_access: "Mobile First",
      mobile_desc: "Access everything from your phone with voice guidance in your local language",
      market_access: "Better Markets",
      market_desc: "Sell your future harvests, get fair prices, and access new buyers",
      secure_payments: "Secure Payments",
      secure_desc: "Safe escrow system protects your money until delivery is confirmed",
      voice_assistant: "AI Voice Assistant",
      voice_assistant_desc:
        "Get help anytime with our smart assistant that speaks your language and can take actions for you",
    },
    yo: {
      hero_title: "Agbara fun Awọn Agbe Afrika",
      hero_subtitle:
        "Darapọ mọ ẹgbẹẹgbẹrun agbe ni gbogbo Afrika ti n lo imọ-ẹrọ lati dagba papọ, pin awọn ohun elo, ati wọle si awọn ọja to dara julọ",
      get_started: "Bẹrẹ",
      ussd_access: "USSD Wiwọle (*123#)",
      why_obodofarm: "Kilode ti o yẹ ki o yan ObodoFarm?",
      cooperative_power: "Agbara Ajọṣepọ",
      cooperative_desc: "Kó awọn ohun elo jọ, pin awọn idiyele, ki o si ṣe awọn ipinnu papọ bi agbegbe kan",
      mobile_access: "Foonu Akọkọ",
      mobile_desc: "Wọle si ohun gbogbo lati foonu rẹ pẹlu itọsọna ohun ni ede agbegbe rẹ",
      market_access: "Awọn Ọja To Dara",
      market_desc: "Ta awọn ikore iwaju rẹ, gba awọn idiyele ododo, ki o si wọle si awọn onra tuntun",
      secure_payments: "Awọn Sisanwo Aabo",
      secure_desc: "Eto escrow aabo daabobo owo rẹ titi ifijiṣẹ yoo fi jẹrisi",
      voice_assistant: "Oluranlọwọ Ohun AI",
      voice_assistant_desc:
        "Gba iranlọwọ nigbakugba pẹlu oluranlọwọ ọlọgbọn wa ti o sọrọ ede rẹ ti o si le ṣe awọn iṣe fun ọ",
    },
    ha: {
      hero_title: "Ƙarfafa Manoman Afrika",
      hero_subtitle:
        "Haɗu da dubban manoma a duk faɗin Afrika da ke amfani da fasaha don girma tare, raba albarkatu, da samun damar shiga kasuwanni masu kyau",
      get_started: "Fara",
      ussd_access: "USSD Shiga (*123#)",
      why_obodofarm: "Me yasa za ku zaɓi ObodoFarm?",
      cooperative_power: "Ƙarfin Haɗin Kai",
      cooperative_desc: "Haɗa albarkatu, raba farashi, kuma yanke shawara tare a matsayin al'umma",
      mobile_access: "Wayar Hannu Ta Farko",
      mobile_desc: "Samun duk abu daga wayar ku tare da jagorar murya a cikin harshen gida",
      market_access: "Kasuwanni Masu Kyau",
      market_desc: "Sayar da girbin nan gaba, samun farashin adalci, da samun damar shiga sababbin masu siye",
      secure_payments: "Biyan Kuɗi Mai Tsaro",
      secure_desc: "Tsarin escrow mai aminci yana kare kuɗin ku har sai an tabbatar da isar da kaya",
      voice_assistant: "Mataimakin Murya na AI",
      voice_assistant_desc:
        "Samun taimako koyaushe tare da mataimakin mu mai hankali wanda ke magana da harshen ku kuma yana iya ɗaukar matakai a gare ku",
    },
    ig: {
      hero_title: "Inyere Ndị Ọrụ Ugbo Afrika Ike",
      hero_subtitle:
        "Sonye na ọtụtụ puku ndị ọrụ ugbo n'ofe Afrika na-eji teknụzụ eto ọnụ, kesaa akụrụngwa, ma nweta ahịa ndị ka mma",
      get_started: "Malite",
      ussd_access: "USSD Ịbanye (*123#)",
      why_obodofarm: "Gịnị mere ị ga-eji họrọ ObodoFarm?",
      cooperative_power: "Ike Nkwekọrịta",
      cooperative_desc: "Chịkọta akụrụngwa, kesaa ọnụ ahịa, ma mee mkpebi ọnụ dị ka obodo",
      mobile_access: "Ekwentị Mbụ",
      mobile_desc: "Nweta ihe niile site na ekwentị gị na nduzi olu n'asụsụ obodo gị",
      market_access: "Ahịa Ndị Ka Mma",
      market_desc: "Ree owuwe ihe ị ga-eweta n'ọdịnihu, nweta ọnụ ahịa ziri ezi, ma nweta ndị ahịa ọhụrụ",
      secure_payments: "Ịkwụ Ụgwọ Nchekwa",
      secure_desc: "Usoro escrow nchekwa na-echebe ego gị ruo mgbe a kwadoro nnyefe",
      voice_assistant: "Onye Inyeaka Olu AI",
      voice_assistant_desc:
        "Nweta enyemaka mgbe ọ bụla site na onye inyeaka anyị nwere ọgụgụ isi nke na-asụ asụsụ gị ma nwee ike ime ihe maka gị",
    },
  }

  return (
    translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
    translations.en[key as keyof typeof translations.en]
  )
}
