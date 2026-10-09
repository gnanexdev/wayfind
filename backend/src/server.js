import cors from 'cors'
import express from 'express'
import { env, validateEnv } from './config/env.js'
import discoveryRoutes from './routes/discovery.routes.js'
import destinationRoutes from './routes/destination.routes.js'
import placesRoutes from './routes/places.routes.js'
import hotelsRoutes from './routes/hotels.routes.js'
import flightsRoutes from './routes/flights.routes.js'
import itineraryRoutes from './routes/itinerary.routes.js'
import healthRoutes from './routes/health.routes.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'

validateEnv()

const app = express()
app.use(cors({ origin: env.clientUrl, methods: ['GET', 'POST', 'OPTIONS'] }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/health', healthRoutes)
app.use('/api/discovery', discoveryRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/places', placesRoutes)
app.use('/api/hotels', hotelsRoutes)
app.use('/api/flights', flightsRoutes)
app.use('/api/itinerary', itineraryRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`WayFind API listening on http://localhost:${env.port}`)
    console.log(env.serpApiKey ? 'SerpApi key configured' : 'SerpApi key missing — development fallback enabled')
  })
}

export default app
