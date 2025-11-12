/**
 * Race configuration constants
 */

/**
 * Speed calculation constants
 */
export const SPEED_CONFIG = {
  /** Minimum speed per tick (units per frame) */
  MIN_SPEED: 0.5,

  /** Maximum additional speed based on condition (units per frame) */
  MAX_SPEED_RANGE: 2,

  /** Maximum speed per tick (MIN_SPEED + MAX_SPEED_RANGE = 2.5) */
  MAX_SPEED: 2.5,

  /** Base distance used for speed calculations (meters) */
  BASE_DISTANCE: 1200,
} as const

/**
 * Race progress constants
 */
export const RACE_CONFIG = {
  /** Maximum position value (100 = finish line) */
  MAX_POSITION: 100,

  /** Starting position for all horses */
  START_POSITION: 0,

  /** Starting round number */
  INITIAL_ROUND: 1,

  /** Maximum condition value for horses */
  MAX_CONDITION: 100,
} as const

/**
 * Timing constants
 */
export const TIMING_CONFIG = {
  /** Delay before race starts after positions reset (milliseconds) */
  RACE_START_DELAY: 300,

  /** Time variation multiplier for finish times (5% per position) */
  FINISH_TIME_VARIATION: 0.05,

  /** Milliseconds to seconds conversion */
  MS_TO_SECONDS: 1000,
} as const

/**
 * Round distance configuration (in meters)
 */
export const ROUND_DISTANCES = [
  { roundNumber: 1, distance: 1200 },
  { roundNumber: 2, distance: 1400 },
  { roundNumber: 3, distance: 1600 },
  { roundNumber: 4, distance: 1800 },
  { roundNumber: 5, distance: 2000 },
  { roundNumber: 6, distance: 2200 },
] as const
