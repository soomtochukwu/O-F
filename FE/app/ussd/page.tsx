"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import AnimatedFarmBackground from "@/components/animated-farm-background"
import { useRouter } from "next/navigation"


interface USSDStep {
  id: string
  title: string
  options: { key: string; text: string; action?: string }[]
  isInput?: boolean
  inputPlaceholder?: string
}

export default function USSDPage() {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState("main")
  const [inputValue, setInputValue] = useState("")
  const [sessionData, setSessionData] = useState<Record<string, string>>({}),
    { back } = useRouter();

  const ussdSteps: Record<string, USSDStep> = {
    main: {
      id: "main",
      title: "ObodoFarm USSD Menu",
      options: [
        { key: "1", text: "Register New Account", action: "register" },
        { key: "2", text: "Check Balance", action: "balance" },
        { key: "3", text: "Vote on Proposal", action: "vote" },
        { key: "4", text: "Book Transport", action: "transport" },
        { key: "5", text: "Market Prices", action: "prices" },
        { key: "6", text: "Farm Tips", action: "tips" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    register: {
      id: "register",
      title: "Register New Account",
      options: [
        { key: "1", text: "Crop Farmer", action: "register_crop" },
        { key: "2", text: "Livestock Keeper", action: "register_livestock" },
        { key: "3", text: "Driver/Rider", action: "register_driver" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    register_crop: {
      id: "register_crop",
      title: "Enter Your Name",
      options: [],
      isInput: true,
      inputPlaceholder: "Type your full name",
    },
    balance: {
      id: "balance",
      title: "Your Account Balance",
      options: [
        { key: "", text: "Balance: ₦2,450.00" },
        { key: "", text: "Pending: ₦800.00" },
        { key: "1", text: "Transaction History", action: "history" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    vote: {
      id: "vote",
      title: "Active Proposals",
      options: [
        { key: "1", text: "Buy Fertilizer (₦50,000)", action: "vote_fertilizer" },
        { key: "2", text: "Hire Tractor (₦30,000)", action: "vote_tractor" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    vote_fertilizer: {
      id: "vote_fertilizer",
      title: "Vote: Buy Fertilizer",
      options: [
        { key: "1", text: "YES - Support proposal", action: "vote_yes" },
        { key: "2", text: "NO - Reject proposal", action: "vote_no" },
        { key: "9", text: "Back to Proposals", action: "vote" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    transport: {
      id: "transport",
      title: "Book Transport",
      options: [
        { key: "1", text: "Motorcycle (₦500)", action: "book_bike" },
        { key: "2", text: "Van/Truck (₦2000)", action: "book_van" },
        { key: "3", text: "Check Booking Status", action: "booking_status" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    prices: {
      id: "prices",
      title: "Today's Market Prices",
      options: [
        { key: "", text: "Tomatoes: ₦800/basket" },
        { key: "", text: "Maize: ₦350/kg" },
        { key: "", text: "Rice: ₦450/kg" },
        { key: "", text: "Yam: ₦200/tuber" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
    tips: {
      id: "tips",
      title: "Today's Farm Tip",
      options: [
        { key: "", text: "Plant maize after first rain" },
        { key: "", text: "Use organic fertilizer" },
        { key: "", text: "Check for pests daily" },
        { key: "1", text: "Get More Tips", action: "more_tips" },
        { key: "9", text: "Back to Main Menu", action: "main" },
        { key: "0", text: "Exit", action: "exit" },
      ],
    },
  }

  const currentStepData = ussdSteps[currentStep]

  const handleOptionSelect = (action: string) => {
    if (action === "exit") {
      // Simulate USSD session end
      setCurrentStep("main")
      setSessionData({})
      return
    }

    if (action === "vote_yes" || action === "vote_no") {
      // Simulate vote submission
      alert(`Vote recorded: ${action === "vote_yes" ? "YES" : "NO"}`)
      setCurrentStep("main")
      return
    }

    if (ussdSteps[action]) {
      setCurrentStep(action)
    }
  }

  const handleInputSubmit = () => {
    if (currentStep === "register_crop" && inputValue.trim()) {
      setSessionData({ ...sessionData, name: inputValue })
      alert(`Registration successful for ${inputValue}`)
      setCurrentStep("main")
      setInputValue("")
    }
  }

  return (
    <div className="mt-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Sophisticated Black & Green Background Pattern - Matching Landing Page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Elegant Green Accent Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-green-400/6 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-600/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 p-6">
        {/* USSD Header */}
        <div className="flex items-center justify-between mb-6">
          {/* <Link href="/"> */}
          <Button onClick={back} variant="ghost" size="sm" className="text-white hover:bg-green-500/10 hover:text-green-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit USSD
          </Button>
          {/* </Link> */}
          <div className="flex items-center gap-2 text-gray-300">
            <Phone className="w-5 h-5" />
            <span className="text-sm">*123# - ObodoFarm</span>
          </div>
        </div>

        {/* USSD Screen Simulation */}
        <Card className="bg-black/70 border-green-500/30 border-2 max-w-md mx-auto backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-green-400 text-center text-lg">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentStepData.isInput ? (
              <div className="space-y-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentStepData.inputPlaceholder}
                  className="bg-black/80 border-green-500/60 text-green-400 text-lg placeholder:text-green-400/50"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleInputSubmit}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/30"
                    disabled={!inputValue.trim()}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("register")}
                    variant="outline"
                    className="border-green-500/60 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                  >
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {currentStepData.options.map((option, index) => (
                  <div key={index} className="text-green-400">
                    {option.action ? (
                      <Button
                        onClick={() => handleOptionSelect(option.action!)}
                        variant="ghost"
                        className="w-full justify-start text-left text-green-400 hover:text-green-300 hover:bg-green-500/10 p-2 h-auto"
                      >
                        <span className="font-bold mr-2">{option.key}</span>
                        {option.text}
                      </Button>
                    ) : (
                      <div className="p-2 text-center">
                        <span className="font-bold mr-2">{option.key}</span>
                        {option.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Voice Support */}
            <div className="pt-4 border-t border-green-500/30">
              <VoiceButton
                text={`${currentStepData.title}. ${currentStepData.options
                  .map((opt) => `${opt.key} ${opt.text}`)
                  .join(". ")}`}
                language={language}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/30"
              />
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="max-w-md mx-auto mt-6 text-center text-gray-300 text-sm">
          <p>Use number keys to select options</p>
          <p>Press 9 to go back, 0 to exit</p>
        </div>
      </div>
    </div>
  )
}
