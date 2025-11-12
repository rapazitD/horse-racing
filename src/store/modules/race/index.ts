import type { Module } from 'vuex'
import type { RaceState, RootState } from '../../types'
import { state } from './state.ts'
import { getters } from './getters.ts'
import { mutations } from './mutations.ts'
import { actions } from './actions.ts'

export const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
