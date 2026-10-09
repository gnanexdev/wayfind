export const destinations = [
  {
    id: 'goa',
    name: 'Goa',
    region: 'West coast',
    score: 91,
    cost: 12900,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    tags: ['Beaches', 'Food', 'Adventure', 'Photography'],
    reasons: ['Fits your budget', 'Excellent interest match', 'Good travel options', 'Affordable stays'],
    budget: 15000,
    match: { budget: 94, interests: 92, convenience: 86, stays: 89, experiences: 90 },
    description: 'A sun-washed mix of quiet beaches, lively coastal towns and distinctive food that makes every day feel like a new discovery.',
    transport: { label: 'Flight + local transfer', price: 4800 },
    hotels: [
      { name: 'Casa Blue', type: 'Boutique hotel', price: 3600, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
      { name: 'The Palm House', type: 'Design stay', price: 4200, rating: 4.7, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    ],
    places: [
      { name: 'Secret Beach', type: 'Nature', distance: '2.4 km', rating: 4.6, description: 'A quiet crescent of coast, tucked away from the busiest beaches.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
      { name: 'Local Food Spot', type: 'Food', distance: '1.8 km', rating: 4.7, description: 'A neighborhood favorite serving fresh seafood and regional dishes.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
      { name: 'Adventure Activity', type: 'Adventure', distance: '3.2 km', rating: 4.5, description: 'A guided coastal trail with panoramic views and a small group.', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80' },
    ],
    experiences: ['Beach sunset walk', 'Goan cooking class', 'Old Goa heritage trail'],
    itinerary: [
      { day: 1, time: '10:00 AM', title: 'Arrive in Goa', duration: '2 hrs', cost: '₹1,200', location: 'Dabolim Airport', reason: 'A relaxed arrival window leaves your first afternoon open.' },
      { day: 1, time: '12:00 PM', title: 'Hotel check-in', duration: '2 hrs', cost: '₹0', location: 'Panaji', reason: 'Drop your bags and settle into a walkable boutique stay.' },
      { day: 1, time: '04:00 PM', title: 'Baga Beach', duration: '3 hrs', cost: '₹1,300', location: 'Baga', reason: 'A flexible beach stop that matches your nature and photography interests.' },
      { day: 1, time: '07:00 PM', title: 'Sunset', duration: '1 hr', cost: '₹0', location: 'Baga Coast', reason: 'Golden-hour views with an easy, low-planning evening.' },
      { day: 1, time: '08:30 PM', title: 'Local dinner', duration: '2 hrs', cost: '₹900', location: 'Anjuna', reason: 'A curated choice for fresh seafood and local flavors.' },
      { day: 2, time: '09:00 AM', title: 'Old Goa heritage walk', duration: '3 hrs', cost: '₹800', location: 'Old Goa', reason: 'A culture-rich morning with fewer crowds than the main landmarks.' },
      { day: 2, time: '13:00 PM', title: 'Lunch at a local spot', duration: '1.5 hrs', cost: '₹650', location: 'Panaji', reason: 'A food-first stop chosen from your preferred local tastes.' },
      { day: 2, time: '16:00 PM', title: 'Coastal adventure', duration: '3 hrs', cost: '₹1,800', location: 'Cerrijol', reason: 'A balanced adventure option that fits your trip pace.' },
      { day: 3, time: '09:30 AM', title: 'Hidden beach walk', duration: '3 hrs', cost: '₹0', location: 'North Goa', reason: 'A quieter alternative to the well-known beach hubs.' },
      { day: 3, time: '14:00 PM', title: 'Photography session', duration: '2 hrs', cost: '₹1,000', location: 'Palolem Beach', reason: 'A soft-lit route designed around your photography interest.' },
      { day: 4, time: '10:00 AM', title: 'Market & local shopping', duration: '2 hrs', cost: '₹600', location: 'Panaji Market', reason: 'A relaxed way to explore local crafts and regional products.' },
      { day: 4, time: '14:00 PM', title: 'Departure', duration: '2 hrs', cost: '₹800', location: 'Dabolim Airport', reason: 'A flexible final stop built into your planned route.' },
    ],
  },
  {
    id: 'gokarna', name: 'Gokarna', region: 'Karnataka coast', score: 86, cost: 12400, image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85', tags: ['Nature', 'Food', 'Photography'], reasons: ['Excellent value', 'Nature-rich itinerary', 'Calm beaches'], budget: 15000, match: { budget: 92, interests: 88, convenience: 78, stays: 90, experiences: 87 }, description: 'A relaxed coastal escape where forested hills, quiet beaches and easygoing towns create a restorative break.', transport: { label: 'Train + shoreline transfer', price: 3900 }, hotels: [{ name: 'Gokarna House', type: 'Guesthouse', price: 3100, rating: 4.7 }, { name: 'Sea View Stay', type: 'Coastal retreat', price: 3900, rating: 4.8 }], places: [{ name: 'Om Beach', type: 'Nature', distance: '2.1 km', rating: 4.8 }, { name: 'Village Food Walk', type: 'Food', distance: '1.2 km', rating: 4.6 }, { name: 'Beachside Sunrise', type: 'Photography', distance: '3.6 km', rating: 4.7 }], experiences: ['Jungle sunrise walk', 'Coastal food trail', 'Beach photography'], itinerary: [],
  },
  {
    id: 'visakhapatnam', name: 'Visakhapatnam', region: 'Andhra coast', score: 83, cost: 10700, image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85', tags: ['Adventure', 'Nature', 'Food'], reasons: ['Best value', 'Easy transit', 'Diverse experiences'], budget: 15000, match: { budget: 98, interests: 81, convenience: 88, stays: 86, experiences: 82 }, description: 'A vivid coastal city with iconic hills, long beaches and a lively food culture within easy reach.', transport: { label: 'Flight + city drive', price: 3100 }, hotels: [{ name: 'Bayline Hotel', type: 'City hotel', price: 2500, rating: 4.6 }, { name: 'Harbor House', type: 'Boutique stay', price: 2900, rating: 4.7 }], places: [{ name: 'Raghuraj Hills', type: 'Nature', distance: '6.4 km', rating: 4.7 }, { name: 'Bhimili Food Trail', type: 'Food', distance: '2.7 km', rating: 4.5 }, { name: 'Beachfront Run', type: 'Adventure', distance: '4.1 km', rating: 4.6 }], experiences: ['Kailasagiri views', 'Road trip to Araku', 'Seafood tasting'], itinerary: [],
  },
  {
    id: 'pondicherry', name: 'Pondicherry', region: 'East coast', score: 79, cost: 11800, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85', tags: ['Culture', 'Food', 'Photography'], reasons: ['Rich local culture', 'Comfortable stay value', 'Walkable experiences'], budget: 15000, match: { budget: 86, interests: 80, convenience: 84, stays: 88, experiences: 83 }, description: 'French-inspired lanes, garden cafés, oceanfront walks and soulful local stories make every corner feel memorable.', transport: { label: 'Train + local ride', price: 4400 }, hotels: [{ name: 'Maison Saffron', type: 'Boutique hotel', price: 3300, rating: 4.8 }, { name: 'Promenade Rooms', type: 'Design stay', price: 2900, rating: 4.6 }], places: [{ name: 'Promenade Gallery', type: 'Culture', distance: '1.3 km', rating: 4.7 }, { name: 'Auroville Café', type: 'Food', distance: '7.2 km', rating: 4.6 }, { name: 'Beachside Photography', type: 'Photography', distance: '2.8 km', rating: 4.8 }], experiences: ['French quarter walk', 'Auroville culture', 'Sunset at the promenade'], itinerary: [],
  },
]

export const initialPreferences = { location: 'Hyderabad', budget: 15000, budgetMode: 'person', duration: '4 days', travellers: 3, interests: ['Beaches', 'Nature', 'Food', 'Adventure', 'Photography'], travelPreference: 'Balanced', notes: 'Prefer peaceful places and affordable stays.' }

export const journeySteps = [
  { number: 1, title: 'Tell us about your trip', description: 'Share your starting point, budget, pace and interests.', icon: 'spark' },
  { number: 2, title: 'We research destinations', description: 'WayFind compares travel options using your preferences.', icon: 'search' },
  { number: 3, title: 'Compare your best matches', description: 'See why each destination fits, with transparent scoring.', icon: 'compare' },
  { number: 4, title: 'Build your trip', description: 'Explore local experiences and shape your itinerary.', icon: 'route' },
]
