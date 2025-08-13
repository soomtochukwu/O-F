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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-600" />
          <span className="text-sm text-orange-600">Transport Hub</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-2">Transport & Logistics</h1>
        <p className="text-orange-600">Book rides and track your deliveries</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 border-2 border-orange-200">
        <Button
          variant={activeTab === "book" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "book" ? "bg-orange-600" : ""}`}
          onClick={() => setActiveTab("book")}
        >
          Book Transport
        </Button>
        <Button
          variant={activeTab === "track" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "track" ? "bg-orange-600" : ""}`}
          onClick={() => setActiveTab("track")}
        >
          Track Booking
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "history" ? "bg-orange-600" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </Button>
      </div>

      {/* Content */}
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
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= bookingStep ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-8 h-1 mx-2 ${step < bookingStep ? "bg-orange-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Vehicle Selection */}
      {bookingStep === 1 && (
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-800 text-center">Choose Vehicle Type</CardTitle>
            <p className="text-center text-orange-600">Select the best option for your needs</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={bookingData.vehicleType}
              onValueChange={(value) => setBookingData({ ...bookingData, vehicleType: value })}
            >
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.type}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    bookingData.vehicleType === vehicle.type
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                  onClick={() => setBookingData({ ...bookingData, vehicleType: vehicle.type })}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={vehicle.type} id={vehicle.type} />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{vehicle.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                          <p className="text-sm text-gray-600">{vehicle.capacity}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-xl font-bold text-green-600">₦{vehicle.baseCost}</div>
                          <div className="text-sm text-gray-500">Base price</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{vehicle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3">
              <Button
                onClick={() => setBookingStep(2)}
                disabled={!bookingData.vehicleType}
                className="flex-1 bg-orange-600 hover:bg-orange-700 py-3"
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

      {/* Step 2: Location & Time */}
      {bookingStep === 2 && (
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-800 text-center">Location & Time</CardTitle>
            <p className="text-center text-orange-600">Where and when do you need transport?</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <LocationMapSelector
                pickupLocation={bookingData.pickup}
                dropoffLocation={bookingData.dropoff}
                onLocationChange={(pickup, dropoff) => setBookingData({ ...bookingData, pickup, dropoff })}
                language={language}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-lg font-medium">Date</Label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="text-lg py-3 mt-2"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <Label className="text-lg font-medium">Time</Label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg mt-2 focus:border-orange-500 focus:outline-none"
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

            <div className="flex gap-3">
              <Button onClick={() => setBookingStep(1)} variant="outline" className="flex-1 py-3">
                Back
              </Button>
              <Button
                onClick={() => setBookingStep(3)}
                disabled={!bookingData.pickup || !bookingData.dropoff || !bookingData.date || !bookingData.time}
                className="flex-1 bg-orange-600 hover:bg-orange-700 py-3"
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

      {/* Step 3: Review & Confirm */}
      {bookingStep === 3 && selectedVehicle && (
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-800 text-center">Review Booking</CardTitle>
            <p className="text-center text-orange-600">Confirm your transport details</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedVehicle.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{selectedVehicle.name}</h3>
                  <p className="text-sm text-gray-600">{selectedVehicle.capacity}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    From:
                  </span>
                  <span className="font-medium">{bookingData.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    To:
                  </span>
                  <span className="font-medium">{bookingData.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    When:
                  </span>
                  <span className="font-medium">
                    {bookingData.date} at {bookingData.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Sharing Option */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">Cost Sharing</h4>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.shareRide}
                    onChange={(e) => setBookingData({ ...bookingData, shareRide: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Share ride with other farmers to reduce cost</span>
                </label>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span>Base Cost:</span>
                    <span className="font-bold">₦{selectedVehicle.baseCost}</span>
                  </div>
                  {bookingData.shareRide && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Shared (estimated):</span>
                      <span className="font-bold">₦{Math.ceil(selectedVehicle.baseCost / 2)} per person</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Your Cost:</span>
                    <span className="text-green-600">
                      ₦{bookingData.shareRide ? Math.ceil(selectedVehicle.baseCost / 2) : selectedVehicle.baseCost}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setBookingStep(2)} variant="outline" className="flex-1 py-3">
                Back
              </Button>
              <Button onClick={onSubmit} className="flex-1 bg-orange-600 hover:bg-orange-700 py-3">
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
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "en-route":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      <Card className="border-2 border-orange-200">
        <CardContent className="p-8 text-center">
          <Truck className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-orange-800 mb-2">No Active Bookings</h3>
          <p className="text-orange-600">You don't have any transport bookings to track right now.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {booking.vehicleType === "motorcycle" ? "🏍️" : booking.vehicleType === "van" ? "🚐" : "🚛"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize">{booking.vehicleType}</h3>
                  <p className="text-sm text-gray-600">Booking #{booking.id}</p>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(booking.status)}
                  {booking.status.toUpperCase()}
                </div>
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  From:
                </span>
                <span className="font-medium">{booking.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  To:
                </span>
                <span className="font-medium">{booking.dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Scheduled:
                </span>
                <span className="font-medium">
                  {booking.date} at {booking.time}
                </span>
              </div>
            </div>

            {booking.status === "en-route" && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Driver En Route</span>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Driver: {booking.driver} - {booking.driverPhone}
                </p>
                <p className="text-sm text-green-700">Estimated arrival: {booking.estimatedTime}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm">
                  {booking.sharedWith > 1 ? `Shared with ${booking.sharedWith - 1} others` : "Solo ride"}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">₦{booking.costPerPerson}</div>
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
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {booking.vehicleType === "motorcycle" ? "🏍️" : booking.vehicleType === "van" ? "🚐" : "🚛"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize">{booking.vehicleType}</h3>
                  <p className="text-sm text-gray-600">
                    {booking.date} at {booking.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">₦{booking.costPerPerson}</div>
                <Badge
                  className={booking.status === "delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {booking.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">
                  {booking.pickup} → {booking.dropoff}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Driver:</span>
                <span className="font-medium">{booking.driver}</span>
              </div>
              {booking.sharedWith > 1 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shared with:</span>
                  <span className="font-medium">{booking.sharedWith - 1} others</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
