import { readInput } from '@/utils'
import Puzzle from '../Puzzle'

const input = readInput(import.meta.url)
const day3 = new Puzzle(input)

const lines = input.split('\n')

const isSymbol = (char: string) => /[@#$%&*\/+\-=]/.test(char)
const isDigit = (char: string) => /[0-9]/.test(char)

type SymbolCoordinates = [{ matchedString: string; row: number; col: number }]

function getSymbolCoordinates() {
  const symbolStorage = []

  lines.forEach(([...chars], row) => {
    chars.forEach((char, col) => {
      if (isSymbol(char)) {
        symbolStorage.push({ matchedString: char, row, col })
      }
    })
  })
  return symbolStorage as SymbolCoordinates
}

function partOne() {
  const symbolCoordinates = getSymbolCoordinates()
  const matchedNums = []

  lines.forEach(([...chars], charRow) => {
    let numBuffer = []
    let foundMatch = false

    chars.forEach((char, charCol) => {
      const endOfLine = chars[charCol + 1] === undefined
      const shouldPushMatch = foundMatch && (char === '.' || isSymbol(char) || endOfLine)

      if (isDigit(char)) {
        numBuffer.push(char)
      }

      // Continue to push numbers until we hit an invalid character, or reach the end of the line
      if (shouldPushMatch) {
        matchedNums.push(numBuffer.join(''))
        foundMatch = false
        numBuffer = []
      }

      if (!isDigit(char)) {
        numBuffer = [] // Clear saved numbers from the buffer if current char is a Symbol or "."
      }

      // Checking that the character is located within 1 space of the Symbol in any direction (+ or - one row)
      const charIsNeighbour = symbolCoordinates.find(
        (symbol) =>
          (symbol.row === charRow || symbol.row === charRow - 1 || symbol.row === charRow + 1) &&
          (symbol.col === charCol || symbol.col === charCol - 1 || symbol.col === charCol + 1)
      )

      if (charIsNeighbour && !isSymbol(char) && char !== '.') {
        foundMatch = true
      }
    })
  })

  console.log('matches', matchedNums)
  return matchedNums.reduce((a, b) => a + Number(b), 0)
}

day3.solve(partOne) // 527144
console.log(day3.answers)
