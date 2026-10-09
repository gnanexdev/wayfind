import { searchTravelExplore } from '../services/travelExplore.service.js'
import { rankDestinations } from '../services/ranking.service.js'
import { mockDiscovery } from '../services/fallback.service.js'
import { setCache } from '../utils/cache.js'

export async function discoveryController(req, res, next) {
  try {
    const input = {
      origin: String(req.body.origin || '').trim(),
      budget: Number(req.body.budget || 0),
      budgetType: req.body.budgetType || 'per_person',
      duration: Number(req.body.duration || 0),
      travelers: Number(req.body.travelers || 1),
      interests: Array.isArray(req.body.interests) ? req.body.interests.map(item => String(item).toLowerCase()) : [],
      travelStyle: String(req.body.travelStyle || 'balanced').toLowerCase(),
      requirements: String(req.body.requirements || '').trim(),
    }
    if (!input.origin || !input.duration || !input.travelers) {
      return res.status(400).json({ error: 'origin, duration and travelers are required' })
    }
    if (!Number.isFinite(input.budget) || input.budget <= 0) {
      return res.status(400).json({ error: 'budget must be a positive number' })
    }

    let result
    try {
      const search = await searchTravelExplore(input)
      result = { ...search, destinations: rankDestinations(search.destinations, input) }
    } catch (error) {
      const fallback = await mockDiscovery(input)
      result = { ...fallback, error: 'Live SerpApi discovery is temporarily unavailable.', errorCode: 'SERPAPI_UNAVAILABLE' }
    }
    result.destinations.forEach(destination => setCache(`destination:${destination.id}`, destination))
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
