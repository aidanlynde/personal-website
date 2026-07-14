import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function auth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = header.split(' ')[1]

  try {
    jwt.verify(token, process.env.SESSION_SECRET as string)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
