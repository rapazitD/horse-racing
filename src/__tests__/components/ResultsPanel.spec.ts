import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import ResultsPanel from '@/components/ResultsPanel'
import RoundCard from '@/components/RoundCard'
import type { RaceState, RootState } from '@/store/types'
import type { RoundHorse } from '@/types'

describe('ResultsPanel', () => {
  let store: Store<RootState>

  const mockRaceHorses = [
    {
      id: 1,
      name: 'Thunder',
      condition: 85,
      color: 'Red',
      colorCode: '#FF0000',
      position: 0,
      lane: 1,
    },
    {
      id: 2,
      name: 'Lightning',
      condition: 92,
      color: 'Blue',
      colorCode: '#0000FF',
      position: 0,
      lane: 2,
    },
  ]

  const mockRounds = [
    { roundNumber: 1, distance: 1200 },
    { roundNumber: 2, distance: 1400 },
    { roundNumber: 3, distance: 1600 },
  ]

  const mockRoundResults = [
    {
      roundNumber: 1,
      distance: 1200,
      horses: [
        {
          lane: 1,
          name: 'Thunder',
          condition: 85,
          colorCode: '#FF0000',
          finishPosition: 1,
          finishTime: 12.5,
        },
        {
          lane: 2,
          name: 'Lightning',
          condition: 92,
          colorCode: '#0000FF',
          finishPosition: 2,
          finishTime: 13.2,
        },
      ] as RoundHorse[],
    },
  ]

  beforeEach(() => {
    store = createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            programGenerated: false,
            raceHorses: [],
            rounds: [],
            roundResults: [],
          } as RaceState,
          getters: {
            programGenerated: (state: RaceState) => state.programGenerated,
            raceHorses: (state: RaceState) => state.raceHorses,
            rounds: (state: RaceState) => state.rounds,
            roundResults: (state: RaceState) => state.roundResults,
          },
        },
      },
    })
  })

  it('renders empty state when program is not generated', () => {
    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('Generate a program to start racing')
  })

  it('renders rounds list when program is generated', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.find('.rounds-list').exists()).toBe(true)
    expect(wrapper.find('.empty-state').exists()).toBe(false)
  })

  it('renders correct number of round rows', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const roundRows = wrapper.findAll('.round-row')
    expect(roundRows).toHaveLength(3)
  })

  it('renders program and results columns for each round', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const programColumns = wrapper.findAll('.program-column')
    const resultsColumns = wrapper.findAll('.results-column')

    expect(programColumns).toHaveLength(3)
    expect(resultsColumns).toHaveLength(3)
  })

  it('displays program column header', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const programHeader = wrapper.find('.program-column .column-header h4')
    expect(programHeader.text()).toBe('Program')
  })

  it('displays results column header', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const resultsHeader = wrapper.find('.results-column .column-header h4')
    expect(resultsHeader.text()).toBe('Results')
  })

  it('renders RoundCard components for program', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const roundCards = wrapper.findAllComponents(RoundCard)
    expect(roundCards.length).toBeGreaterThan(0)
  })

  it('displays pending result message when round has no results', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses
    store.state.race.roundResults = []

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const pendingResults = wrapper.findAll('.pending-result')
    expect(pendingResults.length).toBeGreaterThan(0)
    expect(pendingResults[0].text()).toContain('Race not started')
  })

  it('displays round results when available', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = mockRounds
    store.state.race.raceHorses = mockRaceHorses
    store.state.race.roundResults = mockRoundResults

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const roundCards = wrapper.findAllComponents(RoundCard)
    const resultCards = roundCards.filter((card) => card.props('isResult') === true)
    
    expect(resultCards.length).toBeGreaterThan(0)
  })

  it('passes correct props to program RoundCard', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = [mockRounds[0]]
    store.state.race.raceHorses = mockRaceHorses

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const roundCards = wrapper.findAllComponents(RoundCard)
    const programCard = roundCards.find((card) => card.props('isResult') === false)

    expect(programCard).toBeDefined()
    expect(programCard?.props('roundNumber')).toBe(1)
    expect(programCard?.props('distance')).toBe(1200)
    expect(programCard?.props('isResult')).toBe(false)
  })

  it('passes correct props to result RoundCard', () => {
    store.state.race.programGenerated = true
    store.state.race.rounds = [mockRounds[0]]
    store.state.race.raceHorses = mockRaceHorses
    store.state.race.roundResults = mockRoundResults

    const wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store],
      },
    })

    const roundCards = wrapper.findAllComponents(RoundCard)
    const resultCard = roundCards.find((card) => card.props('isResult') === true)

    expect(resultCard).toBeDefined()
    expect(resultCard?.props('roundNumber')).toBe(1)
    expect(resultCard?.props('distance')).toBe(1200)
    expect(resultCard?.props('isResult')).toBe(true)
    expect(resultCard?.props('horses')).toEqual(mockRoundResults[0].horses)
  })
})
