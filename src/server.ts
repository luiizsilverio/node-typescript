import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use(routes)

app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')))

app.listen(3333, () => {
  console.log('Server rodando na porta 3333')
})
