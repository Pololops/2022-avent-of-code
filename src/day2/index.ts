import path from 'path';
import fs from 'fs';

const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8')

//? Explanation :
// A or X : Rock      (1 point)
// B or Y : Paper     (2 point)
// C or Z : Scissors  (3 point)





const turns: [string, string][] = data
  .split('\n').filter((turn) => turn && turn)
  .map((turn) => [turn[0], turn[2]])

function playTurnWithStrategy(turn: [string, string]): number {
  //? Strategy :
  // A => Y  |  score : 8 (2 for Y + 6 for victory)
  // B => X  |  score : 1 (1 for X + 0 for failure)
  // C => Z  |  score : 6 (3 for Z + 3 for equality)

  let turnScore: number = 0

  const player1 = turn[0]
  const player2 = turn[1]

  if (player2 === 'X') {
    turnScore += 1
  
    if (player1 === 'A') turnScore += 3
    if (player1 === 'B') turnScore += 0
    if (player1 === 'C') turnScore += 6

  }

  if (player2 === 'Y') {
    turnScore += 2
  
    if (player1 === 'A') turnScore += 6
    if (player1 === 'B') turnScore += 3
    if (player1 === 'C') turnScore += 0

  }

  if (player2 === 'Z') {
    turnScore += 3
  
    if (player1 === 'A') turnScore += 0
    if (player1 === 'B') turnScore += 6
    if (player1 === 'C') turnScore += 3
  }


  return turnScore
}

function playTurnWithGoal(turn: [string, string]): number {
  //? Goal :
  // X = loose | score = 0
  // Y = equality | score = 3
  // Z = victory | score = 6

  let turnScore: number = 0

  const player1 = turn[0]
  const player2 = turn[1]

  if (player2 === 'X') {
    turnScore += 0
    
    if (player1 === 'A') turnScore += 3
    if (player1 === 'B') turnScore += 1
    if (player1 === 'C') turnScore += 2
  }

  if (player2 === 'Y') {
    turnScore += 3
    
    if (player1 === 'A') turnScore += 1
    if (player1 === 'B') turnScore += 2
    if (player1 === 'C') turnScore += 3
  }

  if (player2 === 'Z') {
    turnScore += 6
    
    if (player1 === 'A') turnScore += 2
    if (player1 === 'B') turnScore += 3
    if (player1 === 'C') turnScore += 1
  }

  return turnScore
}

function playGame(turns: [string, string][], callback: (arg: [string, string]) => number): number {
  const myScore: number[] = []

  turns.forEach((turn) => {
    myScore.push(callback(turn))
  })

  return myScore.reduce((a,b) => a + b)
}

export default `
  DAY 2 :
    The total score by following the strategy: ${playGame(turns, playTurnWithStrategy)}
    The total score by following the goal: ${playGame(turns, playTurnWithGoal)}
`