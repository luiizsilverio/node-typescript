import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import { errors } from 'celebrate'
import cowsay from 'cowsay'

import routes from './routes'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors())

const porta = process.env.PORT || 3333

app.listen(porta, () => {
  console.log(
    cowsay.say({text: `Servidor rodando na porta ${porta}`})
  )
})
