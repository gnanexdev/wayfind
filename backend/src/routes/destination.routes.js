import express from 'express'
import { destinationController, flightsController, hotelsController, placesController } from '../controllers/destination.controller.js'

const router = express.Router()
router.get('/:id', destinationController)
router.get('/:id/places', placesController)
router.get('/:id/hotels', hotelsController)
router.get('/:id/flights', flightsController)
export default router
