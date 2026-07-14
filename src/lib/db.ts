import { Pool } from 'pg'

// Singleton connection pool — created lazily so build-time imports don't fail
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined
}

function getPool(): Pool {
  if (global._pgPool) return global._pgPool

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  global._pgPool = pool
  return pool
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await getPool().query(text, params)
  return result.rows as T[]
}

/*
  Run this SQL once to initialize the database:

  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    relationship_warmth TEXT CHECK (relationship_warmth IN ('cold', 'warm', 'hot')),
    lead_type TEXT CHECK (lead_type IN ('Startup', 'Small Business', 'Family Business', 'Referral Partner', 'Enterprise', 'Other')),
    recommended_offer TEXT CHECK (recommended_offer IN ('Software Clarity Audit', 'Prototype to Production', 'MVP Build Sprint', 'AI Workflow Automation')),
    lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),
    score_reasoning TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'needs_review', 'ready_for_outreach', 'contacted', 'meeting_scheduled', 'proposal_sent', 'won', 'lost')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    tags TEXT[] DEFAULT '{}',
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
    ai_analysis_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS outreach_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
  CREATE INDEX IF NOT EXISTS leads_priority_idx ON leads(priority);
  CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
  CREATE INDEX IF NOT EXISTS leads_lead_score_idx ON leads(lead_score DESC NULLS LAST);

  CREATE OR REPLACE FUNCTION update_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE OR REPLACE TRIGGER leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
*/
