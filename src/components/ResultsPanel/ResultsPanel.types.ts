export interface RaceResult {
  position: number
  horse: string
}

export interface TabData {
  name: string
  results: RaceResult[]
}

export interface ResultsPanelProps {
  tabs: TabData[]
}
