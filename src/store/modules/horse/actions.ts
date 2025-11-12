import type { ActionTree, ActionContext } from 'vuex'
import type { HorseState, RootState } from '../../types'
import { generateRandomHorses } from '@/utils/horseGenerator'

export const actions: ActionTree<HorseState, RootState> = {
  /**
   * Generate random horses and add them to the store
   * @param context - Vuex action context
   * @param count - Number of horses to generate (default: 20)
   */
  generateHorses(
    { commit }: ActionContext<HorseState, RootState>,
    count?: number
  ): void {
    const horses = generateRandomHorses(count ?? 20)
    commit('SET_HORSES', horses)
  }
}
