import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const inputArray = input.split(/\r?\n/)

function splitLine(line: string): string[] {
  const mid = line.length / 2
  return [line.slice(0, mid), line.slice(mid)]
}

function removeDuplicates(compartments: string[]): string[] {
  return [
    [...new Set(compartments[0])].join(''),
    [...new Set(compartments[1])].join('')
  ]
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

let total = 0

// Splits up ruckSacks (line) into its compartments
const ruckSacks = inputArray.map((line) => {
  const compartments = splitLine(line)
  return removeDuplicates(compartments)
})

ruckSacks.map((compartments) => {
  const [compartmentA, compartmentB] = compartments

  for (let char of compartmentA) {
    if (compartmentB.includes(char)) {
      total += letterPriority(char)
    }
  }
})

console.log({ total })
