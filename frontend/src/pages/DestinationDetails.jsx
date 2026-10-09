import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { destinations } from '../data/mockTravelData'
import { useTrip } from '../components/useTrip'
import { wayfindApi } from '../services/api'
import { Button, ScoreRing, Tag } from '../components/ui'

export default function DestinationDetails() {
  const { id } = useParams()
  const { setSelectedDestination, selectedDestination, discovery } = useTrip()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const destination = detail || [...(discovery?.destinations || destinations)].find(item => item.id === id || item.id.startsWith(id)) || selectedDestination || destinations[0]

  useEffect(() => {
    let cancelled = false
    wayfindApi.getDestination(id).then(result => {
      if (!cancelled) setDetail(result.destination)
    }).catch(requestError => {
      if (!cancelled) setError(requestError.message)
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [id])

  if (!destination) return <Layout compact><section className="container empty-state"><h1>Destination not found</h1></section></Layout>
  const select = () => { setSelectedDestination(destination); return destination }
  const score = destination.matchScore || destination.score || 80
  const scoreBreakdown = destination.scoreBreakdown || destination.match || {}
  const reasons = destination.whyItFits || destination.reasons || []
  const hotels = destination.hotels || []
  const experiences = destination.experiences || destination.tags || []

  return <Layout compact><section className="destination-detail-page"><div className="detail-hero"><img src={destination.image} alt={`${destination.name} destination`} /><div className="detail-overlay" /><div className="container detail-hero-content"><Link to="/destinations" className="back-link">← Back to matches</Link><div className="detail-title-row"><div><span className="eyebrow light">Your top match</span><h1>{destination.name}</h1><p>{destination.region || destination.country} · {destination.description || 'A destination selected around your travel priorities.'}</p></div><ScoreRing score={score} size={92} /></div><div className="detail-tags">{(destination.tags || []).slice(0, 6).map(tag => <Tag key={tag} tone="light">{tag}</Tag>)}</div></div></div><div className="container detail-body"><div className="detail-main"><section className="detail-section"><div className="section-title-row"><div><span className="eyebrow">Why {destination.name}?</span><h2>It fits your trip in more ways than one.</h2></div><span className="excellent-pill">WayFind match</span></div><p className="detail-lead">{destination.description || 'This destination was selected using your budget, interests, travel convenience and local discovery potential.'}</p><div className="match-score-grid">{Object.entries(scoreBreakdown).map(([key, value]) => <div key={key}><div><span>{key.replace('budget', 'Budget fit').replace('interests', 'Interest match').replace('travel', 'Travel convenience').replace('stay', 'Stay value').replace('experience', 'Local experiences').replace('reviews', 'Reviews & quality')}</span><strong>{value}%</strong></div><div className="score-track"><i style={{ width: `${value}%` }} /></div></div>)}</div><div className="reason-list">{reasons.map(reason => <span key={reason}><i>✓</i>{reason}</span>)}</div>{error && <p className="error-message">{error}</p>}</section><section className="detail-section"><div className="section-title-row"><div><span className="eyebrow">Your estimated spend</span><h2>Budget at a glance</h2></div></div><div className="budget-total"><div><span>Estimated total</span><strong>₹{Number(destination.estimatedCost || destination.cost || 0).toLocaleString('en-IN')}</strong><small>per person</small></div><div className="budget-remaining"><span>Source</span><strong>{destination.dataSource === 'serpapi' ? 'Live search' : 'Development data'}</strong><small>{destination.source || 'WayFind'}</small></div></div><div className="budget-breakdown"><div><span>Transport</span><strong>₹4,800</strong></div><div><span>Stay</span><strong>₹3,600</strong></div><div><span>Food</span><strong>₹2,400</strong></div><div><span>Activities</span><strong>₹2,100</strong></div></div></section><section className="detail-section"><div className="section-title-row"><div><span className="eyebrow">Getting there</span><h2>Easy, practical routes</h2></div></div><div className="travel-option"><span className="travel-icon">✈</span><div><strong>{destination.travelInfo?.label || 'Route search available from the API'}</strong><p>{destination.travelInfo?.description || 'WayFind will compare route options before your trip plan is finalized.'}</p></div><strong>₹{Number(destination.travelInfo?.price || 0).toLocaleString('en-IN')}</strong></div></section><section className="detail-section"><div className="section-title-row"><div><span className="eyebrow">Where to stay</span><h2>Handpicked places to settle in</h2></div></div><div className="hotel-grid">{hotels.length ? hotels.map(hotel => <article className="hotel-card" key={hotel.id || hotel.name}><div className="hotel-image"><img src={hotel.image || destination.image} alt={hotel.name} /><span>★ {hotel.rating}</span></div><div><small>{hotel.type}</small><h3>{hotel.name}</h3><strong>₹{Number(hotel.price || 0).toLocaleString('en-IN')}</strong><span>per night</span><button type="button">View stay</button></div></article>) : <p className="empty-copy">Hotel comparison will appear after selecting this destination.</p>}</div></section><section className="detail-section"><div className="section-title-row"><div><span className="eyebrow">Beyond the obvious</span><h2>Experiences made for your interests</h2></div></div><div className="experience-grid">{experiences.slice(0, 5).map((experience, index) => <article key={experience}><span>0{index + 1}</span><div><h3>{experience}</h3><p>Selected for your interests and travel preferences.</p></div><i>↗</i></article>)}</div></section></div><aside className="detail-aside"><div className="sticky-card"><span className="eyebrow">Ready to explore?</span><h3>Build your personalized itinerary</h3><p>WayFind will turn these recommendations into a flexible day-by-day plan.</p><div className="aside-budget"><span>Estimated total</span><strong>₹{Number(destination.estimatedCost || destination.cost || 0).toLocaleString('en-IN')}</strong><small>per person</small></div><Button to={`/discover/${destination.id}`} onClick={select} className="full-width">Build my itinerary <span>→</span></Button><button type="button" className="button button-outline full-width">Save trip</button><div className="aside-note"><span>✦</span><p>{loading ? 'Loading destination detail…' : 'Recommendations can be adjusted anytime.'}</p></div></div></aside></div></section></Layout>
}
