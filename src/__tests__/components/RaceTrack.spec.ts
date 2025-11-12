import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrack from '@/components/RaceTrack'
import type { RaceHorse } from '@/components/RaceTrack/RaceTrack.types'

describe('RaceTrack', () => {
  const mockRaceHorses: RaceHorse[] = [
    {
      id: 1,
      name: 'Thunder',
      condition: 85,
      color: 'Red',
      colorCode: '#FF0000',
      position: 25,
      lane: 1,
    },
    {
      id: 2,
      name: 'Lightning',
      condition: 92,
      color: 'Blue',
      colorCode: '#0000FF',
      position: 50,
      lane: 5,
    },
  ]

  const defaultProps = {
    horses: mockRaceHorses,
    currentRound: 1,
    currentDistance: 1200,
  }

  it('renders the race track container', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    expect(wrapper.find('.race-track').exists()).toBe(true)
    expect(wrapper.find('.track-container').exists()).toBe(true)
  })

  it('renders 10 lanes', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const lanes = wrapper.findAll('.lane')
    expect(lanes).toHaveLength(10)
  })

  it('displays lane numbers from 1 to 10', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const laneNumbers = wrapper.findAll('.lane-number')
    expect(laneNumbers).toHaveLength(10)
    expect(laneNumbers[0].text()).toBe('1')
    expect(laneNumbers[9].text()).toBe('10')
  })

  it('displays race info with current round and distance', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        ...defaultProps,
        currentRound: 3,
        currentDistance: 1800,
      },
    })

    const raceInfo = wrapper.find('.race-info .round-info')
    expect(raceInfo.text()).toBe('Round 3 - 1800m')
  })

  it('renders horses in their assigned lanes', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const horses = wrapper.findAll('.horse')
    expect(horses.length).toBeGreaterThan(0)
  })

  it('positions horses according to their position percentage', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const lanes = wrapper.findAll('.lane')
    const firstLane = lanes[0]
    const horse = firstLane.find('.horse')

    expect(horse.exists()).toBe(true)
    expect(horse.attributes('style')).toContain('left: 25%')
  })

  it('renders horse icon with correct color', () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const horseIcons = wrapper.findAll('.horse-icon')
    expect(horseIcons.length).toBeGreaterThan(0)
    expect(horseIcons[0].attributes('fill')).toBe('#FF0000')
  })

  it('renders empty lanes when no horse is assigned', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        horses: [mockRaceHorses[0]], // Only one horse in lane 1
        currentRound: 1,
        currentDistance: 1200,
      },
    })

    const lanes = wrapper.findAll('.lane')
    const secondLane = lanes[1] // Lane 2 should be empty
    const horse = secondLane.find('.horse')

    expect(horse.exists()).toBe(false)
  })

  it('handles empty horses array', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        horses: [],
        currentRound: 1,
        currentDistance: 1200,
      },
    })

    const lanes = wrapper.findAll('.lane')
    expect(lanes).toHaveLength(10)

    const horses = wrapper.findAll('.horse')
    expect(horses).toHaveLength(0)
  })

  it('updates when horses positions change', async () => {
    const wrapper = mount(RaceTrack, {
      props: defaultProps,
    })

    const updatedHorses = [
      { ...mockRaceHorses[0], position: 75 },
      { ...mockRaceHorses[1], position: 80 },
    ]

    await wrapper.setProps({ horses: updatedHorses })

    const lanes = wrapper.findAll('.lane')
    const firstLaneHorse = lanes[0].find('.horse')

    expect(firstLaneHorse.attributes('style')).toContain('left: 75%')
  })
})
