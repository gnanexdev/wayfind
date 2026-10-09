import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import TravelCard from '../components/TravelCard'
import { destinations } from '../data/mockTravelData'
import { useTrip } from '../components/useTrip'
import { Tag } from '../components/ui'

const sortOptions = ['Best Match', 'Lowest Cost', 'Shortest Travel', 'Highest Rated']

export default function Destinations() {
  const { preferences, setSelectedDestination, discovery } = useTrip()
  const [sort, setSort] = useState('Best Match')
  const liveDestinations = discovery?.destinations || destinations
  const list = useMemo(() => {
    const sorted = [...liveDestinations]
    if (sort === 'Lowest Cost') return sorted.sort((a, b) => a.estimatedCost - b.estimatedCost)
    if (sort === 'Shortest Travel') return sorted.sort((a, b) => Number(a.travelInfo?.duration || 4) - Number(b.travelInfo?.duration || 4))
    if (sort === 'Highest Rated') return sorted.sort((a, b) => b.matchScore - a.matchScore)
    return sorted.sort((a, b) => b.matchScore - a.matchScore)
  }, [liveDestinations, sort])
  return <Layout compact><section className="page-hero destinations-page"><div className="container"><div className="results-heading"><div><span className="eyebrow">Your personalized shortlist</span><h1>We found destinations that fit your trip.</h1><p>Each recommendation is ranked using your budget, interests, travel style and local experiences.</p></div><div className="request-chip"><span>Starting point</span><strong>{preferences.location}</strong></div></div><div className="request-strip"><div><span>Duration</span><strong>{preferences.duration}</strong></div><div><span>Travellers</span><strong>{preferences.travellers}</strong></div><div><span>Budget</span><strong>₹{preferences.budget.toLocaleString('en-IN')}/{preferences.budgetMode === 'person' ? 'person' : 'total'}</strong></div><div><span>Interests</span><div>{preferences.interests.slice(0, 4).map(item => <Tag key={item}>{item}</Tag>)}{preferences.interests.length > 4 && <Tag>+{preferences.interests.length - 4}</Tag>}</div></div></div><div className="results-toolbar"><div><strong>{list.length} destinations</strong><span>{discovery?.dataSource === 'serpapi' ? 'Live SerpApi results and WayFind scores' : 'WayFind development recommendation data'}</span></div><div className="sort-control">Sort by <select value={sort} onChange={event => setSort(event.target.value)}>{sortOptions.map(option => <option key={option}>{option}</option>)}</select></div></div><div className="destination-grid">{list.map(destination => <TravelCard key={destination.id} destination={destination} onSelect={() => setSelectedDestination(destination)} />)}</div><div className="results-note"><span>✦</span><p><strong>Why these matches?</strong> WayFind balances your travel preferences, real travel economics and local experiences—not just popularity.</p></div></div></section></Layout>
}
