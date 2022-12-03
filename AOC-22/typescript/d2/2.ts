import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const inputArray = input.split('\n')

interface IShapeMap {
  [key: string]: { shape: string; value: number }
}

const shapeMap: IShapeMap = {
  A: { shape: 'Rock', value: 1 },
  B: { shape: 'Paper', value: 2 },
  C: { shape: 'Scissors', value: 3 }
}

interface IResultMap {
  [key: string]: { result: string; value: number }
}

const resultMap: IResultMap = {
  X: { result: 'Lose', value: 0 },
  Y: { result: 'Draw', value: 3 },
  Z: { result: 'Win', value: 6 }
}

let playerScore = 0

for (let str of inputArray) {
  let cols = str.split(' ')
  playRound(cols)
}

function playRound(columns: Array<string>) {
  const [enemyChar, resultChar] = columns

  const enemyShape = shapeMap[enemyChar].shape
  const requiredResult = resultMap[resultChar].result

  if (enemyShape === 'Rock') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultMap[resultChar].value + shapeMap['C'].value
        break
      case 'Draw':
        playerScore += resultMap[resultChar].value + shapeMap['A'].value
        break
      case 'Win':
        playerScore += resultMap[resultChar].value + shapeMap['B'].value
        break
    }
  }

  if (enemyShape === 'Paper') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultMap[resultChar].value + shapeMap['A'].value
        break
      case 'Draw':
        playerScore += resultMap[resultChar].value + shapeMap['B'].value
        break
      case 'Win':
        playerScore += resultMap[resultChar].value + shapeMap['C'].value
        break
    }
  }

  if (enemyShape === 'Scissors') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultMap[resultChar].value + shapeMap['B'].value
        break
      case 'Draw':
        playerScore += resultMap[resultChar].value + shapeMap['C'].value
        break
      case 'Win':
        playerScore += resultMap[resultChar].value + shapeMap['A'].value
        break
    }
  }
  printResult(enemyShape, requiredResult)
}

function printResult(enemyShape: string, result: string) {
  console.log(
    `The enemy chose: [${enemyShape}]
    You must: [${result}]!
    Your total score is: [${playerScore}]\n`
  )
}
