import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const inputArray = input.split(/\n/)

function removeDuplicates(ruckSack: string): string {
  return [...new Set(ruckSack)].join('')
}

function letterPriority(letter: string): number {
  // Priority Equals:
  // Unicode character decimal code - ([1-26]/[27-52] - Unicode character decimal code)
  if (/[a-z]/.test(letter)) {
    return letter.charCodeAt(0) - 96
  }

  if (/[A-Z]/.test(letter)) {
    return letter.charCodeAt(0) - 38
  }

  throw Error(`This isn't a letter... ${letter}`)
}

function checkSharedItem(sackA: string, sackB: string, sackC: string) {
  let matchedChar = undefined
  console.log('\n', { sackA, sackB, sackC })

  for (let char of sackA) {
    if (sackB.includes(char) && sackC.includes(char)) {
      matchedChar = char
    }
  }
  return matchedChar
}

// return array of ruckSacks containing unique characters
const ruckSacks = inputArray.map((ruckSack) => {
  return removeDuplicates(ruckSack)
})

let total = 0
let group = [] // holds the groups of 3

for (let ruckSack of ruckSacks) {
  group.push(ruckSack)

  if (group.length === 3) {
    const [sackA, sackB, sackC] = group
    const sharedItem = checkSharedItem(sackA, sackB, sackC)

    console.log(sharedItem ? `Found the shared item! --> ${sharedItem}` : '')
    total = sharedItem ? total + letterPriority(sharedItem) : total + 0
    group = [] // reset length === 0 to check next group
  }
}

console.log({ total })
