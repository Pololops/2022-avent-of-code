import * as path from 'path';
import * as fs from 'fs';

const fakeData = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`

const app = {
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  dataLength: 0,

  formatData: (data: string, factor: number): string[] => {
    return data.split('').map((_element, index, self) => {
        return self.slice(index, index + factor).join('')
    }).slice(0, data.length - (factor - 1))
  },

  findMarker: (data: string[], factor: number): number => {
    const foundIndex = data.findIndex((element) => {
      return !element
        .split('')
        .reverse()
        .find((e, i, s) => s.includes(e, i + 1))    
    })
      
    return foundIndex + factor
  }
}

const getResults = (data: string, factor: number): number => {
  const formattedData = app.formatData(data, factor)
  return app.findMarker(formattedData, factor)
}

export default `
  DAY 6 :
    Number of characters processed before the first detected start-of-packet marker: ${getResults(app.data, 4)}
    Number of characters processed before the first detected start-of-message marker: ${getResults(app.data, 14)}
`