import type { RaceState } from '../../types'
import { ROUND_DISTANCES, RACE_CONFIG } from './constants'

export const state: RaceState = {
  raceHorses: [],
  isRaceRunning: false,
  currentRound: RACE_CONFIG.INITIAL_ROUND,
  currentDistance: ROUND_DISTANCES[0].distance,
  rounds: [...ROUND_DISTANCES],
  programGenerated: false,
  raceStarted: false,
  currentRoundCompleted: false,
  allRoundsCompleted: false,
  raceInProgress: false,
  roundResults: [],
  resultTabs: [],
}
