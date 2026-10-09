import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo, Button } from './ui'

const navItems = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Discover', to: '/destinations' },
  { label: 'Travel intelligence', to: '/destinations' },
]

export default function Layout({ children, compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app-shell">
      <header className={`site-header ${compact ? 'site-header-compact' : ''}`}>
        <div className="container header-inner">
          <Logo />
          <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map(item => <NavLink key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>)}
            <Link to="/plan" className="nav-plan" onClick={() => setMenuOpen(false)}>Plan a trip</Link>
          </nav>
          <div className="header-actions">
            <Link to="/destinations" className="text-link">Explore</Link>
            <Button to="/plan" size="small">Start planning</Button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><i /><i /></button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      {!compact && <footer className="site-footer"><div className="container footer-grid"><div><Logo light /><p>Intelligent travel discovery for curious people.</p></div><div><strong>Explore</strong><Link to="/plan">Plan a trip</Link><Link to="/destinations">Destinations</Link></div><div><strong>WayFind</strong><span>Find your way. Find your place.</span></div></div></footer>}
      {isHome && <div className="ambient ambient-one" />}
    </div>
  )
}
