import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

export default function isAuthenticated(
  req: Request, 
  resp: Response, 
  next: NextFunction 
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return resp.status(401).json({ error: "JWT Token is missing" })    
  }

  // type = Bearer, mas não vai ser utilizado
  const [type, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    console.log(decoded)

    return next()    

  } catch (error) {
    return resp.status(401).json({ error: 'Invalid JWT Token' });
  }
}