import type { Module } from 'vuex'
import type { HorseState, RootState } from '../../types'
import { state } from './state.ts'
import { getters } from './getters.ts'
import { mutations } from './mutations.ts'
import { actions } from './actions.ts'

export const horseModule: Module<HorseState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
