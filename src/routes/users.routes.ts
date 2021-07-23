import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import { hash } from 'bcryptjs'

import db from '../database/connection'

const usersRouter = Router()

usersRouter.get('/', async(req, resp) => {
  const users = await db('users').select('*')

  return resp.json(users)
})

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required()  
})

usersRouter.post('/', 
  celebrate({ body: schema }, { abortEarly: false }), 
  async (req, resp) => {

  const { name, email, password } = req.body

  // Para criptografar a senha, usamos o método hash()
  // o 1º parâmetro de hash() é a senha que queremos criptografar
  // o 2º parâmetro é a quantidade de caracteres do hash
  const passwordHashed = await hash(password, 8)

  const user = {
    name,
    email,
    password: passwordHashed
  }

  const newIds = await db('users').insert(user)

  return resp.json({
    id: newIds[0],
    ...user
  })
})

export default usersRouter
