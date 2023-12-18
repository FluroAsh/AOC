const partMap = {
  partOne: 'Part One',
  partTwo: 'Part Two'
} as const

export default class Puzzle {
  public input: string
  public answers: { [part: string]: string | number }
  public consoleCleared: boolean

  constructor(input) {
    this.input = input
    this.answers = {}
    this.consoleCleared = false
  }

  clearConsole() {
    !this.consoleCleared && console.clear()
    this.consoleCleared ||= true
  }

  solve(fn: () => string | number) {
    const fnName = fn.name
    const partName = partMap[fnName]

    console.log('\n')
    this.clearConsole()

    console.time('⏰ Execution Runtime')

    console.log(`> Solving for "${partName}"`)
    this.answers[partName] = fn()

    console.timeEnd('⏰ Execution Runtime')
  }
}
