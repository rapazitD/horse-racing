/**
 * Shared horse-related type definitions
 * Used across components to avoid circular dependencies
 */

/**
 * Represents a horse in a round (program or result)
 */
export interface RoundHorse {
  lane: number
  name: string
  condition: number
  colorCode: string
  finishPosition?: number
  finishTime?: number
}
