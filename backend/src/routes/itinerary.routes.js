import express from 'express'
import { itineraryController } from '../controllers/itinerary.controller.js'

const router = express.Router()
router.post('/', itineraryController)
export default router
