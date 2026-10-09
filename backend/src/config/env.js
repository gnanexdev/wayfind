import dotenv from 'dotenv'

dotenv.config()

const parsePort = value => {
  const parsed = Number.parseInt(value || '5000', 10)
  return Number.isFinite(parsed) ? parsed : 5000
}

export const env = {
  port: parsePort(process.env.PORT),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  serpApiKey: (process.env.SERPAPI_KEY || '').trim() === 'YOUR_KEY_HERE' ? '' : (process.env.SERPAPI_KEY || '').trim(),
  nodeEnv: process.env.NODE_ENV || 'development',
}

export function validateEnv() {
  if (!env.serpApiKey && env.nodeEnv === 'production') {
    throw new Error('SERPAPI_KEY is required in production.')
  }
}
