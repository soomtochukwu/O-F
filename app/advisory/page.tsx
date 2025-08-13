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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/dashboard")} className="mr-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-teal-800">{getTranslation("ai_farm_advisor", selectedLanguage)}</h1>
        </div>
        <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-lg p-1 border-2 border-gray-200 overflow-x-auto">
        <Button
          variant={activeTab === "weather" ? "default" : "ghost"}
          className="flex-1 min-w-fit"
          onClick={() => setActiveTab("weather")}
        >
          <Cloud className="w-4 h-4 mr-2" />
          {getTranslation("weather", selectedLanguage)}
        </Button>
        <Button
          variant={activeTab === "crops" ? "default" : "ghost"}
          className="flex-1 min-w-fit"
          onClick={() => setActiveTab("crops")}
        >
          <Sprout className="w-4 h-4 mr-2" />
          {getTranslation("crops", selectedLanguage)}
        </Button>
        <Button
          variant={activeTab === "pests" ? "default" : "ghost"}
          className="flex-1 min-w-fit"
          onClick={() => setActiveTab("pests")}
        >
          <Bug className="w-4 h-4 mr-2" />
          {getTranslation("pests", selectedLanguage)}
        </Button>
        <Button
          variant={activeTab === "chat" ? "default" : "ghost"}
          className="flex-1 min-w-fit"
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
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                {getTranslation("current_weather", selectedLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  {getWeatherIcon(weatherData.current.condition)}
                  <p className="text-3xl font-bold text-blue-600 mt-2">{weatherData.current.temperature}°C</p>
                  <p className="text-sm text-gray-600">{getTranslation("temperature", selectedLanguage)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{getTranslation("humidity", selectedLanguage)}:</span>
                    <span className="font-medium">{weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{getTranslation("wind", selectedLanguage)}:</span>
                    <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{getTranslation("rainfall", selectedLanguage)}:</span>
                    <span className="font-medium">{weatherData.current.rainfall} mm</span>
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
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {getTranslation("weather_alerts", selectedLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weatherData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.priority === "high" ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <VoiceButton text={`${alert.title}. ${alert.message}`} language={selectedLanguage} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 5-Day Forecast */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800">{getTranslation("forecast", selectedLanguage)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 mb-1">{day.day}</p>
                    {getWeatherIcon(day.condition)}
                    <p className="text-sm font-bold text-gray-800 mt-1">{day.temp}</p>
                    <p className="text-xs text-blue-600">{day.rain}</p>
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
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                {getTranslation("crop_recommendations", selectedLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{crop.crop}</h3>
                      <p className="text-sm text-gray-600">{crop.season}</p>
                    </div>
                    <Badge
                      className={`${crop.demand === "high" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {getTranslation(crop.demand, selectedLanguage)} {getTranslation("demand", selectedLanguage)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">{getTranslation("planting_time", selectedLanguage)}:</p>
                      <p className="font-medium">{crop.plantingTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{getTranslation("harvest_time", selectedLanguage)}:</p>
                      <p className="font-medium">{crop.harvestTime}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-600 text-sm mb-1">{getTranslation("farming_tips", selectedLanguage)}:</p>
                    <p className="text-gray-800 text-sm">{crop.tips}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-sm">{getTranslation("market_price", selectedLanguage)}:</p>
                      <p className="text-lg font-bold text-green-600">{crop.marketPrice}</p>
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
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Bug className="w-5 h-5" />
                {getTranslation("pest_disease_guide", selectedLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pestDiseases.map((pest, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{pest.name}</h3>
                      <p className="text-sm text-gray-600">
                        {getTranslation("affects", selectedLanguage)}: {pest.crop}
                      </p>
                    </div>
                    <Badge
                      className={`${pest.severity === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {getTranslation(pest.severity, selectedLanguage)} {getTranslation("severity", selectedLanguage)}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">{getTranslation("symptoms", selectedLanguage)}:</p>
                      <p className="text-gray-800">{pest.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">{getTranslation("treatment", selectedLanguage)}:</p>
                      <p className="text-gray-800">{pest.treatment}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">{getTranslation("prevention", selectedLanguage)}:</p>
                      <p className="text-gray-800">{pest.prevention}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
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
          <Card className="border-2 border-teal-200">
            <CardHeader>
              <CardTitle className="text-teal-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {getTranslation("ai_farming_assistant", selectedLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 space-y-3 p-3 bg-gray-50 rounded-lg">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>{getTranslation("ai_chat_welcome", selectedLanguage)}</p>
                  </div>
                )}
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-teal-100 text-teal-800 ml-auto"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={getTranslation("ask_farming_question", selectedLanguage)}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Questions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMessage(getTranslation("quick_weather", selectedLanguage))}
                  className="text-xs"
                >
                  {getTranslation("weather_advice", selectedLanguage)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMessage(getTranslation("quick_planting", selectedLanguage))}
                  className="text-xs"
                >
                  {getTranslation("planting_advice", selectedLanguage)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMessage(getTranslation("quick_pest", selectedLanguage))}
                  className="text-xs"
                >
                  {getTranslation("pest_help", selectedLanguage)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMessage(getTranslation("quick_market", selectedLanguage))}
                  className="text-xs"
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
  )
}

function getTranslation(key: string, language: string): string {
  const translations = {
    en: {
      ai_farm_advisor: "AI Farm Advisor",
      weather: "Weather",
      crops: "Crops",
      pests: "Pests",
      ai_chat: "AI Chat",
      current_weather: "Current Weather",
      temperature: "Temperature",
      humidity: "Humidity",
      wind: "Wind Speed",
      rainfall: "Rainfall",
      weather_alerts: "Weather Alerts",
      forecast: "5-Day Forecast",
      crop_recommendations: "Crop Recommendations",
      demand: "Demand",
      high: "High",
      medium: "Medium",
      low: "Low",
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
      ai_chat_welcome: "Ask me anything about farming! I can help with weather, crops, pests, and market advice.",
      ask_farming_question: "Ask a farming question...",
      weather_advice: "Weather Advice",
      planting_advice: "Planting Advice",
      pest_help: "Pest Help",
      market_advice: "Market Advice",
      quick_weather: "What's the weather forecast for farming?",
      quick_planting: "What should I plant this season?",
      quick_pest: "How do I identify crop pests?",
      quick_market: "What are the best crops to sell?",
      ai_weather_response:
        "Based on current weather conditions, I recommend checking soil moisture before planting. The upcoming rain on Wednesday will be good for recently planted crops, but protect seedlings from heavy downpours.",
      ai_crop_response:
        "For this season, I recommend planting tomatoes and maize. Tomatoes have high market demand and good prices. Make sure to plant in well-drained soil and provide adequate spacing for healthy growth.",
      ai_pest_response:
        "Common pests this season include tomato blight and maize weevils. Look for brown spots on leaves or small holes in grains. Use organic treatments like neem oil when possible, and always practice crop rotation.",
      ai_market_response:
        "Current market prices show tomatoes at ₦800/kg with high demand. Cassava remains stable at ₦200/kg. Consider diversifying your crops and timing your harvest with peak demand periods.",
      ai_general_response:
        "I'm here to help with all your farming questions! Ask me about weather conditions, crop recommendations, pest management, or market prices. I can provide advice in your local language.",
    },
    yo: {
      ai_farm_advisor: "Oluranlọwọ Oko AI",
      weather: "Oju Ọjọ",
      crops: "Awọn Irugbin",
      pests: "Awọn Kokoro",
      ai_chat: "Ibaraẹnisọrọ AI",
      current_weather: "Oju Ọjọ Lọwọlọwọ",
      temperature: "Iwọn Otutu",
      humidity: "Ọriniinitutu",
      wind: "Iyara Afẹfẹ",
      rainfall: "Ojo",
      weather_alerts: "Awọn Ikilọ Oju Ọjọ",
      forecast: "Asọtẹlẹ Ọjọ Marun",
      crop_recommendations: "Awọn Iṣeduro Irugbin",
      demand: "Ibeere",
      high: "Giga",
      medium: "Aarin",
      low: "Kekere",
      planting_time: "Akoko Gbingbin",
      harvest_time: "Akoko Ikore",
      farming_tips: "Awọn Imọran Oko",
      market_price: "Owo Ọja",
      pest_disease_guide: "Itọsọna Kokoro ati Arun",
      affects: "O kan",
      severity: "Iwọn Nla",
      symptoms: "Awọn Ami",
      treatment: "Itọju",
      prevention: "Idena",
      ai_farming_assistant: "Oluranlọwọ Oko AI",
      ai_chat_welcome:
        "Beere ohunkohun nipa oko lọwọ mi! Mo le ran ọ lọwọ pẹlu oju ọjọ, irugbin, kokoro, ati imọran ọja.",
      ask_farming_question: "Beere ibeere oko...",
      weather_advice: "Imọran Oju Ọjọ",
      planting_advice: "Imọran Gbingbin",
      pest_help: "Iranlọwọ Kokoro",
      market_advice: "Imọran Ọja",
      quick_weather: "Kini asọtẹlẹ oju ọjọ fun oko?",
      quick_planting: "Kini mo yẹ ki n gbin ni akoko yii?",
      quick_pest: "Bawo ni mo ṣe le mọ awọn kokoro irugbin?",
      quick_market: "Kini awọn irugbin ti o dara julọ lati ta?",
      ai_weather_response:
        "Ti o ba da lori ipo oju ọjọ lọwọlọwọ, mo ṣeduro ki o ṣayẹwo omi ile ṣaaju gbingbin. Ojo ti n bọ ni Ọjọrú yoo dara fun awọn irugbin ti a ṣẹṣẹ gbin, ṣugbọn daabobo awọn ọmọ irugbin lati ojo nla.",
      ai_crop_response:
        "Fun akoko yii, mo ṣeduro gbingbin tomati ati agbado. Tomati ni ibeere giga ati owo to dara. Rii daju pe o gbin ni ile ti o ni omi daradara ati pese aaye to peye fun idagbasoke ilera.",
      ai_pest_response:
        "Awọn kokoro ti o wọpọ ni akoko yii ni tomato blight ati maize weevils. Wa awọn ami dudu lori ewe tabi awọn iho kekere ninu awọn irugbin. Lo awọn itọju adayeba bi epo neem nigba ti o ṣee ṣe, ki o si ṣe yiyi irugbin nigbagbogbo.",
      ai_market_response:
        "Awọn owo ọja lọwọlọwọ fi han tomati ni ₦800/kg pẹlu ibeere giga. Cassava wa ni iduroṣinṣin ni ₦200/kg. Ronu lati ṣe iyatọ awọn irugbin rẹ ki o si ṣeto akoko ikore rẹ pẹlu awọn akoko ibeere giga.",
      ai_general_response:
        "Mo wa nibi lati ran ọ lọwọ pẹlu gbogbo awọn ibeere oko rẹ! Beere lọwọ mi nipa awọn ipo oju ọjọ, awọn iṣeduro irugbin, iṣakoso kokoro, tabi awọn owo ọja. Mo le pese imọran ni ede agbegbe rẹ.",
    },
    ha: {
      ai_farm_advisor: "Mai Ba da Shawara na AI",
      weather: "Yanayi",
      crops: "Amfanin Gona",
      pests: "Kwari",
      ai_chat: "Hira da AI",
      current_weather: "Yanayin Yanzu",
      temperature: "Zafin Jiki",
      humidity: "Danshi",
      wind: "Gudun Iska",
      rainfall: "Ruwan Sama",
      weather_alerts: "Sanarwar Yanayi",
      forecast: "Hasashen Kwanaki Biyar",
      crop_recommendations: "Shawarar Amfanin Gona",
      demand: "Bukata",
      high: "Babba",
      medium: "Matsakaici",
      low: "Karami",
      planting_time: "Lokacin Shuki",
      harvest_time: "Lokacin Girbi",
      farming_tips: "Shawarar Noma",
      market_price: "Farashin Kasuwa",
      pest_disease_guide: "Jagorar Kwari da Cututtuka",
      affects: "Ya shafa",
      severity: "Matsananci",
      symptoms: "Alamomi",
      treatment: "Magani",
      prevention: "Rigakafi",
      ai_farming_assistant: "Mataimakin Noma na AI",
      ai_chat_welcome:
        "Tambaye ni komai game da noma! Zan iya taimaka da yanayi, amfanin gona, kwari, da shawarar kasuwa.",
      ask_farming_question: "Yi tambayar noma...",
      weather_advice: "Shawarar Yanayi",
      planting_advice: "Shawarar Shuki",
      pest_help: "Taimakon Kwari",
      market_advice: "Shawarar Kasuwa",
      quick_weather: "Menene hasashen yanayi don noma?",
      quick_planting: "Me zan shuka a wannan lokaci?",
      quick_pest: "Ta yaya zan gane kwarin amfanin gona?",
      quick_market: "Wadanne amfanin gona ne mafi kyau don sayarwa?",
      ai_weather_response:
        "Dangane da yanayin yanzu, ina ba da shawarar duba danshi na ƙasa kafin shuki. Ruwan sama mai zuwa a ranar Laraba zai yi kyau ga amfanin gona da aka shuka kwanan nan, amma kare ƙananan tsire-tsire daga ruwan sama mai ƙarfi.",
      ai_crop_response:
        "Don wannan lokaci, ina ba da shawarar shuka tumatir da masara. Tumatir yana da babban bukata da kyawawan farashi. Tabbatar da shuka a ƙasa mai kyawawan magudanar ruwa da samar da isasshen sarari don lafiyayyen girma.",
      ai_pest_response:
        "Kwari na yau da kullun a wannan lokaci sun haɗa da cutar tumatir da tsutsotsin masara. Nemi alamun launin ruwan kasa akan ganye ko ƙananan ramuka a cikin hatsi. Yi amfani da magungunan halitta kamar man neem lokacin da zai yiwu, kuma koyaushe yi jujjuyawar amfanin gona.",
      ai_market_response:
        "Farashin kasuwa na yanzu ya nuna tumatir a ₦800/kg tare da babban bukata. Rogo ya kasance a tsaye a ₦200/kg. Yi la'akari da bambanta amfanin gona da kuma daidaita lokacin girbi da lokutan babban bukata.",
      ai_general_response:
        "Ina nan don taimaka da duk tambayoyin noma! Tambaye ni game da yanayin yanayi, shawarar amfanin gona, sarrafa kwari, ko farashin kasuwa. Zan iya ba da shawara a harshen gida.",
    },
    ig: {
      ai_farm_advisor: "Onye Ndụmọdụ Ugbo AI",
      weather: "Ihu Igwe",
      crops: "Ihe Ọkụkụ",
      pests: "Ahụhụ",
      ai_chat: "Mkparịta Ụka AI",
      current_weather: "Ihu Igwe Ugbu A",
      temperature: "Okpomọkụ",
      humidity: "Iru Mmiri",
      wind: "Ọsọ Ikuku",
      rainfall: "Mmiri Ozuzo",
      weather_alerts: "Ọkwa Ihu Igwe",
      forecast: "Amụma Ụbọchị Ise",
      crop_recommendations: "Ntụziaka Ihe Ọkụkụ",
      demand: "Mkpa",
      high: "Elu",
      medium: "Etiti",
      low: "Ala",
      planting_time: "Oge Ịkụ",
      harvest_time: "Oge Owuwe",
      farming_tips: "Ndụmọdụ Ugbo",
      market_price: "Ọnụ Ahịa",
      pest_disease_guide: "Nduzi Ahụhụ na Ọrịa",
      affects: "Na-emetụta",
      severity: "Oke",
      symptoms: "Mgbaàmà",
      treatment: "Ọgwụgwọ",
      prevention: "Mgbochi",
      ai_farming_assistant: "Onye Inyeaka Ugbo AI",
      ai_chat_welcome:
        "Jụọ m ihe ọ bụla gbasara ugbo! Enwere m ike inyere gị aka na ihu igwe, ihe ọkụkụ, ahụhụ, na ndụmọdụ ahịa.",
      ask_farming_question: "Jụọ ajụjụ ugbo...",
      weather_advice: "Ndụmọdụ Ihu Igwe",
      planting_advice: "Ndụmọdụ Ịkụ",
      pest_help: "Enyemaka Ahụhụ",
      market_advice: "Ndụmọdụ Ahịa",
      quick_weather: "Gịnị bụ amụma ihu igwe maka ugbo?",
      quick_planting: "Gịnị ka m kwesịrị ịkụ n'oge a?",
      quick_pest: "Kedu ka m ga-esi mata ahụhụ ihe ọkụkụ?",
      quick_market: "Kedu ihe ọkụkụ kacha mma ire?",
      ai_weather_response:
        "Dabere na ọnọdụ ihu igwe ugbu a, ana m akwado ka ị lelee mmiri ala tupu ịkụ ihe. Mmiri ozuzo na-abịa na Wenezde ga-adị mma maka ihe ọkụkụ a kụrụ n'oge na-adịbeghị anya, mana chebe obere osisi site na oke mmiri ozuzo.",
      ai_crop_response:
        "Maka oge a, ana m akwado ịkụ tomato na ọka. Tomato nwere nnukwu mkpa na ọnụ ahịa dị mma. Gbaa mbọ hụ na ị na-akụ n'ala nwere ezigbo mmiri na-asọpụta ma nye ohere zuru oke maka uto ahụike.",
      ai_pest_response:
        "Ahụhụ ndị a na-ahụkarị n'oge a gụnyere ọrịa tomato na ahụhụ ọka. Chọọ akara aja aja na akwụkwọ ma ọ bụ obere oghere na mkpụrụ. Jiri ọgwụgwọ okike dị ka mmanụ neem mgbe o kwere omume, ma na-eme mgbanwe ihe ọkụkụ mgbe niile.",
      ai_market_response:
        "Ọnụ ahịa ahịa ugbu a na-egosi tomato na ₦800/kg na nnukwu mkpa. Cassava na-anọgide kwụsie ike na ₦200/kg. Tụlee ịgbasapụ ihe ọkụkụ gị ma hazie oge owuwe gị na oge mkpa dị elu.",
      ai_general_response:
        "Anọ m ebe a inyere gị aka na ajụjụ ugbo gị niile! Jụọ m gbasara ọnọdụ ihu igwe, ntụziaka ihe ọkụkụ, njikwa ahụhụ, ma ọ bụ ọnụ ahịa. Enwere m ike inye ndụmọdụ n'asụsụ obodo gị.",
    },
  }

  return (
    translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
    translations.en[key as keyof typeof translations.en]
  )
}
