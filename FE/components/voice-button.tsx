"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface VoiceButtonProps {
  text: string
  language: string
  className?: string
}

export function VoiceButton({ text, language, className = "" }: VoiceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      window.speechSynthesis.cancel()

      if (isPlaying) {
        setIsPlaying(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)

      // Set language based on selection
      const languageMap = {
        en: "en-US",
        yo: "yo-NG", // Yoruba (Nigeria) - may not be available in all browsers
        ha: "ha-NG", // Hausa (Nigeria) - may not be available in all browsers
        ig: "ig-NG", // Igbo (Nigeria) - may not be available in all browsers
      }

      utterance.lang = languageMap[language as keyof typeof languageMap] || "en-US"
      utterance.rate = 0.8 // Slower speech for better comprehension
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    } else {
      alert("Text-to-speech is not supported in your browser")
    }
  }

  return (
    <Button onClick={handleSpeak} variant="outline" size="lg" className={`gap-2 ${className}`}>
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5" />
          Stop Voice
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          Play Voice
        </>
      )}
    </Button>
  )
}
