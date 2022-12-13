import path from 'path';
import fs from 'fs';

const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8')

const totalCaloriesForEachElves = data.split('\n\n')
  .map((elve) => elve.split('\n')
    .map((calory) => Number(calory))
    .reduce((a, b) => a + b)
  )
  .sort((a, b) => a - b)
  .reverse()
  
const biggestElveCalories = totalCaloriesForEachElves.at(0)
const topThreeCalories = totalCaloriesForEachElves.filter((elveCalories, index) => {
  if (index < 3) return elveCalories
})
.reduce((a, b) => a + b)

export default `
  DAY 1 :
    The first Elve Calories: ${biggestElveCalories}
    The three firsts Elves Calories: ${topThreeCalories}
`