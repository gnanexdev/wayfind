import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TripProvider } from './components/TripProvider'
import Landing from './pages/Landing'
import Preferences from './pages/Preferences'
import Research from './pages/Research'
import Destinations from './pages/Destinations'
import DestinationDetails from './pages/DestinationDetails'
import Discover from './pages/Discover'
import Itinerary from './pages/Itinerary'
import Summary from './pages/Summary'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/plan" element={<Preferences />} />
          <Route path="/search" element={<Research />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/discover/:id" element={<Discover />} />
          <Route path="/itinerary/:id" element={<Itinerary />} />
          <Route path="/summary/:id" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TripProvider>
    </BrowserRouter>
  )
}
