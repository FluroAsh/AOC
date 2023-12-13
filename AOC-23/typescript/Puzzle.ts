const partMap = {
  partOne: 'Part One',
  partTwo: 'Part Two'
} as const

export default class Puzzle {
  public input: string
  public answers: { [part: string]: string | number }

  constructor(input) {
    this.input = input
    this.answers = {}
  }

  solve(fn: () => string | number) {
    console.time('⏰ Execution Runtime')
    const fnName = fn.name
    const partName = partMap[fnName]

    console.log(`> Solving for "${partName}"`)
    this.answers[partName] = fn()
    console.timeEnd('⏰ Execution Runtime')
  }
}
