import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth'

const router = Router()

router.post('/login', (req, res) => {
  const { password } = req.body as { password?: string }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' })
    return
  }

  const token = jwt.sign(
    { admin: true },
    process.env.SESSION_SECRET as string,
    { expiresIn: '7d' }
  )

  res.json({ token })
})

router.post('/logout', auth, (_req, res) => {
  // JWT is stateless — client just discards the token
  res.json({ ok: true })
})

router.get('/session', auth, (_req, res) => {
  res.json({ isAuthenticated: true })
})

export default router
