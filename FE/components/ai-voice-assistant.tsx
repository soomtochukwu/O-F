"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, MessageSquare, X, Volume2 } from "lucide-react"

interface AIVoiceAssistantProps {
  language: string
}

export function AIVoiceAssistant({ language }: AIVoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [conversation, setConversation] = useState<Array<{ type: "user" | "assistant"; message: string }>>([])
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = getLanguageCode(language)

      recognition.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcript)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [language])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(language)
      utterance.rate = 0.8
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    let response = ""
    let action = null

    // Add user message to conversation
    setConversation((prev) => [...prev, { type: "user", message: command }])

    // Process commands
    if (
      lowerCommand.includes("cooperative") ||
      lowerCommand.includes("ajọṣepọ") ||
      lowerCommand.includes("haɗin kai") ||
      lowerCommand.includes("nkwekọrịta")
    ) {
      response = getTranslation("ai_cooperative_response", language)
      action = () => (window.location.href = "/cooperative")
    } else if (
      lowerCommand.includes("transport") ||
      lowerCommand.includes("logistics") ||
      lowerCommand.includes("gbigbe") ||
      lowerCommand.includes("jigilar") ||
      lowerCommand.includes("nbufe")
    ) {
      response = getTranslation("ai_transport_response", language)
      action = () => (window.location.href = "/logistics")
    } else if (
      lowerCommand.includes("marketplace") ||
      lowerCommand.includes("market") ||
      lowerCommand.includes("ọja") ||
      lowerCommand.includes("kasuwa") ||
      lowerCommand.includes("ahịa")
    ) {
      response = getTranslation("ai_marketplace_response", language)
      action = () => (window.location.href = "/marketplace")
    } else if (lowerCommand.includes("ussd") || lowerCommand.includes("*123")) {
      response = getTranslation("ai_ussd_response", language)
      action = () => (window.location.href = "/ussd")
    } else if (lowerCommand.includes("dashboard") || lowerCommand.includes("home") || lowerCommand.includes("menu")) {
      response = getTranslation("ai_dashboard_response", language)
      action = () => (window.location.href = "/dashboard")
    } else if (
      lowerCommand.includes("help") ||
      lowerCommand.includes("assist") ||
      lowerCommand.includes("iranlọwọ") ||
      lowerCommand.includes("taimako") ||
      lowerCommand.includes("enyemaka")
    ) {
      response = getTranslation("ai_help_response", language)
    } else {
      response = getTranslation("ai_default_response", language)
    }

    // Add assistant response to conversation
    setConversation((prev) => [...prev, { type: "assistant", message: response }])

    // Speak the response
    speak(response)

    // Execute action after a delay
    if (action) {
      setTimeout(action, 2000)
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageSquare className="w-8 h-8 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="border-2 border-blue-200 shadow-xl">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-blue-800">{getTranslation("ai_assistant", language)}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Conversation */}
          <div className="max-h-60 overflow-y-auto mb-4 space-y-2">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                <p className="text-sm">{getTranslation("ai_welcome", language)}</p>
              </div>
            )}
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm ${
                  msg.type === "user" ? "bg-blue-100 text-blue-800 ml-4" : "bg-gray-100 text-gray-800 mr-4"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          {/* Current transcript */}
          {transcript && (
            <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
              <strong>{getTranslation("listening", language)}:</strong> {transcript}
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`flex-1 ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              disabled={isSpeaking}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  {getTranslation("stop_listening", language)}
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  {getTranslation("start_listening", language)}
                </>
              )}
            </Button>

            {isSpeaking && (
              <Button variant="outline" onClick={() => speechSynthesis.cancel()}>
                <Volume2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVoiceCommand("show cooperative")}
              className="text-xs"
            >
              {getTranslation("cooperative", language)}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVoiceCommand("show transport")}
              className="text-xs"
            >
              {getTranslation("transport", language)}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVoiceCommand("show marketplace")}
              className="text-xs"
            >
              {getTranslation("marketplace", language)}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleVoiceCommand("help me")} className="text-xs">
              {getTranslation("help", language)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getTranslation(key: string, language: string): string {
  const translations = {
    en: {
      ai_assistant: "AI Assistant",
      ai_welcome: "Hello! I can help you navigate ObodoFarm. Try saying 'show cooperative' or 'help me'",
      listening: "Listening",
      start_listening: "Start Listening",
      stop_listening: "Stop Listening",
      cooperative: "Cooperative",
      transport: "Transport",
      marketplace: "Marketplace",
      help: "Help",
      ai_cooperative_response: "Opening the cooperative section where you can vote on proposals and create new ones.",
      ai_transport_response: "Taking you to transport booking where you can book rides and track deliveries.",
      ai_marketplace_response: "Opening the marketplace where you can buy and sell harvest futures.",
      ai_ussd_response: "Opening USSD access for basic phone users.",
      ai_dashboard_response: "Taking you to the main dashboard.",
      ai_help_response:
        "I can help you with cooperative voting, transport booking, marketplace trading, and more. Just tell me what you need!",
      ai_default_response:
        "I didn't understand that. Try saying 'cooperative', 'transport', 'marketplace', or 'help me'.",
    },
    yo: {
      ai_assistant: "Oluranlọwọ AI",
      ai_welcome: "Bawo! Mo le ran ọ lọwọ lati rin ObodoFarm. Gbiyanju sọ 'fi ajọṣepọ han' tabi 'ran mi lọwọ'",
      listening: "Gbigbọ",
      start_listening: "Bẹrẹ Gbigbọ",
      stop_listening: "Duro Gbigbọ",
      cooperative: "Ajọṣepọ",
      transport: "Gbigbe",
      marketplace: "Ọja",
      help: "Iranlọwọ",
      ai_cooperative_response: "Ṣiṣi apakan ajọṣepọ nibiti o le dibo lori awọn igbero ati ṣẹda awọn tuntun.",
      ai_transport_response: "Mu ọ lọ si ibookini gbigbe nibiti o le book awọn irin-ajo ati tọpa awọn ifijiṣẹ.",
      ai_marketplace_response: "Ṣiṣi ọja nibiti o le ra ati ta awọn ikore iwaju.",
      ai_ussd_response: "Ṣiṣi wiwọle USSD fun awọn olumulo foonu ipilẹ.",
      ai_dashboard_response: "Mu ọ lọ si dashboard akọkọ.",
      ai_help_response:
        "Mo le ran ọ lọwọ pẹlu dibo ajọṣepọ, ibookini gbigbe, iṣowo ọja, ati diẹ sii. Kan sọ fun mi ohun ti o nilo!",
      ai_default_response: "Emi ko loye iyẹn. Gbiyanju sọ 'ajọṣepọ', 'gbigbe', 'ọja', tabi 'ran mi lọwọ'.",
    },
    ha: {
      ai_assistant: "Mataimakin AI",
      ai_welcome: "Sannu! Zan iya taimaka muku a cikin ObodoFarm. Gwada cewa 'nuna haɗin kai' ko 'taimake ni'",
      listening: "Sauraro",
      start_listening: "Fara Sauraro",
      stop_listening: "Dakatar Sauraro",
      cooperative: "Haɗin Kai",
      transport: "Jigilar Kaya",
      marketplace: "Kasuwa",
      help: "Taimako",
      ai_cooperative_response: "Buɗe sashin haɗin kai inda za ku iya jefa kuri'a kan shawarwari da ƙirƙirar sababbi.",
      ai_transport_response:
        "Kai ku zuwa booking jigilar kaya inda za ku iya booking tafiye-tafiye da bin diddigin isar da kaya.",
      ai_marketplace_response: "Buɗe kasuwa inda za ku iya saya da sayar da girbin nan gaba.",
      ai_ussd_response: "Buɗe damar USSD don masu amfani da wayar hannu na asali.",
      ai_dashboard_response: "Kai ku zuwa babban dashboard.",
      ai_help_response:
        "Zan iya taimaka muku da jefa kuri'a na haɗin kai, booking jigilar kaya, cinikin kasuwa, da ƙari. Kawai gaya mani abin da kuke buƙata!",
      ai_default_response: "Ban fahimci wannan ba. Gwada cewa 'haɗin kai', 'jigilar kaya', 'kasuwa', ko 'taimake ni'.",
    },
    ig: {
      ai_assistant: "Onye Inyeaka AI",
      ai_welcome:
        "Ndewo! Enwere m ike inyere gị aka ịgagharị ObodoFarm. Gbalịa ịsị 'gosi nkwekọrịta' ma ọ bụ 'nyere m aka'",
      listening: "Na-ege Ntị",
      start_listening: "Malite Ige Ntị",
      stop_listening: "Kwụsị Ige Ntị",
      cooperative: "Nkwekọrịta",
      transport: "Nbufe",
      marketplace: "Ahịa",
      help: "Enyemaka",
      ai_cooperative_response: "Imeghe ngalaba nkwekọrịta ebe ị nwere ike ịtụ vootu na atụmatụ ma mepụta ndị ọhụrụ.",
      ai_transport_response: "Na-ewere gị gaa na booking nbufe ebe ị nwere ike ịbọọkụ njem na soro onyinye.",
      ai_marketplace_response: "Imeghe ahịa ebe ị nwere ike ịzụta na ire owuwe ihe ọdịnihu.",
      ai_ussd_response: "Imeghe ohere USSD maka ndị ọrụ ekwentị isi.",
      ai_dashboard_response: "Na-ewere gị gaa na dashboard isi.",
      ai_help_response:
        "Enwere m ike inyere gị aka na ịtụ vootu nkwekọrịta, booking nbufe, azụmaahịa ahịa, na ndị ọzọ. Naanị gwa m ihe ị chọrọ!",
      ai_default_response: "Aghọtaghị m nke ahụ. Gbalịa ịsị 'nkwekọrịta', 'nbufe', 'ahịa', ma ọ bụ 'nyere m aka'.",
    },
  }

  return (
    translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
    translations.en[key as keyof typeof translations.en]
  )
}
