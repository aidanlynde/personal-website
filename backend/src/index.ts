import express from 'express'
import cors from 'cors'
import adminRoutes from './routes/admin'
import leadsRoutes from './routes/leads'
import analyzeRoute from './routes/analyze'
import transcribeRoute from './routes/transcribe'
import outreachRoute from './routes/outreach'
import statsRoute from './routes/stats'

const app = express()
const PORT = process.env.PORT ?? 4000

// Parse CORS_ORIGIN as comma-separated list so you can allow localhost + production
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/admin', adminRoutes)
app.use('/leads', leadsRoutes)
app.use('/analyze', analyzeRoute)
app.use('/transcribe', transcribeRoute)
app.use('/outreach', outreachRoute)
app.use('/stats', statsRoute)

app.listen(PORT, () => {
  console.log(`Lynde CRM backend running on port ${PORT}`)
})
