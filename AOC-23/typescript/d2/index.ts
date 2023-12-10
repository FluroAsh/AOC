import { readInput } from '@/utils'
console.clear()

const input = readInput(import.meta.url)
const lines = input.split('\n')

type GameData = {
  [gameId: string]: Array<string>
}

// Answer = Return games that can only be possible given the bag contains (should be the sum of IDs):
// "12 red", "13 green", "14 blue"

const config = { red: 12, green: 13, blue: 14 }

let possibleGames: number[] = []
console.log('> [OBJECTIVE]: Must be possible with "12 red", "13 green" and "14 blue"')

// for each line (game)
lines.forEach((line) => {
  let isPossible = true

  const data = line.split(/[:;]/).map((line) => line.trim())
  const [gameString, ...sets] = data
  const gameNumber = gameString.replace(/Game\s+/, '') // extract the number of the game from the string

  sets.forEach((subset) => {
    const handful = subset.split(/,\s+/) // Separate colors from each other

    // Checking for each handful if we have any colors that exceed the
    // color limit (in config) for the subset
    handful.forEach((colorData) => {
      const [colorCount, color] = colorData.split(' ')

      if (Number(colorCount) > config[color]) {
        isPossible = false
      }
    })
  })

  if (isPossible) possibleGames.push(parseInt(gameNumber))
})

const sum = possibleGames.reduce((a, b) => a + b, 0)
console.log({ possibleGames, sum })
// 2545
