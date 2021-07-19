import { Router } from 'express'
import db from '../database/connection'

const locationsRouter = Router()

locationsRouter.get('/', async (req, resp) => {
  const locations = await db('locations').select('*')
  
  return resp.json(locations)
})

locationsRouter.post('/', async (req, resp) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = req.body

  const location = {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    image: "empty.jpg"
  }

  const transaction = await db.transaction()

  const newIds = await transaction('locations').insert(location)
  const locationId = newIds[0]

  const locationItems = items.map(async (item_id: number) => {
    const achouItem = await transaction('items').where('id', item_id).first()
  
    if (!achouItem) {
      return resp.status(400).json({ message: 'Item not found'})
    }

    return {
      item_id,
      location_id: locationId
    }
  })


  await transaction('location_items').insert(locationItems)

  await transaction.commit()

  return resp.json({
    id: locationId,
    ...location
  })
})

locationsRouter.get('/items', async (req, resp) => {
  const locations = await db('location_items')
    .join('locations', 'location_items.location_id', '=', 'locations.id')
    .join('items', 'location_items.item_id', '=', 'items.id')
    .select('locations.name', 'items.id', 'items.title')

  return resp.json(locations)
})

export default locationsRouter