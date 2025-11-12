import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore, type Store } from 'vuex'
import App from '../App.vue'
import AppHeader from '@/components/AppHeader'
import HorseList from '@/components/HorseList'
import RaceTrack from '@/components/RaceTrack'
import ResultsPanel from '@/components/ResultsPanel'
import type { HorseState, RaceState, RootState } from '@/store/types'

describe('App', () => {
  let store: Store<RootState>

  beforeEach(() => {
    store = createStore({
      modules: {
        horse: {
          namespaced: true,
          state: {
            horses: [
              {
                id: 1,
                name: 'Thunder',
                condition: 85,
                color: 'Red',
                colorCode: '#FF0000',
                position: 0,
              },
            ],
          },
          getters: {
            allHorses: (state: HorseState) => state.horses,
          },
        },
        race: {
          namespaced: true,
          state: {
            raceHorses: [],
            isRaceRunning: false,
            currentRound: 1,
            currentDistance: 1200,
            allRoundsCompleted: false,
            raceInProgress: false,
            currentRoundCompleted: false,
            programGenerated: false,
            rounds: [],
            roundResults: [],
            raceStarted: false,
            resultTabs: [],
          },
          getters: {
            raceHorses: (state: RaceState) => state.raceHorses,
            isRaceRunning: (state: RaceState) => state.isRaceRunning,
            currentRound: (state: RaceState) => state.currentRound,
            currentDistance: (state: RaceState) => state.currentDistance,
            allRoundsCompleted: (state: RaceState) => state.allRoundsCompleted,
            raceInProgress: (state: RaceState) => state.raceInProgress,
            currentRoundCompleted: (state: RaceState) => state.currentRoundCompleted,
            programGenerated: (state: RaceState) => state.programGenerated,
            rounds: (state: RaceState) => state.rounds,
            roundResults: (state: RaceState) => state.roundResults,
          },
          actions: {
            generateProgram: vi.fn(),
            toggleRace: vi.fn(),
            nextRound: vi.fn(),
            cleanupRaceInterval: vi.fn(),
          },
        },
      },
    })
  })

  it('renders the main app container', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.find('.app').exists()).toBe(true)
  })

  it('renders AppHeader component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent(AppHeader).exists()).toBe(true)
  })

  it('renders HorseList component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent(HorseList).exists()).toBe(true)
  })

  it('renders RaceTrack component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent(RaceTrack).exists()).toBe(true)
  })

  it('renders ResultsPanel component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent(ResultsPanel).exists()).toBe(true)
  })

  it('passes correct props to AppHeader', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const header = wrapper.findComponent(AppHeader)
    expect(header.props('isRaceRunning')).toBe(false)
    expect(header.props('currentRound')).toBe(1)
    expect(header.props('allRoundsCompleted')).toBe(false)
    expect(header.props('raceInProgress')).toBe(false)
  })

  it('passes horses to HorseList', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const horseList = wrapper.findComponent(HorseList)
    expect(horseList.props('horses')).toHaveLength(1)
    expect(horseList.props('horses')[0]!.name).toBe('Thunder')
  })

  it('passes correct props to RaceTrack', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const raceTrack = wrapper.findComponent(RaceTrack)
    expect(raceTrack.props('horses')).toEqual([])
    expect(raceTrack.props('currentRound')).toBe(1)
    expect(raceTrack.props('currentDistance')).toBe(1200)
  })

  it('dispatches generateProgram action when AppHeader emits generateProgram', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const header = wrapper.findComponent(AppHeader)
    await header.vm.$emit('generateProgram')

    expect(dispatchSpy).toHaveBeenCalledWith('race/generateProgram')
  })

  it('dispatches toggleRace action when AppHeader emits toggleRace', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const header = wrapper.findComponent(AppHeader)
    await header.vm.$emit('toggleRace')

    expect(dispatchSpy).toHaveBeenCalledWith('race/toggleRace')
  })

  it('renders main content container', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('applies correct layout structure', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    const app = wrapper.find('.app')
    expect(app.exists()).toBe(true)

    const mainContent = wrapper.find('.main-content')
    expect(mainContent.exists()).toBe(true)
  })

  it('cleans up race interval on unmount', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })

    wrapper.unmount()

    expect(dispatchSpy).toHaveBeenCalledWith('race/cleanupRaceInterval')
  })
})
