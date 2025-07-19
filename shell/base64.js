const fs = require('fs')
const path = require('path')

const dirnameRead = path.resolve(__dirname, '../src-origin/cosplay')
const dirnameWrite = path.resolve(__dirname, '../src/cosplay')

fs.mkdirSync(dirnameWrite)

fs.readdirSync(dirnameRead)
  .filter(i => fs.statSync(dirnameRead + '/' + i).isDirectory() === true)
  .forEach(id => {

    fs.mkdirSync(dirnameWrite + '/' + id)

    fs.readdirSync(dirnameRead + '/' + id)
      .filter(file => fs.statSync(dirnameRead + '/' + id + '/' + file).isDirectory() === false && !file.includes('_'))
      .forEach(file => {

        const data = fs.readFileSync(dirnameRead + '/' + id + '/' + file)

        const extension = file.split('.').pop()

        const mimeTypes = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          webp: 'image/webp',
          svg: 'image/svg+xml'
        }
        const mimeType = mimeTypes[extension] || 'application/octet-stream'

        const base64 = `data:${mimeType};base64,${data.toString('base64')}`

        fs.writeFileSync(dirnameWrite + '/' + id + '/' + file.replace(file.split('.').pop(), 'txt'), base64)

      })

  })