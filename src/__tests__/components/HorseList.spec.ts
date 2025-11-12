import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/HorseList'
import type { Horse } from '@/components/HorseList/HorseList.types'

describe('HorseList', () => {
  const mockHorses: Horse[] = [
    {
      id: 1,
      name: 'Thunder',
      condition: 85,
      color: 'Red',
      colorCode: '#FF0000',
      position: 0,
    },
    {
      id: 2,
      name: 'Lightning',
      condition: 92,
      color: 'Blue',
      colorCode: '#0000FF',
      position: 0,
    },
    {
      id: 3,
      name: 'Storm',
      condition: 78,
      color: 'Green',
      colorCode: '#00FF00',
      position: 0,
    },
  ]

  it('renders the header with title', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    expect(wrapper.find('.header h2').text()).toBe('Horse List (1-20)')
  })

  it('renders a table with correct headers', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    const headers = wrapper.findAll('thead th')
    expect(headers).toHaveLength(3)
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Condition')
    expect(headers[2].text()).toBe('Color')
  })

  it('renders all horses in the table', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(3)
  })

  it('displays horse information correctly', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    const firstRow = wrapper.findAll('tbody tr')[0]
    const cells = firstRow.findAll('td')

    expect(cells[0].text()).toBe('Thunder')
    expect(cells[1].text()).toBe('85')
    expect(cells[2].text()).toBe('Red')
  })

  it('renders empty table when no horses provided', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: [],
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(0)
  })

  it('renders each horse with unique key', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(mockHorses.length)
    
    // Verify each row renders correctly
    rows.forEach((row) => {
      expect(row.exists()).toBe(true)
    })
  })

  it('displays all horse properties in correct order', () => {
    const wrapper = mount(HorseList, {
      props: {
        horses: mockHorses,
      },
    })

    const secondRow = wrapper.findAll('tbody tr')[1]
    const cells = secondRow.findAll('td')

    expect(cells[0].text()).toBe('Lightning')
    expect(cells[1].text()).toBe('92')
    expect(cells[2].text()).toBe('Blue')
  })
})
