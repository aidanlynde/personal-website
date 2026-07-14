import { Router, Request, Response } from 'express'
import { auth } from '../middleware/auth'
import { query } from '../lib/db'

const router = Router()

const ALLOWED_SORT = new Set(['created_at', 'updated_at', 'lead_score', 'name', 'company', 'priority', 'status'])
const JSON_FIELDS = new Set(['questions_to_ask', 'ai_analysis_json'])
const ALLOWED_UPDATE_FIELDS = [
  'source_text', 'linkedin_profile_url', 'linkedin_post_url', 'company_website',
  'personal_context', 'voice_transcript',
  'name', 'title', 'company', 'industry', 'company_description', 'company_size',
  'relationship_context', 'relationship_warmth',
  'lead_type', 'recommended_offer',
  'lead_score', 'score_reasoning',
  'status', 'priority', 'tags',
  'ai_summary', 'why_this_lead', 'conversation_starter', 'suggested_outreach',
  'questions_to_ask', 'potential_opportunities', 'potential_risks',
  'facts', 'ai_inferences', 'missing_information',
  'what_caught_attention', 'possible_opportunity', 'possible_service_fit',
  'additional_notes', 'manual_notes', 'next_followup_date', 'ai_analysis_json',
]

// GET /leads
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const {
      status, lead_type, priority, search,
      sort_by = 'created_at', sort_order = 'desc',
      limit = '100', offset = '0',
    } = req.query as Record<string, string>

    const safeSortBy = ALLOWED_SORT.has(sort_by) ? sort_by : 'created_at'
    const safeOrder = sort_order === 'asc' ? 'ASC' : 'DESC'
    const safeLimit = Math.min(parseInt(limit) || 100, 500)
    const safeOffset = parseInt(offset) || 0

    const conditions: string[] = []
    const params: unknown[] = []

    if (status) { params.push(status); conditions.push(`status = $${params.length}`) }
    if (lead_type) { params.push(lead_type); conditions.push(`lead_type = $${params.length}`) }
    if (priority) { params.push(priority); conditions.push(`priority = $${params.length}`) }
    if (search) {
      params.push(`%${search}%`)
      const n = params.length
      conditions.push(`(name ILIKE $${n} OR company ILIKE $${n} OR ai_summary ILIKE $${n} OR source_text ILIKE $${n})`)
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const filterParams = [...params]

    params.push(safeLimit, safeOffset)

    const [leads, countRows] = await Promise.all([
      query(`SELECT * FROM leads ${where} ORDER BY ${safeSortBy} ${safeOrder} NULLS LAST LIMIT $${params.length - 1} OFFSET $${params.length}`, params),
      query<{ count: string }>(`SELECT COUNT(*) as count FROM leads ${where}`, filterParams),
    ])

    res.json({ leads, total: parseInt(countRows[0]?.count ?? '0') })
  } catch (err) {
    console.error('List leads error:', err)
    res.status(500).json({ error: 'Failed to fetch leads' })
  }
})

// POST /leads
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const b = req.body

    const result = await query(`
      INSERT INTO leads (
        source_text, linkedin_profile_url, linkedin_post_url, company_website,
        personal_context, voice_transcript,
        name, title, company, industry, company_description, company_size,
        relationship_context, relationship_warmth,
        lead_type, recommended_offer,
        lead_score, score_reasoning,
        status, priority, tags,
        ai_summary, why_this_lead, conversation_starter, suggested_outreach,
        questions_to_ask, potential_opportunities, potential_risks,
        facts, ai_inferences, missing_information,
        what_caught_attention, possible_opportunity, possible_service_fit,
        additional_notes, manual_notes, next_followup_date, ai_analysis_json
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,
        $27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38
      ) RETURNING *
    `, [
      b.source_text ?? null, b.linkedin_profile_url ?? null, b.linkedin_post_url ?? null,
      b.company_website ?? null, b.personal_context ?? null, b.voice_transcript ?? null,
      b.name ?? null, b.title ?? null, b.company ?? null,
      b.industry ?? null, b.company_description ?? null, b.company_size ?? null,
      b.relationship_context ?? null, b.relationship_warmth ?? null,
      b.lead_type ?? null, b.recommended_offer ?? null,
      b.lead_score ?? null, b.score_reasoning ?? null,
      b.status ?? 'new', b.priority ?? 'medium', b.tags ?? [],
      b.ai_summary ?? null, b.why_this_lead ?? null,
      b.conversation_starter ?? null, b.suggested_outreach ?? null,
      b.questions_to_ask ? JSON.stringify(b.questions_to_ask) : null,
      b.potential_opportunities ?? null, b.potential_risks ?? null,
      b.facts ?? null, b.ai_inferences ?? null, b.missing_information ?? null,
      b.what_caught_attention ?? null, b.possible_opportunity ?? null,
      b.possible_service_fit ?? null, b.additional_notes ?? null,
      b.manual_notes ?? null, b.next_followup_date ?? null,
      b.ai_analysis_json ? JSON.stringify(b.ai_analysis_json) : null,
    ])

    res.status(201).json(result[0])
  } catch (err) {
    console.error('Create lead error:', err)
    res.status(500).json({ error: 'Failed to create lead' })
  }
})

// GET /leads/:id
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const rows = await query('SELECT * FROM leads WHERE id = $1', [req.params.id])
    if (!rows.length) { res.status(404).json({ error: 'Not found' }); return }
    res.json(rows[0])
  } catch (err) {
    console.error('Get lead error:', err)
    res.status(500).json({ error: 'Failed to fetch lead' })
  }
})

// PUT /leads/:id
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>
    const setClauses: string[] = []
    const values: unknown[] = []

    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in body) {
        values.push(JSON_FIELDS.has(field) && body[field] != null
          ? JSON.stringify(body[field])
          : body[field])
        setClauses.push(`${field} = $${values.length}`)
      }
    }

    if (!setClauses.length) { res.status(400).json({ error: 'No valid fields' }); return }

    values.push(req.params.id)
    const result = await query(
      `UPDATE leads SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    )
    if (!result.length) { res.status(404).json({ error: 'Not found' }); return }
    res.json(result[0])
  } catch (err) {
    console.error('Update lead error:', err)
    res.status(500).json({ error: 'Failed to update lead' })
  }
})

// DELETE /leads/:id
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    await query('DELETE FROM leads WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch (err) {
    console.error('Delete lead error:', err)
    res.status(500).json({ error: 'Failed to delete lead' })
  }
})

export default router
