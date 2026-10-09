import { getCache, setCache } from '../utils/cache.js'
import { normalizePlace } from '../utils/normalization.js'
import { serpApiSearch } from './serpapi.service.js'

export async function searchPlaces(destinationId, category = 'attractions') {
  const cacheKey = `places:${destinationId}:${category}`
  const cached = getCache(cacheKey)
  if (cached) return cached

  const result = await serpApiSearch({
    engine: 'google_maps',
    type: 'search',
    q: `${destinationId} ${category} places`,
    num: 8,
  })
  const rawPlaces = result.local_results || result.results || result.data || result.places || []
  const normalized = rawPlaces.slice(0, 8).map(item => normalizePlace(item, destinationId))
  const response = { places: normalized, dataSource: 'serpapi', source: 'Google Maps', category }
  return setCache(cacheKey, response)
}

export async function getPlaceDetails(placeId) {
  const cacheKey = `place:${placeId}`
  const cached = getCache(cacheKey)
  if (cached) return cached
  const result = await serpApiSearch({
    engine: 'google_maps',
    type: 'place',
    q: placeId,
    num: 1,
  })
  const response = {
    place: normalizePlace(result, placeId),
    dataSource: 'serpapi',
    source: 'Google Maps Place',
  }
  return setCache(cacheKey, response)
}

export async function getPlaceReviews(placeId) {
  const cacheKey = `reviews:${placeId}`
  const cached = getCache(cacheKey)
  if (cached) return cached
  const result = await serpApiSearch({
    engine: 'google_maps_reviews',
    q: placeId,
    num: 5,
  })
  const response = {
    reviews: result.reviews || result.results || [],
    dataSource: 'serpapi',
    source: 'Google Maps Reviews',
  }
  return setCache(cacheKey, response)
}
