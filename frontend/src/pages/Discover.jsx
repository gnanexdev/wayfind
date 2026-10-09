import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { destinations } from '../data/mockTravelData'
import { useTrip } from '../components/useTrip'
import { wayfindApi } from '../services/api'
import { Button } from '../components/ui'

export default function Discover() {
  const { id } = useParams()
  const { setSelectedDestination, selectedDestination, discovery } = useTrip()
  const [places, setPlaces] = useState([])
  const [completedRequestKey, setCompletedRequestKey] = useState(null)
  const [category, setCategory] = useState('all')
  const [saved, setSaved] = useState([])
  const destination = selectedDestination || [...(discovery?.destinations || destinations)].find(item => item.id.startsWith(id)) || destinations[0]
  const requestKey = `${id}:${destination.id}`
  const loading = completedRequestKey !== requestKey
  const filteredPlaces = category === 'all' ? places : places.filter(place => place.category.toLowerCase() === category)

  useEffect(() => {
    let cancelled = false
    wayfindApi.getPlaces(id, 'attractions').then(result => {
      if (!cancelled) setPlaces(result.places || [])
    }).catch(() => {
      if (!cancelled) setPlaces(destination.places || [])
    }).finally(() => {
      if (!cancelled) setCompletedRequestKey(requestKey)
    })
    return () => { cancelled = true }
  }, [destination.id, destination.places, id, requestKey])

  const addPlace = place => setSaved(items => items.includes(place.id || place.name) ? items : [...items, place.id || place.name])

  return (
    <Layout compact>
      <section className="discover-page">
        <div className="container">
          <div className="discover-heading">
            <div><span className="eyebrow">Local discovery · {destination.dataSource === 'serpapi' ? 'Live Maps data' : 'Development fallback'}</span><h1>Discover {destination.name} beyond the obvious.</h1><p>WayFind uses Google Maps results to surface local moments that fit your pace.</p></div>
            <div className="discover-map"><div className="map-grid" /><span className="map-pin pin-one">✦</span><span className="map-pin pin-two">⌖</span><span className="map-pin pin-three">◌</span><div className="map-label"><small>Local discovery map</small><strong>{destination.name}</strong></div></div>
          </div>
          <div className="category-tabs">
            {['all', 'attractions', 'food', 'nature', 'adventure', 'culture'].map(item => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item === 'all' ? 'All discoveries' : item[0].toUpperCase() + item.slice(1)}</button>)}
          </div>
          <div className="places-grid">
            {filteredPlaces.map(place => <article className="place-card" key={place.id || place.name}><div className="place-image"><img src={place.image || destination.image} alt={place.name} /><span>★ {place.rating || 0}</span><small>{place.location}</small></div><div className="place-body"><div><span className="place-type">{place.category || 'Local discovery'}</span><h3>{place.name}</h3><p>{place.description}</p></div><button type="button" className={saved.includes(place.id || place.name) ? 'saved' : ''} onClick={() => addPlace(place)}>{saved.includes(place.id || place.name) ? '✓ Added' : '+ Add to trip'}</button></div></article>)}
            {!loading && !filteredPlaces.length && <p className="empty-copy">No places matched this category yet.</p>}
          </div>
          <div className="discover-next"><div><span className="eyebrow">Ready to turn this into a plan?</span><h2>Build a trip around these discoveries.</h2><p>WayFind will arrange the best moments into a practical, balanced itinerary.</p></div><Button to={`/itinerary/${destination.id}`} onClick={() => setSelectedDestination(destination)}>Build my itinerary <span>→</span></Button></div>
        </div>
      </section>
    </Layout>
  )
}
