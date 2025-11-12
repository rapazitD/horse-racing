import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'
import AppButton from '@/components/AppButton'

describe('AppHeader', () => {
  const defaultProps = {
    isRaceRunning: false,
    currentRound: 1,
    allRoundsCompleted: false,
    raceInProgress: false,
  }

  it('renders the title', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
    })

    expect(wrapper.find('.title').text()).toBe('Horse Racing')
  })

  it('renders two AppButton components', () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
    })

    const buttons = wrapper.findAllComponents(AppButton)
    expect(buttons).toHaveLength(2)
  })

  it('displays "START ROUND X" when race is not running', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        currentRound: 3,
        isRaceRunning: false,
      },
    })

    expect(wrapper.text()).toContain('START ROUND 3')
  })

  it('displays "PAUSE ROUND X" when race is running', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        currentRound: 2,
        isRaceRunning: true,
      },
    })

    expect(wrapper.text()).toContain('PAUSE ROUND 2')
  })

  it('displays "ALL ROUNDS COMPLETED" when all rounds are done', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        allRoundsCompleted: true,
      },
    })

    expect(wrapper.text()).toContain('ALL ROUNDS COMPLETED')
  })

  it('emits generateProgram event when generate button is clicked', async () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
    })

    const buttons = wrapper.findAllComponents(AppButton)
    await buttons[0].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('generateProgram')
    expect(wrapper.emitted('generateProgram')).toHaveLength(1)
  })

  it('emits toggleRace event when toggle button is clicked', async () => {
    const wrapper = mount(AppHeader, {
      props: defaultProps,
    })

    const buttons = wrapper.findAllComponents(AppButton)
    await buttons[1].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('toggleRace')
    expect(wrapper.emitted('toggleRace')).toHaveLength(1)
  })

  it('disables generate program button when race is in progress', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        raceInProgress: true,
      },
    })

    const buttons = wrapper.findAllComponents(AppButton)
    expect(buttons[0].props('disabled')).toBe(true)
  })

  it('disables toggle race button when all rounds are completed', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        allRoundsCompleted: true,
      },
    })

    const buttons = wrapper.findAllComponents(AppButton)
    expect(buttons[1].props('disabled')).toBe(true)
  })

  it('enables generate program button when race is not in progress', () => {
    const wrapper = mount(AppHeader, {
      props: {
        ...defaultProps,
        raceInProgress: false,
      },
    })

    const buttons = wrapper.findAllComponents(AppButton)
    expect(buttons[0].props('disabled')).toBe(false)
  })
})
