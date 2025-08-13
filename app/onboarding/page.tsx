"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Users, Wheat, CheckCircle } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import AnimatedFarmBackground from "@/components/animated-farm-background"

interface OnboardingData {
  language: string
  name: string
  phone: string
  userType: string
  farmSize?: string
  cropType?: string
  livestockType?: string
  vehicleType?: string
}

export default function OnboardingPage() {
  const { language, changeLanguage } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<OnboardingData>({
    language: language,
    name: "",
    phone: "",
    userType: "",
  })

  const steps = [
    {
      id: "language",
      title: "Choose Your Language",
      subtitle: "Select your preferred language for the app",
      icon: Users,
    },
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Tell us about yourself",
      icon: Users,
    },
    {
      id: "userType",
      title: "What do you do?",
      subtitle: "Select your primary activity",
      icon: Wheat,
    },
    {
      id: "details",
      title: "Additional Details",
      subtitle: "Help us serve you better",
      icon: CheckCircle,
    },
    {
      id: "complete",
      title: "Welcome to ObodoFarm!",
      subtitle: "Your account is ready",
      icon: CheckCircle,
    },
  ]

  const userTypes = [
    { id: "crop_farmer", label: "Crop Farmer", icon: "🌾", description: "I grow crops like maize, rice, tomatoes" },
    { id: "livestock", label: "Livestock Keeper", icon: "🐄", description: "I raise cattle, goats, chickens" },
    { id: "driver", label: "Driver/Rider", icon: "🚛", description: "I transport goods and people" },
    { id: "buyer", label: "Buyer/Trader", icon: "🏪", description: "I buy and sell farm products" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("obodofarm-user", JSON.stringify(formData))
    window.location.href = "/dashboard"
  }

  const currentStepData = steps[currentStep]
  const StepIcon = currentStepData.icon

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case "language":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-lg text-muted-foreground mb-6">Choose the language you're most comfortable with</p>
            </div>
            <LanguageSelector selectedLanguage={formData.language} onLanguageChange={changeLanguage} />
            <VoiceButton
              text="Choose your preferred language. This will be used throughout the app to help you navigate and understand all features."
              language={formData.language}
              className="w-full"
            />
          </div>
        )

      case "personal":
        return (
          <div className="space-y-6">
            <div className="text-center text-6xl mb-4">👤</div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-lg font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="text-lg py-3 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="080XXXXXXXX"
                  className="text-lg py-3 mt-2"
                />
              </div>
            </div>
            <VoiceButton
              text="Please enter your full name and phone number. This information will be used to create your account and send you important updates."
              language={formData.language}
              className="w-full"
            />
          </div>
        )

      case "userType":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🤔</div>
              <p className="text-lg text-muted-foreground">This helps us customize the app for your needs</p>
            </div>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) => setFormData({ ...formData, userType: value })}
              className="space-y-4"
            >
              {userTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <Label htmlFor={type.id} className="text-lg font-medium cursor-pointer">
                          {type.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <VoiceButton
              text="Select what you do. Choose crop farmer if you grow plants, livestock keeper if you raise animals, driver if you transport goods, or buyer if you trade farm products."
              language={formData.language}
              className="w-full"
            />
          </div>
        )

      case "details":
        return (
          <div className="space-y-6">
            <div className="text-center text-6xl mb-4">📝</div>
            {formData.userType === "crop_farmer" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="farmSize" className="text-lg font-medium">
                    Farm Size
                  </Label>
                  <Select
                    value={formData.farmSize || ""}
                    onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                  >
                    <SelectTrigger className="text-lg py-3 mt-2">
                      <SelectValue placeholder="Select your farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1">Less than 1 acre</SelectItem>
                      <SelectItem value="1-2">1-2 acres</SelectItem>
                      <SelectItem value="3-5">3-5 acres</SelectItem>
                      <SelectItem value="6-10">6-10 acres</SelectItem>
                      <SelectItem value="more-than-10">More than 10 acres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cropType" className="text-lg font-medium">
                    Main Crops
                  </Label>
                  <Select
                    value={formData.cropType || ""}
                    onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                  >
                    <SelectTrigger className="text-lg py-3 mt-2">
                      <SelectValue placeholder="Select your main crops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maize">Maize (Corn)</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="tomatoes">Tomatoes</SelectItem>
                      <SelectItem value="cassava">Cassava</SelectItem>
                      <SelectItem value="yam">Yam</SelectItem>
                      <SelectItem value="plantain">Plantain</SelectItem>
                      <SelectItem value="beans">Beans</SelectItem>
                      <SelectItem value="pepper">Pepper</SelectItem>
                      <SelectItem value="okra">Okra</SelectItem>
                      <SelectItem value="mixed">Mixed Crops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {formData.userType === "livestock" && (
              <div>
                <Label htmlFor="livestockType" className="text-lg font-medium">
                  Type of Livestock
                </Label>
                <Select
                  value={formData.livestockType || ""}
                  onValueChange={(value) => setFormData({ ...formData, livestockType: value })}
                >
                  <SelectTrigger className="text-lg py-3 mt-2">
                    <SelectValue placeholder="Select your livestock type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle">Cattle</SelectItem>
                    <SelectItem value="goats">Goats</SelectItem>
                    <SelectItem value="sheep">Sheep</SelectItem>
                    <SelectItem value="chickens">Chickens</SelectItem>
                    <SelectItem value="ducks">Ducks</SelectItem>
                    <SelectItem value="pigs">Pigs</SelectItem>
                    <SelectItem value="fish">Fish (Aquaculture)</SelectItem>
                    <SelectItem value="mixed">Mixed Livestock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.userType === "driver" && (
              <div>
                <Label htmlFor="vehicleType" className="text-lg font-medium">
                  Vehicle Type
                </Label>
                <Select
                  value={formData.vehicleType || ""}
                  onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                >
                  <SelectTrigger className="text-lg py-3 mt-2">
                    <SelectValue placeholder="Select your vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motorcycle">Motorcycle (Okada)</SelectItem>
                    <SelectItem value="tricycle">Tricycle (Keke)</SelectItem>
                    <SelectItem value="van">Van/Mini Bus</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                    <SelectItem value="truck">Large Truck</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <VoiceButton
              text="Please provide additional details about your work. This helps us give you relevant features and information."
              language={formData.language}
              className="w-full"
            />
          </div>
        )

      case "complete":
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-600">Registration Complete!</h3>
              <p className="text-lg text-muted-foreground">Welcome to ObodoFarm, {formData.name}!</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  Your account is ready. You can now access all cooperative features, vote on proposals, book transport,
                  and get farming tips.
                </p>
              </div>
            </div>
            <Button onClick={handleComplete} className="w-full text-lg py-3 bg-green-600 hover:bg-green-700">
              Start Using ObodoFarm
            </Button>
            <VoiceButton
              text="Congratulations! Your ObodoFarm account is ready. You can now access all features including voting, transport booking, and farming tips."
              language={formData.language}
              className="w-full"
            />
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStepData.id) {
      case "language":
        return formData.language !== ""
      case "personal":
        return formData.name.trim() !== "" && formData.phone.trim() !== ""
      case "userType":
        return formData.userType !== ""
      case "details":
        return true // Optional step
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 relative">
      {/* Animated Background */}
      <AnimatedFarmBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Setup
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-md mx-auto border-2 border-green-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StepIcon className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-800">{currentStepData.title}</CardTitle>
            <p className="text-muted-foreground">{currentStepData.subtitle}</p>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        {currentStepData.id !== "complete" && (
          <div className="max-w-md mx-auto mt-6 flex gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1 bg-green-600 hover:bg-green-700" disabled={!canProceed()}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
