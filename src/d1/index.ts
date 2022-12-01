import * as fs from 'fs'
const NUM_ELVES = 3

let calorieArray: Array<number> = []

fs.readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((n) => Number(n))
  .reduce((total: number, val: number) => {
    if (val) {
      console.log('----')
      console.log({ val, total })
      total += val
    } else {
      console.log('\n-- 🎅📣 Next Elf! 🦌 --\n')
      calorieArray.push(total)
      total = 0
    }
    return total
  }, 0)

let maxCalories = Math.max(...calorieArray)
console.log('---RESULT---\n', { maxCalories })

const sortedCalories = calorieArray.sort((a, b) => a - b)

const getFatElfCalories = (n: number) => {
  const elves = sortedCalories.slice(-n)
  return elves
    .reduce((total: number, val: number) => total + val, 0)
    .toLocaleString()
}

console.log(
  `Wow... ${NUM_ELVES} elves? That's ${getFatElfCalories(NUM_ELVES)} calories!`
)
