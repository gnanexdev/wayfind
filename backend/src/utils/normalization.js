const categoryAliases = {
  beaches: 'beaches',
  nature: 'nature',
  food: 'food',
  adventure: 'adventure',
  culture: 'culture',
  attractions: 'attractions',
}

export function normalizeDestination(raw, index = 0, preferences = {}) {
  const name = raw.destination || raw.name || raw.city || `Destination ${index + 1}`
  const country = raw.country || raw.location || 'India'
  const coordinates = raw.coordinates || raw.geo || raw.position || {}
  const [, longitude] = (raw.coordinates?.lng || raw.coordinates?.lon || raw.position?.lng || '').toString().split(',') || []

  return {
    id: raw.id || `${slugify(name)}-${index}`,
    name,
    country,
    region: raw.region || country,
    coordinates: {
      lat: Number(coordinates.lat || coordinates.latitude || raw.latitude || 0),
      lng: Number(coordinates.lng || coordinates.longitude || coordinates.lon || raw.longitude || longitude || 0),
    },
    image: raw.image || raw.thumbnail || raw.photo || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    estimatedCost: Number(raw.price || raw.cost || raw.estimated_cost || 0),
    travelInfo: raw.travel_info || raw.travel || {},
    matchScore: Number(raw.matchScore || raw.match_score || Math.max(70, 95 - index * 3)),
    scoreBreakdown: raw.scoreBreakdown || raw.score_breakdown || {
      budget: 80,
      interests: 82,
      travel: 75,
      stay: 78,
      experience: 82,
    },
    whyItFits: raw.whyItFits || raw.why_it_fits || [
      `${name} aligns with your selected travel priorities.`,
      'Explore locally relevant experiences and practical travel options.',
    ],
    tags: raw.tags || (preferences.interests || []).map(value => value.charAt(0).toUpperCase() + value.slice(1)),
    source: raw.source || 'SerpApi',
    dataSource: raw.dataSource || raw.data_source || 'serpapi',
  }
}

export function normalizePlace(raw, destinationId) {
  return {
    id: raw.id || raw.place_id || raw.placeId || `${destinationId}-${Math.random().toString(36).slice(2, 8)}`,
    name: raw.name || raw.title || 'Local place',
    category: raw.category || raw.type || 'attractions',
    rating: Number(raw.rating || raw.review_score || 0),
    reviewCount: Number(raw.review_count || raw.reviews || 0),
    location: raw.location || raw.address || 'Location available on request',
    coordinates: raw.coordinates || raw.geo || { lat: 0, lng: 0 },
    image: raw.image || raw.thumbnail || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    price: raw.price || raw.price_range || null,
    description: raw.description || raw.description_text || 'A locally curated experience worth exploring.',
    source: raw.source || 'SerpApi',
  }
}

export function normalizeHotel(raw) {
  return {
    id: raw.id || raw.hotel_id || raw.title || `hotel-${Math.random().toString(36).slice(2, 8)}`,
    name: raw.name || raw.title || 'Featured stay',
    type: raw.type || raw.hotel_type || 'Hotel',
    price: Number(raw.price || raw.nightly_price || raw.total_price || 0),
    rating: Number(raw.rating || raw.score || 0),
    reviews: Number(raw.reviews || raw.review_count || 0),
    location: raw.location || raw.address || '',
    image: raw.image || raw.thumbnail || '',
    amenities: raw.amenities || [],
    source: raw.source || 'SerpApi',
  }
}

export function normalizeFlight(raw) {
  return {
    id: raw.id || raw.flight_id || `${raw.airline || 'flight'}-${Math.random().toString(36).slice(2, 8)}`,
    airline: raw.airline || raw.airline_name || 'Airline',
    origin: raw.origin || raw.departure || '',
    destination: raw.destination || raw.arrival || '',
    departure: raw.departure_time || raw.departure || '',
    arrival: raw.arrival_time || raw.arrival || '',
    duration: raw.duration || raw.flight_duration || '',
    price: Number(raw.price || raw.total_price || 0),
    stops: raw.stops || 0,
    source: raw.source || 'SerpApi',
  }
}

export function normalizeReviews(raw) {
  return (raw.reviews || raw.results || []).slice(0, 5).map((review, index) => ({
    id: `${review.author || 'review'}-${index}`,
    author: review.author || review.user || 'Traveller',
    rating: Number(review.rating || review.score || 0),
    text: review.text || review.review || '',
    date: review.date || review.published_at || '',
  }))
}

export function normalizeItinerary({ destination, days, travelers, interests, selectedPlaces = [], budget }) {
  const activities = []
  for (let day = 1; day <= Math.max(1, Number(days) || 1); day += 1) {
    const placeSeed = selectedPlaces.length ? selectedPlaces : [
      { name: `${destination} Old Town`, category: 'culture', rating: 4.8, price: 0 },
      { name: `${destination} Food Walk`, category: 'food', rating: 4.7, price: 1200 },
      { name: `${destination} Scenic Trail`, category: 'nature', rating: 4.9, price: 800 },
    ]
    const grouped = placeSeed.slice(0, 3)
    grouped.forEach((place, index) => {
      activities.push({
        id: `${destination}-${day}-${index}`,
        day,
        time: index === 0 ? '09:00' : index === 1 ? '12:30' : '17:00',
        duration: index === 0 ? '3 hrs' : '2 hrs',
        place: place.name,
        category: place.category || categoryAliases[interests[0]] || 'attractions',
        estimatedCost: Number(place.price || 0),
        location: place.location || destination,
        reason: `Selected for your ${interests.join(', ') || 'travel'} interests and practical pacing.`,
      })
    })
  }
  return {
    destination,
    days: Number(days) || 1,
    travelers: Number(travelers) || 1,
    budget: Number(budget) || 0,
    interests: interests || [],
    activities,
    source: 'WayFind Recommendation Engine',
    dataSource: 'serpapi',
  }
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
