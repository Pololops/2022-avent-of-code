import * as path from 'path';
import * as fs from 'fs';

const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8')

const fakeData: string = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const rucksacks = fakeData
  .split('\n')
  .filter((rucksack) => rucksack && rucksack)

const rucksacksCompartments = rucksacks
  .map((rucksack) => {
    const firstCompartmentItems = rucksack
      .substring(0, rucksack.length / 2)
      .split('')

    const secondCompartmentItems = rucksack
      .substring(rucksack.length / 2 , rucksack.length)
      .split('')

    return [firstCompartmentItems, secondCompartmentItems]
  })

const rucksacksDuplicateItems = rucksacksCompartments.map((rucksacksCompartment) => {
  return rucksacksCompartment[0].filter((itemC1) => {
    return rucksacksCompartment[1].find((itemC2) => (itemC1 === itemC2) && itemC1)
  })[0]
})

const priorityItemType = (letter: string): number => {
  if (/[a-z]/.test(letter)) return letter.charCodeAt(0) - 96
  if (/[A-Z]/.test(letter)) return (letter.charCodeAt(0) - 64) + 26

  return 0
}

const sumOfDuplicateItemTypes = rucksacksDuplicateItems
  .map((item) => priorityItemType(item))
  .reduce((a, b) => a + b)

//! Day 3 - Part 2
function compareTwoStrings (array: string[], startIndex = 0): string {
  const filteredLetter = array[startIndex].split('').filter((letterStr1) => {
    return array[startIndex + 1].split('').find((letterStr2) => (letterStr1 === letterStr2) && letterStr1)
  })
  
  return filteredLetter.toString()
}

function compareSeveralStrings (array: string[]) {
  let similarLetter: string = ''
  array.forEach((_element, index) => {
    if (!similarLetter && similarLetter !== '') {
      similarLetter = compareTwoStrings(array, index)
    } else if (index < array.length - 1) {
      similarLetter = compareTwoStrings([similarLetter, ...array], index)
    }
  })
  return similarLetter
}

export default `
  DAY 3 :
    The sum of the priorities of the duplicate items in the rucksacks: ${sumOfDuplicateItemTypes}
`