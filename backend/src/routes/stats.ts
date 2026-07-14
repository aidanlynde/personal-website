import { Router } from 'express'
import { auth } from '../middleware/auth'
import { query } from '../lib/db'

const router = Router()

router.get('/', auth, async (_req, res) => {
  try {
    const [rows, totalRows] = await Promise.all([
      query<{ status: string; count: string }>(
        'SELECT status, COUNT(*) as count FROM leads GROUP BY status'
      ),
      query<{ count: string }>('SELECT COUNT(*) as count FROM leads'),
    ])

    const stats: Record<string, number> = {
      total: parseInt(totalRows[0]?.count ?? '0'),
      new: 0,
      needs_review: 0,
      ready_for_outreach: 0,
      contacted: 0,
      meeting_scheduled: 0,
      proposal_sent: 0,
      won: 0,
      lost: 0,
    }

    for (const row of rows) {
      stats[row.status] = parseInt(row.count)
    }

    res.json(stats)
  } catch (err) {
    console.error('Stats error:', err)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
