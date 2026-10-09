import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { destinations } from '../data/mockTravelData'
import { useTrip } from '../components/useTrip'
import { wayfindApi } from '../services/api'
import { Button, Tag } from '../components/ui'

export default function Itinerary() {
  const { id } = useParams()
  const { preferences, selectedDestination, setSelectedDestination } = useTrip()
  const [activities, setActivities] = useState([])
  const [activeDay, setActiveDay] = useState(1)
  const [mode, setMode] = useState('Balanced')
  const [completedRequestKey, setCompletedRequestKey] = useState(null)
  const destination = selectedDestination || destinations.find(item => item.id === id || item.id.startsWith(id)) || destinations[0]
  const requestKey = JSON.stringify([destination.id, destination.name, preferences.duration, preferences.travellers, preferences.interests, preferences.budget])
  const loading = completedRequestKey !== requestKey
  const dayItems = activities.filter(item => item.day === activeDay)

  useEffect(() => {
    let cancelled = false
    wayfindApi.buildItinerary({
      destination: destination.name,
      days: Number.parseInt(preferences.duration, 10) || 4,
      travelers: preferences.travellers,
      interests: preferences.interests.map(item => item.toLowerCase()),
      selectedPlaces: [],
      budget: preferences.budget,
    }).then(result => {
      if (!cancelled) {
        setActivities(result.itinerary.activities || [])
        setSelectedDestination(destination)
      }
    }).catch(() => {
      if (!cancelled) setActivities(destination.itinerary || [])
    }).finally(() => {
      if (!cancelled) setCompletedRequestKey(requestKey)
    })
    return () => { cancelled = true }
  }, [destination, preferences, requestKey, setSelectedDestination])

  const regenerateDay = () => {
    if (!activities.length) return
    setActivities(items => items.map(item => item.day === activeDay ? { ...item, reason: `Regenerated for your ${mode.toLowerCase()} pace and selected interests.` } : item))
  }

  return (
    <Layout compact>
      <section className="itinerary-page">
        <div className="container">
          <div className="itinerary-heading"><div><span className="eyebrow">WayFind Recommendation Engine</span><h1>Your {preferences.duration} {destination.name} trip</h1><p>A flexible plan shaped around your interests, budget and desired pace.</p></div><div className="trip-meta"><span><i>◷</i> {preferences.duration}</span><span><i>◎</i> {preferences.travellers} travellers</span><span><i>₹</i> ₹{Number(destination.estimatedCost || destination.cost || 0).toLocaleString('en-IN')}/person</span></div></div>
          <div className="itinerary-overview"><div><span className="overview-icon">✦</span><div><small>Recommendation engine</small><strong>{destination.matchScore || destination.score || 80}% Trip Match</strong><p>WayFind ranks this plan around your interests, pacing, budget and travel convenience.</p></div></div><div className="overview-badges"><Tag>{preferences.travelPreference} Travel</Tag><Tag tone="green">{destination.dataSource === 'serpapi' ? 'Live search data' : 'Development data'}</Tag></div></div>
          <div className="itinerary-controls"><div className="day-tabs">{Array.from({ length: Number.parseInt(preferences.duration, 10) || 4 }, (_, index) => <button type="button" key={index + 1} className={activeDay === index + 1 ? 'active' : ''} onClick={() => setActiveDay(index + 1)}><span>Day</span><strong>{index + 1}</strong></button>)}</div><div className="control-actions"><button type="button" onClick={regenerateDay} disabled={loading}>Regenerate Day</button><button type="button" onClick={() => setMode('Budget')}>Optimize Budget</button><button type="button" onClick={() => setMode('Relaxed')}>Make It Relaxed</button><button type="button" className="add-button">+ Add Activity</button></div></div>
          <div className="itinerary-content"><div className="timeline"><div className="timeline-heading"><div><span className="eyebrow">Day {activeDay}</span><h2>What’s happening</h2><p>Adjust any activity to make the plan feel more like yours.</p></div><span className="day-cost">Estimated day: ₹{((Number(destination.estimatedCost || destination.cost || 0) / Math.max(Number.parseInt(preferences.duration, 10) || 4, 1))).toLocaleString('en-IN')}</span></div>{loading ? <p className="loading-copy">WayFind is building your itinerary…</p> : dayItems.map((item, index) => <article className="timeline-item" key={`${item.day}-${item.time}`}><div className="timeline-time"><span>{item.time}</span><small>{item.duration}</small></div><div className="timeline-connector"><i /></div><div className="timeline-card"><div className="timeline-card-top"><div><span className="activity-number">0{index + 1}</span><h3>{item.place || item.title}</h3></div><strong>₹{Number(item.estimatedCost || item.cost || 0).toLocaleString('en-IN')}</strong></div><p>{item.reason}</p><div className="timeline-meta"><span><i>⌖</i>{item.location}</span><span><i>◷</i>{item.duration}</span><span>✦ {item.category || 'WayFind matched'}</span></div></div></article>)}</div><aside className="itinerary-sidebar"><div className="plan-card"><span className="eyebrow">Planning mode</span><h3>{mode} itinerary</h3><p>WayFind is optimizing this plan for your preferred travel style.</p><div className="mode-options">{['Balanced', 'Budget', 'Relaxed'].map(option => <button type="button" key={option} className={mode === option ? 'active' : ''} onClick={() => setMode(option)}><span>{option === 'Balanced' ? '◌' : option === 'Budget' ? '₹' : '☼'}</span><strong>{option}</strong></button>)}</div></div><div className="daily-cost-card"><span className="eyebrow">Daily spend</span><strong>₹{((Number(destination.estimatedCost || destination.cost || 0) / Math.max(Number.parseInt(preferences.duration, 10) || 4, 1))).toLocaleString('en-IN')}</strong><p>Estimated average across all planned experiences.</p><div className="tiny-bars"><i style={{ height: '35%' }} /><i style={{ height: '54%' }} /><i style={{ height: '70%' }} /><i style={{ height: '90%' }} /></div></div><Button to={`/summary/${destination.id}`} className="full-width" onClick={() => setSelectedDestination(destination)}>Review trip summary <span>→</span></Button></aside></div></div></section></Layout>
  )
}
