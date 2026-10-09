import express from 'express'
import { flightsController } from '../controllers/destination.controller.js'

const router = express.Router()
router.get('/:id', flightsController)
export default router
