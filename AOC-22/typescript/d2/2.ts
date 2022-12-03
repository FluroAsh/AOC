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
  let columns = str.split(' ')
  playRound(columns)
}

function playRound(columns: Array<string>) {
  const [enemyChar, resultChar] = columns

  const requiredResult = resultMap[resultChar].result
  const resultScore = resultMap[resultChar].value
  const enemyShape = shapeMap[enemyChar].shape

  if (enemyShape === 'Rock') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultScore + shapeMap['C'].value
        break
      case 'Draw':
        playerScore += resultScore + shapeMap['A'].value
        break
      case 'Win':
        playerScore += resultScore + shapeMap['B'].value
        break
    }
  }

  if (enemyShape === 'Paper') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultScore + shapeMap['A'].value
        break
      case 'Draw':
        playerScore += resultScore + shapeMap['B'].value
        break
      case 'Win':
        playerScore += resultScore + shapeMap['C'].value
        break
    }
  }

  if (enemyShape === 'Scissors') {
    switch (requiredResult) {
      case 'Lose':
        playerScore += resultScore + shapeMap['B'].value
        break
      case 'Draw':
        playerScore += resultScore + shapeMap['C'].value
        break
      case 'Win':
        playerScore += resultScore + shapeMap['A'].value
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
