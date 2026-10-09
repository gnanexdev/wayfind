import { getCache, setCache } from '../utils/cache.js'
import { normalizeItinerary } from '../utils/normalization.js'

export async function buildItinerary(input) {
  const cacheKey = `itinerary:${input.destination}:${input.days}:${input.travelers}:${input.interests.join(',')}:${input.selectedPlaces.length}`
  const cached = getCache(cacheKey)
  if (cached) return cached
  const itinerary = normalizeItinerary(input)
  const response = {
    itinerary,
    dataSource: input.selectedPlaces.length ? 'serpapi' : 'wayfind',
    source: 'WayFind Recommendation Engine',
  }
  return setCache(cacheKey, response)
}
