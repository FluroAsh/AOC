import { readInput } from '@/utils'
import Puzzle from '../Puzzle'
console.clear()

const input = readInput(import.meta.url)
const day3 = new Puzzle(input)

const lines = input.split('\n')

// index of the line
// starting end of the number, end index of the number
// index of the symbol
// > compare the index of the symbol to the start & end index of the number
// > if the difference is greater than one then don't include in the sum...

function getSymbolCoordinates() {
  const symbolStorage = []

  lines.forEach(([...chars], i) => {
    chars.forEach((char, k) => {
      const symbolRegex = /[@#$%&*\/+\-=]/

      const symbolMatch = symbolRegex.test(char)
      if (symbolMatch) {
        console.log(char, i, k) // NOTE: Logging symbol matches
        symbolStorage.push({ matchedString: char, row: i + 1, col: k })
      }
    })
  })
  console.log(symbolStorage)
  return symbolStorage
}

function partOne() {
  // find indexes of symbols
  // 1. For every symbol, check the previous element and next element for a number
  // 2. If that element is no more than 1 from the symbol index (eg: Symbol index 2 & Element number index is )

  // current row
  // check previous (-1) and next (+1)
  const symbolCoordinates = getSymbolCoordinates()
  const numberMatches = []
  const adjacentNumbers = []

  lines.forEach((chars, i) => {
    const regex = /\d{0,}/g
    const matches = chars.matchAll(regex)

    for (const match of matches) {
      const matchedString = match[0]
      const lastIndex = match.index + matchedString.length - 1

      if (matchedString) {
        numberMatches.push({ matchedString, row: i + 1, startCol: match.index, endCol: lastIndex })
      }
    }
  })

  console.log(numberMatches)
  numberMatches.forEach(({ matchedString: number, row: numberRow, startCol, endCol }) => {
    symbolCoordinates.forEach(({ matchedString: _symbol, row: symbolRow, col: symbolCol }) => {
      // same row, previous row or next row
      const maxRow = symbolRow + 1
      const minRow = symbolRow - 1 < 0 ? symbolRow : symbolRow - 1
      const inRange = symbolRow === numberRow || numberRow === maxRow || numberRow === minRow

      // check if number row is range of the symbol (-1, 0, +1)
      if (inRange) {
        // console.log(`${number} found in row range. Symbol = ${symbol}`)
        const start = symbolCol === startCol || symbolCol === startCol - 1
        const end = symbolCol === endCol || symbolCol === endCol + 1
        const isNeighbour = start || end
        // console.log({ isNeighbour, symbolCol, startCol, endCol, start, end })

        if (isNeighbour) {
          adjacentNumbers.push(number)
        }
      }
    })
  })
  console.log(adjacentNumbers)
  return adjacentNumbers.reduce((a, b) => a + Number(b), 0)
}

day3.solve(partOne) // 441902 (too low) - (answer = 527144)
console.log(day3.answers)
