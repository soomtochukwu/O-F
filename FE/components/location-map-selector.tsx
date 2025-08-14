"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Target, Map } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"

interface Location {
  id: string
  name: string
  type: "market" | "farm" | "cooperative" | "current" | "custom"
  coordinates: { lat: number; lng: number }
  icon: string
}

interface LocationMapSelectorProps {
  pickupLocation: string
  dropoffLocation: string
  onLocationChange: (pickup: string, dropoff: string) => void
  language: string
}

export default function LocationMapSelector({
  pickupLocation,
  dropoffLocation,
  onLocationChange,
  language,
}: LocationMapSelectorProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [selectingFor, setSelectingFor] = useState<"pickup" | "dropoff" | null>(null)
  const [mapView, setMapView] = useState<"list" | "map">("list")

  // Common locations in Nigeria
  const commonLocations: Location[] = [
    {
      id: "kano-central",
      name: "Kano Central Market",
      type: "market",
      coordinates: { lat: 12.0022, lng: 8.592 },
      icon: "🏪",
    },
    {
      id: "sabon-gari",
      name: "Sabon Gari Market",
      type: "market",
      coordinates: { lat: 12.01, lng: 8.58 },
      icon: "🏪",
    },
    {
      id: "ungogo-farm",
      name: "Ungogo Farm Cooperative",
      type: "cooperative",
      coordinates: { lat: 12.05, lng: 8.5 },
      icon: "🌾",
    },
    {
      id: "dawanau-market",
      name: "Dawanau International Market",
      type: "market",
      coordinates: { lat: 11.95, lng: 8.48 },
      icon: "🏪",
    },
    {
      id: "kaduna-farm",
      name: "Kaduna Agricultural Zone",
      type: "farm",
      coordinates: { lat: 10.52, lng: 7.44 },
      icon: "🚜",
    },
    {
      id: "zaria-coop",
      name: "Zaria Farmers Cooperative",
      type: "cooperative",
      coordinates: { lat: 11.11, lng: 7.72 },
      icon: "🌾",
    },
  ]

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            id: "current",
            name: "My Current Location",
            type: "current",
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            icon: "📍",
          }
          setCurrentLocation(location)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Fallback to simulated current location
          const location: Location = {
            id: "current",
            name: "My Current Location",
            type: "current",
            coordinates: { lat: 12.0, lng: 8.5 },
            icon: "📍",
          }
          setCurrentLocation(location)
        },
      )
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const handleLocationSelect = (location: Location) => {
    if (selectingFor === "pickup") {
      onLocationChange(location.name, dropoffLocation)
      setSelectingFor("dropoff")
    } else if (selectingFor === "dropoff") {
      onLocationChange(pickupLocation, location.name)
      setSelectingFor(null)
    }
  }

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case "market":
        return "bg-blue-100 text-blue-800"
      case "farm":
        return "bg-green-100 text-green-800"
      case "cooperative":
        return "bg-purple-100 text-purple-800"
      case "current":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const allLocations = currentLocation ? [currentLocation, ...commonLocations] : commonLocations

  return (
    <div className="space-y-4">
      {/* Location Selection Status */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={`border-2 ${pickupLocation ? "border-green-500 bg-green-50" : "border-gray-300"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-medium">Pickup Location</span>
            </div>
            {pickupLocation ? (
              <p className="text-sm font-semibold text-green-800">{pickupLocation}</p>
            ) : (
              <p className="text-sm text-gray-500">Tap to select pickup point</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 bg-transparent"
              onClick={() => setSelectingFor("pickup")}
            >
              {pickupLocation ? "Change" : "Select"} Pickup
            </Button>
          </CardContent>
        </Card>

        <Card className={`border-2 ${dropoffLocation ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="font-medium">Drop-off Location</span>
            </div>
            {dropoffLocation ? (
              <p className="text-sm font-semibold text-red-800">{dropoffLocation}</p>
            ) : (
              <p className="text-sm text-gray-500">Tap to select destination</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 bg-transparent"
              onClick={() => setSelectingFor("dropoff")}
            >
              {dropoffLocation ? "Change" : "Select"} Destination
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Selection Mode Indicator */}
      {selectingFor && (
        <div
          className={`p-3 rounded-lg border-2 ${
            selectingFor === "pickup" ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span className="font-medium">
              Select your {selectingFor === "pickup" ? "pickup" : "drop-off"} location from the list below
            </span>
          </div>
        </div>
      )}

      {/* Map View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mapView === "list" ? "default" : "outline"}
          onClick={() => setMapView("list")}
          className="flex-1"
        >
          📋 List View
        </Button>
        <Button
          variant={mapView === "map" ? "default" : "outline"}
          onClick={() => setMapView("map")}
          className="flex-1"
        >
          🗺️ Map View
        </Button>
      </div>

      {/* Location Selection Interface */}
      {mapView === "list" ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {allLocations.map((location) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectingFor ? "border-2 border-orange-300 hover:border-orange-500" : "border-gray-200"
              }`}
              onClick={() => selectingFor && handleLocationSelect(location)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <Badge className={getLocationTypeColor(location.type)} variant="secondary">
                        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  {selectingFor && (
                    <Button size="sm" variant="outline">
                      Select
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <div className="text-center space-y-4">
            <Map className="w-16 h-16 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold text-green-800">Interactive Map</h3>
            <p className="text-green-700">Tap on locations in the map to select your pickup and drop-off points</p>

            {/* Simulated Map Grid */}
            <div className="grid grid-cols-3 gap-2 bg-green-100 p-4 rounded-lg">
              {allLocations.slice(0, 9).map((location, index) => (
                <div
                  key={location.id}
                  className={`p-3 bg-white rounded-lg cursor-pointer hover:bg-orange-50 border-2 ${
                    selectingFor ? "border-orange-300" : "border-gray-200"
                  }`}
                  onClick={() => selectingFor && handleLocationSelect(location)}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">{location.icon}</div>
                    <div className="text-xs font-medium truncate">{location.name.split(" ")[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Location Button */}
      {currentLocation && (
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-transparent"
          onClick={() => selectingFor && handleLocationSelect(currentLocation)}
          disabled={!selectingFor}
        >
          <Navigation className="w-4 h-4" />
          Use My Current Location
        </Button>
      )}

      <VoiceButton
        text={`${selectingFor ? `Select your ${selectingFor} location from the available options. You can choose from markets, farms, cooperatives, or use your current location.` : "Choose pickup and drop-off locations using the map interface."}`}
        language={language}
        className="w-full"
      />
    </div>
  )
}
