import express from 'express'
import cors from 'cors'
import adminRoutes from './routes/admin'
import leadsRoutes from './routes/leads'
import analyzeRoute from './routes/analyze'
import transcribeRoute from './routes/transcribe'
import outreachRoute from './routes/outreach'
import statsRoute from './routes/stats'
import { query } from './lib/db'

const app = express()
const PORT = process.env.PORT ?? 4000

async function initDB() {
  await query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      source_text TEXT,
      linkedin_profile_url TEXT,
      linkedin_post_url TEXT,
      company_website TEXT,
      personal_context TEXT,
      voice_transcript TEXT,

      name TEXT,
      title TEXT,
      company TEXT,
      industry TEXT,
      company_description TEXT,
      company_size TEXT,

      relationship_context TEXT,
      relationship_warmth TEXT CHECK (relationship_warmth IN ('cold','warm','hot')),

      lead_type TEXT,
      recommended_offer TEXT,

      lead_score INTEGER CHECK (lead_score BETWEEN 0 AND 100),
      score_reasoning TEXT,

      status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new','reviewing','ready_for_outreach','contacted','in_conversation','closed_won','closed_lost','not_a_fit','archived')),
      priority TEXT NOT NULL DEFAULT 'medium'
        CHECK (priority IN ('low','medium','high','urgent')),
      tags TEXT[] NOT NULL DEFAULT '{}',

      ai_summary TEXT,
      why_this_lead TEXT,
      conversation_starter TEXT,
      suggested_outreach TEXT,
      questions_to_ask JSONB,
      potential_opportunities TEXT,
      potential_risks TEXT,
      facts TEXT,
      ai_inferences TEXT,
      missing_information TEXT,

      what_caught_attention TEXT,
      possible_opportunity TEXT,
      possible_service_fit TEXT,
      additional_notes TEXT,
      manual_notes TEXT,

      next_followup_date DATE,
      ai_analysis_json JSONB
    )
  `)

  await query(`
    CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)
  `)
  await query(`
    CREATE INDEX IF NOT EXISTS leads_lead_score_idx ON leads (lead_score DESC NULLS LAST)
  `)
  await query(`
    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)
  `)

  await query(`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER LANGUAGE plpgsql AS $$
    BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
    $$
  `)

  // DROP + recreate is idempotent when using CREATE OR REPLACE on the function above;
  // for the trigger we do it safely:
  await query(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'leads_updated_at' AND tgrelid = 'leads'::regclass
      ) THEN
        CREATE TRIGGER leads_updated_at
          BEFORE UPDATE ON leads
          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
      END IF;
    END $$
  `)

  console.log('DB schema initialized')
}

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

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Lynde CRM backend running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to initialize DB schema:', err)
    process.exit(1)
  })
