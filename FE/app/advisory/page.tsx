"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import {
  ArrowLeft,
  MessageSquare,
  Cloud,
  Sprout,
  Bug,
  AlertTriangle,
  Sun,
  CloudRain,
  Thermometer,
  Send,
} from "lucide-react"

// Translation function
const getTranslation = (key: string, language: string): string => {
  const translations: Record<string, Record<string, string>> = {
    // English translations
    en: {
      ai_farm_advisor: "AI Farm Advisor",
      weather: "Weather",
      crops: "Crops",
      pests: "Pests",
      ai_chat: "AI Chat",
      current_weather: "Current Weather",
      temperature: "Temperature",
      humidity: "Humidity",
      wind: "Wind",
      rainfall: "Rainfall",
      weather_alerts: "Weather Alerts",
      forecast: "5-Day Forecast",
      crop_recommendations: "Crop Recommendations",
      high: "High",
      medium: "Medium",
      demand: "Demand",
      planting_time: "Planting Time",
      harvest_time: "Harvest Time",
      farming_tips: "Farming Tips",
      market_price: "Market Price",
      pest_disease_guide: "Pest & Disease Guide",
      affects: "Affects",
      severity: "Severity",
      symptoms: "Symptoms",
      treatment: "Treatment",
      prevention: "Prevention",
      ai_farming_assistant: "AI Farming Assistant",
      ai_chat_welcome: "Ask me anything about farming!",
      ask_farming_question: "Ask a farming question...",
      weather_advice: "Weather Advice",
      planting_advice: "Planting Advice",
      pest_help: "Pest Help",
      market_advice: "Market Advice",
      quick_weather: "What's the weather like?",
      quick_planting: "When should I plant?",
      quick_pest: "Help with pests",
      quick_market: "Market prices",
      ai_weather_response: "Based on current weather conditions, I recommend checking soil moisture and adjusting irrigation accordingly.",
      ai_crop_response: "For optimal crop growth, consider soil preparation, proper spacing, and seasonal timing for your region.",
      ai_pest_response: "Early detection is key for pest management. Regular monitoring and integrated pest management practices are recommended.",
      ai_market_response: "Market prices fluctuate based on supply and demand. Consider diversifying crops and timing your harvest strategically.",
      ai_general_response: "I'm here to help with all your farming questions. Feel free to ask about weather, crops, pests, or market advice."
    },
    // Yoruba translations
    yo: {
      ai_farm_advisor: "Olugbani Oko AI",
      weather: "Oju Ojo",
      crops: "Irugbin",
      pests: "Kokoro",
      ai_chat: "Ibaraenisoro AI",
      current_weather: "Oju Ojo Loni",
      temperature: "Iwon Otutu",
      humidity: "Omi Afefe",
      wind: "Afefe",
      rainfall: "Ojo",
      weather_alerts: "Ikilowo Oju Ojo",
      forecast: "Asotele Ojo Marun",
      crop_recommendations: "Imoran Irugbin",
      high: "Giga",
      medium: "Aarin",
      demand: "Ibeere",
      planting_time: "Akoko Igbin",
      harvest_time: "Akoko Ikore",
      farming_tips: "Imoran Oko",
      market_price: "Owo Oja",
      pest_disease_guide: "Itosona Kokoro ati Arun",
      affects: "O kan",
      severity: "Iwon Buruju",
      symptoms: "Ami Aisan",
      treatment: "Itoju",
      prevention: "Idena",
      ai_farming_assistant: "Oluranlowo Oko AI",
      ai_chat_welcome: "Beere ohunkohun nipa oko!",
      ask_farming_question: "Beere ibeere oko...",
      weather_advice: "Imoran Oju Ojo",
      planting_advice: "Imoran Igbin",
      pest_help: "Iranlowo Kokoro",
      market_advice: "Imoran Oja",
      quick_weather: "Bawo ni oju ojo se ri?",
      quick_planting: "Igba wo ni ki n gbin?",
      quick_pest: "Iranlowo pelu kokoro",
      quick_market: "Owo oja",
      ai_weather_response: "Nitori ipo oju ojo loni, mo daba ki o wo omi ile ki o si tun omi rin to.",
      ai_crop_response: "Fun idagbasoke irugbin to dara, ro nipa igbaradi ile, ipin to tọ, ati akoko asiko fun agbegbe yin.",
      ai_pest_response: "Wiwa ni kutukutu ni kokoro pataki fun isakoso kokoro. Abojuto deede ati awon iwa isakoso kokoro ti a so po ni a gba.",
      ai_market_response: "Awon idiyele oja n yipada nitori ipese ati ibeere. Ro nipa yiyato irugbin ati akoko ikore yin ni ọgbọn.",
      ai_general_response: "Mo wa nibi lati ran yin lowo pelu gbogbo awon ibeere oko yin. E ma beere nipa oju ojo, irugbin, kokoro, tabi imoran oja."
    },
    // Hausa translations
    ha: {
      ai_farm_advisor: "Mai Ba da Shawara na AI",
      weather: "Yanayi",
      crops: "Amfani",
      pests: "Kwari",
      ai_chat: "Hira da AI",
      current_weather: "Yanayin Yanzu",
      temperature: "Zafin Jiki",
      humidity: "Danshi",
      wind: "Iska",
      rainfall: "Ruwan Sama",
      weather_alerts: "Sanarwar Yanayi",
      forecast: "Hasashen Kwanaki Biyar",
      crop_recommendations: "Shawarar Amfani",
      high: "Babba",
      medium: "Matsakaici",
      demand: "Bukatar",
      planting_time: "Lokacin Shuki",
      harvest_time: "Lokacin Girbi",
      farming_tips: "Shawarar Noma",
      market_price: "Farashin Kasuwa",
      pest_disease_guide: "Jagoran Kwari da Cututtuka",
      affects: "Ya shafa",
      severity: "Tsanani",
      symptoms: "Alamomi",
      treatment: "Magani",
      prevention: "Rigakafi",
      ai_farming_assistant: "Mataimakin Noma na AI",
      ai_chat_welcome: "Tambaye ni komai game da noma!",
      ask_farming_question: "Yi tambayar noma...",
      weather_advice: "Shawarar Yanayi",
      planting_advice: "Shawarar Shuki",
      pest_help: "Taimako da Kwari",
      market_advice: "Shawarar Kasuwa",
      quick_weather: "Yaya yanayi yake?",
      quick_planting: "Yaushe zan shuka?",
      quick_pest: "Taimako da kwari",
      quick_market: "Farashin kasuwa",
      ai_weather_response: "Dangane da yanayin yanzu, ina ba da shawarar duba danshin ƙasa da daidaita ban ruwa daidai.",
      ai_crop_response: "Don ingantaccen ci gaban amfani, yi la'akari da shirye-shiryen ƙasa, rarrabuwa mai dacewa, da lokacin yanayi na yankinku.",
      ai_pest_response: "Gano da wuri shine mabuɗin sarrafa kwari. Ana ba da shawarar sa ido akai-akai da haɗaɗɗun hanyoyin sarrafa kwari.",
      ai_market_response: "Farashin kasuwa yana canzawa dangane da wadata da buƙata. Yi la'akari da bambanta amfani da lokacin girbi da dabara.",
      ai_general_response: "Ina nan don in taimake ku da duk tambayoyinku na noma. Jin daɗin tambaya game da yanayi, amfani, kwari, ko shawarar kasuwa."
    },
    // Igbo translations
    ig: {
      ai_farm_advisor: "Onye Ndụmọdụ Ugbo AI",
      weather: "Ihu Igwe",
      crops: "Ihe Ọkụkụ",
      pests: "Ụmụ Ahụhụ",
      ai_chat: "Mkparịta Ụka AI",
      current_weather: "Ihu Igwe Ugbu a",
      temperature: "Okpomọkụ",
      humidity: "Iru Mmiri",
      wind: "Ifufe",
      rainfall: "Mmiri Ozuzo",
      weather_alerts: "Ọkwa Ihu Igwe",
      forecast: "Amụma Ụbọchị Ise",
      crop_recommendations: "Ndụmọdụ Ihe Ọkụkụ",
      high: "Elu",
      medium: "Etiti",
      demand: "Mkpa",
      planting_time: "Oge Ịkụ",
      harvest_time: "Oge Owuwe",
      farming_tips: "Ndụmọdụ Ugbo",
      market_price: "Ọnụ Ahịa",
      pest_disease_guide: "Nduzi Ụmụ Ahụhụ na Ọrịa",
      affects: "Na-emetụta",
      severity: "Oke",
      symptoms: "Ihe Ịrịba Ama",
      treatment: "Ọgwụgwọ",
      prevention: "Mgbochi",
      ai_farming_assistant: "Onye Inyeaka Ugbo AI",
      ai_chat_welcome: "Jụọ m ihe ọ bụla gbasara ugbo!",
      ask_farming_question: "Jụọ ajụjụ ugbo...",
      weather_advice: "Ndụmọdụ Ihu Igwe",
      planting_advice: "Ndụmọdụ Ịkụ Ihe",
      pest_help: "Enyemaka Ụmụ Ahụhụ",
      market_advice: "Ndụmọdụ Ahịa",
      quick_weather: "Kedu ka ihu igwe dị?",
      quick_planting: "Olee mgbe m ga-akụ?",
      quick_pest: "Enyemaka na ụmụ ahụhụ",
      quick_market: "Ọnụ ahịa",
      ai_weather_response: "Dabere na ọnọdụ ihu igwe ugbu a, ana m akwado ịlele mmiri ala ma hazie mmiri ozuzo kwesịrị ekwesị.",
      ai_crop_response: "Maka uto ihe ọkụkụ kacha mma, tụlee nkwadebe ala, nkewa kwesịrị ekwesị, na oge oge maka mpaghara gị.",
      ai_pest_response: "Nchọpụta n'oge bụ isi ihe maka njikwa ụmụ ahụhụ. A na-akwado nlekota mgbe niile na omume njikwa ụmụ ahụhụ jikọtara ọnụ.",
      ai_market_response: "Ọnụ ahịa na-agbanwe dabere na ọnọdụ na mkpa. Tụlee ịgbasawanye ihe ọkụkụ na oge owuwe gị nke ọma.",
      ai_general_response: "Anọ m ebe a inyere gị aka na ajụjụ ugbo gị niile. Nwee obi ụtọ ịjụ gbasara ihu igwe, ihe ọkụkụ, ụmụ ahụhụ, ma ọ bụ ndụmọdụ ahịa."
    }
  }

  return translations[language]?.[key] || translations.en[key] || key
}

