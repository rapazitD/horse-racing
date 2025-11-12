import type { MutationTree } from 'vuex'
import type { RaceState, RoundResult } from '../../types'
import type { RaceHorse } from '@/components/RaceTrack'
import { RACE_CONFIG } from './constants'
import { calculateNewPosition } from '@/utils/raceCalculations'

export const mutations: MutationTree<RaceState> = {
  SET_RACE_RUNNING(state, isRunning: boolean) {
    state.isRaceRunning = isRunning
  },

  TOGGLE_RACE(state) {
    state.isRaceRunning = !state.isRaceRunning
  },

  SET_RACE_HORSES(state, horses: RaceHorse[]) {
    state.raceHorses = horses
  },

  SET_CURRENT_ROUND(state, round: number) {
    state.currentRound = round
  },

  INCREMENT_ROUND(state) {
    if (state.currentRound < state.rounds.length) {
      state.currentRound++
    }
  },

  SET_PROGRAM_GENERATED(state, generated: boolean) {
    state.programGenerated = generated
  },

  SET_RACE_STARTED(state, started: boolean) {
    state.raceStarted = started
  },

  SET_CURRENT_ROUND_COMPLETED(state, completed: boolean) {
    state.currentRoundCompleted = completed
  },

  ADD_ROUND_RESULT(state, result: RoundResult) {
    state.roundResults.push(result)
  },

  RESET_ROUND_POSITIONS(state) {
    for (const horse of state.raceHorses) {
      horse.position = RACE_CONFIG.START_POSITION
      horse.hasFinished = false
      horse.finishTime = undefined
      horse.finishPosition = undefined
    }
  },

  CLEAR_ROUND_RESULTS(state) {
    state.roundResults = []
  },

  RESET_ALL(state) {
    state.raceHorses = []
    state.currentRound = RACE_CONFIG.INITIAL_ROUND
    state.isRaceRunning = false
    state.programGenerated = false
    state.raceStarted = false
    state.currentRoundCompleted = false
    state.roundResults = []
  },

  UPDATE_ALL_HORSES_POSITIONS(state) {
    const currentRound = state.rounds[state.currentRound - 1]
    if (!currentRound) return

    for (const horse of state.raceHorses) {
      horse.position = calculateNewPosition(horse.position, horse.condition, currentRound.distance)
    }
  },

  MARK_HORSE_FINISHED(state, payload: { lane: number; finishTime: number; finishPosition: number }) {
    const horse = state.raceHorses.find((h) => h.lane === payload.lane)
    if (horse) {
      horse.hasFinished = true
      horse.finishTime = payload.finishTime
      horse.finishPosition = payload.finishPosition
    }
  },

  UPDATE_ROUND_RESULT_PARTIAL(state, payload: { roundNumber: number; horse: RaceHorse }) {
    const existingResultIndex = state.roundResults.findIndex(
      (r) => r.roundNumber === payload.roundNumber,
    )

    const horseResult = {
      lane: payload.horse.lane,
      name: payload.horse.name,
      condition: payload.horse.condition,
      colorCode: payload.horse.colorCode,
      finishPosition: payload.horse.finishPosition,
      finishTime: payload.horse.finishTime,
    }

    if (existingResultIndex >= 0) {
      // Update existing result
      const result = state.roundResults[existingResultIndex]
      if (result) {
        const horseIndex = result.horses.findIndex((h) => h.lane === payload.horse.lane)
        if (horseIndex >= 0) {
          result.horses[horseIndex] = horseResult
        } else {
          result.horses.push(horseResult)
          // Sort by finish position
          result.horses.sort((a, b) => (a.finishPosition || 0) - (b.finishPosition || 0))
        }
      }
    } else {
      // Create new result
      const currentRound = state.rounds[payload.roundNumber - 1]
      if (currentRound) {
        state.roundResults.push({
          roundNumber: payload.roundNumber,
          distance: currentRound.distance,
          horses: [horseResult],
        })
      }
    }
  },
}
