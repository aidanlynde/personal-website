'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { StatusBadge, WarmthBadge, STATUS_LABELS } from '@/app/components/crm/StatusBadge'
import { LeadScoreBadge } from '@/app/components/crm/LeadScoreBadge'
import { VoiceRecorder } from '@/app/components/crm/VoiceRecorder'
import type { Lead, LeadStatus } from '@/types/crm'

export default function LeadPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Partial<Lead>>({})
  const [saving, setSaving] = useState(false)
  const [regeneratingOutreach, setRegeneratingOutreach] = useState(false)
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    crmFetch(`/leads/${id}`)
      .then(r => r.json())
      .then(data => { setLead(data); setDraft(data); setLoading(false) })
  }, [id])

  async function saveChanges() {
    setSaving(true)
    const res = await crmFetch(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(draft) })
    const updated = await res.json()
    setLead(updated); setDraft(updated); setEditing(false); setSaving(false)
  }

  async function updateStatus(status: LeadStatus) {
    const res = await crmFetch(`/leads/${id}`, { method: 'PUT', body: JSON.stringify({ status }) })
    const updated = await res.json()
    setLead(updated); setDraft(updated)
  }

  async function regenerateOutreach() {
    if (!lead) return
    setRegeneratingOutreach(true)
    const res = await crmFetch('/outreach', {
      method: 'POST',
      body: JSON.stringify({
        name: lead.name, company: lead.company, title: lead.title,
        relationship_warmth: lead.relationship_warmth, relationship_context: lead.relationship_context,
        ai_summary: lead.ai_summary, why_this_lead: lead.why_this_lead,
        conversation_starter: lead.conversation_starter,
        lead_type: lead.lead_type, recommended_offer: lead.recommended_offer,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      await crmFetch(`/leads/${id}`, { method: 'PUT', body: JSON.stringify({ suggested_outreach: data.outreach }) })
      setLead(prev => prev ? { ...prev, suggested_outreach: data.outreach } : prev)
      setDraft(prev => ({ ...prev, suggested_outreach: data.outreach }))
    }
    setRegeneratingOutreach(false)
  }

  async function copyOutreach() {
    if (lead?.suggested_outreach) {
      await navigator.clipboard.writeText(lead.suggested_outreach)
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }
  }

  async function deleteLead() {
    if (!confirm('Delete this lead? This cannot be undone.')) return
    setDeleting(true)
    await crmFetch(`/leads/${id}`, { method: 'DELETE' })
    router.push('/routes/crm/leads')
  }

  function setDraftField(field: keyof Lead, value: unknown) {
    setDraft(prev => ({ ...prev, [field]: value }))
  }

  if (loading) return <div style={{ padding: 40, color: '#aaa' }}>Loading...</div>
  if (!lead) return <div style={{ padding: 40, color: '#888' }}>Lead not found. <button onClick={() => router.push('/routes/crm/leads')} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>Back</button></div>

  return (
    <div style={{ padding: '32px 40px', maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <button onClick={() => router.push('/routes/crm/leads')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.85rem', padding: 0, marginBottom: 10 }}>← All Leads</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <LeadScoreBadge score={lead.lead_score} size="lg" />
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>{lead.name || 'Unknown Lead'}</h1>
              <div style={{ fontSize: '0.88rem', color: '#888', marginTop: 3 }}>{[lead.title, lead.company].filter(Boolean).join(' · ') || 'No details yet'}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
          <StatusBadge status={lead.status} />
          {editing ? (
            <>
              <button onClick={saveChanges} disabled={saving} style={primarySmallBtn}>{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => { setEditing(false); setDraft(lead) }} style={ghostSmallBtn}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} style={ghostSmallBtn}>Edit</button>
          )}
          <button onClick={deleteLead} disabled={deleting} style={{ ...ghostSmallBtn, color: '#E53935', borderColor: '#FFCDD2' }}>{deleting ? '...' : 'Delete'}</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {(Object.keys(STATUS_LABELS) as LeadStatus[]).filter(s => s !== lead.status).map(s => (
          <button key={s} onClick={() => updateStatus(s)}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1.5px solid #E0E0E0', background: '#fff', color: '#555', fontSize: '0.78rem', cursor: 'pointer' }}>
            → {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lead.ai_summary && (
            <Card title="Summary">
              {editing ? <EditTextarea value={draft.ai_summary ?? ''} onChange={v => setDraftField('ai_summary', v)} rows={6} /> : <p style={bodyText}>{lead.ai_summary}</p>}
            </Card>
          )}
          <Card title="Contact">
            {editing ? (
              <><EditField label="Name" value={draft.name ?? ''} onChange={v => setDraftField('name', v)} />
              <EditField label="Title" value={draft.title ?? ''} onChange={v => setDraftField('title', v)} />
              <EditField label="Company" value={draft.company ?? ''} onChange={v => setDraftField('company', v)} /></>
            ) : (
              <InfoGrid items={[{ label: 'Name', value: lead.name }, { label: 'Title', value: lead.title }, { label: 'Company', value: lead.company }, { label: 'Industry', value: lead.industry }, { label: 'Size', value: lead.company_size }]} />
            )}
          </Card>
          <Card title="Relationship">
            {editing ? (
              <><EditField label="How known" value={draft.relationship_context ?? ''} onChange={v => setDraftField('relationship_context', v)} />
              <div style={{ marginBottom: 10 }}>
                <label style={smallLabel}>Warmth</label>
                <select value={draft.relationship_warmth ?? ''} onChange={e => setDraftField('relationship_warmth', e.target.value)} style={editSelectStyle}>
                  <option value="cold">Cold</option><option value="warm">Warm</option><option value="hot">Hot</option>
                </select>
              </div></>
            ) : (
              <InfoGrid items={[{ label: 'Connection', value: lead.relationship_context }, { label: 'Warmth', value: lead.relationship_warmth ? <WarmthBadge warmth={lead.relationship_warmth} /> : null }]} />
            )}
          </Card>
          <Card title="Classification">
            {editing ? (
              <><div style={{ marginBottom: 10 }}>
                <label style={smallLabel}>Lead Type</label>
                <select value={draft.lead_type ?? ''} onChange={e => setDraftField('lead_type', e.target.value)} style={editSelectStyle}>
                  {['Startup','Small Business','Family Business','Referral Partner','Enterprise','Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={smallLabel}>Recommended Offer</label>
                <select value={draft.recommended_offer ?? ''} onChange={e => setDraftField('recommended_offer', e.target.value)} style={editSelectStyle}>
                  {['Software Clarity Audit','Prototype to Production','MVP Build Sprint','AI Workflow Automation'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div></>
            ) : (
              <InfoGrid items={[{ label: 'Type', value: lead.lead_type }, { label: 'Best Offer', value: lead.recommended_offer }, { label: 'Priority', value: lead.priority }]} />
            )}
          </Card>
          {lead.why_this_lead && (
            <Card title="Why This Lead">
              {editing ? <EditTextarea value={draft.why_this_lead ?? ''} onChange={v => setDraftField('why_this_lead', v)} rows={3} /> : <p style={bodyText}>{lead.why_this_lead}</p>}
            </Card>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="Outreach">
            {lead.conversation_starter && (
              <div style={{ marginBottom: 14, padding: '10px 14px', background: '#F5F5F5', borderRadius: 8, borderLeft: '3px solid #444' }}>
                <div style={smallLabel}>Conversation starter</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#333', lineHeight: 1.5 }}>{lead.conversation_starter}</p>
              </div>
            )}
            {lead.suggested_outreach && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={smallLabel}>Suggested message</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={regenerateOutreach} disabled={regeneratingOutreach} style={{ fontSize: '0.75rem', color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{regeneratingOutreach ? 'Regenerating...' : 'Regenerate'}</button>
                    <button onClick={copyOutreach} style={{ fontSize: '0.75rem', color: copied ? '#333' : '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: copied ? 600 : 400 }}>{copied ? 'Copied!' : 'Copy'}</button>
                  </div>
                </div>
                {editing ? <EditTextarea value={draft.suggested_outreach ?? ''} onChange={v => setDraftField('suggested_outreach', v)} rows={7} /> : <p style={{ ...bodyText, whiteSpace: 'pre-wrap' }}>{lead.suggested_outreach}</p>}
              </div>
            )}
          </Card>
          <Card title="Lead Score">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <LeadScoreBadge score={lead.lead_score} size="md" />
              <span style={{ fontSize: '0.85rem', color: '#888' }}>/ 100</span>
            </div>
            {lead.score_reasoning && <p style={{ ...bodyText, fontSize: '0.82rem' }}>{lead.score_reasoning}</p>}
          </Card>
          {lead.questions_to_ask && lead.questions_to_ask.length > 0 && (
            <Card title="Questions to Ask">
              <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                {lead.questions_to_ask.map((q, i) => <li key={i} style={{ fontSize: '0.85rem', color: '#444', marginBottom: 6, lineHeight: 1.4 }}>{q}</li>)}
              </ul>
            </Card>
          )}
          {lead.potential_opportunities && <Card title="Potential Opportunities"><p style={bodyText}>{lead.potential_opportunities}</p></Card>}
          {lead.potential_risks && <Card title="Potential Risks"><p style={{ ...bodyText, color: '#C62828' }}>{lead.potential_risks}</p></Card>}
          <Card title="Your Notes">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', color: '#999' }}>Private notes</span>
              <VoiceRecorder onTranscript={text => { setDraftField('manual_notes', draft.manual_notes ? `${draft.manual_notes}\n\n${text}` : text); setEditing(true) }} />
            </div>
            <textarea value={draft.manual_notes ?? lead.manual_notes ?? ''} onChange={e => { setDraftField('manual_notes', e.target.value); setEditing(true) }} rows={4}
              placeholder="Add private notes about this lead..." style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.85rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
            <div style={{ marginTop: 10 }}>
              <label style={smallLabel}>Next follow-up date</label>
              <input type="date" value={draft.next_followup_date ?? lead.next_followup_date ?? ''} onChange={e => { setDraftField('next_followup_date', e.target.value); setEditing(true) }}
                style={{ padding: '6px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.85rem', outline: 'none' }} />
            </div>
          </Card>
        </div>
      </div>

      {(lead.facts || lead.ai_inferences || lead.missing_information) && (
        <details style={{ marginTop: 20 }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#888', listStyle: 'none', userSelect: 'none', padding: '12px 0' }}>AI Analysis Details</summary>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 12 }}>
            {lead.facts && <Card title="Facts"><p style={bodyText}>{lead.facts}</p></Card>}
            {lead.ai_inferences && <Card title="AI Inferences"><p style={bodyText}>{lead.ai_inferences}</p></Card>}
            {lead.missing_information && <Card title="Missing Info"><p style={bodyText}>{lead.missing_information}</p></Card>}
          </div>
        </details>
      )}

      {lead.source_text && (
        <details style={{ marginTop: 8 }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#888', listStyle: 'none', userSelect: 'none', padding: '12px 0' }}>Original Source Text</summary>
          <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', marginTop: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.82rem', color: '#666', fontFamily: 'inherit', lineHeight: 1.6 }}>{lead.source_text}</pre>
          </div>
        </details>
      )}

      <div style={{ marginTop: 24, fontSize: '0.75rem', color: '#bbb', display: 'flex', gap: 16 }}>
        <span>Created {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        <span>Updated {new Date(lead.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</h3>
      {children}
    </div>
  )
}

function InfoGrid({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <div>
      {items.filter(i => i.value).map(({ label, value }) => (
        <div key={label} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 600, minWidth: 80, paddingTop: 1 }}>{label}</span>
          <span style={{ fontSize: '0.85rem', color: '#333', flex: 1 }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

function EditField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={smallLabel}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.85rem', outline: 'none', background: '#FAFAFA' }} />
    </div>
  )
}

function EditTextarea({ value, onChange, rows }: { value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.85rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.5 }} />
  )
}

const smallLabel: React.CSSProperties = { display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }
const bodyText: React.CSSProperties = { margin: 0, fontSize: '0.85rem', color: '#444', lineHeight: 1.6 }
const editSelectStyle: React.CSSProperties = { width: '100%', padding: '7px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.85rem', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }
const primarySmallBtn: React.CSSProperties = { background: '#1a1a1a', color: '#fff', border: 'none', padding: '7px 16px', borderRadius: 7, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }
const ghostSmallBtn: React.CSSProperties = { background: '#fff', color: '#555', border: '1.5px solid #E0E0E0', padding: '7px 16px', borderRadius: 7, fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }
