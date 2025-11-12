import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundCard from '@/components/RoundCard'
import HorseCard from '@/components/HorseCard'
import type { RoundHorse } from '@/types'

describe('RoundCard', () => {
  const mockHorses: RoundHorse[] = [
    {
      lane: 1,
      name: 'Thunder',
      condition: 85,
      colorCode: '#FF0000',
    },
    {
      lane: 2,
      name: 'Lightning',
      condition: 92,
      colorCode: '#0000FF',
    },
    {
      lane: 3,
      name: 'Storm',
      condition: 78,
      colorCode: '#00FF00',
    },
  ]

  const defaultProps = {
    roundNumber: 1,
    distance: 1200,
    horses: mockHorses,
    isResult: false,
  }

  it('renders the round card container', () => {
    const wrapper = mount(RoundCard, {
      props: defaultProps,
    })

    expect(wrapper.find('.round-card').exists()).toBe(true)
  })

  it('displays round number in header', () => {
    const wrapper = mount(RoundCard, {
      props: {
        ...defaultProps,
        roundNumber: 3,
      },
    })

    expect(wrapper.find('.round-header h3').text()).toBe('Round 3')
  })

  it('displays distance in header', () => {
    const wrapper = mount(RoundCard, {
      props: {
        ...defaultProps,
        distance: 1800,
      },
    })

    expect(wrapper.find('.round-header .distance').text()).toBe('1800m')
  })

  it('renders HorseCard for each horse', () => {
    const wrapper = mount(RoundCard, {
      props: defaultProps,
    })

    const horseCards = wrapper.findAllComponents(HorseCard)
    expect(horseCards).toHaveLength(3)
  })

  it('passes correct props to HorseCard components', () => {
    const wrapper = mount(RoundCard, {
      props: defaultProps,
    })

    const horseCards = wrapper.findAllComponents(HorseCard)
    expect(horseCards[0].props('horse')).toEqual(mockHorses[0])
    expect(horseCards[0].props('isResult')).toBe(false)
  })

  it('passes isResult prop to HorseCard when rendering results', () => {
    const resultsHorses: RoundHorse[] = [
      {
        lane: 1,
        name: 'Thunder',
        condition: 85,
        colorCode: '#FF0000',
        finishPosition: 1,
        finishTime: 12.5,
      },
    ]

    const wrapper = mount(RoundCard, {
      props: {
        ...defaultProps,
        horses: resultsHorses,
        isResult: true,
      },
    })

    const horseCards = wrapper.findAllComponents(HorseCard)
    expect(horseCards[0].props('isResult')).toBe(true)
  })

  it('renders horses list container', () => {
    const wrapper = mount(RoundCard, {
      props: defaultProps,
    })

    expect(wrapper.find('.horses-list').exists()).toBe(true)
  })

  it('handles empty horses array', () => {
    const wrapper = mount(RoundCard, {
      props: {
        ...defaultProps,
        horses: [],
      },
    })

    const horseCards = wrapper.findAllComponents(HorseCard)
    expect(horseCards).toHaveLength(0)
  })

  it('renders all horses with their unique data', () => {
    const wrapper = mount(RoundCard, {
      props: defaultProps,
    })

    const horseCards = wrapper.findAllComponents(HorseCard)
    
    expect(horseCards[0].props('horse').name).toBe('Thunder')
    expect(horseCards[1].props('horse').name).toBe('Lightning')
    expect(horseCards[2].props('horse').name).toBe('Storm')
  })
})
