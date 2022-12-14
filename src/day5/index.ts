import * as path from 'path';
import * as fs from 'fs';

const fakeData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const app ={
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  stacks: [] as string[],
  procedure: [] as any[][],
  stacksQuantity: 0,

  formatData (data: string): void {
    const [cratesAndStacks, procedure] = data.split('\n\n')

    app.stacksQuantity = cratesAndStacks
      .split('\n')
      .at(-1)?.split('')
      .filter((char) => char !== ' ')
      .length || 0

    app.procedure = procedure
      .split('\n')
      .map((line) => line
        .split('')
        .filter((char) => /^[1-9]$/.test(char) && char)
        .map((char) => parseInt(char))
      )

    const crates = cratesAndStacks
      .split('\n')
      .slice(0, -1)
      .map((series) => series.split(' '))
      // .filter((element, index) => {
      //   if (element !== ' ') return element
      // })
    console.log(crates)
    const stacks:string[] = []
    crates.forEach((series, index) => {
      if (index === 0 || index % 4 === 0) {
        
      }
    })

    // const arrayOfStacks = stacks.split('').filter((character) => {
    //   if (character !== '[' && character !== ']' && character !== '\n') {
    //     return character
    //   }
    // })




    console.log('NB OF STACKS: ', app.stacksQuantity)
    console.log('PROCEDURE: ', app.procedure)
    console.log('CRATES: ', app.stacks)
  },


}

const getResultOfPart1 = (data: string): string => {
  app.formatData(fakeData)

  return 'TEST';
}

const getResultOfPart2 = (data: string): number => {

  return 0;
}

export default `
  DAY 5 :
    Crate ends up on top of each stack: ${getResultOfPart1(fakeData)}
    Part 2: ${getResultOfPart2(fakeData)}
`