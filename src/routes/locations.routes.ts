import { Router } from 'express'
import db from '../database/connection'

const locationsRouter = Router()

// Lista todos os registros da tabela locations
locationsRouter.get('/', async (req, resp) => {
  const { city, uf, items } = req.query
  
  const parsedItems = String(items).split(',')
    .map(item => Number(item.trim()))

  const locations = await db('locations')
    .join('location_items', 'locations.id', '=', 'location_items.location_id')
    .whereIn('location_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('locations.*')
  
  return resp.json(locations)
})

// Lista os itens da location especificada
locationsRouter.get('/:id', async (req, resp) => {
  const { id } = req.params

  const location = await db('locations')
    .where('id', id).first()

  if (!location) {
    return resp.status(400).json({ message: "Location not found" })
  }

  const items = await db('items')
    .join('location_items', 'items.id', '=', 'location_items.item_id')
    .where('location_items.location_id', id)
    .select('items.title')

  return resp.json({ location, items })
})

// Lista os itens de todas as locations
locationsRouter.get('/items', async (req, resp) => {
  const locations = await db('location_items')
    .join('locations', 'location_items.location_id', '=', 'locations.id')
    .join('items', 'location_items.item_id', '=', 'items.id')
    .select('locations.name', 'items.id', 'items.title')

  return resp.json(locations)
})

// Inclui um novo registro na tabela locations
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

export default locationsRouter