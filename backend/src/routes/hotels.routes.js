import express from 'express'
import { hotelsController } from '../controllers/destination.controller.js'

const router = express.Router()
router.get('/:id', hotelsController)
export default router
