'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { VoiceRecorder } from '@/app/components/crm/VoiceRecorder'
import { LeadScoreBadge } from '@/app/components/crm/LeadScoreBadge'
import type { AIAnalysis, LeadStatus } from '@/types/crm'

type Phase = 'intake' | 'analyzing' | 'review' | 'saving'

interface IntakeForm {
  source_text: string
  linkedin_profile_url: string
  linkedin_post_url: string
  company_website: string
  personal_context: string
  what_caught_attention: string
  possible_opportunity: string
  possible_service_fit: string
  additional_notes: string
}

const EMPTY_INTAKE: IntakeForm = {
  source_text: '', linkedin_profile_url: '', linkedin_post_url: '',
  company_website: '', personal_context: '', what_caught_attention: '',
  possible_opportunity: '', possible_service_fit: '', additional_notes: '',
}

interface ReviewState {
  name: string; title: string; company: string
  industry: string; company_description: string; company_size: string
  relationship_context: string; relationship_warmth: string
  lead_type: string; recommended_offer: string
  lead_score: number; score_reasoning: string
  status: LeadStatus; priority: string
  ai_summary: string; why_this_lead: string; conversation_starter: string
  suggested_outreach: string; questions_to_ask: string[]
  potential_opportunities: string; potential_risks: string
  facts: string; ai_inferences: string; missing_information: string
}

