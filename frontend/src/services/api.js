const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(body.error || body.details || 'WayFind could not complete that request.')
  }
  return body
}

export const wayfindApi = {
  discover: payload => request('/discovery', { method: 'POST', body: JSON.stringify(payload) }),
  getDestination: id => request(`/destinations/${encodeURIComponent(id)}`),
  getPlaces: (id, category = 'attractions') => request(`/destinations/${encodeURIComponent(id)}/places?category=${encodeURIComponent(category)}`),
  getHotels: (id, query = {}) => request(`/destinations/${encodeURIComponent(id)}/hotels?${new URLSearchParams(query).toString()}`),
  getFlights: (id, query = {}) => request(`/destinations/${encodeURIComponent(id)}/flights?${new URLSearchParams(query).toString()}`),
  getPlace: placeId => request(`/places/${encodeURIComponent(placeId)}`),
  getReviews: placeId => request(`/places/${encodeURIComponent(placeId)}/reviews`),
  buildItinerary: payload => request('/itinerary', { method: 'POST', body: JSON.stringify(payload) }),
  health: () => request('/health'),
}
