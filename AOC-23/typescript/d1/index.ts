import { readInput } from '@/utils'
console.clear()

/**
 * NOTE: (for future me)...
 * I'm using a positive lookahead assertion here to capture any **overlapping matches**
 * `(eg: "zerone", "nineight" etc)`
 *
 * It's basically akin to saying:
 * "Find matches for this pattern, but don't consume the matches
 * so that we can find overlapping matches in the remaining string"
 */
const numRegex = /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g
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

const input = readInput(import.meta.url)
const lines = input.split('\n')

const calibrationValues = lines.map((_line, idx) => {
  const clonedLines = [...lines] // Let's not mutate the original array! 👑
  let firstNum
  let lastNum

  // Shiny replacer function 🤔 Haven't used this before... (saves us from having to use `.matchAll` 😉)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  clonedLines[idx].replace(numRegex, (_match, p1) => {
    if (!firstNum) firstNum = numMap[p1] ?? p1
    lastNum = numMap[p1] ?? p1
    return numMap[p1] ?? p1
  })
  return firstNum + lastNum
})

const solution = calibrationValues.reduce((acc, num) => acc + parseInt(num), 0)
console.log('total >', solution)
