import * as path from 'path';
import * as fs from 'fs';

const fakeData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

const app = {
  data: fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8'),

  dataLength: 0,

  formatData: (data: string): string[] => {
    app.dataLength = data.length
    const newData = []
    
    for (let i = 0; i < app.dataLength; i++) {
      const word = data.substring(i - 3, i + 1)
      if (word.length > 3) newData.push(word)
    }
    
    return newData
  },

  findMarker: (data: string[]): any => {

    const indexes: number[] = []
   
    data.forEach((word, wordIndex) => {
      const i =  word.split('').findIndex((item, index, self) => {
        if (self.indexOf(item) != index) return wordIndex ;
      })

      if (i)

      indexes.push(i)
    })

    console.log(indexes)
    return indexes



    //const isOk: any = data.find((word, index) => !word
    //    .includes(word[0], index)
    //  )
    //  // .findIndex((bool) => bool)
//
    //console.log(isOk)


    // const result = data.filter((word) => {
    //   const splittedWord = word.split('')
// 
    //   const found = splittedWord.filter((letter, index) => {
    //     if (splittedWord.includes(letter, index + 1)) {}
    //   })
    //   return found
    // })

    //return app.dataLength + 1 - isOk
  }
}

const getResultOfPart1 = (data: string): number => {
  const formattedData = app.formatData(data)

  console.log(formattedData)

  return app.findMarker(formattedData)
}

const getResultOfPart2 = (data: string): number => {
  
  return 0;
}

export default `
  DAY 6 :
    Part 1: ${getResultOfPart1(fakeData)}
    Part 2: ${getResultOfPart2(fakeData)}
`