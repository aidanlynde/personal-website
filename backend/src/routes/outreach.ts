import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import { auth } from '../middleware/auth'

const router = Router()

const SYSTEM_PROMPT = `You are writing outreach messages on behalf of Aidan Lynde, founder of Lynde Engineering.

Aidan's voice: direct, genuine, curious, non-salesy. He values relationships over transactions.

TONE GUIDELINES:
- For close connections (warmth: hot): very casual, reference the real relationship, lead with congratulations or genuine interest. Zero sales talk. It should feel like a text from a friend.
- For warm connections (warmth: warm): professional but personal, reference the shared context, show genuine curiosity about their work. Ask a question. Do not pitch.
- For cold/unknown (warmth: cold): specific observation about their work, brief, offer value or a question. Never generic. Under 4 sentences.

NEVER:
- Open with "I hope this message finds you well"
- Use the phrase "I'd love to..."
- List Lynde Engineering services
- Sound like a sales email
- Exceed 5 sentences

Return ONLY the outreach message text. No subject line, no greeting — start with the first sentence of the message body.`

router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const {
      name, company, title, relationship_warmth, relationship_context,
      ai_summary, why_this_lead, conversation_starter, lead_type, recommended_offer,
    } = req.body as Record<string, string>

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.6-terra',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Write an outreach message for:
Name: ${name || 'Unknown'}
Company: ${company || 'Unknown'}
Title: ${title || 'Unknown'}
Relationship warmth: ${relationship_warmth || 'cold'}
How Aidan knows them: ${relationship_context || 'Unknown'}
Context summary: ${ai_summary || 'No summary available'}
Why this is a lead: ${why_this_lead || 'Not specified'}
Suggested conversation starter: ${conversation_starter || 'None'}
Lead type: ${lead_type || 'Unknown'}
Potential fit: ${recommended_offer || 'Not determined'}` },
      ],
      max_tokens: 300,
    })

    const outreach = completion.choices[0].message.content?.trim()
    if (!outreach) throw new Error('Empty response')

    res.json({ outreach })
  } catch (err) {
    console.error('Outreach generation error:', err)
    res.status(500).json({ error: 'Failed to generate outreach' })
  }
})

export default router
