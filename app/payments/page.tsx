"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { AIVoiceAssistant } from "@/components/ai-voice-assistant"
import AnimatedFarmBackground from "@/components/animated-farm-background"
import {
  ArrowLeft,
  Wallet,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  TrendingUp,
  Lock,
  Unlock,
} from "lucide-react"

export default function PaymentsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [activeTab, setActiveTab] = useState("wallet")
  const [amount, setAmount] = useState("")

  // Mock data for demonstration
  const walletBalance = 25000
  const escrowTransactions = [
    {
      id: "ESC001",
      type: "marketplace",
      description: "Tomato Futures - 50kg",
      amount: 15000,
      status: "pending",
      buyer: "Adebayo Farm Co-op",
      seller: "Lagos Farmers Union",
      releaseDate: "2024-03-15",
    },
    {
      id: "ESC002",
      type: "transport",
      description: "Transport to Kano Market",
      amount: 8000,
      status: "completed",
      buyer: "Northern Transport Co-op",
      seller: "Kano Logistics",
      releaseDate: "2024-02-28",
    },
    {
      id: "ESC003",
      type: "cooperative",
      description: "Seed Purchase Pool",
      amount: 12000,
      status: "active",
      buyer: "Ogun State Co-op",
      seller: "Premium Seeds Ltd",
      releaseDate: "2024-04-01",
    },
  ]

  const cooperativePools = [
    {
      id: "POOL001",
      title: "Fertilizer Bulk Purchase",
      target: 100000,
      current: 75000,
      participants: 25,
      deadline: "2024-03-20",
      status: "active",
    },
    {
      id: "POOL002",
      title: "Tractor Sharing Program",
      target: 500000,
      current: 320000,
      participants: 40,
      deadline: "2024-04-15",
      status: "active",
    },
    {
      id: "POOL003",
      title: "Storage Facility Construction",
      target: 2000000,
      current: 2000000,
      participants: 80,
      deadline: "2024-02-15",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "active":
        return <Lock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 relative">
      <AnimatedFarmBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/dashboard")} className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">{getTranslation("payments_escrow", selectedLanguage)}</h1>
          </div>
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
        </div>

        {/* Balance Card */}
        <Card className="mb-8 border-2 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-800">
              {getTranslation("wallet_balance", selectedLanguage)}
            </h2>
            <p className="text-3xl font-bold text-green-700 mb-4">₦{walletBalance.toLocaleString()}</p>
            <VoiceButton
              text={`${getTranslation("wallet_balance", selectedLanguage)}: ${walletBalance} Naira`}
              language={selectedLanguage}
            />
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white rounded-lg p-1 border-2 border-gray-200">
          <Button
            variant={activeTab === "wallet" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setActiveTab("wallet")}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {getTranslation("wallet", selectedLanguage)}
          </Button>
          <Button
            variant={activeTab === "escrow" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setActiveTab("escrow")}
          >
            <Shield className="w-4 h-4 mr-2" />
            {getTranslation("escrow", selectedLanguage)}
          </Button>
          <Button
            variant={activeTab === "pools" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setActiveTab("pools")}
          >
            <Users className="w-4 h-4 mr-2" />
            {getTranslation("pools", selectedLanguage)}
          </Button>
        </div>

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">{getTranslation("quick_actions", selectedLanguage)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full py-3 bg-green-600 hover:bg-green-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {getTranslation("add_money", selectedLanguage)}
                  </Button>
                  <Button variant="outline" className="w-full py-3 bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {getTranslation("withdraw", selectedLanguage)}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={getTranslation("enter_amount", selectedLanguage)}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                  <Button variant="outline">{getTranslation("send", selectedLanguage)}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">
                  {getTranslation("recent_transactions", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "credit", desc: "Tomato Sales", amount: 18000, date: "2024-03-01" },
                  { type: "debit", desc: "Transport Payment", amount: -5000, date: "2024-02-28" },
                  { type: "credit", desc: "Cooperative Dividend", amount: 12000, date: "2024-02-25" },
                ].map((tx, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{tx.desc}</p>
                      <p className="text-sm text-gray-600">{tx.date}</p>
                    </div>
                    <p className={`font-bold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "credit" ? "+" : ""}₦{Math.abs(tx.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Escrow Tab */}
        {activeTab === "escrow" && (
          <div className="space-y-6">
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">{getTranslation("active_escrows", selectedLanguage)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {escrowTransactions.map((escrow) => (
                  <div key={escrow.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{escrow.description}</h3>
                        <p className="text-sm text-gray-600">ID: {escrow.id}</p>
                      </div>
                      <Badge className={getStatusColor(escrow.status)}>
                        {getStatusIcon(escrow.status)}
                        <span className="ml-1">{getTranslation(escrow.status, selectedLanguage)}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600">{getTranslation("buyer", selectedLanguage)}:</p>
                        <p className="font-medium">{escrow.buyer}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">{getTranslation("seller", selectedLanguage)}:</p>
                        <p className="font-medium">{escrow.seller}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">₦{escrow.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {getTranslation("release_date", selectedLanguage)}: {escrow.releaseDate}
                        </p>
                      </div>
                      {escrow.status === "pending" && (
                        <div className="space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Unlock className="w-4 h-4 mr-1" />
                            {getTranslation("release", selectedLanguage)}
                          </Button>
                          <Button size="sm" variant="outline">
                            {getTranslation("dispute", selectedLanguage)}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pools Tab */}
        {activeTab === "pools" && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">
                  {getTranslation("cooperative_pools", selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cooperativePools.map((pool) => (
                  <div key={pool.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{pool.title}</h3>
                        <p className="text-sm text-gray-600">
                          {pool.participants} {getTranslation("participants", selectedLanguage)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(pool.status)}>
                        {getStatusIcon(pool.status)}
                        <span className="ml-1">{getTranslation(pool.status, selectedLanguage)}</span>
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>{getTranslation("progress", selectedLanguage)}</span>
                        <span>
                          ₦{pool.current.toLocaleString()} / ₦{pool.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(pool.current / pool.target) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {getTranslation("deadline", selectedLanguage)}: {pool.deadline}
                      </p>
                    </div>

                    {pool.status === "active" && (
                      <div className="flex gap-2">
                        <Input
                          placeholder={getTranslation("contribution_amount", selectedLanguage)}
                          className="flex-1"
                        />
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          {getTranslation("contribute", selectedLanguage)}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full py-3 bg-purple-600 hover:bg-purple-700">
              <Users className="w-4 h-4 mr-2" />
              {getTranslation("create_new_pool", selectedLanguage)}
            </Button>
          </div>
        )}

        {/* AI Voice Assistant */}
        <AIVoiceAssistant language={selectedLanguage} />
      </div>
    </div>
  )
}

function getTranslation(key: string, language: string): string {
  const translations = {
    en: {
      payments_escrow: "Payments & Escrow",
      wallet_balance: "Wallet Balance",
      wallet: "Wallet",
      escrow: "Escrow",
      pools: "Pools",
      quick_actions: "Quick Actions",
      add_money: "Add Money",
      withdraw: "Withdraw",
      enter_amount: "Enter amount",
      send: "Send",
      recent_transactions: "Recent Transactions",
      active_escrows: "Active Escrows",
      buyer: "Buyer",
      seller: "Seller",
      release_date: "Release Date",
      release: "Release",
      dispute: "Dispute",
      cooperative_pools: "Cooperative Pools",
      participants: "participants",
      progress: "Progress",
      deadline: "Deadline",
      contribution_amount: "Contribution amount",
      contribute: "Contribute",
      create_new_pool: "Create New Pool",
      pending: "Pending",
      active: "Active",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    yo: {
      payments_escrow: "Awọn Sisanwo ati Escrow",
      wallet_balance: "Iwọn Apamọwọ",
      wallet: "Apamọwọ",
      escrow: "Escrow",
      pools: "Awọn Pool",
      quick_actions: "Awọn Iṣe Kiakia",
      add_money: "Fi Owo Kun",
      withdraw: "Yọ Kuro",
      enter_amount: "Tẹ iye sii",
      send: "Fi ranṣẹ",
      recent_transactions: "Awọn Iṣowo Aipẹ",
      active_escrows: "Awọn Escrow Ti Nṣiṣẹ",
      buyer: "Onra",
      seller: "Oluta",
      release_date: "Ọjọ Itusilẹ",
      release: "Tu silẹ",
      dispute: "Ariyanjiyan",
      cooperative_pools: "Awọn Pool Ajọṣepọ",
      participants: "awọn olukopa",
      progress: "Ilọsiwaju",
      deadline: "Ọjọ Ipari",
      contribution_amount: "Iye idasi",
      contribute: "Ṣe idasi",
      create_new_pool: "Ṣẹda Pool Tuntun",
      pending: "Ti Nduro",
      active: "Ti Nṣiṣẹ",
      completed: "Ti Pari",
      cancelled: "Ti Fagilee",
    },
    ha: {
      payments_escrow: "Biyan Kuɗi da Escrow",
      wallet_balance: "Ma'aunin Wallet",
      wallet: "Wallet",
      escrow: "Escrow",
      pools: "Pools",
      quick_actions: "Ayyuka Masu Sauri",
      add_money: "Ƙara Kuɗi",
      withdraw: "Cire",
      enter_amount: "Shigar da adadi",
      send: "Aika",
      recent_transactions: "Mu'amalar Kwanan Nan",
      active_escrows: "Escrows Masu Aiki",
      buyer: "Mai Saye",
      seller: "Mai Sayarwa",
      release_date: "Ranar Saki",
      release: "Saki",
      dispute: "Rigima",
      cooperative_pools: "Pools na Haɗin Kai",
      participants: "mahalarta",
      progress: "Ci Gaba",
      deadline: "Ranar Ƙarshe",
      contribution_amount: "Adadin gudummawa",
      contribute: "Ba da Gudummawa",
      create_new_pool: "Ƙirƙiri Sabon Pool",
      pending: "Ana Jira",
      active: "Mai Aiki",
      completed: "An Gama",
      cancelled: "An Soke",
    },
    ig: {
      payments_escrow: "Ịkwụ Ụgwọ na Escrow",
      wallet_balance: "Ego Wallet",
      wallet: "Wallet",
      escrow: "Escrow",
      pools: "Pools",
      quick_actions: "Omume Ngwa Ngwa",
      add_money: "Tinye Ego",
      withdraw: "Wepụ",
      enter_amount: "Tinye ego ole",
      send: "Ziga",
      recent_transactions: "Azụmaahịa Na-adịbeghị Anya",
      active_escrows: "Escrows Na-arụ Ọrụ",
      buyer: "Onye Zụrụ",
      seller: "Onye Na-ere",
      release_date: "Ụbọchị Mwepụ",
      release: "Wepụ",
      dispute: "Esemokwu",
      cooperative_pools: "Pools Nkwekọrịta",
      participants: "ndị sonyere",
      progress: "Ọganihu",
      deadline: "Ụbọchị Ikpeazụ",
      contribution_amount: "Ego itinye",
      contribute: "Tinye",
      create_new_pool: "Mepụta Pool Ọhụrụ",
      pending: "Na-echere",
      active: "Na-arụ Ọrụ",
      completed: "Emechara",
      cancelled: "Kagburu",
    },
  }

  return (
    translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
    translations.en[key as keyof typeof translations.en]
  )
}
