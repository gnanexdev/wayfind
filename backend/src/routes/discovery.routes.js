import express from 'express'
import { discoveryController } from '../controllers/discovery.controller.js'

const router = express.Router()
router.post('/', discoveryController)
export default router
