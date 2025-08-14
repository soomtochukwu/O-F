"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Volume2 } from "lucide-react"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
]

const welcomeMessages = {
  en: "Welcome to ObodoFarm. Language changed to English.",
  yo: "Káàbọ̀ sí ObodoFarm. Èdè ti yípadà sí Yorùbá.",
  ha: "Barka da zuwa ObodoFarm. An canza harshe zuwa Hausa.",
  ig: "Nnọọ na ObodoFarm. Agbanweela asụsụ ka ọ bụrụ Igbo.",
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0]

  const speakLanguageChange = (languageCode: string) => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(welcomeMessages[languageCode as keyof typeof welcomeMessages])

      // Set language based on selection with fallback to English
      const languageMap = {
        en: "en-US",
        yo: "yo-NG", // Yoruba (Nigeria)
        ha: "ha-NG", // Hausa (Nigeria)
        ig: "ig-NG", // Igbo (Nigeria)
      }

      utterance.lang = languageMap[languageCode as keyof typeof languageMap] || "en-US"
      utterance.rate = 0.8 // Slower speech for better comprehension
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => {
        setIsSpeaking(false)
        // Fallback to English if the selected language is not available
        if (languageCode !== "en") {
          const fallbackUtterance = new SpeechSynthesisUtterance(welcomeMessages.en)
          fallbackUtterance.lang = "en-US"
          fallbackUtterance.rate = 0.8
          window.speechSynthesis.speak(fallbackUtterance)
        }
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    onLanguageChange(languageCode)
    speakLanguageChange(languageCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
          {isSpeaking && <Volume2 className="w-3 h-3 text-green-600 animate-pulse" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-3 text-base py-3 hover:bg-green-50"
          >
            <span className="text-xl">{language.flag}</span>
            <span>{language.name}</span>
            {selectedLanguage === language.code && <span className="ml-auto text-green-600">✓</span>}
            <Volume2 className="w-3 h-3 text-gray-400 ml-auto" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
