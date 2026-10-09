import express from 'express'
import { placeController, reviewsController } from '../controllers/places.controller.js'

const router = express.Router()
router.get('/:placeId', placeController)
router.get('/:placeId/reviews', reviewsController)
export default router
