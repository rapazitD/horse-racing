import { SPEED_CONFIG, RACE_CONFIG } from '@/store/modules/race/constants'

/**
 * Race calculation utilities
 * Contains business logic for race mechanics and speed calculations
 */

/**
 * Calculate the distance multiplier based on current round distance
 * @param roundDistance - The distance of the current round in meters
 * @returns The distance multiplier for speed adjustment
 */
export function calculateDistanceMultiplier(roundDistance: number): number {
  return roundDistance / SPEED_CONFIG.BASE_DISTANCE
}

/**
 * Calculate base speed for a horse based on its condition
 * Speed ranges from MIN_SPEED to MAX_SPEED units per tick
 * Higher condition = faster speed
 * @param condition - Horse condition value (0-100)
 * @returns Base speed in units per tick
 */
export function calculateBaseSpeed(condition: number): number {
  return SPEED_CONFIG.MIN_SPEED + (condition / RACE_CONFIG.MAX_CONDITION) * SPEED_CONFIG.MAX_SPEED_RANGE
}

/**
 * Adjust speed based on race distance
 * Longer races are proportionally slower to maintain realistic race times
 * @param baseSpeed - The base speed calculated from horse condition
 * @param distanceMultiplier - The distance multiplier for the current round
 * @returns Adjusted speed for the current race distance
 */
export function adjustSpeedForDistance(baseSpeed: number, distanceMultiplier: number): number {
  return baseSpeed / Math.sqrt(distanceMultiplier)
}

/**
 * Calculate the new position for a horse in the race
 * @param currentPosition - Current position of the horse (0-100)
 * @param condition - Horse condition value (0-100)
 * @param roundDistance - The distance of the current round in meters
 * @returns New position clamped to MAX_POSITION
 */
export function calculateNewPosition(
  currentPosition: number,
  condition: number,
  roundDistance: number
): number {
  if (currentPosition >= RACE_CONFIG.MAX_POSITION) {
    return currentPosition
  }

  const distanceMultiplier = calculateDistanceMultiplier(roundDistance)
  const baseSpeed = calculateBaseSpeed(condition)
  const adjustedSpeed = adjustSpeedForDistance(baseSpeed, distanceMultiplier)
  
  return Math.min(RACE_CONFIG.MAX_POSITION, currentPosition + adjustedSpeed)
}
