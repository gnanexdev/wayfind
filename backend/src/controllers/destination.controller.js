import { searchPlaces } from '../services/maps.service.js'
import { searchHotels } from '../services/hotels.service.js'
import { searchFlights } from '../services/flights.service.js'
import { mockDestinationDetail } from '../services/fallback.service.js'
import { getCache } from '../utils/cache.js'

const fallbackResult = (items, key, source) => ({ [key]: items, dataSource: 'mock', source })

export async function destinationController(req, res, next) {
  try {
    const id = req.params.id
    const destination = getCache(`destination:${id}`) || await mockDestinationDetail(id)
    return res.json({ destination, dataSource: destination.dataSource || 'mock', source: destination.source || 'WayFind fallback' })
  } catch (error) {
    next(error)
  }
}

export async function placesController(req, res, next) {
  try {
    const category = req.query.category || 'attractions'
    const result = await searchPlaces(req.params.id, category)
    return res.json(result)
  } catch (error) {
    return res.json(fallbackResult([
      { id: `${req.params.id}-food`, name: 'Local food guide', category: 'food', rating: 4.7, reviewCount: 180, location: 'Curated by WayFind', image: '', price: '₹150–₹800', description: 'A locally curated food experience.' },
      { id: `${req.params.id}-nature`, name: 'Coastal nature route', category: 'nature', rating: 4.8, reviewCount: 240, location: 'Curated by WayFind', image: '', price: '₹0–₹600', description: 'A scenic nature experience selected for your trip.' },
    ], 'places', 'WayFind development fallback'))
  }
}

export async function hotelsController(req, res, next) {
  try {
    const result = await searchHotels(req.params.id, req.query)
    return res.json(result)
  } catch (error) {
    return res.json(fallbackResult([
      { id: `${req.params.id}-hotel-1`, name: 'Boutique stay', type: 'Boutique', price: 3600, rating: 4.8, reviews: 120, location: 'Curated by WayFind', image: '', amenities: ['Breakfast', 'Wi-Fi'] },
      { id: `${req.params.id}-hotel-2`, name: 'Design stay', type: 'Design', price: 4200, rating: 4.7, reviews: 96, location: 'Curated by WayFind', image: '', amenities: ['Pool', 'Restaurant'] },
    ], 'hotels', 'WayFind development fallback'))
  }
}

export async function flightsController(req, res, next) {
  try {
    const result = await searchFlights({
      origin: req.query.origin || 'Hyderabad',
      destination: req.params.id,
      date: req.query.date || '',
      travelers: Number(req.query.travelers || 1),
    })
    return res.json(result)
  } catch (error) {
    return res.json(fallbackResult([
      { id: `${req.params.id}-flight-1`, airline: 'WayFind route', origin: req.query.origin || 'Hyderabad', destination: req.params.id, departure: '09:00', arrival: '14:00', duration: '5h', price: 5800, stops: 0 },
    ], 'flights', 'WayFind development fallback'))
  }
}
