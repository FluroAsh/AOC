import { readInput } from '@/utils'
import Puzzle from '../Puzzle'
console.clear()

const input = readInput(import.meta.url)
const day2 = new Puzzle(input)
const lines = input.split('\n')

type GameData = { [gameId: string]: string[][] }

const config = { red: 12, green: 13, blue: 14 }

const parsedData: GameData = lines.reduce((acc, line) => {
  const [gameString, ...sets] = line.split(/[:;]\s+/)
  const gameNumber = gameString.split(/\s+/)[1] // extract the number of the game from the string
  const parsedSets = sets.map((subset) => subset.split(/,\s+/)) // separate each color "pick" in the array

  acc[gameNumber] = parsedSets
  return acc
}, {})

function partOne() {
  // Check if the color picks contain any INVALID values based on our "config" Object
  const validIds = Object.entries(parsedData).map(([gameNumber, subsets]) => {
    // search each subset to determine if the set is valid (doesn't break config rules)
    const validSetValues = subsets.map((subset) => {
      const validSubsets = subset.every((colorPick) => {
        const [colorCount, colorName] = colorPick.split(' ')
        return Number(colorCount) <= config[colorName]
      })
      return validSubsets
    })

    const validSet = validSetValues.every((e) => e === true) // Check if the set is valid based on if EVERY subset is valid
    return validSet ? parseInt(gameNumber) : null
  })

  const answer = validIds.reduce((a, b) => a + b, 0)
  return answer
}

day2.solve(partOne) // 2545
console.log(day2.answers)
