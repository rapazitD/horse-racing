import type { Horse } from '../HorseList'

export interface RaceHorse extends Horse {
  lane: number
  finishTime?: number
  finishPosition?: number
  hasFinished?: boolean
}

export interface RaceTrackProps {
  horses: RaceHorse[]
  currentRound: number
  currentDistance: number
}
