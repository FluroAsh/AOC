import { readInput } from '@/utils'
import Puzzle from '../Puzzle'
console.clear()

const input = readInput(import.meta.url)
const day3 = new Puzzle(input)

const lines = input.split('\n')

const isSymbol = (char: string) => /[@#$%&*\/+\-=]/.test(char)
const isDigit = (char: string) => /[0-9]/.test(char)

type SymbolCoordinates = [{ matchedString: string; row: number; col: number }]

function getSymbolCoordinates() {
  const symbolStorage = []

  lines.forEach(([...chars], i) => {
    chars.forEach((char, k) => {
      if (isSymbol(char)) {
        symbolStorage.push({ matchedString: char, row: i, col: k })
      }
    })
  })
  return symbolStorage as SymbolCoordinates
}

function partOne() {
  // NOTE:
  // For every number in a line, get the first and last number (as-well as index)
  // Then check if it overlaps with a symbol on the same, previous or following row
  const symbolCoordinates = getSymbolCoordinates()
  const matches = []

  lines.forEach(([...chars], charRow) => {
    let numSequence = []
    let foundMatch = false

    chars.forEach((char, charCol) => {
      const hasNums = numSequence.length > 0
      const endOfLine = chars[charCol + 1] === undefined
      const shouldPushMatch = hasNums && foundMatch && (char === '.' || isSymbol(char) || endOfLine)

      if (shouldPushMatch) {
        if (endOfLine) numSequence.push(char)
        // console.log('> Pushing', matchedNums, { char, matchFound: foundMatch })
        matches.push(numSequence.join(''))
        foundMatch = false
        numSequence = []
      }

      if (isDigit(char)) {
        numSequence.push(char)
        // console.log('> Adding num >>', matchedNums) // when digit is found
      } else {
        numSequence = [] // Clear saved numbers if it's a Symbol or "."
      }

      // Checking that the character row is located within 1 space of the Symbol in any direction
      const charIsNeighbour = symbolCoordinates.find(
        (symbol) =>
          (symbol.row === charRow || symbol.row === charRow - 1 || symbol.row === charRow + 1) &&
          (symbol.col === charCol || symbol.col === charCol - 1 || symbol.col === charCol + 1)
      )

      if (charIsNeighbour && !isSymbol(char) && char !== '.') {
        // console.log(' >> ✅ Match', char)
        foundMatch = true
      }
    })
  })

  console.log('matches', matches)
  return matches.reduce((a, b) => a + Number(b), 0)
}

day3.solve(partOne) // 527144
console.log(day3.answers)
