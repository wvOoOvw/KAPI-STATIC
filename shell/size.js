const fs = require('fs')
const path = require('path')

const dirname = path.resolve(__dirname, '../src/cosplay')

const dirs = fs.readdirSync(dirname).filter(i => fs.statSync(dirname + '/' + i).isDirectory() === true)

dirs.forEach((dir) => {
  fs.readdirSync(dirname + '/' + dir).forEach(file => {
    const size = fs.statSync(dirname + '/' + dir + '/' + file).size

    if (size > 400000) console.log(dir, file, size)
  })
})
