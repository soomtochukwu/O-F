"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Truck, MapPin, Clock, Users, DollarSign, Navigation, CheckCircle, AlertCircle } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import LocationMapSelector from "@/components/location-map-selector"

interface Booking {
  id: string
  vehicleType: "motorcycle" | "van" | "truck"
  pickup: string
  dropoff: string
  date: string
  time: string
  cost: number
  sharedWith: number
  costPerPerson: number
  status: "pending" | "confirmed" | "en-route" | "delivered" | "cancelled"
  driver: string
  driverPhone: string
  estimatedTime: string
}

interface Vehicle {
  type: "motorcycle" | "van" | "truck"
  name: string
  icon: string
  capacity: string
  baseCost: number
  description: string
}

export default function LogisticsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"book" | "track" | "history">("book")
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    vehicleType: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    shareRide: false,
  })

  const vehicles: Vehicle[] = [
    {
      type: "motorcycle",
      name: "Motorcycle",
      icon: "🏍️",
      capacity: "1-2 people, small items",
      baseCost: 500,
      description: "Fast and affordable for small deliveries",
    },
    {
      type: "van",
      name: "Van",
      icon: "🚐",
      capacity: "5-8 people, medium cargo",
      baseCost: 2000,
      description: "Good for group transport and medium loads",
    },
    {
      type: "truck",
      name: "Truck",
      icon: "🚛",
      capacity: "Large cargo, farm produce",
      baseCost: 5000,
      description: "Best for heavy farm equipment and bulk produce",
    },
  ]

  const mockBookings: Booking[] = [
    {
      id: "1",
      vehicleType: "van",
      pickup: "Kano Central Market",
      dropoff: "Ungogo Farm Cooperative",
      date: "2024-01-15",
      time: "08:00",
      cost: 2000,
      sharedWith: 3,
      costPerPerson: 500,
      status: "en-route",
      driver: "Musa Abdullahi",
      driverPhone: "08012345678",
      estimatedTime: "30 minutes",
    },
    {
      id: "2",
      vehicleType: "motorcycle",
      pickup: "Farm Location",
      dropoff: "Sabon Gari Market",
      date: "2024-01-14",
      time: "14:00",
      cost: 500,
      sharedWith: 1,
      costPerPerson: 500,
      status: "delivered",
      driver: "Ibrahim Yusuf",
      driverPhone: "08087654321",
      estimatedTime: "Completed",
    },
  ]

  const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]

  const handleBookingSubmit = () => {
    if (
      !bookingData.vehicleType ||
      !bookingData.pickup ||
      !bookingData.dropoff ||
      !bookingData.date ||
      !bookingData.time
    ) {
      alert("Please fill in all required fields")
      return
    }

    const selectedVehicle = vehicles.find((v) => v.type === bookingData.vehicleType)
    const estimatedCost = selectedVehicle?.baseCost || 0
    const costPerPerson = bookingData.shareRide ? Math.ceil(estimatedCost / 2) : estimatedCost

    alert(`Booking confirmed! 
Vehicle: ${selectedVehicle?.name}
Route: ${bookingData.pickup} → ${bookingData.dropoff}
Date & Time: ${bookingData.date} at ${bookingData.time}
Cost: ₦${costPerPerson} ${bookingData.shareRide ? "(shared)" : "(solo)"}

A driver will contact you soon.`)

    // Reset form
    setBookingData({
      vehicleType: "",
      pickup: "",
      dropoff: "",
      date: "",
      time: "",
      shareRide: false,
    })
    setBookingStep(1)
    setActiveTab("track")
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
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Transport Hub</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-3">
              Transport & Logistics
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Book rides and track your deliveries with ease</p>
          </div>

          {/* Navigation Tabs - Responsive */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-2 bg-black/70 rounded-xl p-2 border border-green-500/30 backdrop-blur-sm shadow-2xl">
              <Button
                variant={activeTab === "book" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === "book"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                  }`}
                onClick={() => setActiveTab("book")}
              >
                Book Transport
              </Button>
              <Button
                variant={activeTab === "track" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === "track"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                  }`}
                onClick={() => setActiveTab("track")}
              >
                Track Booking
              </Button>
              <Button
                variant={activeTab === "history" ? "default" : "ghost"}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === "history"
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-green-400"
                  }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </Button>
            </div>
          </div>

          {/* Content Area with Responsive Container */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "book" && (
              <BookingForm
                vehicles={vehicles}
                timeSlots={timeSlots}
                bookingStep={bookingStep}
                setBookingStep={setBookingStep}
                bookingData={bookingData}
                setBookingData={setBookingData}
                onSubmit={handleBookingSubmit}
                language={language}
              />
            )}

            {activeTab === "track" && (
              <TrackingView bookings={mockBookings.filter((b) => b.status !== "delivered")} language={language} />
            )}

            {activeTab === "history" && <HistoryView bookings={mockBookings} language={language} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingForm({
  vehicles,
  timeSlots,
  bookingStep,
  setBookingStep,
  bookingData,
  setBookingData,
  onSubmit,
  language,
}: {
  vehicles: Vehicle[]
  timeSlots: string[]
  bookingStep: number
  setBookingStep: (step: number) => void
  bookingData: any
  setBookingData: (data: any) => void
  onSubmit: () => void
  language: string
}) {
  const selectedVehicle = vehicles.find((v) => v.type === bookingData.vehicleType)

  return (
    <div className="space-y-8">
      {/* Progress Steps - Enhanced */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-4 bg-black/50 px-6 py-4 rounded-xl backdrop-blur-sm border border-green-500/20">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step <= bookingStep
                    ? "bg-green-500 text-black shadow-lg scale-110"
                    : "bg-gray-600 text-gray-300"
                  }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-3 rounded-full transition-all duration-300 ${step < bookingStep ? "bg-green-500" : "bg-gray-600"
                  }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Vehicle Selection - Enhanced */}
      {bookingStep === 1 && (
        <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white mb-2">Choose Vehicle Type</CardTitle>
            <p className="text-gray-300 text-lg">Select the best option for your needs</p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <RadioGroup
              value={bookingData.vehicleType}
              onValueChange={(value) => setBookingData({ ...bookingData, vehicleType: value })}
              className="space-y-4"
            >
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.type}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${bookingData.vehicleType === vehicle.type
                      ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                      : "border-gray-600 hover:border-green-400 bg-black/50 hover:bg-black/70"
                    }`}
                  onClick={() => setBookingData({ ...bookingData, vehicleType: vehicle.type })}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value={vehicle.type} id={vehicle.type} className="border-green-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl">{vehicle.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1">{vehicle.name}</h3>
                          <p className="text-gray-400">{vehicle.capacity}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">₦{vehicle.baseCost.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Base price</div>
                        </div>
                      </div>
                      <p className="text-gray-300 ml-16">{vehicle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => setBookingStep(2)}
                disabled={!bookingData.vehicleType}
                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-4 text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Location & Time
              </Button>
            </div>

            <VoiceButton
              text="Choose your vehicle type. Motorcycle for small items and 1-2 people. Van for groups and medium cargo. Truck for heavy farm equipment and bulk produce."
              language={language}
              className="w-full"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 2: Location & Time - Enhanced */}
      {bookingStep === 2 && (
        <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white mb-2">Location & Time</CardTitle>
            <p className="text-gray-300 text-lg">Where and when do you need transport?</p>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="space-y-6">
              <LocationMapSelector
                pickupLocation={bookingData.pickup}
                dropoffLocation={bookingData.dropoff}
                onLocationChange={(pickup, dropoff) => setBookingData({ ...bookingData, pickup, dropoff })}
                language={language}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-medium text-white">Date</Label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="text-lg py-4 bg-black/50 border-gray-600 text-white rounded-xl focus:border-green-500 transition-colors"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-medium text-white">Time</Label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full p-4 border-2 border-gray-600 rounded-xl text-lg focus:border-green-500 focus:outline-none bg-black/50 text-white transition-colors"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => setBookingStep(1)}
                variant="outline"
                className="flex-1 py-4 border-gray-600 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                Back
              </Button>
              <Button
                onClick={() => setBookingStep(3)}
                disabled={!bookingData.pickup || !bookingData.dropoff || !bookingData.date || !bookingData.time}
                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-4 text-lg rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                Next: Review
              </Button>
            </div>

            <VoiceButton
              text="Enter your pickup location, drop-off location, date, and preferred time for transport."
              language={language}
              className="w-full"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Confirm - Enhanced */}
      {bookingStep === 3 && selectedVehicle && (
        <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white mb-2">Review Booking</CardTitle>
            <p className="text-gray-300 text-lg">Confirm your transport details</p>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="bg-green-500/10 p-6 rounded-xl space-y-4 border border-green-500/30">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{selectedVehicle.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedVehicle.name}</h3>
                  <p className="text-gray-400">{selectedVehicle.capacity}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-green-400" />
                    From:
                  </span>
                  <span className="font-medium text-white text-right max-w-xs">{bookingData.pickup}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-red-400" />
                    To:
                  </span>
                  <span className="font-medium text-white text-right max-w-xs">{bookingData.dropoff}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    When:
                  </span>
                  <span className="font-medium text-white">
                    {bookingData.date} at {bookingData.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Sharing Option - Enhanced */}
            <div className="border-2 border-gray-600 rounded-xl p-6 bg-black/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-white">Cost Sharing</h4>
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={bookingData.shareRide}
                    onChange={(e) => setBookingData({ ...bookingData, shareRide: e.target.checked })}
                    className="w-5 h-5 accent-green-500"
                  />
                  <span className="text-gray-300">Share ride with other farmers to reduce cost</span>
                </label>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-300">Base Cost:</span>
                    <span className="font-bold text-white">₦{selectedVehicle.baseCost.toLocaleString()}</span>
                  </div>
                  {bookingData.shareRide && (
                    <div className="flex justify-between mb-3 text-green-400">
                      <span>Shared (estimated):</span>
                      <span className="font-bold">₦{Math.ceil(selectedVehicle.baseCost / 2).toLocaleString()} per person</span>
                    </div>
                  )}
                  <div className="border-t border-gray-600 pt-3 flex justify-between text-xl font-bold">
                    <span className="text-gray-300">Your Cost:</span>
                    <span className="text-green-400">
                      ₦{(bookingData.shareRide ? Math.ceil(selectedVehicle.baseCost / 2) : selectedVehicle.baseCost).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => setBookingStep(2)}
                variant="outline"
                className="flex-1 py-4 border-gray-600 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                Back
              </Button>
              <Button
                onClick={onSubmit}
                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-4 text-lg rounded-xl transition-all duration-200"
              >
                Confirm Booking
              </Button>
            </div>

            <VoiceButton
              text={`Review your booking: ${selectedVehicle.name} from ${bookingData.pickup} to ${bookingData.dropoff} on ${bookingData.date} at ${bookingData.time}. Cost: ${bookingData.shareRide ? Math.ceil(selectedVehicle.baseCost / 2) : selectedVehicle.baseCost} naira ${bookingData.shareRide ? "shared" : "solo"}.`}
              language={language}
              className="w-full"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function TrackingView({ bookings, language }: { bookings: Booking[]; language: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "confirmed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "en-route":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "delivered":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />
      case "confirmed":
        return <CheckCircle className="w-5 h-5" />
      case "en-route":
        return <Navigation className="w-5 h-5" />
      case "delivered":
        return <CheckCircle className="w-5 h-5" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  if (bookings.length === 0) {
    return (
      <Card className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-12 text-center">
          <Truck className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-3">No Active Bookings</h3>
          <p className="text-gray-300 text-lg">You don't have any transport bookings to track right now.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="bg-black/70 border border-green-500/30 backdrop-blur-sm shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {booking.vehicleType === "motorcycle" ? "🏍️" : booking.vehicleType === "van" ? "🚐" : "🚛"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold capitalize text-white">{booking.vehicleType}</h3>
                  <p className="text-gray-400">Booking #{booking.id}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(booking.status)} border px-3 py-1`}>
                <div className="flex items-center gap-2">
                  {getStatusIcon(booking.status)}
                  {booking.status.toUpperCase()}
                </div>
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-400" />
                  From:
                </span>
                <span className="font-medium text-white text-right max-w-xs">{booking.pickup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-red-400" />
                  To:
                </span>
                <span className="font-medium text-white text-right max-w-xs">{booking.dropoff}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Scheduled:
                </span>
                <span className="font-medium text-white">
                  {booking.date} at {booking.time}
                </span>
              </div>
            </div>

            {booking.status === "en-route" && (
              <div className="bg-green-500/10 p-6 rounded-xl mb-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Navigation className="w-6 h-6 text-green-400" />
                  <span className="font-semibold text-green-400 text-lg">Driver En Route</span>
                </div>
                <p className="text-gray-300 mb-2">
                  Driver: {booking.driver} - {booking.driverPhone}
                </p>
                <p className="text-gray-300">Estimated arrival: {booking.estimatedTime}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">
                  {booking.sharedWith > 1 ? `Shared with ${booking.sharedWith - 1} others` : "Solo ride"}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">₦{booking.costPerPerson.toLocaleString()}</div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>

            <VoiceButton
              text={`Booking ${booking.id}: ${booking.vehicleType} from ${booking.pickup} to ${booking.dropoff}. Status: ${booking.status}. ${booking.status === "en-route" ? `Driver ${booking.driver} is on the way, estimated arrival ${booking.estimatedTime}` : ""}`}
              language={language}
              className="w-full mt-4"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function HistoryView({ bookings, language }: { bookings: Booking[]; language: string }) {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="bg-black/70 border border-gray-600 backdrop-blur-sm shadow-2xl hover:shadow-gray-500/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {booking.vehicleType === "motorcycle" ? "🏍️" : booking.vehicleType === "van" ? "🚐" : "🚛"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold capitalize text-white">{booking.vehicleType}</h3>
                  <p className="text-gray-400">
                    {booking.date} at {booking.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400 mb-2">₦{booking.costPerPerson.toLocaleString()}</div>
                <Badge
                  className={`${booking.status === "delivered"
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                    } border px-3 py-1`}
                >
                  {booking.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Route:</span>
                <span className="font-medium text-white text-right max-w-xs">
                  {booking.pickup} → {booking.dropoff}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Driver:</span>
                <span className="font-medium text-white">{booking.driver}</span>
              </div>
              {booking.sharedWith > 1 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Shared with:</span>
                  <span className="font-medium text-white">{booking.sharedWith - 1} others</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
