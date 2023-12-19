import { readInput } from '@/utils'
import Puzzle from '../Puzzle'

const input = readInput(import.meta.url)
const day3 = new Puzzle(input)

const lines = input.split('\n')

const isSymbol = (char: string) => /[@#$%&*\/+\-=]/.test(char)

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

  lines.forEach(([...chars], lr) => {
    let numsBuffer = ''
    let matchedNum = false

    chars.forEach((char, lc) => {
      // Early return if we find a symbol or '.' character (only check digit characters)
      if (isSymbol(char) || char === '.') {
        numsBuffer = ''
        matchedNum = false
        return
      }

      const endOfLine = lc === chars.length - 1

      numsBuffer += char

      // Check if the digit is a neighbour of any of the identified symbols
      // Return the obj (to store the col & row later)
      const isAdjacent = symbolCoordinates.find((symbol) => {
        return Math.abs(lr - symbol.row) <= 1 && Math.abs(lc - symbol.col) <= 1 // Abs to ensure we're always returning the correct difference in rows
      })

      matchedNum ||= Boolean(isAdjacent)

      if (matchedNum && (chars[lc + 1] === '.' || isSymbol(chars[lc + 1]) || endOfLine)) {
        matchedNums.push(numsBuffer)
        numsBuffer = ''
      }
    })
  })

  return matchedNums.reduce((a, b) => a + Number(b), 0)
}

day3.solve(partOne) // 527144
console.log(day3.answers)
