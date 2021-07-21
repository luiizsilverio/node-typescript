import { response, Router } from 'express'
import { compare } from 'bcryptjs'

import db from '../database/connection'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, resp) => {
  const { email, password } = req.body
  
  // 1) Verificar se o e-mail existe na tabela de usuários
  const user = await db('users').where('email', email).first()

  if (!user) {
    return resp.status(400).json({ error: "Credentials not found" })
  }

  // 2) Comparar a senha da requisição (não criptografada) 
  // com a senha criptografada da tabela users
  const passwordOK = await compare(password, user.password)

  if (!passwordOK) {
    return resp.status(400).json({ error: "Credentials not found" })
  }
  
  console.log(user)
  
  return resp.json(user)
})

export default sessionsRouter
