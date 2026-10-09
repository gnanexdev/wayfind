import { getCache, setCache } from '../utils/cache.js'
import { normalizeHotel } from '../utils/normalization.js'
import { serpApiSearch } from './serpapi.service.js'

export async function searchHotels(destinationId, dates = {}) {
  const cacheKey = `hotels:${destinationId}:${dates.checkIn || ''}:${dates.checkOut || ''}`
  const cached = getCache(cacheKey)
  if (cached) return cached
  const result = await serpApiSearch({
    engine: 'google_hotels',
    q: `${destinationId} hotels`,
    check_in: dates.checkIn,
    check_out: dates.checkOut,
    num: 8,
  })
  const hotels = (result.results || result.data || result.hotels || []).slice(0, 8).map(item => normalizeHotel(item))
  const response = { hotels, dataSource: 'serpapi', source: 'Google Hotels' }
  return setCache(cacheKey, response)
}
