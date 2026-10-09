const fallbackDestinations = [
  {
    id: 'goa-fallback', name: 'Goa', country: 'India', region: 'West Coast',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    estimatedCost: 12700, travelInfo: { duration: '4 days', label: 'Hyderabad to Goa' },
    matchScore: 91, scoreBreakdown: { budget: 88, interests: 92, travel: 82, stay: 85, experience: 90, reviews: 87 },
    whyItFits: ['Strong beach, food and adventure alignment.', 'Easy coastal travel with varied local experiences.'],
    tags: ['Beaches', 'Nature', 'Food', 'Adventure'], source: 'WayFind development fallback', dataSource: 'mock',
  },
  {
    id: 'gokarna-fallback', name: 'Gokarna', country: 'India', region: 'Karnataka Coast',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85',
    estimatedCost: 12400, travelInfo: { duration: '4 days', label: 'Hyderabad to Gokarna' },
    matchScore: 87, scoreBreakdown: { budget: 90, interests: 88, travel: 81, stay: 84, experience: 89, reviews: 84 },
    whyItFits: ['A quieter match for nature and coastal exploration.', 'Well suited to a four-day slow-travel pace.'],
    tags: ['Nature', 'Photography', 'Culture'], source: 'WayFind development fallback', dataSource: 'mock',
  },
  {
    id: 'visakhapatnam-fallback', name: 'Visakhapatnam', country: 'India', region: 'Andhra Coast',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    estimatedCost: 10700, travelInfo: { duration: '3 days', label: 'Hyderabad to Visakhapatnam' },
    matchScore: 83, scoreBreakdown: { budget: 94, interests: 84, travel: 91, stay: 78, experience: 82, reviews: 81 },
    whyItFits: ['A practical, affordable coastal choice.', 'Strong fit for food, nature and short-break travel.'],
    tags: ['Food', 'Nature', 'Adventure'], source: 'WayFind development fallback', dataSource: 'mock',
  },
  {
    id: 'pondicherry-fallback', name: 'Pondicherry', country: 'India', region: 'East Coast',
    image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=1200&q=85',
    estimatedCost: 11800, travelInfo: { duration: '4 days', label: 'Hyderabad to Pondicherry' },
    matchScore: 79, scoreBreakdown: { budget: 85, interests: 82, travel: 77, stay: 80, experience: 84, reviews: 82 },
    whyItFits: ['A distinctive mix of coast, culture and cuisine.', 'Good fit for a balanced, thoughtfully paced trip.'],
    tags: ['Culture', 'Food', 'Photography'], source: 'WayFind development fallback', dataSource: 'mock',
  },
]

export async function mockDiscovery() {
  return { destinations: fallbackDestinations, dataSource: 'mock', source: 'WayFind development fallback' }
}

export async function mockDestinationDetail(id) {
  const destination = fallbackDestinations.find(item => item.id.startsWith(id)) || fallbackDestinations[0]
  return { ...destination, dataSource: 'mock', source: 'WayFind development fallback' }
}
