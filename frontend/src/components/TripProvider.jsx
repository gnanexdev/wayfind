import { useState } from 'react'
import { initialPreferences } from '../data/mockTravelData'
import { TripContext } from './TripContext'

export function TripProvider({ children }) {
  const [preferences, setPreferences] = useState(initialPreferences)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [savedPlaces, setSavedPlaces] = useState([])
  const [discovery, setDiscovery] = useState(null)
  const [apiStatus, setApiStatus] = useState('idle')

  return (
    <TripContext.Provider value={{
      preferences,
      setPreferences,
      selectedDestination,
      setSelectedDestination,
      savedPlaces,
      setSavedPlaces,
      discovery,
      setDiscovery,
      apiStatus,
      setApiStatus,
    }}>
      {children}
    </TripContext.Provider>
  )
}
