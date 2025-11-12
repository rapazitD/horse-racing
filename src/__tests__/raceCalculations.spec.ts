import { describe, it, expect } from 'vitest'
import {
  calculateDistanceMultiplier,
  calculateBaseSpeed,
  adjustSpeedForDistance,
  calculateNewPosition,
} from '@/utils/raceCalculations'
import { SPEED_CONFIG, RACE_CONFIG } from '@/store/modules/race/constants'

describe('Race Calculations', () => {
  describe('calculateDistanceMultiplier', () => {
    it('should return 1 for base distance', () => {
      const result = calculateDistanceMultiplier(1200)
      expect(result).toBe(1)
    })

    it('should return correct multiplier for longer distances', () => {
      const result = calculateDistanceMultiplier(2400)
      expect(result).toBe(2)
    })

    it('should return correct multiplier for shorter distances', () => {
      const result = calculateDistanceMultiplier(600)
      expect(result).toBe(0.5)
    })
  })

  describe('calculateBaseSpeed', () => {
    it('should return MIN_SPEED for condition 0', () => {
      const result = calculateBaseSpeed(0)
      expect(result).toBe(SPEED_CONFIG.MIN_SPEED)
    })

    it('should return MAX_SPEED for condition 100', () => {
      const result = calculateBaseSpeed(100)
      expect(result).toBe(SPEED_CONFIG.MIN_SPEED + SPEED_CONFIG.MAX_SPEED_RANGE)
    })

    it('should return middle speed for condition 50', () => {
      const result = calculateBaseSpeed(50)
      expect(result).toBe(SPEED_CONFIG.MIN_SPEED + SPEED_CONFIG.MAX_SPEED_RANGE / 2)
    })
  })

  describe('adjustSpeedForDistance', () => {
    it('should not adjust speed for base distance (multiplier 1)', () => {
      const baseSpeed = 1.5
      const result = adjustSpeedForDistance(baseSpeed, 1)
      expect(result).toBe(baseSpeed)
    })

    it('should reduce speed for longer distances', () => {
      const baseSpeed = 2.0
      const result = adjustSpeedForDistance(baseSpeed, 4)
      expect(result).toBe(1.0) // 2.0 / sqrt(4) = 1.0
    })
  })

  describe('calculateNewPosition', () => {
    it('should not move horse beyond MAX_POSITION', () => {
      const result = calculateNewPosition(100, 100, 1200)
      expect(result).toBe(RACE_CONFIG.MAX_POSITION)
    })

    it('should increase position for horse with good condition', () => {
      const result = calculateNewPosition(0, 100, 1200)
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThanOrEqual(RACE_CONFIG.MAX_POSITION)
    })

    it('should move slower for longer distances', () => {
      const shortDistance = calculateNewPosition(0, 100, 1200)
      const longDistance = calculateNewPosition(0, 100, 2400)
      expect(shortDistance).toBeGreaterThan(longDistance)
    })

    it('should move faster with better condition', () => {
      const lowCondition = calculateNewPosition(0, 20, 1200)
      const highCondition = calculateNewPosition(0, 80, 1200)
      expect(highCondition).toBeGreaterThan(lowCondition)
    })
  })
})
