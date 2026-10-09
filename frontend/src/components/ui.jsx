import { Link } from 'react-router-dom'

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="WayFind home">
      <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>
      <span>WayFind</span>
    </Link>
  )
}

export function Button({ children, to, variant = 'primary', className = '', ...props }) {
  if (to) return <Link to={to} className={`button button-${variant} ${className}`} {...props}>{children}</Link>
  return <button type="button" className={`button button-${variant} ${className}`} {...props}>{children}</button>
}

export function SectionHeader({ eyebrow, title, description, align = 'left', action }) {
  return <div className={`section-header section-header-${align}`}><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>
}

export function Tag({ children, tone = 'neutral' }) { return <span className={`tag tag-${tone}`}>{children}</span> }

export function ScoreRing({ score, size = 78 }) {
  const radius = 31
  const circumference = 2 * Math.PI * radius
  return <div className="score-ring" style={{ width: size, height: size }}><svg viewBox="0 0 72 72" aria-hidden="true"><circle className="score-track" cx="36" cy="36" r={radius} /><circle className="score-value" cx="36" cy="36" r={radius} strokeDasharray={circumference} strokeDashoffset={circumference - (score / 100) * circumference} /></svg><strong>{score}</strong><span>/100</span></div>
}

export function Progress({ value = 50, label }) { return <div className="progress-row"><div className="progress-copy"><span>{label}</span><strong>{value}%</strong></div><div className="progress-track"><span style={{ width: `${value}%` }} /></div></div> }

export function EmptyState({ title, copy }) { return <div className="empty-state"><span>✦</span><h3>{title}</h3><p>{copy}</p></div> }
