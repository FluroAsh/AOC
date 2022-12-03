import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const inputArray = input.split('\n')

interface IShapeMap {
  [key: string]: { shape: string; value: number }
}

const shapeMap: IShapeMap = {
  // Enemy
  A: { shape: 'Rock', value: 1 },
  B: { shape: 'Paper', value: 2 },
  C: { shape: 'Scissors', value: 3 },
  // Player
  X: { shape: 'Rock', value: 1 },
  Y: { shape: 'Paper', value: 2 },
  Z: { shape: 'Scissors', value: 3 }
}

const scoreMap = {
  lost: 0,
  draw: 3,
  win: 6
}

let playerScore = 0

for (let str of inputArray) {
  let shapes = str.split(' ')
  playRound(shapes)
}

function playRound(shapes: Array<string>) {
  const [enemyShape, playerShape] = shapes

  if (shapeMap[enemyShape].shape === 'Rock') {
    switch (shapeMap[playerShape].shape) {
      case 'Rock':
        playerScore += scoreMap.draw + shapeMap[playerShape].value
        break
      case 'Paper':
        playerScore += scoreMap.win + shapeMap[playerShape].value
        break
      case 'Scissors':
        playerScore += scoreMap.lost + shapeMap[playerShape].value
        break
    }
  }

  if (shapeMap[enemyShape].shape === 'Paper') {
    switch (shapeMap[playerShape].shape) {
      case 'Rock':
        playerScore += scoreMap.lost + shapeMap[playerShape].value
        break
      case 'Paper':
        playerScore += scoreMap.draw + shapeMap[playerShape].value
        break
      case 'Scissors':
        playerScore += scoreMap.win + shapeMap[playerShape].value
        break
    }
  }

  if (shapeMap[enemyShape].shape === 'Scissors') {
    switch (shapeMap[playerShape].shape) {
      case 'Rock':
        playerScore += scoreMap.win + shapeMap[playerShape].value
        break
      case 'Paper':
        playerScore += scoreMap.lost + shapeMap[playerShape].value
        break
      case 'Scissors':
        playerScore += scoreMap.draw + shapeMap[playerShape].value
        break
    }
  }
  printResult(enemyShape, playerShape)
}

function printResult(enemyShape: string, playerShape: string) {
  console.log(
    `The enemy chose: ${shapeMap[enemyShape].shape}
    You chose... ${shapeMap[playerShape].shape}
    Your total score is: ${playerScore}`
  )
}
