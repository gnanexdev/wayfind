export function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'Route not found' })
}

export function errorHandler(error, _req, res, _next) {
  const message = error?.message || 'Unexpected server error'
  const status = error?.status || 500
  if (status < 500) {
    return res.status(status).json({ error: message })
  }
  return res.status(500).json({ error: 'WayFind could not complete that request' })
}
