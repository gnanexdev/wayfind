const cache = new Map()
const DEFAULT_TTL_MS = 5 * 60 * 1000

export function cacheKey(params) {
  return JSON.stringify(params)
}

export function getCache(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }
  return entry.value
}

export function setCache(key, value, ttlMs = DEFAULT_TTL_MS) {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}

export function clearCache() {
  cache.clear()
}
