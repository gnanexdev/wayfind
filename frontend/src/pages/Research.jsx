import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useTrip } from '../components/useTrip'
import { wayfindApi } from '../services/api'
import { Button } from '../components/ui'

const steps = [
  { label: 'Understanding your preferences', icon: '⌖' },
  { label: 'Exploring destinations', icon: '⌕' },
  { label: 'Comparing travel options', icon: '◫' },
  { label: 'Checking stays', icon: '⌂' },
  { label: 'Discovering local experiences', icon: '✦' },
  { label: 'Building recommendations', icon: '↗', current: true },
]

export default function Research() {
  const { preferences, discovery, setDiscovery, setApiStatus } = useTrip()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setApiStatus('loading')
        const payload = await wayfindApi.discover({
          origin: preferences.location,
          budget: preferences.budget,
          budgetType: preferences.budgetMode,
          duration: Number.parseInt(preferences.duration, 10),
          travelers: preferences.travellers,
          interests: preferences.interests.map(item => item.toLowerCase()),
          travelStyle: preferences.travelPreference.toLowerCase(),
          requirements: preferences.notes,
        })
        if (!cancelled) {
          setDiscovery(payload)
          setApiStatus(payload.dataSource)
        }
      } catch (requestError) {
        if (!cancelled) setError(requestError.message)
      }
    }
    run()
    return () => { cancelled = true }
  }, [preferences, setApiStatus, setDiscovery])

  useEffect(() => {
    const timer = setInterval(() => setProgress(value => Math.min(100, value + 17)), 450)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    if (progress >= 100 && !error) {
      const timer = setTimeout(() => navigate('/destinations'), 650)
      return () => clearTimeout(timer)
    }
  }, [error, navigate, progress])

  return <Layout compact><section className="research-page"><div className="container research-layout"><div className="research-copy"><span className="eyebrow">WayFind intelligence</span><h1>{error ? 'We could not complete this search.' : 'Finding your perfect trip…'}</h1><p>We’re actively researching your preferences and creating a clear comparison of the places that fit best.</p><div className="research-brief"><span>Trip brief</span><strong>{preferences.location}</strong><i /> <strong>{preferences.duration}</strong><i /> <strong>{preferences.travellers} travellers</strong></div>{error && <p className="research-error" role="alert">{error}</p>}</div><div className="research-stage"><div className="research-orbit"><span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /><span className="orbit-core"><span>✦</span><strong>WayFind</strong></span><span className="orbit-node node-one">⌖</span><span className="orbit-node node-two">⌕</span><span className="orbit-node node-three">◫</span></div><div className="progress-label"><span>Research progress</span><strong>{progress}%</strong></div><div className="research-progress"><span style={{ width: `${progress}%` }} /></div><div className="research-steps">{steps.map((step, index) => <div className={progress >= index * 17 ? 'complete' : ''} key={step.label}><span>{progress >= index * 17 ? '✓' : step.icon}</span><p>{step.label}</p></div>)}</div><p className="research-note"><span>✦</span> {error ? 'Review your trip details and try again.' : discovery?.dataSource === 'serpapi' ? 'Live search data is being compared with your trip brief.' : 'WayFind is using its development recommendation engine while live search is unavailable.'}</p></div></div><div className="research-footer"><Button variant="ghost" to="/plan">Edit preferences</Button><span>Usually takes a few seconds</span></div></section></Layout>
}
