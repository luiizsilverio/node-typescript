import { Router } from 'express'
import db from '../database/connection'

const itemsRouter = Router()

itemsRouter.get('/', async (req, resp) => {
  const items = await db('items').select('*')
  
  const newItems = items.map(item => {
    return {
      ...item,
      image_url: `${process.env.APP_URL}/uploads/${item.image}`
    }
  })
  
  return resp.json(newItems)
})

export default itemsRouter