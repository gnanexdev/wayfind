import { Link } from 'react-router-dom'
import { ScoreRing, Tag } from './ui'

export default function TravelCard({ destination, onSelect, compact = false }) {
  const cost = Number(destination.estimatedCost ?? destination.cost ?? 0)
  const score = destination.matchScore ?? destination.score ?? 0
  const breakdown = destination.scoreBreakdown || destination.match || {}
  const tags = destination.tags || []

  return (
    <article className={`destination-card ${compact ? 'destination-card-compact' : ''}`}>
      <Link to={`/destination/${destination.id}`} className="destination-image" onClick={onSelect}>
        <img src={destination.image} alt={`${destination.name}, ${destination.region}`} />
        <span className="destination-region">{destination.region}</span>
        <span className="match-pill">Top match</span>
      </Link>
      <div className="destination-card-body">
        <div className="destination-title-row"><div><h3>{destination.name}</h3><p>₹{cost.toLocaleString('en-IN')}/person</p></div><ScoreRing score={score} size={62} /></div>
        <div className="tag-row">{tags.slice(0, 4).map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
        <div className="score-breakdown">
          <div><span>Budget fit</span><strong>{breakdown.budget ?? 0}%</strong></div>
          <div><span>Interest match</span><strong>{breakdown.interests ?? 0}%</strong></div>
          <div><span>Stay value</span><strong>{breakdown.stay ?? breakdown.stays ?? 0}%</strong></div>
        </div>
        <div className="card-actions"><Link to={`/destination/${destination.id}`} className="text-link card-link">Explore {destination.name} <span>→</span></Link><button type="button" className="icon-button" aria-label={`Save ${destination.name}`}>♡</button></div>
      </div>
    </article>
  )
}
