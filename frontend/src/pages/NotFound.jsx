import Layout from '../components/Layout'
import { Button } from '../components/ui'

export default function NotFound() {
  return <Layout compact><section className="not-found"><div><span>404</span><h1>There’s a better route for that.</h1><p>The page you’re looking for has moved or is not available yet.</p><Button to="/">Return home</Button></div></section></Layout>
}
