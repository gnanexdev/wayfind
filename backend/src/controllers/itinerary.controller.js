import { buildItinerary } from '../services/itinerary.service.js'

export async function itineraryController(req, res, next) {
  try {
    const input = {
      destination: String(req.body.destination || '').trim(),
      days: Number(req.body.days || 4),
      travelers: Number(req.body.travelers || 1),
      interests: Array.isArray(req.body.interests) ? req.body.interests : [],
      selectedPlaces: Array.isArray(req.body.selectedPlaces) ? req.body.selectedPlaces : [],
      budget: Number(req.body.budget || 0),
    }
    if (!input.destination) return res.status(400).json({ error: 'destination is required' })
    const result = await buildItinerary(input)
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
