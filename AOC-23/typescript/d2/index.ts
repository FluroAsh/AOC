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

function partTwo() {
  const powers = []

  // For each game, iterate over each subset & pick, updating the "requiredCount" Object
  // Before calculating the power sum for the game and returning the sum of each games power total
  Object.entries(parsedData).map(([_, subsets]) => {
    const requiredCount = { red: 0, green: 0, blue: 0 }

    subsets.forEach((subset) => {
      subset.forEach((colorPick) => {
        const [colorCount, colorName] = colorPick.split(' ')

        requiredCount[colorName] =
          requiredCount[colorName] < Number(colorCount) ? Number(colorCount) : requiredCount[colorName]
      })
    })
    powers.push(requiredCount['red'] * requiredCount['green'] * requiredCount['blue'])
  })

  return powers.reduce((a, b) => a + b, 0)
}

day2.solve(partOne)
day2.solve(partTwo)
console.log(day2.answers)
