import { useContext } from 'react'
import { TripContext } from './TripContext'

export function useTrip() {
  const value = useContext(TripContext)
  if (!value) throw new Error('useTrip must be used within TripProvider')
  return value
}
