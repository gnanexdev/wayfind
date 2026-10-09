import { getCache, setCache } from '../utils/cache.js'
import { normalizeFlight } from '../utils/normalization.js'
import { serpApiSearch } from './serpapi.service.js'

export async function searchFlights({ origin, destination, date, travelers = 1 }) {
  const cacheKey = `flights:${origin}:${destination}:${date}:${travelers}`
  const cached = getCache(cacheKey)
  if (cached) return cached
  const result = await serpApiSearch({
    engine: 'google_flights',
    q: `${origin} to ${destination}`,
    departure_date: date,
    passengers: travelers,
    num: 8,
  })
  const flights = (result.results || result.data || result.flights || []).slice(0, 8).map(item => normalizeFlight(item))
  const response = { flights, dataSource: 'serpapi', source: 'Google Flights' }
  return setCache(cacheKey, response)
}
