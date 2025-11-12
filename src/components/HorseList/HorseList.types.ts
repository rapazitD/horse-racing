export interface Horse {
  id: number
  name: string
  condition: number
  color: string
  colorCode: string
  position: number
}

export interface HorseListProps {
  horses: Horse[]
}
