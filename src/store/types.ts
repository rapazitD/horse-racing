import type { Horse } from '@/components/HorseList'
import type { RaceHorse } from '@/components/RaceTrack'
import type { TabData } from '@/components/ResultsPanel'
import type { RoundHorse } from '@/types'

export interface HorseState {
  horses: Horse[]
}

export interface RoundConfig {
  roundNumber: number
  distance: number
}

export interface RoundResult {
  roundNumber: number
  distance: number
  horses: RoundHorse[]
}

export interface RaceState {
  raceHorses: RaceHorse[]
  isRaceRunning: boolean
  currentRound: number
  currentDistance: number
  rounds: RoundConfig[]
  programGenerated: boolean
  raceStarted: boolean
  currentRoundCompleted: boolean
  allRoundsCompleted: boolean
  raceInProgress: boolean
  roundResults: RoundResult[]
  resultTabs: TabData[]
}

export interface RootState {
  horse: HorseState
  race: RaceState
}
