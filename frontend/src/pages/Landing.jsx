import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Button, SectionHeader } from '../components/ui'

const steps = [
  { number: '01', title: 'Tell us about your trip', copy: 'Share your starting point, budget, pace, travellers and what you love.' },
  { number: '02', title: 'We research destinations', copy: 'WayFind compares options, travel options and stay value for you.' },
  { number: '03', title: 'Compare your best matches', copy: 'Explore explainable scores and understand why each match fits.' },
  { number: '04', title: 'Build your trip', copy: 'Discover local experiences and shape a personalized itinerary.' },
]

export default function Landing() {
  return <Layout>
    <section className="hero section-pad">
      <div className="container hero-grid">
        <div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="pulse-dot" /> AI travel discovery</span><h1>Don’t know where to go?<br /><em>We’ll find the right trip for you.</em></h1><p className="hero-lead">Tell us your budget, time, interests and travel preferences. WayFind discovers destinations that actually fit your trip.</p><div className="hero-actions"><Button to="/plan">Discover my trip <span>↗</span></Button><a href="#how-it-works" className="button button-secondary">See how it works</a></div><div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>K</span></div><p><strong>Built for curious travellers</strong><br />Personalized, explainable, and ready to explore.</p></div></div>
        <div className="hero-visual"><div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90" alt="A quiet Indian coastal landscape" /><div className="image-shade" /></div><div className="discovery-card"><div className="discovery-card-head"><span className="spark-icon">✦</span><div><small>AI discovery</small><strong>Trip signal found</strong></div><span className="live-dot">Live</span></div><div className="route-line"><span className="route-node">H</span><i /><span className="route-node route-node-dest">G</span></div><div className="route-copy"><span>Hyderabad → Goa</span><strong>91% match</strong></div><div className="mini-bar"><span style={{ width: '91%' }} /></div></div><div className="floating-note"><span>✦</span><div><small>Matched for you</small><strong>Beaches + Food + Adventure</strong></div></div></div>
      </div>
    </section>

    <section id="how-it-works" className="section-pad steps-section"><div className="container"><SectionHeader eyebrow="A smarter way to travel" title="From a vague idea to a trip that feels like you." description="WayFind turns your preferences into a clear, explainable shortlist—without the usual endless browsing." /><div className="steps-grid">{steps.map(step => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><div className="step-icon">{step.number === '01' ? '⌖' : step.number === '02' ? '⌕' : step.number === '03' ? '◫' : '↗'}</div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></div></section>

    <section className="section-pad intelligence-section"><div className="container intelligence-grid"><div className="intelligence-visual"><div className="map-orbit"><span className="map-pulse" /><span className="map-node node-a">G</span><span className="map-node node-b">V</span><span className="map-node node-c">P</span><span className="map-path path-a" /><span className="map-path path-b" /><span className="map-center">✦</span></div><div className="signal-card"><span className="signal-icon">⌁</span><div><small>Why this fits</small><strong>92% interest match</strong><p>Based on your travel style and local experiences.</p></div></div></div><div><SectionHeader eyebrow="Travel intelligence, made visible" title="You don’t have to guess why a place fits." description="Every recommendation comes with a transparent match score and clear reasons—so you can make confident choices." /><div className="benefit-list"><div><span>01</span><div><h3>Smart destination discovery</h3><p>Explore places that match the way you actually like to travel.</p></div></div><div><span>02</span><div><h3>Live travel intelligence</h3><p>Compare cost, convenience, stay value and local experiences.</p></div></div><div><span>03</span><div><h3>Personalized planning</h3><p>Turn your shortlist into an itinerary that feels made for you.</p></div></div></div></div></div></section>

    <section className="section-pad cta-section"><div className="container cta-panel"><div className="cta-orb" /><div><span className="eyebrow">Your next story starts here</span><h2>Let’s find a place you’ll <em>love to remember.</em></h2><p>Start with a few choices. WayFind will do the exploring.</p></div><div className="cta-actions"><Button to="/plan">Discover my trip</Button><Link to="/destinations" className="button button-light">Explore destinations</Link></div></div></section>
  </Layout>
}
