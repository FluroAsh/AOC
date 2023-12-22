import { readInput } from '@/utils'

import Puzzle from '../Puzzle'

const input = readInput(import.meta.url)
const day4 = new Puzzle(input)

function findMatches(winners, pickedNumbers) {
  return pickedNumbers.filter((pickedNumber) => {
    if (!winners.includes(pickedNumber)) return
    return pickedNumber
  })
}

const splitGameData = (gameData: Array<string>) => gameData.map((data) => data.split(/\s+/))
const parseCard = (card: string) => card.split(/Card\s+\d+:\s+|\s\|\s/).slice(1)

function partOne() {
  const cards = input.split('\n')

  const parsedGames = cards.map((card) => parseCard(card))

  const gameTotals = parsedGames.map((gameData) => {
    const [winners, pickedNumbers] = splitGameData(gameData)

    const matches = findMatches(winners, pickedNumbers)

    return matches.reduce((acc, _, idx) => {
      if (idx === 0) return acc + 1
      return acc * 2
    }, 0)
  })

  return gameTotals.reduce((a, b) => a + b, 0)
}

day4.solve(partOne)
console.log(day4.answers)
