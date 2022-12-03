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
  let columns = str.split(' ')
  playRound(columns)
}

function playRound(columns: Array<string>) {
  const [enemyChar, playerChar] = columns

  const enemyShape = shapeMap[enemyChar].shape
  const playerShape = shapeMap[playerChar].shape
  const playerShapeValue = shapeMap[playerChar].value

  if (enemyShape === 'Rock') {
    switch (playerShape) {
      case 'Rock':
        playerScore += scoreMap.draw + playerShapeValue
        break
      case 'Paper':
        playerScore += scoreMap.win + playerShapeValue
        break
      case 'Scissors':
        playerScore += scoreMap.lost + playerShapeValue
        break
    }
  }

  if (enemyShape === 'Paper') {
    switch (playerShape) {
      case 'Rock':
        playerScore += scoreMap.lost + playerShapeValue
        break
      case 'Paper':
        playerScore += scoreMap.draw + playerShapeValue
        break
      case 'Scissors':
        playerScore += scoreMap.win + playerShapeValue
        break
    }
  }

  if (enemyShape === 'Scissors') {
    switch (playerShape) {
      case 'Rock':
        playerScore += scoreMap.win + playerShapeValue
        break
      case 'Paper':
        playerScore += scoreMap.lost + playerShapeValue
        break
      case 'Scissors':
        playerScore += scoreMap.draw + playerShapeValue
        break
    }
  }
  printResult(enemyShape, playerShape)
}

function printResult(enemyShape: string, playerShape: string) {
  console.log(
    `The enemy chose: ${enemyShape}
    You chose... ${playerShape}
    Your total score is: ${playerScore}\n`
  )
}