export default function AdvisoryPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [activeTab, setActiveTab] = useState("weather")
  const [chatMessages, setChatMessages] = useState<Array<{ type: "user" | "ai"; message: string; timestamp: Date }>>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isListening, setIsListening] = useState(false)

  // Mock weather data
  const weatherData = {
    current: {
      temperature: 28,
      humidity: 75,
      windSpeed: 12,
      condition: "partly_cloudy",
      rainfall: 0,
    },
    forecast: [
      { day: "Today", temp: "28°C", condition: "partly_cloudy", rain: "10%" },
      { day: "Tomorrow", temp: "30°C", condition: "sunny", rain: "5%" },
      { day: "Wed", temp: "26°C", condition: "rainy", rain: "80%" },
      { day: "Thu", temp: "27°C", condition: "cloudy", rain: "40%" },
      { day: "Fri", temp: "29°C", condition: "sunny", rain: "15%" },
    ],
    alerts: [
      {
        type: "warning",
        title: "Heavy Rain Expected",
        message: "Prepare for heavy rainfall on Wednesday. Protect young seedlings.",
        priority: "high",
      },
      {
        type: "info",
        title: "Optimal Planting Weather",
        message: "Next week shows ideal conditions for planting maize.",
        priority: "medium",
      },
    ],
  }

  // Mock crop recommendations
  const cropRecommendations = [
    {
      crop: "Tomatoes",
      season: "Dry Season",
      plantingTime: "November - February",
      harvestTime: "3-4 months",
      tips: "Plant in well-drained soil. Water regularly but avoid waterlogging.",
      marketPrice: "₦800/kg",
      demand: "high",
    },
    {
      crop: "Maize",
      season: "Rainy Season",
      plantingTime: "April - July",
      harvestTime: "3-4 months",
      tips: "Plant after first rains. Space plants 75cm apart for better yield.",
      marketPrice: "₦350/kg",
      demand: "medium",
    },
    {
      crop: "Cassava",
      season: "Year Round",
      plantingTime: "March - July",
      harvestTime: "8-12 months",
      tips: "Drought resistant. Plant on ridges for better drainage.",
      marketPrice: "₦200/kg",
      demand: "high",
    },
  ]

  // Mock pest and disease data
  const pestDiseases = [
    {
      name: "Tomato Blight",
      crop: "Tomatoes",
      symptoms: "Brown spots on leaves, wilting",
      treatment: "Apply copper-based fungicide. Remove affected plants.",
      prevention: "Ensure good air circulation, avoid overhead watering",
      severity: "high",
    },
    {
      name: "Maize Weevil",
      crop: "Maize",
      symptoms: "Small holes in grains, powder residue",
      treatment: "Use diatomaceous earth or neem oil treatment",
      prevention: "Proper drying and storage in sealed containers",
      severity: "medium",
    },
    {
      name: "Cassava Mosaic",
      crop: "Cassava",
      symptoms: "Yellow and green mosaic pattern on leaves",
      treatment: "Remove infected plants, use resistant varieties",
      prevention: "Plant certified disease-free cuttings",
      severity: "high",
    },
  ]

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage = {
      type: "user" as const,
      message: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage, selectedLanguage)
      const aiMessage = {
        type: "ai" as const,
        message: aiResponse,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiMessage])

      // Speak the AI response
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse)
        utterance.lang = getLanguageCode(selectedLanguage)
        utterance.rate = 0.8
        speechSynthesis.speak(utterance)
      }
    }, 1000)

    setCurrentMessage("")
  }

  const generateAIResponse = (message: string, language: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("weather") || lowerMessage.includes("rain") || lowerMessage.includes("sun")) {
      return getTranslation("ai_weather_response", language)
    } else if (lowerMessage.includes("plant") || lowerMessage.includes("crop") || lowerMessage.includes("grow")) {
      return getTranslation("ai_crop_response", language)
    } else if (lowerMessage.includes("pest") || lowerMessage.includes("disease") || lowerMessage.includes("bug")) {
      return getTranslation("ai_pest_response", language)
    } else if (lowerMessage.includes("price") || lowerMessage.includes("market") || lowerMessage.includes("sell")) {
      return getTranslation("ai_market_response", language)
    } else {
      return getTranslation("ai_general_response", language)
    }
  }

  const getLanguageCode = (lang: string) => {
    const codes = {
      en: "en-US",
      yo: "yo-NG",
      ha: "ha-NG",
      ig: "ig-NG",
    }
    return codes[lang as keyof typeof codes] || "en-US"
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-500" />
      case "partly_cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  return (
    <div className="mt-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => (window.location.href = "/dashboard")} 
              className="mr-2 text-cyan-100 hover:bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                {getTranslation("ai_farm_advisor", selectedLanguage)}
              </h1>
              <p className="text-cyan-200/70 text-sm">Powered by Advanced AI Technology</p>
            </div>
          </div>
          <div className="backdrop-blur-sm bg-slate-800/50 rounded-lg border border-cyan-500/30 p-2">
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex mb-8 bg-slate-900/60 backdrop-blur-md rounded-xl p-2 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-x-auto">
          <Button
            variant={activeTab === "weather" ? "default" : "ghost"}
            className={`flex-1 min-w-fit transition-all duration-300 ${
              activeTab === "weather" 
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/50" 
                : "text-cyan-200 hover:text-white hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500/30"
            }`}
            onClick={() => setActiveTab("weather")}
          >
            <Cloud className="w-4 h-4 mr-2" />
            {getTranslation("weather", selectedLanguage)}
          </Button>
          <Button
            variant={activeTab === "crops" ? "default" : "ghost"}
            className={`flex-1 min-w-fit transition-all duration-300 ${
              activeTab === "crops" 
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50" 
                : "text-cyan-200 hover:text-white hover:bg-emerald-500/20 border border-transparent hover:border-emerald-500/30"
            }`}
            onClick={() => setActiveTab("crops")}
          >
            <Sprout className="w-4 h-4 mr-2" />
            {getTranslation("crops", selectedLanguage)}
          </Button>
          <Button
            variant={activeTab === "pests" ? "default" : "ghost"}
            className={`flex-1 min-w-fit transition-all duration-300 ${
              activeTab === "pests" 
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/30 border border-red-400/50" 
                : "text-cyan-200 hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30"
            }`}
            onClick={() => setActiveTab("pests")}
          >
            <Bug className="w-4 h-4 mr-2" />
            {getTranslation("pests", selectedLanguage)}
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            className={`flex-1 min-w-fit transition-all duration-300 ${
              activeTab === "chat" 
                ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 border border-purple-400/50" 
                : "text-cyan-200 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {getTranslation("ai_chat", selectedLanguage)}
          </Button>
        </div>

        {/* Weather Tab */}
        {activeTab === "weather" && (
          <div className="space-y-6">
            {/* Current Weather */}
            <Card className="border border-cyan-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
              <CardHeader className="border-b border-cyan-500/20">
                <CardTitle className="text-cyan-300 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Thermometer className="w-6 h-6" />
                  </div>
                  {getTranslation("current_weather", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                    {getWeatherIcon(weatherData.current.condition)}
                    <p className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mt-3">
                      {weatherData.current.temperature}°C
                    </p>
                    <p className="text-sm text-cyan-200/70 mt-1">{getTranslation("temperature", selectedLanguage)}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-cyan-200/70">{getTranslation("humidity", selectedLanguage)}:</span>
                      <span className="font-bold text-white">{weatherData.current.humidity}%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-cyan-200/70">{getTranslation("wind", selectedLanguage)}:</span>
                      <span className="font-bold text-white">{weatherData.current.windSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-cyan-200/70">{getTranslation("rainfall", selectedLanguage)}:</span>
                      <span className="font-bold text-white">{weatherData.current.rainfall} mm</span>
                    </div>
                  </div>
                </div>
                <VoiceButton
                  text={`${getTranslation("current_weather", selectedLanguage)}: ${weatherData.current.temperature} degrees celsius, ${weatherData.current.humidity} percent humidity`}
                  language={selectedLanguage}
                />
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            <Card className="border border-orange-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-orange-500/10">
              <CardHeader className="border-b border-orange-500/20">
                <CardTitle className="text-orange-300 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  {getTranslation("weather_alerts", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {weatherData.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                      alert.priority === "high" 
                        ? "border-red-400 bg-gradient-to-r from-red-500/20 to-red-600/10 shadow-lg shadow-red-500/20" 
                        : "border-blue-400 bg-gradient-to-r from-blue-500/20 to-blue-600/10 shadow-lg shadow-blue-500/20"
                    }`}
                  >
                    <h4 className="font-bold text-white text-lg mb-2">{alert.title}</h4>
                    <p className="text-cyan-100/80 mb-3">{alert.message}</p>
                    <VoiceButton text={`${alert.title}. ${alert.message}`} language={selectedLanguage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <Card className="border border-cyan-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-cyan-500/10">
              <CardHeader className="border-b border-cyan-500/20">
                <CardTitle className="text-cyan-300 text-xl">{getTranslation("forecast", selectedLanguage)}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-5 gap-3">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                      <p className="text-sm font-bold text-cyan-200/70 mb-2">{day.day}</p>
                      {getWeatherIcon(day.condition)}
                      <p className="text-lg font-bold text-white mt-2">{day.temp}</p>
                      <p className="text-xs text-blue-300 mt-1">{day.rain}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Crops Tab */}
        {activeTab === "crops" && (
          <div className="space-y-6">
            <Card className="border border-emerald-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-emerald-500/10">
              <CardHeader className="border-b border-emerald-500/20">
                <CardTitle className="text-emerald-300 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Sprout className="w-6 h-6" />
                  </div>
                  {getTranslation("crop_recommendations", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {cropRecommendations.map((crop, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-white text-xl mb-1">{crop.crop}</h3>
                        <p className="text-emerald-200/70">{crop.season}</p>
                      </div>
                      <Badge
                        className={`px-3 py-1 font-semibold ${
                          crop.demand === "high" 
                            ? "bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-200 border border-emerald-400/50" 
                            : "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 border border-yellow-400/50"
                        }`}
                      >
                        {getTranslation(crop.demand, selectedLanguage)} {getTranslation("demand", selectedLanguage)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-cyan-200/70 text-sm mb-1">{getTranslation("planting_time", selectedLanguage)}:</p>
                        <p className="font-bold text-white">{crop.plantingTime}</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-cyan-200/70 text-sm mb-1">{getTranslation("harvest_time", selectedLanguage)}:</p>
                        <p className="font-bold text-white">{crop.harvestTime}</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <p className="text-cyan-200/70 text-sm mb-2">{getTranslation("farming_tips", selectedLanguage)}:</p>
                      <p className="text-cyan-100/80">{crop.tips}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-cyan-200/70 text-sm">{getTranslation("market_price", selectedLanguage)}:</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">{crop.marketPrice}</p>
                      </div>
                      <VoiceButton
                        text={`${crop.crop}. ${getTranslation("planting_time", selectedLanguage)}: ${crop.plantingTime}. ${crop.tips}`}
                        language={selectedLanguage}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pests Tab */}
        {activeTab === "pests" && (
          <div className="space-y-6">
            <Card className="border border-red-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-red-500/10">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-red-300 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Bug className="w-6 h-6" />
                  </div>
                  {getTranslation("pest_disease_guide", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {pestDiseases.map((pest, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-white text-xl mb-1">{pest.name}</h3>
                        <p className="text-red-200/70">
                          {getTranslation("affects", selectedLanguage)}: {pest.crop}
                        </p>
                      </div>
                      <Badge
                        className={`px-3 py-1 font-semibold ${
                          pest.severity === "high" 
                            ? "bg-gradient-to-r from-red-500/30 to-pink-500/30 text-red-200 border border-red-400/50" 
                            : "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 border border-yellow-400/50"
                        }`}
                      >
                        {getTranslation(pest.severity, selectedLanguage)} {getTranslation("severity", selectedLanguage)}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-cyan-200/70 font-bold text-sm mb-2">{getTranslation("symptoms", selectedLanguage)}:</p>
                        <p className="text-cyan-100/80">{pest.symptoms}</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-cyan-200/70 font-bold text-sm mb-2">{getTranslation("treatment", selectedLanguage)}:</p>
                        <p className="text-cyan-100/80">{pest.treatment}</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-cyan-200/70 font-bold text-sm mb-2">{getTranslation("prevention", selectedLanguage)}:</p>
                        <p className="text-cyan-100/80">{pest.prevention}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <VoiceButton
                        text={`${pest.name}. ${getTranslation("symptoms", selectedLanguage)}: ${pest.symptoms}. ${getTranslation("treatment", selectedLanguage)}: ${pest.treatment}`}
                        language={selectedLanguage}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Chat Tab */}
        {activeTab === "chat" && (
          <div className="space-y-6">
            <Card className="border border-purple-500/30 bg-slate-900/70 backdrop-blur-md shadow-xl shadow-purple-500/10">
              <CardHeader className="border-b border-purple-500/20">
                <CardTitle className="text-purple-300 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  {getTranslation("ai_farming_assistant", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto mb-6 space-y-4 p-4 bg-gradient-to-br from-slate-950/80 to-slate-900/80 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-cyan-200/60 py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-purple-300" />
                      </div>
                      <p className="text-lg">{getTranslation("ai_chat_welcome", selectedLanguage)}</p>
                    </div>
                  )}
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl max-w-[85%] backdrop-blur-sm transition-all duration-300 ${
                        msg.type === "user"
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 ml-auto border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                          : "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-100 border border-purple-400/30 shadow-lg shadow-purple-500/20"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className="text-xs text-cyan-200/50 mt-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-3 mb-6">
                  <Input
                    placeholder={getTranslation("ask_farming_question", selectedLanguage)}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-slate-800/60 border-slate-600/50 text-white placeholder-cyan-200/50 focus:border-cyan-400/50 focus:ring-cyan-400/20 backdrop-blur-sm"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 border border-cyan-400/30 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMessage(getTranslation("quick_weather", selectedLanguage))}
                    className="text-sm bg-slate-800/50 border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300"
                  >
                    {getTranslation("weather_advice", selectedLanguage)}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMessage(getTranslation("quick_planting", selectedLanguage))}
                    className="text-sm bg-slate-800/50 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
                  >
                    {getTranslation("planting_advice", selectedLanguage)}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMessage(getTranslation("quick_pest", selectedLanguage))}
                    className="text-sm bg-slate-800/50 border-red-500/30 text-red-200 hover:bg-red-500/20 hover:text-white hover:border-red-400/50 backdrop-blur-sm transition-all duration-300"
                  >
                    {getTranslation("pest_help", selectedLanguage)}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMessage(getTranslation("quick_market", selectedLanguage))}
                    className="text-sm bg-slate-800/50 border-purple-500/30 text-purple-200 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 backdrop-blur-sm transition-all duration-300"
                  >
                    {getTranslation("market_advice", selectedLanguage)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Voice Assistant */}
        <AIVoiceAssistant language={selectedLanguage} />
      </div>
    </div>
  )
}
