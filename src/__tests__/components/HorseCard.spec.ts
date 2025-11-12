import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseCard from '@/components/HorseCard'
import type { RoundHorse } from '@/types'

describe('HorseCard', () => {
  const mockHorse: RoundHorse = {
    lane: 3,
    name: 'Thunder',
    condition: 85,
    colorCode: '#FF5733',
  }

  it('renders horse information correctly', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: false,
      },
    })

    expect(wrapper.text()).toContain('Thunder')
    expect(wrapper.text()).toContain('Condition: 85%')
    expect(wrapper.text()).toContain('3')
  })

  it('displays lane number when not a result', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: false,
      },
    })

    expect(wrapper.find('.horse-lane').text()).toBe('3')
  })

  it('displays finish position when is a result', () => {
    const horseWithPosition: RoundHorse = {
      ...mockHorse,
      finishPosition: 1,
      finishTime: 12.5,
    }

    const wrapper = mount(HorseCard, {
      props: {
        horse: horseWithPosition,
        isResult: true,
      },
    })

    expect(wrapper.find('.horse-lane').text()).toBe('1')
  })

  it('displays finish time when is a result and has finish time', () => {
    const horseWithTime: RoundHorse = {
      ...mockHorse,
      finishPosition: 2,
      finishTime: 15.75,
    }

    const wrapper = mount(HorseCard, {
      props: {
        horse: horseWithTime,
        isResult: true,
      },
    })

    expect(wrapper.find('.finish-time').text()).toBe('15.75s')
  })

  it('does not display finish time when not a result', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: false,
      },
    })

    expect(wrapper.find('.finish-time').exists()).toBe(false)
  })

  it('applies result-item class when is a result', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: true,
      },
    })

    expect(wrapper.find('.horse-item').classes()).toContain('result-item')
  })

  it('does not apply result-item class when not a result', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: false,
      },
    })

    expect(wrapper.find('.horse-item').classes()).not.toContain('result-item')
  })

  it('renders horse icon with correct color', () => {
    const wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        isResult: false,
      },
    })

    const icon = wrapper.find('.horse-icon-small')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('fill')).toBe('#FF5733')
  })
})
