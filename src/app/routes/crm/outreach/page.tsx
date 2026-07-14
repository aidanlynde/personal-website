'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { LeadScoreBadge } from '@/app/components/crm/LeadScoreBadge'
import { WarmthBadge } from '@/app/components/crm/StatusBadge'
import type { Lead } from '@/types/crm'

export default function OutreachQueuePage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [copied, setCopied] = useState(false)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    crmFetch('/leads?status=ready_for_outreach&sort_by=lead_score&sort_order=desc&limit=100')
      .then(r => r.json())
      .then(data => { setLeads(data.leads ?? []); setLoading(false) })
  }, [])

  async function markContacted(lead: Lead) {
    setMarking(true)
    await crmFetch(`/leads/${lead.id}`, { method: 'PUT', body: JSON.stringify({ status: 'contacted' }) })
    setLeads(prev => prev.filter(l => l.id !== lead.id))
    setSelected(null)
    setMarking(false)
  }

  async function copyOutreach(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Queue list */}
      <div style={{ width: 340, borderRight: '1px solid #E8E8E8', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Outreach Queue</h1>
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>{loading ? '...' : `${leads.length} ready`} · sorted by score</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: 24, color: '#aaa', fontSize: '0.85rem' }}>Loading...</div>
          ) : leads.length === 0 ? (
            <div style={{ padding: 24, color: '#aaa', fontSize: '0.85rem', textAlign: 'center' }}>
              <div style={{ marginBottom: 8 }}>Queue is empty.</div>
              <div style={{ fontSize: '0.78rem', color: '#bbb' }}>Leads appear here when marked as &ldquo;Ready for Outreach&rdquo;.</div>
            </div>
          ) : leads.map(lead => (
            <div key={lead.id} onClick={() => { setSelected(lead); setCopied(false) }}
              style={{ padding: '14px 24px', borderBottom: '1px solid #F5F5F5', cursor: 'pointer', background: selected?.id === lead.id ? '#F8FFF9' : 'transparent', borderLeft: selected?.id === lead.id ? '3px solid #104827' : '3px solid transparent', transition: 'background 0.1s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#222', marginBottom: 2 }}>{lead.name || 'Unknown'}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.company || lead.lead_type || '—'}</div>
                  {lead.recommended_offer && <span style={{ fontSize: '0.7rem', background: '#E8F5E9', color: '#1B5E20', padding: '2px 8px', borderRadius: 99 }}>{lead.recommended_offer}</span>}
                </div>
                <LeadScoreBadge score={lead.lead_score} size="sm" />
              </div>
              {lead.relationship_warmth && <div style={{ marginTop: 6 }}><WarmthBadge warmth={lead.relationship_warmth} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#EDEDED', padding: '32px 40px' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center', color: '#aaa' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>←</div>
              <div style={{ fontSize: '0.9rem' }}>Select a lead to see their outreach</div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <LeadScoreBadge score={selected.lead_score} size="lg" />
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a' }}>{selected.name || 'Unknown'}</h2>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 3 }}>{[selected.title, selected.company].filter(Boolean).join(' · ') || '—'}</div>
                </div>
              </div>
              <button onClick={() => router.push(`/routes/crm/leads/${selected.id}`)}
                style={{ fontSize: '0.78rem', color: '#888', background: 'none', border: '1.5px solid #E0E0E0', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>
                Full profile →
              </button>
            </div>

            {selected.why_this_lead && (
              <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={sectionLabel}>Why this lead</div>
                <p style={bodyText}>{selected.why_this_lead}</p>
              </div>
            )}

            {selected.ai_summary && (
              <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={sectionLabel}>Summary</div>
                <p style={bodyText}>{selected.ai_summary}</p>
              </div>
            )}

            {selected.conversation_starter && (
              <div style={{ background: '#F8FFF9', borderRadius: 10, padding: '14px 18px', marginBottom: 16, borderLeft: '3px solid #104827' }}>
                <div style={sectionLabel}>Open with</div>
                <p style={{ ...bodyText, fontStyle: 'italic' }}>{selected.conversation_starter}</p>
              </div>
            )}

            {selected.suggested_outreach && (
              <div style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ marginBottom: 12 }}><div style={sectionLabel}>Message draft</div></div>
                <p style={{ ...bodyText, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{selected.suggested_outreach}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              {selected.suggested_outreach && (
                <button onClick={() => copyOutreach(selected.suggested_outreach!)}
                  style={{ background: copied ? '#E8F5E9' : '#104827', color: copied ? '#104827' : '#fff', border: 'none', borderRadius: 8, padding: '11px 22px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                  {copied ? 'Copied!' : 'Copy Message'}
                </button>
              )}
              <button onClick={() => markContacted(selected)} disabled={marking}
                style={{ background: '#fff', color: '#333', border: '1.5px solid #E0E0E0', borderRadius: 8, padding: '11px 22px', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}>
                {marking ? 'Marking...' : '✓ Mark as Contacted'}
              </button>
            </div>

            {selected.questions_to_ask && selected.questions_to_ask.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', marginTop: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={sectionLabel}>Questions to explore</div>
                <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                  {selected.questions_to_ask.map((q, i) => <li key={i} style={{ fontSize: '0.85rem', color: '#444', marginBottom: 6, lineHeight: 1.4 }}>{q}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const sectionLabel: React.CSSProperties = { fontSize: '0.72rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }
const bodyText: React.CSSProperties = { margin: 0, fontSize: '0.88rem', color: '#333', lineHeight: 1.6 }
