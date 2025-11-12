import type { MutationTree } from 'vuex'
import type { HorseState } from '../../types'
import type { Horse } from '@/components/HorseList'

export const mutations: MutationTree<HorseState> = {
  SET_HORSES(state, horses: Horse[]) {
    state.horses = horses
  },
}
