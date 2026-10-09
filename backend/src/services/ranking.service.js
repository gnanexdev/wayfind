const SCORE_WEIGHTS = {
  budget: 0.25,
  interests: 0.25,
  travel: 0.15,
  stay: 0.15,
  experience: 0.1,
  reviews: 0.1,
}

function clamp(value) {
  return Math.max(0, Math.min(100, value))
}

export function scoreDestination(destination, preferences = {}) {
  const budget = Number(preferences.budget || 0)
  const estimatedCost = Number(destination.estimatedCost || destination.cost || 0)
  const budgetScore = budget > 0 && estimatedCost > 0
    ? clamp(100 - Math.abs(estimatedCost - budget) / Math.max(budget, 1) * 100)
    : 70
  const interests = (preferences.interests || []).map(value => value.toLowerCase())
  const interestScore = interests.length
    ? clamp(interests.reduce((sum, interest) => {
      const tags = (destination.tags || []).map(value => value.toLowerCase())
      return sum + (tags.includes(interest) ? 100 : tags.some(tag => interest.includes(tag) || tag.includes(interest)) ? 65 : 20)
    }, 0) / interests.length)
    : 55
  const travelScore = clamp(100 - (Number(destination.travelInfo?.duration || 0) || 4) * 5)
  const stayScore = clamp(100 - (Number(destination.travelInfo?.stayCost || estimatedCost) || 0) / Math.max(budget, 1) * 100)
  const experienceScore = clamp((destination.scoreBreakdown?.experience || 80) || 80)
  const reviewScore = clamp((destination.scoreBreakdown?.reviews || destination.score || 80) || 80)
  const scoreBreakdown = {
    budget: Math.round(budgetScore),
    interests: Math.round(interestScore),
    travel: Math.round(travelScore),
    stay: Math.round(stayScore),
    experience: Math.round(experienceScore),
    reviews: Math.round(reviewScore),
  }
  const matchScore = Math.round(Object.entries(SCORE_WEIGHTS).reduce((sum, [key, weight]) => sum + scoreBreakdown[key] * weight, 0))
  return {
    ...destination,
    matchScore,
    scoreBreakdown,
    whyItFits: destination.whyItFits || [
      `Balanced against your ${preferences.travelStyle || 'preferred'} travel style.`,
      'A practical match for your budget and interests.',
    ],
    source: destination.source || 'WayFind Recommendation Engine',
    dataSource: destination.dataSource || 'serpapi',
  }
}

export function rankDestinations(destinations, preferences) {
  return destinations
    .map(destination => scoreDestination(destination, preferences))
    .sort((a, b) => b.matchScore - a.matchScore || a.estimatedCost - b.estimatedCost)
}

export { SCORE_WEIGHTS }
