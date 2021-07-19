import express from 'express'
import path from 'path'
import cowsay from 'cowsay'

import routes from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')))

app.listen(3333, () => {
  console.log(
    cowsay.say({text: 'Servidor rodando na porta 3333'})
  )
})
