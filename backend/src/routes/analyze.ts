import { Router, Request, Response } from 'express'
import { auth } from '../middleware/auth'
import OpenAI from 'openai'

const router = Router()

const SYSTEM_PROMPT = `You are a business development assistant for Lynde Engineering, a boutique software consulting firm. Aidan Lynde is the founder.

SERVICES:
- Software Clarity Audit: Strategic tech review, roadmap, and technical debt assessment
- Prototype to Production: Hardening a working prototype into a production system
- MVP Build Sprint: Full MVP from scratch in 4–8 weeks
- AI Workflow Automation: Integrating AI into existing business workflows

TARGET CLIENTS: Startups (seed to Series B), SMBs with operational complexity, family businesses needing tech modernization, companies needing fractional CTO-level thinking.

ACCURACY RULES — STRICTLY ENFORCE:
1. Distinguish clearly: FACTS (explicitly in source), USER CONTEXT (Aidan's notes), INFERENCES (logical deductions — mark confidence), UNKNOWN (not determinable)
2. NEVER invent: revenue, funding amounts, software stack, budget, headcount (unless stated), operational problems not mentioned, buying authority, technology used
3. For inferences write "Appears to be..." or "Potentially..." and end with "— should be validated through conversation"
4. Unknown fields: write "Unknown — not mentioned" not a guess
5. Be honest with scores. A cold contact with no apparent software need should score 10–25, not 70+.

LEAD SCORE 0–100 (be honest):
- Relationship strength (0–25): cold=0–5, acquaintance=6–10, warm=11–18, close friend/colleague=19–25
- Software need likelihood (0–25): obvious active need=20–25, probable=12–19, possible=6–11, unclear=0–5
- Ability to pay (0–20): enterprise/funded startup=16–20, established SMB=10–15, early-stage/unclear=0–9
- Portfolio/case study value (0–15): unique impressive domain=12–15, interesting=6–11, typical=0–5
- Referral potential (0–10): super connector=8–10, good network=4–7, unclear=0–3
- Timing (0–5): active pain now=4–5, near future=2–3, speculative=0–1

OUTREACH TONE:
- For fraternity brothers, alumni, close friends: casual, relationship-first, congratulatory — NO sales pitch
- For warm professional connections: genuine curiosity, shared context, light ask — not transactional
- For cold leads: specific observation, value-first, short — never generic

Return ONLY valid JSON. No markdown, no text outside JSON.`

function buildPrompt(body: Record<string, string>): string {
  return `Analyze this lead for Lynde Engineering and return a JSON object.

SOURCE POST / LEAD TEXT:
${body.source_text || 'Not provided'}

LINKEDIN PROFILE URL: ${body.linkedin_profile_url || 'Not provided'}
LINKEDIN POST URL: ${body.linkedin_post_url || 'Not provided'}
COMPANY WEBSITE: ${body.company_website || 'Not provided'}

AIDAN'S PERSONAL CONTEXT (voice note / notes):
${body.personal_context || body.voice_transcript || 'None provided'}

WHAT CAUGHT AIDAN'S ATTENTION: ${body.what_caught_attention || 'Not specified'}
POSSIBLE OPPORTUNITY: ${body.possible_opportunity || 'Not specified'}
POSSIBLE SERVICE FIT: ${body.possible_service_fit || 'Not specified'}
ADDITIONAL NOTES: ${body.additional_notes || 'None'}

Return JSON with this exact structure:
{
  "person": { "name": string|null, "title": string|null, "company": string|null },
  "company_info": {
    "industry": string|null,
    "description": string|null,
    "estimated_size": string|null,
    "size_confidence": "fact"|"inference"|"unknown"
  },
  "relationship": {
    "how_known": string|null,
    "warmth": "cold"|"warm"|"hot",
    "warmth_reasoning": string
  },
  "lead_classification": "Startup"|"Small Business"|"Family Business"|"Referral Partner"|"Enterprise"|"Other",
  "recommended_offer": "Software Clarity Audit"|"Prototype to Production"|"MVP Build Sprint"|"AI Workflow Automation",
  "lead_score": number,
  "score_reasoning": string,
  "ai_summary": string,
  "why_this_lead": string,
  "conversation_starter": string,
  "suggested_outreach": string,
  "questions_to_ask": string[],
  "potential_opportunities": string,
  "potential_risks": string,
  "facts": string,
  "ai_inferences": string,
  "missing_information": string
}`
}

router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, string>

    if (!body.source_text?.trim()) {
      res.status(400).json({ error: 'source_text is required' })
      return
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.6-terra',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildPrompt(body) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const raw = completion.choices[0].message.content
    if (!raw) throw new Error('Empty response from OpenAI')

    res.json({ analysis: JSON.parse(raw) })
  } catch (err) {
    console.error('Analysis error:', err)
    res.status(500).json({ error: 'AI analysis failed' })
  }
})

export default router
