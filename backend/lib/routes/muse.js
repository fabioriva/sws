import express from 'express'
import {
  overview,
  map
} from 'lib/aps/muse/entities'

const router = express.Router()

router.get('/map', (req, res) => {
  res.status(200).json(JSON.stringify(map))
})

router.get('/overview', (req, res) => {
  res.status(200).json(JSON.stringify(overview))
})

export default router
