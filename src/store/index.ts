import { createStore } from 'vuex'
import { horseModule } from './modules/horse'
import { raceModule } from './modules/race'
import type { RootState } from './types.ts'

export const store = createStore<RootState>({
  modules: {
    horse: horseModule,
    race: raceModule,
  },
})

export function useStore() {
  return store
}
