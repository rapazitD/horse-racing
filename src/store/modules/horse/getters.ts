import type { GetterTree } from 'vuex'
import type { HorseState, RootState } from '../../types'
import type { Horse } from '@/components/HorseList'

export const getters: GetterTree<HorseState, RootState> = {
  allHorses: (state): Horse[] => state.horses,
}
