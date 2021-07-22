import { response, Router } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import db from '../database/connection'
import authConfig from '../config/auth'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, resp) => {
  const { email, password } = req.body
  
  // Verifica se o e-mail existe na tabela de usuários
  const user = await db('users').where('email', email).first()

  if (!user) {
    return resp.status(400).json({ error: "Credentials not found" })
  }

  // Compara a senha da requisição (não criptografada) 
  // com a senha criptografada da tabela users
  const passwordOK = await compare(password, user.password)

  if (!passwordOK) {
    return resp.status(400).json({ error: "Credentials not found" })
  }
  
  // Gera o token JWT
  const token = sign({}, authConfig.jwt.secret, {
    subject: String(user.id),
    expiresIn: authConfig.jwt.expiresIn //'1d'
  })

  delete user.password // retira a senha do objeto user
  
  return resp.json({ user, token })
})

export default sessionsRouter
