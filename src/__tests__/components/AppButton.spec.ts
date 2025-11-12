import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/AppButton'

describe('AppButton', () => {
  it('renders with default props', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click Me',
      },
    })

    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-primary')
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })

  it('renders with primary variant', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary Button',
      },
    })

    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('renders disabled state', () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled Button',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: '<span>Custom Content</span>',
      },
    })

    expect(wrapper.html()).toContain('<span>Custom Content</span>')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click Me',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled Button',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
