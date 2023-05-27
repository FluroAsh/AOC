import fs from 'fs'
import type { IStacks, IMoves, ITopCrates } from './d5'

// 🥴 Input Parsing Madness...
const inputs = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const [rawStacks, rawMoveSet] = inputs
  .split('\n\n') // seperate stacks from moves
  .map((lines) => lines.split('\n'))

// transform by removing spaces/square brackets into something that looks like a grid
const parsedStacks = rawStacks.map((line) =>
  [...line].filter((_, i) => i % 4 === 1)
)

const indexes = parsedStacks.pop()
const stacks: IStacks = {}

// 🏗️ Creates our stack structure
for (let line of parsedStacks) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== ' ') {
      if (!indexes) {
        continue // avoids type errors - pop 'can' return undefined
      }

      if (!stacks[indexes[i]]) {
        stacks[indexes[i]] = []
      }
      stacks[indexes[i]].unshift(line[i])
    }
  }
}

const parsedMoves: IMoves[] = []

for (let move of rawMoveSet) {
  const match = move.match(/\d+/g)?.map(Number)

  if (!match) {
    continue // again, avoids type errors - same scenario as pop
  }

  parsedMoves.push({
    count: match[0],
    from: match[1],
    to: match[2]
  })
}

function executeMoves(keepOrder?: boolean): IStacks {
  // FYI: Deep copy for when executing Part Two - prevents mutation of original stacks object
  const localStacks: IStacks = JSON.parse(JSON.stringify(stacks))

  for (let moveSet of parsedMoves) {
    const { count, from, to } = moveSet

    if (keepOrder) {
      const crates = localStacks[from].splice(-count, count) // No. of crates to 'pick up' (keeping original order)
      localStacks[to] = localStacks[to].concat(crates) // adds to the END of the array...
    }

    if (!keepOrder) {
      for (let i = 0; i < count; i++) {
        let crate = localStacks[from].pop()
        if (crate) {
          localStacks[to].push(crate)
        }
      }
    }
  }
  return localStacks
}

function partOne(): ITopCrates {
  const movedStacks = executeMoves()

  return {
    PartOne: Object.values(movedStacks)
      .map((column) => column.slice(-1))
      .join('')
  }
}

function partTwo(): ITopCrates {
  const movedStacks = executeMoves(true)

  return {
    PartTwo: Object.values(movedStacks)
      .map((column) => column.slice(-1))
      .join('')
  }
}

console.log()
console.log(partOne())
console.log(partTwo())
