import * as path from 'path';
import * as fs from 'fs';

const fakeData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 23 from 2 to 1
move 1 from 1 to 2
`

const app ={
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  procedure: [] as any[][],
  stacksQuantity: 0,

  stacks: [] as string[][],

  formatData (data: string): void {
    const [cratesAndStacks, procedure] = data.split('\n\n')

    app.stacksQuantity = cratesAndStacks
      .split('\n')
      .at(-1)?.split('')
      .filter((char) => char !== ' ')
      .length || 0

    app.procedure = procedure
      .split('\n')
      .filter((line) => line && line)
      .map((line) => line.replace('move', '').replace('from', '').replace('to', '')
        .split(' ')
        .filter((char) => /^[0-9]+$/.test(char) && char)
        .map((char) => parseInt(char))
      )

    let crateDispatchIndex = 0
    const crates = cratesAndStacks
      .split('\n')
      .slice(0, -1)
      .map((series) => series
        .split('')
        .filter((element, index) => {
          if (index - 1 === 0 || (index - 1) % 4 === 0) {
            return element
          }
        })
      )

    crates.map((x, index)=> x.forEach((element) => {
        if (index === 0) {
          app.stacks[crateDispatchIndex] = (element !== ' ') ? [element] : []
        } else {
          if (element !== ' ') app.stacks[crateDispatchIndex].push(element)
        }

        crateDispatchIndex += 1
        if (crateDispatchIndex > app.stacksQuantity - 1) crateDispatchIndex = 0
      })
    )
  },

  launchProcedure (): string[][] {
    const newStacks: string[][] = [...app.stacks];

    app.procedure.forEach((instruction) => {
      const cratesNumberToMove = instruction[0]
      const fromIndex = instruction[1] - 1
      const toIndex = instruction[2] - 1

      const cratesMoving = newStacks[fromIndex].splice(0, cratesNumberToMove)
      newStacks[toIndex].unshift(...cratesMoving.reverse())
    })

    return newStacks
  },

  getTopCrates (data: string[][]) {
    const result = data.map((stack) => stack[0]).join('')

    return result
  }
}



const getResultOfPart1 = (data: string): string => {
  app.formatData(data)
  const newStacks = app.launchProcedure()
  const result = app.getTopCrates(newStacks)

  return result
}

const getResultOfPart2 = (data: string): number => {

  return 0;
}

export default `
  DAY 5 :
    Crate ends up on top of each stack: ${getResultOfPart1(app.data)}
    Part 2: ${getResultOfPart2(fakeData)}
`