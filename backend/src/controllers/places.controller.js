import { getPlaceDetails, getPlaceReviews } from '../services/maps.service.js'

export async function placeController(req, res, next) {
  try {
    const result = await getPlaceDetails(req.params.placeId)
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

export async function reviewsController(req, res, next) {
  try {
    const result = await getPlaceReviews(req.params.placeId)
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
