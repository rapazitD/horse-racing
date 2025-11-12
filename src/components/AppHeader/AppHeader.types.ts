export interface AppHeaderProps {
  isRaceRunning: boolean
  currentRound: number
  allRoundsCompleted: boolean
  raceInProgress: boolean
}

export interface AppHeaderEmits {
  generateProgram: []
  toggleRace: []
}
