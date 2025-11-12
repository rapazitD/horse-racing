import type { Horse } from '@/components/HorseList'

const horseNames = [
  'Ada Lovelace',
  'Grace Hopper',
  'Margaret Hamilton',
  'Joan Clarke',
  'Hedy Lamarr',
  'Dorothy Vaughan',
  'Katherine Johnson',
  'Shirley Jackson',
  'Thunder Gulch',
  'Dance Smartly',
  'Majestic Prince',
  'Fusaichi Pegasus',
  'Rainbow Quest',
  'Sunday Silence',
  'Easy Goer',
  'Gilded Time',
  'Desert Orchid',
  'Midnight Sun',
  'Golden Horn',
  'Black Diamond',
]

const colors = [
  { name: 'Blue', code: '#0066CC' },
  { name: 'Red', code: '#DC143C' },
  { name: 'Green', code: '#228B22' },
  { name: 'Yellow', code: '#FFD700' },
  { name: 'Purple', code: '#8B008B' },
  { name: 'Orange', code: '#FF8C00' },
  { name: 'Pink', code: '#FF1493' },
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Brown', code: '#8B4513' },
  { name: 'Gray', code: '#808080' },
  { name: 'Cyan', code: '#00CED1' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Lime', code: '#32CD32' },
  { name: 'Indigo', code: '#4B0082' },
  { name: 'Teal', code: '#008080' },
  { name: 'Maroon', code: '#800000' },
  { name: 'Navy', code: '#000080' },
  { name: 'Olive', code: '#808000' },
  { name: 'Coral', code: '#FF7F50' },
]

function generateCondition(): number {
  // Generate condition between 1 and 100
  return Math.floor(Math.random() * 100) + 1
}

export function generateRandomHorses(count: number = 20): Horse[] {
  const horses: Horse[] = []
  const usedNames = new Set<string>()

  // Shuffle colors array to ensure unique colors
  const shuffledColors = [...colors].sort(() => Math.random() - 0.5)

  for (let i = 1; i <= count; i++) {
    // Get unique name
    let name = horseNames[Math.floor(Math.random() * horseNames.length)]!
    while (usedNames.has(name)) {
      name = horseNames[Math.floor(Math.random() * horseNames.length)]!
    }
    usedNames.add(name)

    // Get unique color for each horse
    const colorObj = shuffledColors[i - 1] || shuffledColors[0]!

    horses.push({
      id: i,
      name,
      condition: generateCondition(),
      color: colorObj.name,
      colorCode: colorObj.code,
      position: 0,
    })
  }

  return horses
}
