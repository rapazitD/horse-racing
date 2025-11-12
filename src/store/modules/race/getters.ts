import type { GetterTree } from 'vuex'
import type { RaceState, RootState } from '../../types'

export const getters: GetterTree<RaceState, RootState> = {
  raceHorses: (state) => state.raceHorses,
  isRaceRunning: (state) => state.isRaceRunning,
  currentRound: (state) => state.currentRound,
  currentRoundConfig: (state) => state.rounds[state.currentRound - 1],
  rounds: (state) => state.rounds,
  programGenerated: (state) => state.programGenerated,
  roundResults: (state) => state.roundResults,

  // Get current distance based on current round
  currentDistance: (state) => {
    const round = state.rounds[state.currentRound - 1]
    return round?.distance || 1200
  },

  // Check if all rounds are completed
  allRoundsCompleted: (state) => {
    return state.roundResults.length === state.rounds.length
  },

  // Check if race is in progress
  raceInProgress: (state) => {
    return state.raceStarted && state.roundResults.length < state.rounds.length
  },

  // Check if current round is completed
  currentRoundCompleted: (state) => {
    return state.currentRoundCompleted
  },
}
