import { getJson } from 'serpapi'
import { env } from '../config/env.js'

export async function serpApiSearch(params) {
  if (!env.serpApiKey) {
    throw new Error('SERPAPI_KEY is not configured')
  }
  const payload = {
    ...params,
    api_key: env.serpApiKey,
    num: params.num || 10,
  }
  return getJson(payload)
}
