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
import Link from "next/link"

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
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "active":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
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

      {/* Main Container with Responsive Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Container with max width and centering */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Payment Hub</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-3">
              {getTranslation("payments_escrow", selectedLanguage)}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Secure payments and escrow services for your transactions</p>
          </div>

          {/* Balance Card - Enhanced */}
          <div className="max-w-2xl mx-auto mb-10">
            <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                  <DollarSign className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-white">
                  {getTranslation("wallet_balance", selectedLanguage)}
                </h2>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-6">
                  ₦{walletBalance.toLocaleString()}
                </p>
                <VoiceButton
                  text={`${getTranslation("wallet_balance", selectedLanguage)}: ${walletBalance} Naira`}
                  language={selectedLanguage}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs - Responsive */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-2 bg-black/70 rounded-xl p-2 border border-green-500/30 backdrop-blur-sm shadow-2xl">
              <Button
                variant={activeTab === "wallet" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === "wallet"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("wallet")}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {getTranslation("wallet", selectedLanguage)}
              </Button>
              <Button
                variant={activeTab === "escrow" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === "escrow"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("escrow")}
              >
                <Shield className="w-4 h-4 mr-2" />
                {getTranslation("escrow", selectedLanguage)}
              </Button>
              <Button
                variant={activeTab === "pools" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === "pools"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("pools")}
              >
                <Users className="w-4 h-4 mr-2" />
                {getTranslation("pools", selectedLanguage)}
              </Button>
            </div>
          </div>

          {/* Content Area with Responsive Container */}
          <div className="max-w-4xl mx-auto">
            {/* Wallet Tab */}
            {activeTab === "wallet" && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                      {getTranslation("quick_actions", selectedLanguage)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-xl transition-all duration-200 shadow-lg">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        {getTranslation("add_money", selectedLanguage)}
                      </Button>
                      <Button variant="outline" className="w-full py-4 border-gray-600 text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                        <DollarSign className="w-5 h-5 mr-2" />
                        {getTranslation("withdraw", selectedLanguage)}
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        placeholder={getTranslation("enter_amount", selectedLanguage)}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="flex-1 py-4 bg-black/50 border-gray-600 text-white rounded-xl focus:border-green-500 transition-colors"
                      />
                      <Button variant="outline" className="py-4 px-6 border-gray-600 text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                        {getTranslation("send", selectedLanguage)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Clock className="w-6 h-6 text-green-400" />
                      {getTranslation("recent_transactions", selectedLanguage)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {[
                      { type: "credit", desc: "Tomato Sales", amount: 18000, date: "2024-03-01" },
                      { type: "debit", desc: "Transport Payment", amount: -5000, date: "2024-02-28" },
                      { type: "credit", desc: "Cooperative Dividend", amount: 12000, date: "2024-02-25" },
                    ].map((tx, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-black/50 rounded-xl border border-gray-600 hover:border-green-400 transition-colors">
                        <div>
                          <p className="font-semibold text-white text-lg">{tx.desc}</p>
                          <p className="text-sm text-gray-400">{tx.date}</p>
                        </div>
                        <p className={`font-bold text-xl ${
                          tx.type === "credit" ? "text-green-400" : "text-red-400"
                        }`}>
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
              <div className="space-y-8">
                <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-400" />
                      {getTranslation("active_escrows", selectedLanguage)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    {escrowTransactions.map((escrow) => (
                      <div key={escrow.id} className="p-6 bg-black/50 rounded-xl border border-gray-600 hover:border-green-400 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white text-xl mb-1">{escrow.description}</h3>
                            <p className="text-sm text-gray-400">ID: {escrow.id}</p>
                          </div>
                          <Badge className={`${getStatusColor(escrow.status)} border px-3 py-1 rounded-lg`}>
                            {getStatusIcon(escrow.status)}
                            <span className="ml-2">{getTranslation(escrow.status, selectedLanguage)}</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                          <div>
                            <p className="text-gray-400 mb-1">{getTranslation("buyer", selectedLanguage)}:</p>
                            <p className="font-medium text-white">{escrow.buyer}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 mb-1">{getTranslation("seller", selectedLanguage)}:</p>
                            <p className="font-medium text-white">{escrow.seller}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <p className="text-3xl font-bold text-green-400 mb-1">₦{escrow.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">
                              {getTranslation("release_date", selectedLanguage)}: {escrow.releaseDate}
                            </p>
                          </div>
                          {escrow.status === "pending" && (
                            <div className="flex gap-3">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg">
                                <Unlock className="w-4 h-4 mr-2" />
                                {getTranslation("release", selectedLanguage)}
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-4 py-2 rounded-lg">
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
              <div className="space-y-8">
                <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Users className="w-6 h-6 text-green-400" />
                      {getTranslation("cooperative_pools", selectedLanguage)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    {cooperativePools.map((pool) => (
                      <div key={pool.id} className="p-6 bg-black/50 rounded-xl border border-gray-600 hover:border-green-400 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white text-xl mb-1">{pool.title}</h3>
                            <p className="text-sm text-gray-400">
                              {pool.participants} {getTranslation("participants", selectedLanguage)}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(pool.status)} border px-3 py-1 rounded-lg`}>
                            {getStatusIcon(pool.status)}
                            <span className="ml-2">{getTranslation(pool.status, selectedLanguage)}</span>
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-300">{getTranslation("progress", selectedLanguage)}</span>
                            <span className="text-white font-medium">
                              ₦{pool.current.toLocaleString()} / ₦{pool.target.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-4">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-500 shadow-lg shadow-green-500/20"
                              style={{ width: `${(pool.current / pool.target) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-400 mt-3">
                            {getTranslation("deadline", selectedLanguage)}: {pool.deadline}
                          </p>
                        </div>

                        {pool.status === "active" && (
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                              placeholder={getTranslation("contribution_amount", selectedLanguage)}
                              className="flex-1 py-3 bg-black/50 border-gray-600 text-white rounded-xl focus:border-green-500 transition-colors"
                            />
                            <Button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200">
                              {getTranslation("contribute", selectedLanguage)}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-xl transition-all duration-200 shadow-lg">
                  <Users className="w-5 h-5 mr-2" />
                  {getTranslation("create_new_pool", selectedLanguage)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Voice Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
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
