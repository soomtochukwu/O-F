"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import AnimatedFarmBackground from "@/components/animated-farm-background"

interface Proposal {
  id: string
  title: string
  description: string
  amount: number
  category: "equipment" | "supplies" | "infrastructure" | "emergency"
  status: "active" | "passed" | "rejected" | "expired"
  votesFor: number
  votesAgainst: number
  totalMembers: number
  timeLeft: string
  proposedBy: string
  icon: string
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-300 border border-green-500/30"
    case "passed":
      return "bg-green-600/20 text-green-200 border border-green-600/30"
    case "rejected":
      return "bg-red-500/20 text-red-300 border border-red-500/30"
    case "expired":
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
    default:
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "equipment":
      return "bg-orange-500/20 text-orange-300 border border-orange-500/30"
    case "supplies":
      return "bg-green-500/20 text-green-300 border border-green-500/30"
    case "infrastructure":
      return "bg-purple-500/20 text-purple-300 border border-purple-500/30"
    case "emergency":
      return "bg-red-500/20 text-red-300 border border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
  }
}

export default function CooperativePage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"proposals" | "create" | "history">("proposals")

  const mockProposals: Proposal[] = [
    {
      id: "1",
      title: "Buy Fertilizer for Dry Season",
      description:
        "Purchase 50 bags of NPK fertilizer for all cooperative members to use during the dry season planting.",
      amount: 50000,
      category: "supplies",
      status: "active",
      votesFor: 12,
      votesAgainst: 3,
      totalMembers: 25,
      timeLeft: "2 days",
      proposedBy: "Adamu Ibrahim",
      icon: "🌱",
    },
    {
      id: "2",
      title: "Hire Tractor for Land Preparation",
      description: "Rent a tractor for 5 days to help prepare farmland for the upcoming planting season.",
      amount: 30000,
      category: "equipment",
      status: "active",
      votesFor: 8,
      votesAgainst: 7,
      totalMembers: 25,
      timeLeft: "5 days",
      proposedBy: "Fatima Yusuf",
      icon: "🚜",
    },
    {
      id: "3",
      title: "Build Storage Facility",
      description: "Construct a small warehouse to store harvested crops and protect them from rain and pests.",
      amount: 150000,
      category: "infrastructure",
      status: "active",
      votesFor: 18,
      votesAgainst: 2,
      totalMembers: 25,
      timeLeft: "1 week",
      proposedBy: "John Okafor",
      icon: "🏗️",
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:text-green-400 hover:bg-green-500/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-300">25 Members</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cooperative Proposals</h1>
          <p className="text-green-300">Vote on proposals to improve our farming community</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 bg-black/40 backdrop-blur-sm rounded-lg p-1 border border-green-500/30">
          <Button
            variant={activeTab === "proposals" ? "default" : "ghost"}
            className={`flex-1 transition-all duration-200 ${activeTab === "proposals"
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              : "text-green-300 hover:text-white hover:bg-green-500/20"
              }`}
            onClick={() => setActiveTab("proposals")}
          >
            Active Proposals
          </Button>
          <Button
            variant={activeTab === "create" ? "default" : "ghost"}
            className={`flex-1 transition-all duration-200 ${activeTab === "create"
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              : "text-green-300 hover:text-white hover:bg-green-500/20"
              }`}
            onClick={() => setActiveTab("create")}
          >
            Create New
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            className={`flex-1 transition-all duration-200 ${activeTab === "history"
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              : "text-green-300 hover:text-white hover:bg-green-500/20"
              }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </Button>
        </div>

        {/* Content */}
        {activeTab === "proposals" && (
          <div className="space-y-4">
            {mockProposals
              .filter((p) => p.status === "active")
              .map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}

            {mockProposals.filter((p) => p.status === "active").length === 0 && (
              <Card className="bg-black/40 backdrop-blur-sm border border-green-500/30 shadow-xl">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Active Proposals</h3>
                  <p className="text-green-300 mb-4">There are currently no proposals to vote on.</p>
                  <Button onClick={() => setActiveTab("create")} className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Proposal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "create" && <CreateProposalForm />}

        {activeTab === "history" && (
          <div className="space-y-4">
            {mockProposals
              .filter((p) => p.status !== "active")
              .map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} showHistory />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProposalCard({ proposal, showHistory = false }: { proposal: Proposal; showHistory?: boolean }) {
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null)
  const { language } = useLanguage()

  const handleVote = (vote: "for" | "against") => {
    setUserVote(vote)
    setHasVoted(true)
    // In a real app, this would send the vote to the backend
    alert(`Vote recorded: ${vote.toUpperCase()}`)
  }

  const votePercentage = proposal.totalMembers > 0 ? Math.round((proposal.votesFor / proposal.totalMembers) * 100) : 0

  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50 transition-all duration-200 shadow-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{proposal.icon}</div>
            <div>
              <CardTitle className="text-lg text-white">{proposal.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(proposal.status)}>{proposal.status.toUpperCase()}</Badge>
                <Badge className={getCategoryColor(proposal.category)}>{proposal.category.toUpperCase()}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">₦{proposal.amount.toLocaleString()}</div>
            {!showHistory && (
              <div className="flex items-center gap-1 text-sm text-green-300">
                <Clock className="w-4 h-4" />
                {proposal.timeLeft} left
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">{proposal.description}</p>

        <div className="text-sm text-green-300">
          <strong>Proposed by:</strong> {proposal.proposedBy}
        </div>

        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300">YES: {proposal.votesFor}</span>
            </span>
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300">NO: {proposal.votesAgainst}</span>
            </span>
            <span className="text-gray-300">
              {proposal.votesFor + proposal.votesAgainst}/{proposal.totalMembers} voted
            </span>
          </div>

          <div className="w-full bg-gray-700/50 rounded-full h-3 border border-gray-600/30">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${votePercentage}%` }}
            />
          </div>

          <div className="text-center text-sm font-medium text-gray-300">
            {votePercentage}% Support ({proposal.votesFor} YES votes needed to pass)
          </div>
        </div>

        {/* Voting Buttons */}
        {!showHistory && proposal.status === "active" && (
          <div className="space-y-3">
            {!hasVoted ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleVote("for")}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 text-lg shadow-lg transition-all duration-200"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  YES
                </Button>
                <Button
                  onClick={() => handleVote("against")}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg shadow-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  NO
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30">
                <div className="text-lg font-semibold text-green-300 mb-2">✓ You voted: {userVote?.toUpperCase()}</div>
                <p className="text-sm text-green-400">Thank you for participating in the decision!</p>
              </div>
            )}

            <VoiceButton
              text={`Proposal: ${proposal.title}. ${proposal.description}. Amount needed: ${proposal.amount} naira. Current votes: ${proposal.votesFor} yes, ${proposal.votesAgainst} no. Time left: ${proposal.timeLeft}.`}
              language={language}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CreateProposalForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
  })
  const { language } = useLanguage()

  const categories = [
    { id: "supplies", label: "Farm Supplies", icon: "🌱", description: "Seeds, fertilizer, pesticides" },
    { id: "equipment", label: "Equipment", icon: "🚜", description: "Tractors, tools, machinery" },
    { id: "infrastructure", label: "Infrastructure", icon: "🏗️", description: "Storage, roads, facilities" },
    { id: "emergency", label: "Emergency", icon: "🚨", description: "Urgent needs, disasters" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.amount || !formData.category) {
      alert("Please fill in all fields")
      return
    }

    alert("Proposal submitted successfully! It will be reviewed and then opened for voting.")
    setFormData({ title: "", description: "", amount: "", category: "" })
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-green-500/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white text-center">Create New Proposal</CardTitle>
        <p className="text-center text-green-300">Submit a proposal for the cooperative to vote on</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-green-300 mb-2">Proposal Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Buy fertilizer for dry season"
              className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-green-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain what you need and why it will help the cooperative..."
              rows={4}
              className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-green-300 mb-2">Amount Needed (₦)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="50000"
              className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-green-300 mb-3">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${formData.category === category.id
                    ? "border-green-500 bg-green-500/20 shadow-lg"
                    : "border-green-500/30 bg-black/20 hover:border-green-400/50 hover:bg-green-500/10"
                    }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium text-white">{category.label}</div>
                    <div className="text-sm text-green-300">{category.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg shadow-lg transition-all duration-200">
              <Plus className="w-5 h-5 mr-2" />
              Submit Proposal
            </Button>

            <VoiceButton
              text="Fill in the proposal title, description, amount needed, and select a category. Then submit your proposal for the cooperative to vote on."
              language={language}
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
