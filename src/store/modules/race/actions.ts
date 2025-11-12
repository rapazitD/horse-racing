import type { ActionTree } from 'vuex'
import type { RaceState, RootState } from '../../types'
import { RACE_CONFIG, TIMING_CONFIG } from './constants'

let raceAnimationId: number | null = null
let raceStartTime = 0

export const actions: ActionTree<RaceState, RootState> = {
  toggleRace({ commit, state }) {
    commit('TOGGLE_RACE')

    if (state.isRaceRunning) {
      const allHorsesFinished =
        state.raceHorses.length > 0 && state.raceHorses.every((horse) => horse.position >= 100)

      if (allHorsesFinished || !state.raceStarted) {
        commit('RESET_ROUND_POSITIONS')
      }

      if (!state.raceStarted) {
        commit('SET_RACE_STARTED', true)
      }

      const animate = () => {
        // Update horse positions
        commit('UPDATE_ALL_HORSES_POSITIONS')

        // Check for finished horses
        const currentTime = (Date.now() - raceStartTime) / TIMING_CONFIG.MS_TO_SECONDS
        const finishedCount = state.raceHorses.filter((h) => h.hasFinished).length

        state.raceHorses.forEach((horse) => {
          if (!horse.hasFinished && horse.position >= RACE_CONFIG.MAX_POSITION) {
            const finishPosition = finishedCount + 1
            const finishTime = currentTime

            commit('MARK_HORSE_FINISHED', {
              lane: horse.lane,
              finishTime,
              finishPosition,
            })

            commit('UPDATE_ROUND_RESULT_PARTIAL', {
              roundNumber: state.currentRound,
              horse: {
                ...horse,
                finishPosition,
                finishTime,
              },
            })
          }
        })

        // Check if all horses finished (reached max position)
        const allFinished = state.raceHorses.every(
          (horse) => horse.position >= RACE_CONFIG.MAX_POSITION,
        )
        if (allFinished) {
          if (raceAnimationId !== null) {
            cancelAnimationFrame(raceAnimationId)
            raceAnimationId = null
          }
          commit('SET_RACE_RUNNING', false)
          commit('SET_CURRENT_ROUND_COMPLETED', true)
        } else {
          raceAnimationId = requestAnimationFrame(animate)
        }
      }

      setTimeout(() => {
        raceStartTime = Date.now()
        raceAnimationId = requestAnimationFrame(animate)
      }, TIMING_CONFIG.RACE_START_DELAY)
    } else if (raceAnimationId !== null) {
      cancelAnimationFrame(raceAnimationId)
      raceAnimationId = null
    }
  },

  nextRound({ commit, state }) {
    if (state.currentRound < state.rounds.length) {
      commit('INCREMENT_ROUND')
      commit('SET_CURRENT_ROUND_COMPLETED', false)
    }
  },

  async generateProgram({ commit, dispatch, rootState }) {
    commit('CLEAR_ROUND_RESULTS')
    commit('SET_RACE_STARTED', false)
    commit('SET_CURRENT_ROUND_COMPLETED', false)

    await dispatch('horse/generateHorses', 20, { root: true })

    const horses = rootState.horse.horses.slice(0, 10)
    const raceHorses = horses.map((horse, index) => ({
      ...horse,
      position: RACE_CONFIG.START_POSITION,
      lane: index + 1,
    }))
    commit('SET_RACE_HORSES', raceHorses)
    commit('SET_PROGRAM_GENERATED', true)
    commit('SET_CURRENT_ROUND', RACE_CONFIG.INITIAL_ROUND)
    commit('RESET_ROUND_POSITIONS')
  },

  /**
   * Cleanup action to stop any running race animation
   * Should be called when component unmounts to prevent memory leaks
   */
  cleanupRaceInterval({ commit }) {
    if (raceAnimationId !== null) {
      cancelAnimationFrame(raceAnimationId)
      raceAnimationId = null
      commit('SET_RACE_RUNNING', false)
    }
  },
}
