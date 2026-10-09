import express from 'express'

const router = express.Router()
router.get('/', (req, res) => res.json({ status: 'ok', service: 'WayFind API' }))
export default router
