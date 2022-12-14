import * as path from 'path';
import * as fs from 'fs';

const app = {
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  formatData (data: string) {
    return data.split('\n').filter((element) => element && element)
  },

  sliptEachElements (data: string[]): string[][][] {
    return data.map((element) => {
      const firstCompartmentItems = element
      .substring(0, element.length / 2)
      .split('')

      const secondCompartmentItems = element
        .substring(element.length / 2 , element.length)
        .split('')

      return [firstCompartmentItems, secondCompartmentItems]
    })
  },

  getDuplicateElements (data: string[][][]): string[][] {
    return data.map((element) => {
      
      let duplicateLetter: string[] = []
      let result: string[] = []
      element.forEach((item, index) => {
        if (index > 0) {
          if (duplicateLetter.length > 0) {
            const filterLetters = item.filter((item1) => {
              return duplicateLetter
                .find((item2) => (item1 === item2) && item1)
            })

            duplicateLetter = [...filterLetters]
          } else {
            const filterLetters = item.filter((item1) => {
              return element[index - 1]
                .find((item2) => (item1 === item2) && item1)
            })

            duplicateLetter = [...filterLetters]
          }
        }

        if (duplicateLetter) result = [duplicateLetter[0]]
      })
      
      return result
    })
  },

  getPriorityElement (element: string): number {
    if (/[a-z]/.test(element)) return element.charCodeAt(0) - 96
    if (/[A-Z]/.test(element)) return (element.charCodeAt(0) - 64) + 26

    return 0
  },

  getSumOfPriorityElement (data: string[][]): number {
    return data
      .flat()
      .map((element) => app.getPriorityElement(element))
      .reduce((a, b) => a + b)
  },

  regroupDataByThree(data: string[]): string[][][] {
    const regroupStrings: string[][][] = []

    let subIndex = 0
    data.forEach((element, index) => {
      if (index === 0 || index % 3 === 0) {
        regroupStrings.push([element.split('')])
        
        if(data[index + 1]) regroupStrings[subIndex].push(data[index + 1].split(''))
        if(data[index + 2]) regroupStrings[subIndex].push(data[index + 2].split(''))
        
        subIndex += 1
      }
    })
    
    return regroupStrings;
  }
}

const getResultOfPart1 = (data: string): number => {
  const rubsacks = app.formatData(data)
  const rubsacksCompartments = app.sliptEachElements(rubsacks)
  const foundDuplicateLetter = app.getDuplicateElements(rubsacksCompartments)

  return app.getSumOfPriorityElement(foundDuplicateLetter)
}
  
const getResultOfPart2 = (data: string): number => {
  const rubsacks = app.formatData(data)
  const groupsOfElves = app.regroupDataByThree(rubsacks)
  const badgesOfElfGroupes = app.getDuplicateElements(groupsOfElves)

  return app.getSumOfPriorityElement(badgesOfElfGroupes)
}

export default `
  DAY 3 :
    The sum of the priorities of the duplicate items in each rucksacks: ${getResultOfPart1(app.data)}
    The sum of the badges of each three-Elf group: ${getResultOfPart2(app.data)}
`