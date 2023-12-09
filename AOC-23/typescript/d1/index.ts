import * as fs from 'fs'
console.clear()
// answer is: "56017"

type LineMatchGroups = {
  [key: string]: {
    lineNumber: number
    originalValue: string
    newValue: string
  }[]
}

// Your code goes here. Good luck!
const input = fs.readFileSync('input.txt', 'utf-8')

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

const lines = input.split('\n')
// We just have to return an array of the concatenated numbers (eg: 1 and 1 = 11)

// Update the numbers (works fine)
const nums = lines.map((line) => {
  const matches = line.matchAll(numRegex)

  let first = matches.next().value[1]
  let last = first

  for (const match of matches) {
    last = match[1]
  }
  const nums = [numMap[first] ?? first, numMap[last] ?? last]
  return nums.join('')
})

const sum = nums.reduce((acc, num) => {
  acc += parseInt(num)
  return acc
}, 0)

console.log(sum)
