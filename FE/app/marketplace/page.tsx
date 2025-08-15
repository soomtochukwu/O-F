"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, ShoppingCart, Calendar, Package, CheckCircle } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

interface HarvestFuture {
  id: string
  farmerId: string
  farmerName: string
  cropType: string
  cropIcon: string
  quantity: number
  unit: string
  harvestDate: string
  pricePerUnit: number
  totalValue: number
  tokensAvailable: number
  tokensSold: number
  status: "available" | "partially-sold" | "sold-out" | "harvested" | "delivered"
  location: string
  description: string
  qualityGrade: "A" | "B" | "C"
  estimatedYield: string
}

interface Investment {
  id: string
  futureId: string
  cropType: string
  cropIcon: string
  farmerName: string
  tokensOwned: number
  investmentAmount: number
  expectedReturn: number
  harvestDate: string
  status: "active" | "ready" | "delivered" | "cancelled"
  purchaseDate: string
}

export default function MarketplacePage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"browse" | "sell" | "investments">("browse")
  const [userType, setUserType] = useState<"farmer" | "buyer">("buyer") // In real app, this would come from user profile

  const mockFutures: HarvestFuture[] = [
    {
      id: "1",
      farmerId: "farmer1",
      farmerName: "Adamu Ibrahim",
      cropType: "Maize",
      cropIcon: "🌽",
      quantity: 500,
      unit: "kg",
      harvestDate: "2024-06-15",
      pricePerUnit: 350,
      totalValue: 175000,
      tokensAvailable: 100,
      tokensSold: 65,
      status: "partially-sold",
      location: "Kano State",
      description: "High-quality yellow maize, drought-resistant variety",
      qualityGrade: "A",
      estimatedYield: "95% confidence",
    },
    {
      id: "2",
      farmerId: "farmer2",
      farmerName: "Fatima Yusuf",
      cropType: "Rice",
      cropIcon: "🌾",
      quantity: 300,
      unit: "kg",
      harvestDate: "2024-07-20",
      pricePerUnit: 450,
      totalValue: 135000,
      tokensAvailable: 75,
      tokensSold: 20,
      status: "available",
      location: "Kebbi State",
      description: "Premium long-grain rice, organic farming methods",
      qualityGrade: "A",
      estimatedYield: "90% confidence",
    },
    {
      id: "3",
      farmerId: "farmer3",
      farmerName: "John Okafor",
      cropType: "Tomatoes",
      cropIcon: "🍅",
      quantity: 200,
      unit: "baskets",
      harvestDate: "2024-05-10",
      pricePerUnit: 800,
      totalValue: 160000,
      tokensAvailable: 80,
      tokensSold: 80,
      status: "sold-out",
      location: "Kaduna State",
      description: "Fresh Roma tomatoes, perfect for processing",
      qualityGrade: "B",
      estimatedYield: "85% confidence",
    },
  ]

  const mockInvestments: Investment[] = [
    {
      id: "inv1",
      futureId: "1",
      cropType: "Maize",
      cropIcon: "🌽",
      farmerName: "Adamu Ibrahim",
      tokensOwned: 10,
      investmentAmount: 17500,
      expectedReturn: 19250,
      harvestDate: "2024-06-15",
      status: "active",
      purchaseDate: "2024-02-15",
    },
    {
      id: "inv2",
      futureId: "2",
      cropType: "Rice",
      cropIcon: "🌾",
      farmerName: "Fatima Yusuf",
      tokensOwned: 5,
      investmentAmount: 9000,
      expectedReturn: 9900,
      harvestDate: "2024-07-20",
      status: "active",
      purchaseDate: "2024-03-01",
    },
  ]

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:text-green-400 hover:bg-green-500/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400">Harvest Futures</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Harvest Futures Marketplace</h1>
          <p className="text-gray-300">Invest in future harvests or sell your upcoming crops</p>
        </div>

        {/* User Type Toggle */}
        <div className="flex gap-2 mb-6 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-1 max-w-md mx-auto">
          <Button
            variant={userType === "buyer" ? "default" : "ghost"}
            className={`flex-1 ${userType === "buyer"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-300 hover:text-white hover:bg-green-500/10"
              }`}
            onClick={() => setUserType("buyer")}
          >
            I'm a Buyer
          </Button>
          <Button
            variant={userType === "farmer" ? "default" : "ghost"}
            className={`flex-1 ${userType === "farmer"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-300 hover:text-white hover:bg-green-500/10"
              }`}
            onClick={() => setUserType("farmer")}
          >
            I'm a Farmer
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-1">
          <Button
            variant={activeTab === "browse" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "browse"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-300 hover:text-white hover:bg-green-500/10"
              }`}
            onClick={() => setActiveTab("browse")}
          >
            {userType === "buyer" ? "Browse Futures" : "Market Overview"}
          </Button>
          <Button
            variant={activeTab === "sell" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "sell"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-300 hover:text-white hover:bg-green-500/10"
              }`}
            onClick={() => setActiveTab("sell")}
          >
            {userType === "buyer" ? "My Investments" : "Sell Harvest"}
          </Button>
          <Button
            variant={activeTab === "investments" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "investments"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-300 hover:text-white hover:bg-green-500/10"
              }`}
            onClick={() => setActiveTab("investments")}
          >
            {userType === "buyer" ? "Portfolio" : "My Listings"}
          </Button>
        </div>

        {/* Content */}
        {activeTab === "browse" && <BrowseFutures futures={mockFutures} userType={userType} language={language} />}

        {activeTab === "sell" && userType === "farmer" && <SellHarvestForm language={language} />}

        {activeTab === "sell" && userType === "buyer" && (
          <InvestmentView investments={mockInvestments} language={language} />
        )}

        {activeTab === "investments" && (
          <PortfolioView investments={mockInvestments} futures={mockFutures} userType={userType} language={language} />
        )}
      </div>
    </div>
  )
}

function BrowseFutures({
  futures,
  userType,
  language,
}: { futures: HarvestFuture[]; userType: string; language: string }) {
  const [selectedFuture, setSelectedFuture] = useState<HarvestFuture | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "partially-sold":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "sold-out":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "harvested":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "delivered":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "B":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "C":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  const handlePurchase = (future: HarvestFuture) => {
    if (!purchaseAmount || Number.parseInt(purchaseAmount) <= 0) {
      alert("Please enter a valid number of tokens to purchase")
      return
    }

    const tokens = Number.parseInt(purchaseAmount)
    const availableTokens = future.tokensAvailable - future.tokensSold

    if (tokens > availableTokens) {
      alert(`Only ${availableTokens} tokens available`)
      return
    }

    const totalCost = tokens * (future.totalValue / future.tokensAvailable)
    alert(`Purchase confirmed! 
