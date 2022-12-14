import * as path from 'path';
import * as fs from 'fs';

const app = {
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  formatData (data: string): number[][][] {
    return data
      .split('\n')
      .filter((element) => element && element)
      .map((element) => element
        .split(',')
        .map((subElement) => subElement
        .split('-')
        .map((string) => parseInt(string))
      ))
  },

  getPairFullyOverlap (data: number[][][]): number[][][] {    
    const foundPairs = data.filter((pair) => {
      if (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) return pair
      if (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]) return pair
    })

    return foundPairs
  },

  getPairOverlap (data: number[][][]): number[][][] {    
    const foundPairs = data.filter((pair) => {
      if (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][0]) return pair
      if (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][0]) return pair
    })

    return foundPairs
  },

  countPairFullyRange (data: number[][][]): number {
    return data.length
  }
}

const getResultOfPart1 = (data: string): number => {
  return app.countPairFullyRange(app.getPairFullyOverlap(app.formatData(data)))
}


const getResultOfPart2 = (data: string): number => {
  return app.countPairFullyRange(app.getPairOverlap(app.formatData(data)))
}

export default `
  DAY 4 :
    Number of pairs where one range fully contain the other: ${getResultOfPart1(app.data)}
    Number of pairs where ranges overlap: ${getResultOfPart2(app.data)}
`