export default function NewLeadPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intake')
  const [intake, setIntake] = useState<IntakeForm>(EMPTY_INTAKE)
  const [rawAnalysis, setRawAnalysis] = useState<AIAnalysis | null>(null)
  const [review, setReview] = useState<ReviewState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [regeneratingOutreach, setRegeneratingOutreach] = useState(false)

  function setField(field: keyof IntakeForm, value: string) {
    setIntake(prev => ({ ...prev, [field]: value }))
  }

  function setReviewField(field: keyof ReviewState, value: unknown) {
    setReview(prev => prev ? { ...prev, [field]: value } : prev)
  }

  async function analyze() {
    if (!intake.source_text.trim()) { setError('Source text is required.'); return }
    setError(null)
    setPhase('analyzing')

    try {
      const res = await crmFetch('/analyze', {
        method: 'POST',
        body: JSON.stringify(intake),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      const a: AIAnalysis = data.analysis
      setRawAnalysis(a)
      setReview({
        name: a.person.name ?? '', title: a.person.title ?? '', company: a.person.company ?? '',
        industry: a.company_info.industry ?? '',
        company_description: a.company_info.description ?? '',
        company_size: a.company_info.estimated_size ?? '',
        relationship_context: a.relationship.how_known ?? '',
        relationship_warmth: a.relationship.warmth,
        lead_type: a.lead_classification, recommended_offer: a.recommended_offer,
        lead_score: a.lead_score, score_reasoning: a.score_reasoning,
        status: a.lead_score >= 60 ? 'ready_for_outreach' : 'needs_review',
        priority: a.lead_score >= 70 ? 'high' : a.lead_score >= 40 ? 'medium' : 'low',
        ai_summary: a.ai_summary, why_this_lead: a.why_this_lead,
        conversation_starter: a.conversation_starter, suggested_outreach: a.suggested_outreach,
        questions_to_ask: a.questions_to_ask,
        potential_opportunities: a.potential_opportunities, potential_risks: a.potential_risks,
        facts: a.facts, ai_inferences: a.ai_inferences, missing_information: a.missing_information,
      })
      setPhase('review')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI analysis failed')
      setPhase('intake')
    }
  }

  async function regenerateOutreach() {
    if (!review) return
    setRegeneratingOutreach(true)
    try {
      const res = await crmFetch('/outreach', {
        method: 'POST',
        body: JSON.stringify({
          name: review.name, company: review.company, title: review.title,
          relationship_warmth: review.relationship_warmth,
          relationship_context: review.relationship_context,
          ai_summary: review.ai_summary, why_this_lead: review.why_this_lead,
          conversation_starter: review.conversation_starter,
          lead_type: review.lead_type, recommended_offer: review.recommended_offer,
        }),
      })
      const data = await res.json()
      if (res.ok) setReviewField('suggested_outreach', data.outreach)
    } finally {
      setRegeneratingOutreach(false)
    }
  }

  async function save(statusOverride?: LeadStatus) {
    if (!review) return
    setPhase('saving')
    const payload = {
      ...intake, voice_transcript: intake.personal_context,
      ...review, status: statusOverride ?? review.status,
      ai_analysis_json: rawAnalysis,
    }
    try {
      const res = await crmFetch('/leads', { method: 'POST', body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/routes/crm/leads/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
      setPhase('review')
    }
  }

  // ─── INTAKE ────────────────────────────────────────────────────────────────

  if (phase === 'intake' || phase === 'analyzing') {
    return (
      <div style={{ padding: '36px 40px', maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={() => router.push('/routes/crm/leads')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.88rem', padding: 0 }}>
            ← Leads
          </button>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a' }}>New Lead</h1>
        </div>

        {error && <div style={{ padding: '12px 16px', background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: 8, color: '#C62828', fontSize: '0.85rem', marginBottom: 20 }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Field label="Lead Source" required hint="Paste a LinkedIn post, bio, company description, or any text about this person.">
            <textarea value={intake.source_text} onChange={e => setField('source_text', e.target.value)}
              placeholder="Paste the LinkedIn post, profile text, or any relevant content here..." rows={7} style={textareaStyle} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="LinkedIn Profile URL">
              <input value={intake.linkedin_profile_url} onChange={e => setField('linkedin_profile_url', e.target.value)} placeholder="https://linkedin.com/in/..." style={inputStyle} />
            </Field>
            <Field label="Company Website">
              <input value={intake.company_website} onChange={e => setField('company_website', e.target.value)} placeholder="https://..." style={inputStyle} />
            </Field>
          </div>

          <Field label="LinkedIn Post URL">
            <input value={intake.linkedin_post_url} onChange={e => setField('linkedin_post_url', e.target.value)} placeholder="https://linkedin.com/posts/..." style={inputStyle} />
          </Field>

          <Field label="Personal Context" hint="Speak for 30–90 seconds about how you know them, why they're interesting, and how Lynde Engineering could help."
            action={<VoiceRecorder onTranscript={text => setField('personal_context', intake.personal_context ? `${intake.personal_context}\n\n${text}` : text)} disabled={phase === 'analyzing'} />}>
            <textarea value={intake.personal_context} onChange={e => setField('personal_context', e.target.value)}
              placeholder="How do you know this person? Why are they interesting? What context do you have?" rows={5} style={textareaStyle} />
          </Field>

          <details style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <summary style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#555', listStyle: 'none', userSelect: 'none' }}>+ Optional context fields</summary>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="What caught your attention">
                <textarea value={intake.what_caught_attention} onChange={e => setField('what_caught_attention', e.target.value)} rows={2} style={textareaStyle} placeholder="What specifically made you add this person?" />
              </Field>
              <Field label="Possible opportunity">
                <textarea value={intake.possible_opportunity} onChange={e => setField('possible_opportunity', e.target.value)} rows={2} style={textareaStyle} placeholder="What problem might they need solved?" />
              </Field>
              <Field label="Possible service fit">
                <input value={intake.possible_service_fit} onChange={e => setField('possible_service_fit', e.target.value)} style={inputStyle} placeholder="Which Lynde Engineering service might fit?" />
              </Field>
              <Field label="Additional notes">
                <textarea value={intake.additional_notes} onChange={e => setField('additional_notes', e.target.value)} rows={2} style={textareaStyle} placeholder="Anything else worth knowing..." />
              </Field>
            </div>
          </details>
        </div>

        <div style={{ marginTop: 28 }}>
          <button onClick={analyze} disabled={phase === 'analyzing' || !intake.source_text.trim()} style={{
            background: phase === 'analyzing' || !intake.source_text.trim() ? '#BDBDBD' : '#104827',
            color: '#fff', border: 'none', borderRadius: 9, padding: '13px 28px',
            fontSize: '1rem', fontWeight: 700,
            cursor: phase === 'analyzing' || !intake.source_text.trim() ? 'not-allowed' : 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {phase === 'analyzing' ? (
              <><span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Analyzing lead...</>
            ) : 'Analyze Lead →'}
          </button>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  // ─── REVIEW ────────────────────────────────────────────────────────────────

  if ((phase === 'review' || phase === 'saving') && review) {
    return (
      <div style={{ padding: '36px 40px', maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={() => setPhase('intake')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.88rem', padding: 0 }}>← Back to intake</button>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a' }}>Review Lead</h1>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: '#E8F5E9', color: '#1B5E20', padding: '3px 10px', borderRadius: 99, fontWeight: 500 }}>AI analyzed</span>
        </div>

        {error && <div style={{ padding: '12px 16px', background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: 8, color: '#C62828', fontSize: '0.85rem', marginBottom: 20 }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Person">
              <ReviewField label="Name" value={review.name} onChange={v => setReviewField('name', v)} />
              <ReviewField label="Title" value={review.title} onChange={v => setReviewField('title', v)} />
              <ReviewField label="Company" value={review.company} onChange={v => setReviewField('company', v)} />
            </Card>
            <Card title="Company">
              <ReviewField label="Industry" value={review.industry} onChange={v => setReviewField('industry', v)} />
              <ReviewTextarea label="Description" value={review.company_description} onChange={v => setReviewField('company_description', v)} rows={3} />
              <ReviewField label="Est. Size" value={review.company_size} onChange={v => setReviewField('company_size', v)} />
            </Card>
            <Card title="Relationship">
              <ReviewField label="How known" value={review.relationship_context} onChange={v => setReviewField('relationship_context', v)} />
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Warmth</label>
                <select value={review.relationship_warmth} onChange={e => setReviewField('relationship_warmth', e.target.value)} style={selectStyle}>
                  <option value="cold">Cold</option><option value="warm">Warm</option><option value="hot">Hot</option>
                </select>
              </div>
            </Card>
            <Card title="Classification">
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Lead Type</label>
                <select value={review.lead_type} onChange={e => setReviewField('lead_type', e.target.value)} style={selectStyle}>
                  {['Startup','Small Business','Family Business','Referral Partner','Enterprise','Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Recommended Offer</label>
                <select value={review.recommended_offer} onChange={e => setReviewField('recommended_offer', e.target.value)} style={selectStyle}>
                  {['Software Clarity Audit','Prototype to Production','MVP Build Sprint','AI Workflow Automation'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </Card>
            <Card title="CRM Settings">
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Status</label>
                <select value={review.status} onChange={e => setReviewField('status', e.target.value)} style={selectStyle}>
                  {[['new','New'],['needs_review','Needs Review'],['ready_for_outreach','Ready for Outreach'],['contacted','Contacted'],['meeting_scheduled','Meeting Scheduled'],['proposal_sent','Proposal Sent'],['won','Won'],['lost','Lost']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <select value={review.priority} onChange={e => setReviewField('priority', e.target.value)} style={selectStyle}>
                  <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                </select>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Lead Score">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <LeadScoreBadge score={review.lead_score} size="lg" />
                <div>
                  <input type="number" min={0} max={100} value={review.lead_score} onChange={e => setReviewField('lead_score', parseInt(e.target.value) || 0)} style={{ ...inputStyle, width: 70 }} />
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 4 }}>out of 100</div>
                </div>
              </div>
              <ReviewTextarea label="Score reasoning" value={review.score_reasoning} onChange={v => setReviewField('score_reasoning', v)} rows={4} />
            </Card>
            <Card title="AI Summary">
              <ReviewTextarea label="" value={review.ai_summary} onChange={v => setReviewField('ai_summary', v)} rows={5} />
            </Card>
            <Card title="Why This Lead">
              <ReviewTextarea label="" value={review.why_this_lead} onChange={v => setReviewField('why_this_lead', v)} rows={3} />
            </Card>
            <Card title="Outreach">
              <ReviewField label="Conversation starter" value={review.conversation_starter} onChange={v => setReviewField('conversation_starter', v)} />
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={labelStyle}>Suggested message</label>
                  <button onClick={regenerateOutreach} disabled={regeneratingOutreach}
                    style={{ fontSize: '0.75rem', color: '#104827', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                    {regeneratingOutreach ? 'Regenerating...' : 'Regenerate'}
                  </button>
                </div>
                <textarea value={review.suggested_outreach} onChange={e => setReviewField('suggested_outreach', e.target.value)} rows={6} style={textareaStyle} />
              </div>
            </Card>
            <Card title="Questions to Ask">
              {review.questions_to_ask.map((q, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <input value={q} onChange={e => { const u = [...review.questions_to_ask]; u[i] = e.target.value; setReviewField('questions_to_ask', u) }} style={{ ...inputStyle, fontSize: '0.82rem' }} />
                </div>
              ))}
            </Card>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
          <Card title="Facts"><ReviewTextarea label="" value={review.facts} onChange={v => setReviewField('facts', v)} rows={5} /></Card>
          <Card title="AI Inferences"><ReviewTextarea label="" value={review.ai_inferences} onChange={v => setReviewField('ai_inferences', v)} rows={5} /></Card>
          <Card title="Missing Information"><ReviewTextarea label="" value={review.missing_information} onChange={v => setReviewField('missing_information', v)} rows={5} /></Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <Card title="Potential Opportunities"><ReviewTextarea label="" value={review.potential_opportunities} onChange={v => setReviewField('potential_opportunities', v)} rows={4} /></Card>
          <Card title="Potential Risks"><ReviewTextarea label="" value={review.potential_risks} onChange={v => setReviewField('potential_risks', v)} rows={4} /></Card>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <button onClick={() => save()} disabled={phase === 'saving'} style={{ ...primaryBtn, minWidth: 140 }}>{phase === 'saving' ? 'Saving...' : 'Save Lead'}</button>
          <button onClick={() => save('needs_review')} disabled={phase === 'saving'} style={secondaryBtn}>Save as Needs Review</button>
          <button onClick={analyze} disabled={phase === 'saving'} style={ghostBtn}>Regenerate Analysis</button>
          <button onClick={() => router.push('/routes/crm/leads')} style={{ ...ghostBtn, color: '#E53935', borderColor: '#FFCDD2' }}>Discard</button>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return null
}

function Field({ label, required, hint, action, children }: { label: string; required?: boolean; hint?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: hint ? 4 : 8 }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>
          {label}{required && <span style={{ color: '#E53935', marginLeft: 3 }}>*</span>}
        </label>
        {action}
      </div>
      {hint && <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#999', lineHeight: 1.4 }}>{hint}</p>}
      {children}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '0.8rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</h3>
      {children}
    </div>
  )
}

function ReviewField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label style={labelStyle}>{label}</label>}
      <input value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
    </div>
  )
}

function ReviewTextarea({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={textareaStyle} />
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }
const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.88rem', outline: 'none', background: '#FAFAFA', color: '#333' }
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }
const selectStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.88rem', outline: 'none', background: '#FAFAFA', color: '#333', cursor: 'pointer' }
const primaryBtn: React.CSSProperties = { background: '#104827', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: 8, fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer' }
const secondaryBtn: React.CSSProperties = { background: '#fff', color: '#333', border: '1.5px solid #E0E0E0', padding: '11px 22px', borderRadius: 8, fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }
const ghostBtn: React.CSSProperties = { background: 'transparent', color: '#555', border: '1.5px solid #E0E0E0', padding: '11px 22px', borderRadius: 8, fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }
