import fs from 'fs'

function formatInput(input: string): Array<number> {
  return input.split('\n').map((e) => Number(e))
}

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const calorieArray: Array<number> = formatInput(input)

let current = 0
let totals: Array<number> = []

for (let val of calorieArray) {
  console.log({ current, val }, val === 0 ? '\n--NO MORE CALS!--' : '')
  if (val === 0) {
    totals.push(current)
    current = 0
  } else {
    current += val
  }
}

let maxCalories = Math.max(...totals)
console.log(`Q1. Wow! The fattest elf eats... ${maxCalories} calories!`)

// Q2
const NUM_ELVES = 3

const getFatElfCalories = (n: number) => {
  return totals
    .sort((a, b) => a - b)
    .slice(-n)
    .reduce((total, val) => total + val, 0)
    .toLocaleString()
}

console.log(
  `Q2. Wow... ${NUM_ELVES} elves? That's ${getFatElfCalories(
    NUM_ELVES
  )} calories!`
)
