import * as fs from 'fs'

type LineMatchGroups = {
  [key: string]: {
    lineNumber: number
    originalValue: string
    newValue: string
  }[]
}

function replaceWordNumbers(lineMatchGroups: LineMatchGroups) {
  const clonedLines = lines

  for (const [lineNumber, numberMatches] of Object.entries(lineMatchGroups)) {
    numberMatches.forEach(({ originalValue, newValue }) => {
      lines[lineNumber] = lines[lineNumber].replace(originalValue, newValue)
    })
  }
  return clonedLines
}

function findLinePatternSum(numberfiedLines: string[]) {
  return numberfiedLines.reduce((acc, line) => {
    const nums = [...line].filter((char) => Number(char))
    const [first, last] = [nums[0], nums[nums.length - 1]] // grab first and last numbers
    const total = parseInt(first.concat(last))

    // console.log(total)
    return (acc += total)
  }, 0)
}

// Your code goes here. Good luck!
const input = fs.readFileSync('input.txt', 'utf-8')

const numRegex = /(one|two|three|four|five|six|seven|eight|nine)/g
const numMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
}

const lines = input.split('\n')

const lineMatchGroups: LineMatchGroups = lines.reduce((acc, line, index) => {
  let match

  // Check each line for a `numRegex` match
  // If there's a match, store metadata about the match (for replacing it later)
  while ((match = numRegex.exec(line)) !== null) {
    const lineNumber = index

    // If it's a match, add it to the Object, along with previous matches...
    const matchObj = {
      lineNumber,
      originalValue: match[0],
      newValue: numMap[match[0]]
    }

    acc[lineNumber] = acc[lineNumber] ? [...acc[lineNumber], matchObj] : [matchObj]
  }
  return acc
}, {})

const numberfiedLines = replaceWordNumbers(lineMatchGroups)
const answer = findLinePatternSum(numberfiedLines)
console.log('Woohoo! The answer is: ', answer)
