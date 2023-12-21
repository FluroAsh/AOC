import { readInput } from '@/utils'
import Puzzle from '../Puzzle'

const input = readInput(import.meta.url)
const day3 = new Puzzle(input)

const lines = input.split('\n')

const isSymbol = (char: string) => /[@#$%&*\/+\-=]/.test(char)

type GearCoordinates = [{ gear: string; row: number; col: number }]

// TODO: Optimize both solutions to make use of an Object, with each row/col stored on it
// so we can reference the specifc gear, rather than search every gear symbol/row col object.
function getGearCords() {
  const gearCoordinates = []

  lines.forEach(([...chars], row) => {
    chars.forEach((char, col) => {
      if (isSymbol(char)) {
        gearCoordinates.push({ gear: char, row, col })
      }
    })
  })
  return gearCoordinates as GearCoordinates
}

function partOne() {
  const gearCoordinates = getGearCords()
  const matchedNums = []

  lines.forEach(([...chars], lr) => {
    let numsBuffer = ''
    let hasMatchedNum = false
    let neighbourSymbol

    chars.forEach((char, lc) => {
      // Skip non-digit characters & reset state
      if (isSymbol(char) || char === '.') {
        numsBuffer = ''
        hasMatchedNum = false
        neighbourSymbol = undefined
        return
      }

      const endOfLine = lc === chars.length - 1

      numsBuffer += char

      // Check if the digit is a neighbour of any of the identified symbols
      neighbourSymbol ??= gearCoordinates.find((gear) => {
        return Math.abs(lr - gear.row) <= 1 && Math.abs(lc - gear.col) <= 1 // Abs to ensure we're always returning the correct difference in rows
      })

      hasMatchedNum ||= Boolean(neighbourSymbol)

      if (hasMatchedNum && (chars[lc + 1] === '.' || isSymbol(chars[lc + 1]) || endOfLine)) {
        matchedNums.push(numsBuffer)
        numsBuffer = ''
      }
    })
  })

  return matchedNums.reduce((a, b) => a + Number(b), 0)
}

function partTwo() {
  const gearCoordinates = getGearCords()
  const neighborMap: { [key: string]: Array<number> } = {}

  lines.forEach(([...chars], lr) => {
    let numsBuffer = ''
    let hasMatchedNum = false
    let neighbourSymbol

    chars.forEach((char, lc) => {
      // Skip non-digit characters & reset state
      if (isSymbol(char) || char === '.') {
        numsBuffer = ''
        hasMatchedNum = false
        neighbourSymbol = undefined
        return
      }

      const endOfLine = lc === chars.length - 1

      numsBuffer += char

      neighbourSymbol ??= gearCoordinates.find(
        (gear) => Math.abs(lr - gear.row) <= 1 && Math.abs(lc - gear.col) <= 1 // Math.Abs to ensure we're returning a positive integer
      )

      hasMatchedNum ||= Boolean(neighbourSymbol)

      if (hasMatchedNum && (chars[lc + 1] === '.' || isSymbol(chars[lc + 1]) || endOfLine)) {
        // Eaiest way I could find to selectively store each unique gears' values from the parsed input
        const { gear, row, col } = neighbourSymbol
        const key = `${gear}-${row}-${col}`
        const parsedNumber = parseInt(numsBuffer)

        neighborMap[key] = neighborMap[key] ? [...neighborMap[key], parsedNumber] : [parsedNumber]
        numsBuffer = ''
      }
    })
  })

  const total = Object.values(neighborMap).reduce((acc, numMatches) => {
    if (numMatches.length < 2) return acc // MUST only have a pair of two numbers
    return acc + numMatches[0] * numMatches[1]
  }, 0)

  return total
}

day3.solve(partOne)
day3.solve(partTwo)
console.log(day3.answers)
