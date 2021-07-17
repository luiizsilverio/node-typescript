import { Router } from 'express'

const routes = Router()

routes.get('/', (req, resp) => {
  return resp.json({message: 'Olá dev!'})
})

export default routes