${tokens} tokens of ${future.cropType} from ${future.farmerName}
Total cost: ₦${totalCost.toLocaleString()}
Expected harvest: ${future.harvestDate}

Your investment is secured in escrow.`)

    setSelectedFuture(null)
    setPurchaseAmount("")
  }

  if (selectedFuture) {
    const availableTokens = selectedFuture.tokensAvailable - selectedFuture.tokensSold
    const tokenPrice = selectedFuture.totalValue / selectedFuture.tokensAvailable
    const estimatedCost = purchaseAmount ? Number.parseInt(purchaseAmount) * tokenPrice : 0

    return (
      <Card className="bg-black/40 backdrop-blur-sm border border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setSelectedFuture(null)}
              className="p-2 text-white hover:text-green-400 hover:bg-green-500/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-xl text-white">Purchase Tokens</CardTitle>
            <div></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{selectedFuture.cropIcon}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedFuture.cropType}</h3>
                <p className="text-sm text-gray-300">by {selectedFuture.farmerName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Quantity:</span>
                <div className="font-medium text-white">
                  {selectedFuture.quantity} {selectedFuture.unit}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Harvest Date:</span>
                <div className="font-medium text-white">{selectedFuture.harvestDate}</div>
              </div>
              <div>
                <span className="text-gray-400">Price per {selectedFuture.unit}:</span>
                <div className="font-medium text-white">₦{selectedFuture.pricePerUnit}</div>
              </div>
              <div>
                <span className="text-gray-400">Quality Grade:</span>
                <Badge className={getGradeColor(selectedFuture.qualityGrade)}>
                  Grade {selectedFuture.qualityGrade}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-lg font-medium text-white">Number of Tokens to Purchase</Label>
              <Input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder="Enter number of tokens"
                max={availableTokens}
                min="1"
                className="text-lg py-3 mt-2 bg-black/40 border-green-500/20 text-white placeholder:text-gray-400"
              />
              <p className="text-sm text-gray-400 mt-1">
                Available: {availableTokens} tokens (₦{tokenPrice.toLocaleString()} each)
              </p>
            </div>

            {purchaseAmount && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-white">Investment Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Tokens:</span>
                    <span>{purchaseAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Cost per token:</span>
                    <span>₦{tokenPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-green-500/20 pt-2">
                    <span className="text-white">Total Cost:</span>
                    <span className="text-green-400">₦{estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Expected Value:</span>
                    <span>₦{(estimatedCost * 1.1).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => handlePurchase(selectedFuture)}
              disabled={!purchaseAmount || Number.parseInt(purchaseAmount) <= 0}
              className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
            >
              Purchase Tokens
            </Button>

            <VoiceButton
              text={`Purchase ${purchaseAmount || 0} tokens of ${selectedFuture.cropType} from ${selectedFuture.farmerName}. Total cost: ${estimatedCost.toLocaleString()} naira. Harvest expected on ${selectedFuture.harvestDate}.`}
              language={language}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {futures.map((future) => {
        const availableTokens = future.tokensAvailable - future.tokensSold
        const soldPercentage = Math.round((future.tokensSold / future.tokensAvailable) * 100)
        const tokenPrice = future.totalValue / future.tokensAvailable

        return (
          <Card key={future.id} className="bg-black/40 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-colors flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              {/* Card Header - Flexbox for alignment */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{future.cropIcon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{future.cropType}</h3>
                    <p className="text-sm text-gray-300">by {future.farmerName}</p>
                    <p className="text-sm text-gray-400">{future.location}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(future.status)}>
                    {future.status.replace("-", " ").toUpperCase()}
                  </Badge>
                  <div>
                    <Badge className={getGradeColor(future.qualityGrade)}>Grade {future.qualityGrade}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 flex-1">{future.description}</p>

              {/* Details Grid - CSS Grid for responsive info layout */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-400">Quantity:</span>
                  <div className="font-medium text-white">
                    {future.quantity} {future.unit}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Harvest Date:</span>
                  <div className="font-medium flex items-center gap-1 text-white">
                    <Calendar className="w-4 h-4" />
                    {future.harvestDate}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Price per {future.unit}:</span>
                  <div className="font-medium text-green-400">₦{future.pricePerUnit}</div>
                </div>
                <div>
                  <span className="text-gray-400">Estimated Yield:</span>
                  <div className="font-medium text-white">{future.estimatedYield}</div>
                </div>
              </div>

              {/* Progress Section - Flexbox for progress layout */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Tokens Sold: {future.tokensSold}/{future.tokensAvailable}
                  </span>
                  <span className="text-green-400">{soldPercentage}% funded</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Available: {availableTokens} tokens</span>
                  <span className="font-medium text-white">₦{tokenPrice.toLocaleString()} per token</span>
                </div>
              </div>

              {/* Action Buttons - Flexbox for button layout */}
              <div className="space-y-3 mt-auto">
                {userType === "buyer" && future.status === "available" && availableTokens > 0 && (
                  <Button
                    onClick={() => setSelectedFuture(future)}
                    className="w-full bg-green-600 hover:bg-green-700 py-3"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Invest in This Harvest
                  </Button>
                )}

                <VoiceButton
                  text={`${future.cropType} harvest future from ${future.farmerName}. ${future.quantity} ${future.unit} expected on ${future.harvestDate}. ${availableTokens} tokens available at ${tokenPrice.toLocaleString()} naira each. Quality grade ${future.qualityGrade}.`}
                  language={language}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function SellHarvestForm({ language }: { language: string }) {
  const [formData, setFormData] = useState({
    cropType: "",
    quantity: "",
    unit: "kg",
    harvestDate: "",
    pricePerUnit: "",
    description: "",
    qualityGrade: "B",
    location: "",
  })

  const cropTypes = [
    { name: "Maize", icon: "🌽" },
    { name: "Rice", icon: "🌾" },
    { name: "Tomatoes", icon: "🍅" },
    { name: "Yam", icon: "🍠" },
    { name: "Cassava", icon: "🥔" },
    { name: "Beans", icon: "🫘" },
    { name: "Millet", icon: "🌾" },
    { name: "Sorghum", icon: "🌾" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.cropType || !formData.quantity || !formData.harvestDate || !formData.pricePerUnit) {
      alert("Please fill in all required fields")
      return
    }

    const totalValue = Number.parseInt(formData.quantity) * Number.parseInt(formData.pricePerUnit)
    alert(`Harvest future listed successfully!

