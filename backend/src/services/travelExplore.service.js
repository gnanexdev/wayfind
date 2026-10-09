import { getCache, setCache } from '../utils/cache.js'
import { serpApiSearch } from './serpapi.service.js'
import { normalizeDestination } from '../utils/normalization.js'

export async function searchTravelExplore(input) {
  const cacheKey = `travel:${input.origin}:${input.duration}:${input.budget}:${input.interests.join(',')}:${input.travelStyle}`
  const cached = getCache(cacheKey)
  if (cached) return cached

  const searchResult = await serpApiSearch({
    engine: 'google_travel_explore',
    q: `${input.origin} destinations for ${input.duration} days`,
    location: input.origin,
    travel_date: input.duration,
    budget: input.budget,
    num: 8,
  })

  const candidates = Array.isArray(searchResult.results)
    ? searchResult.results
    : Array.isArray(searchResult.data)
      ? searchResult.data
      : []
  const normalized = candidates
    .slice(0, 8)
    .map((item, index) => normalizeDestination(item, index, input))

  const result = {
    destinations: normalized,
    dataSource: 'serpapi',
    source: 'Google Travel Explore',
    searchMetadata: { origin: input.origin, duration: input.duration, budget: input.budget },
  }
  return setCache(cacheKey, result)
}
