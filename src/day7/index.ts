import * as path from 'path';
import * as fs from 'fs';

const fakeData = ``

const app = {
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  formatData (data: string): string[] {
    return data
      .split('\n')
      .filter((element) => element && element)
      //? if you want format more deeply
      // .map((element) => element
      //   .split(',')
      //   .map((subElement) => subElement
      //   .split('-')
      //   .map((string) => parseInt(string))
      // ))
  },


}

const getResultOfPart1 = (data: string): number => {
  
  
  return 0;
}

const getResultOfPart2 = (data: string): number => {
  
  
  return 0;
}

export default `
  DAY 7 :
    Part 1: ${getResultOfPart1(fakeData)}
    Part 2: ${getResultOfPart2(fakeData)}
`