Crop: ${formData.cropType}
Quantity: ${formData.quantity} ${formData.unit}
Expected harvest: ${formData.harvestDate}
Total value: ₦${totalValue.toLocaleString()}

Your listing will be reviewed and made available to investors.`)

    setFormData({
      cropType: "",
      quantity: "",
      unit: "kg",
      harvestDate: "",
      pricePerUnit: "",
      description: "",
      qualityGrade: "B",
      location: "",
    })
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-green-500/20 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-white text-center">List Your Future Harvest</CardTitle>
        <p className="text-center text-gray-300">Get funding for your crops before harvest</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crop Type Selection - CSS Grid for responsive crop grid */}
          <div>
            <Label className="text-lg font-medium text-white">Crop Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
              {cropTypes.map((crop) => (
                <div
                  key={crop.name}
                  onClick={() => setFormData({ ...formData, cropType: crop.name })}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors text-center ${formData.cropType === crop.name
                      ? "border-green-500 bg-green-500/10"
                      : "border-gray-600 hover:border-green-400 bg-black/20"
                    }`}
                >
                  <div className="text-2xl mb-1">{crop.icon}</div>
                  <div className="text-sm font-medium text-white">{crop.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Fields - CSS Grid for responsive form layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-lg font-medium text-white">Quantity</Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="500"
                className="text-lg py-3 mt-2 bg-black/40 border-green-500/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label className="text-lg font-medium text-white">Unit</Label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full p-3 border-2 border-green-500/20 rounded-lg text-lg mt-2 focus:border-green-500 focus:outline-none bg-black/40 text-white"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="baskets">Baskets</option>
                <option value="bags">Bags</option>
                <option value="tonnes">Tonnes</option>
              </select>
            </div>
            <div>
              <Label className="text-lg font-medium text-white">Expected Harvest Date</Label>
              <Input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="text-lg py-3 mt-2 bg-black/40 border-green-500/20 text-white"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label className="text-lg font-medium text-white">Price per {formData.unit}</Label>
              <Input
                type="number"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                placeholder="350"
                className="text-lg py-3 mt-2 bg-black/40 border-green-500/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-lg font-medium text-white">Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Kano State"
              className="text-lg py-3 mt-2 bg-black/40 border-green-500/20 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Quality Grade - Flexbox for grade selection */}
          <div>
            <Label className="text-lg font-medium text-white">Quality Grade</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["A", "B", "C"].map((grade) => (
                <div
                  key={grade}
                  onClick={() => setFormData({ ...formData, qualityGrade: grade })}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors text-center ${formData.qualityGrade === grade
                      ? "border-green-500 bg-green-500/10"
                      : "border-gray-600 hover:border-green-400 bg-black/20"
                    }`}
                >
                  <div className="font-bold text-lg text-white">Grade {grade}</div>
                  <div className="text-sm text-gray-400">
                    {grade === "A" ? "Premium" : grade === "B" ? "Standard" : "Basic"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-medium text-white">Description</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your crop variety, farming methods, etc."
              rows={3}
              className="w-full p-3 border-2 border-green-500/20 rounded-lg text-lg mt-2 focus:border-green-500 focus:outline-none bg-black/40 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Summary Section */}
          {formData.quantity && formData.pricePerUnit && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-white">Listing Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex justify-between sm:flex-col sm:items-center text-gray-300">
                  <span>Total Quantity:</span>
                  <span className="font-medium text-white">
                    {formData.quantity} {formData.unit}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:items-center text-gray-300">
                  <span>Price per {formData.unit}:</span>
                  <span className="font-medium text-white">₦{formData.pricePerUnit}</span>
                </div>
                <div className="flex justify-between sm:flex-col sm:items-center border-t sm:border-t-0 sm:border-l border-green-500/20 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-white font-semibold">Total Value:</span>
                  <span className="text-green-400 font-bold text-lg">
                    ₦{(Number.parseInt(formData.quantity) * Number.parseInt(formData.pricePerUnit)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Actions - Flexbox for button layout */}
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              List Harvest Future
            </Button>

            <VoiceButton
              text="Fill in your crop details including type, quantity, harvest date, and price. This will create a tokenized future that investors can purchase to fund your farming."
              language={language}
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function InvestmentView({ investments, language }: { investments: Investment[]; language: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "ready":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "delivered":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  if (investments.length === 0) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border border-green-500/20">
        <CardContent className="p-8 text-center">
          <Package className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Investments Yet</h3>
          <p className="text-gray-300">Start investing in harvest futures to see them here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {investments.map((investment) => {
        const roi = ((investment.expectedReturn - investment.investmentAmount) / investment.investmentAmount) * 100

        return (
          <Card key={investment.id} className="bg-black/40 backdrop-blur-sm border border-green-500/20">
            <CardContent className="p-6">
              {/* Investment Header - Flexbox for alignment */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{investment.cropIcon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{investment.cropType}</h3>
                    <p className="text-sm text-gray-300">by {investment.farmerName}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(investment.status)}>{investment.status.toUpperCase()}</Badge>
              </div>

              {/* Investment Details - CSS Grid for responsive layout */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-400">Tokens Owned:</span>
                  <div className="font-medium text-white">{investment.tokensOwned}</div>
                </div>
                <div>
                  <span className="text-gray-400">Investment:</span>
                  <div className="font-medium text-blue-400">₦{investment.investmentAmount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Expected Return:</span>
                  <div className="font-medium text-green-400">₦{investment.expectedReturn.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">ROI:</span>
                  <div className="font-medium text-green-400">+{roi.toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Harvest Date:</span>
                  <div className="font-medium text-white">{investment.harvestDate}</div>
                </div>
                <div>
                  <span className="text-gray-400">Purchase Date:</span>
                  <div className="font-medium text-white">{investment.purchaseDate}</div>
                </div>
              </div>

              {investment.status === "ready" && (
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Harvest Ready for Delivery!</span>
                  </div>
                  <p className="text-sm text-green-300 mt-1">
                    Your investment is ready. Contact the farmer to arrange delivery.
                  </p>
                </div>
              )}

              <VoiceButton
                text={`Investment in ${investment.cropType} from ${investment.farmerName}. ${investment.tokensOwned} tokens worth ${investment.investmentAmount.toLocaleString()} naira. Expected return: ${investment.expectedReturn.toLocaleString()} naira. Status: ${investment.status}.`}
                language={language}
                className="w-full"
              />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function PortfolioView({
  investments,
  futures,
  userType,
  language,
}: { investments: Investment[]; futures: HarvestFuture[]; userType: string; language: string }) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
  const totalExpectedReturn = investments.reduce((sum, inv) => sum + inv.expectedReturn, 0)
  const totalROI = totalInvested > 0 ? ((totalExpectedReturn - totalInvested) / totalInvested) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Portfolio Summary - CSS Grid for responsive metrics */}
      <Card className="bg-black/40 backdrop-blur-sm border border-green-500/20">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">
            {userType === "buyer" ? "Investment Portfolio" : "Listing Performance"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">₦{totalInvested.toLocaleString()}</div>
              <div className="text-sm text-blue-300">{userType === "buyer" ? "Total Invested" : "Total Raised"}</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">₦{totalExpectedReturn.toLocaleString()}</div>
              <div className="text-sm text-green-300">Expected Returns</div>
            </div>
            <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{investments.length}</div>
              <div className="text-sm text-yellow-300">
                {userType === "buyer" ? "Active Investments" : "Active Listings"}
              </div>
            </div>
            <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">+{totalROI.toFixed(1)}%</div>
              <div className="text-sm text-orange-300">Average ROI</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-black/40 backdrop-blur-sm border border-green-500/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {investments.slice(0, 3).map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{investment.cropIcon}</span>
                  <div>
                    <div className="font-medium text-white">{investment.cropType}</div>
                    <div className="text-sm text-gray-400">{investment.farmerName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-400">₦{investment.investmentAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{investment.purchaseDate}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <VoiceButton
        text={`Portfolio summary: Total invested ${totalInvested.toLocaleString()} naira across ${investments.length} investments. Expected returns ${totalExpectedReturn.toLocaleString()} naira with average ROI of ${totalROI.toFixed(1)} percent.`}
        language={language}
        className="w-full"
      />
    </div>
  )
}
