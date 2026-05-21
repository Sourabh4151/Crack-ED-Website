/**
 * State → city lists from backend/indian_state_cities.json (single source of truth).
 */
import stateCitiesMap from '@backend-data/indian_state_cities.json'

export const INDIAN_STATES = Object.keys(stateCitiesMap).sort((a, b) =>
  a.localeCompare(b, 'en', { sensitivity: 'base' })
)

export function getCitiesForState(state) {
  const cities = stateCitiesMap[state]
  return Array.isArray(cities) ? cities : []
}
