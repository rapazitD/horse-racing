import type { RoundHorse } from '@/types'

export interface RoundCardProps {
  roundNumber: number
  distance: number
  horses: RoundHorse[]
  isResult?: boolean
}

export type { RoundHorse } from '@/types'
