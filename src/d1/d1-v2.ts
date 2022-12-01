import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').split(/\r?\n/)

const inputSplit = input.split(/\r?\n/).map((string: string) => +string)

const allElves = []
let elfItems: Array<number> = []

for (let i = 0; i < inputSplit.length; i++) {
  if (inputSplit[i]) {
    elfItems.push(inputSplit[i])
  } else {
    allElves.push(elfItems)
    elfItems = []
  }
}

const allElvesTotalledOrdered = allElves
  .map((elfItems: Array<number>) => {
    return elfItems.reduce((acc: number, curr: number) => acc + curr, 0)
  })
  .sort(function (a, b) {
    return b - a
  })

const largestElf = allElvesTotalledOrdered[0]
const top3Elves = allElvesTotalledOrdered
  .splice(0, 3)
  .reduce((acc: number, curr: number) => acc + curr, 0)

console.log(largestElf, top3Elves)
