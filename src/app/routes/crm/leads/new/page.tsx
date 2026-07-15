'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { VoiceRecorder } from '@/app/components/crm/VoiceRecorder'
import type { AIAnalysis } from '@/types/crm'

type Phase = 'intake' | 'analyzing' | 'saving'

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

export default function NewLeadPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intake')
  const [intake, setIntake] = useState<IntakeForm>(EMPTY_INTAKE)
  const [error, setError] = useState<string | null>(null)

  function setField(field: keyof IntakeForm, value: string) {
    setIntake(prev => ({ ...prev, [field]: value }))
  }

  async function analyzeAndSave() {
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
      const payload = {
        ...intake,
        voice_transcript: intake.personal_context,
        name: a.person.name ?? '',
        title: a.person.title ?? '',
        company: a.person.company ?? '',
        industry: a.company_info.industry ?? '',
        company_description: a.company_info.description ?? '',
        company_size: a.company_info.estimated_size ?? '',
        relationship_context: a.relationship.how_known ?? '',
        relationship_warmth: a.relationship.warmth,
        lead_type: a.lead_classification,
        recommended_offer: a.recommended_offer,
        lead_score: a.lead_score,
        score_reasoning: a.score_reasoning,
        status: a.lead_score >= 60 ? 'ready_for_outreach' : 'needs_review',
        priority: a.lead_score >= 70 ? 'high' : a.lead_score >= 40 ? 'medium' : 'low',
        ai_summary: a.ai_summary,
        why_this_lead: a.why_this_lead,
        conversation_starter: a.conversation_starter,
        suggested_outreach: a.suggested_outreach,
        questions_to_ask: a.questions_to_ask,
        potential_opportunities: a.potential_opportunities,
        potential_risks: a.potential_risks,
        facts: a.facts,
        ai_inferences: a.ai_inferences,
        missing_information: a.missing_information,
        ai_analysis_json: a,
      }

      setPhase('saving')
      const saveRes = await crmFetch('/leads', { method: 'POST', body: JSON.stringify(payload) })
      const saved = await saveRes.json()
      if (!saveRes.ok) throw new Error(saved.error)

      router.push(`/routes/crm/leads/${saved.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setPhase('intake')
    }
  }

  const busy = phase === 'analyzing' || phase === 'saving'

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
            placeholder="Paste the LinkedIn post, profile text, or any relevant content here..." rows={7} style={textareaStyle} disabled={busy} />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="LinkedIn Profile URL">
            <input value={intake.linkedin_profile_url} onChange={e => setField('linkedin_profile_url', e.target.value)} placeholder="https://linkedin.com/in/..." style={inputStyle} disabled={busy} />
          </Field>
          <Field label="Company Website">
            <input value={intake.company_website} onChange={e => setField('company_website', e.target.value)} placeholder="https://..." style={inputStyle} disabled={busy} />
          </Field>
        </div>

        <Field label="LinkedIn Post URL">
          <input value={intake.linkedin_post_url} onChange={e => setField('linkedin_post_url', e.target.value)} placeholder="https://linkedin.com/posts/..." style={inputStyle} disabled={busy} />
        </Field>

        <Field label="Personal Context" hint="Speak for 30–90 seconds about how you know them, why they're interesting, and how Lynde Engineering could help."
          action={<VoiceRecorder onTranscript={text => setField('personal_context', intake.personal_context ? `${intake.personal_context}\n\n${text}` : text)} disabled={busy} />}>
          <textarea value={intake.personal_context} onChange={e => setField('personal_context', e.target.value)}
            placeholder="How do you know this person? Why are they interesting? What context do you have?" rows={5} style={textareaStyle} disabled={busy} />
        </Field>

        <details style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#555', listStyle: 'none', userSelect: 'none' }}>+ Optional context fields</summary>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="What caught your attention">
              <textarea value={intake.what_caught_attention} onChange={e => setField('what_caught_attention', e.target.value)} rows={2} style={textareaStyle} disabled={busy} placeholder="What specifically made you add this person?" />
            </Field>
            <Field label="Possible opportunity">
              <textarea value={intake.possible_opportunity} onChange={e => setField('possible_opportunity', e.target.value)} rows={2} style={textareaStyle} disabled={busy} placeholder="What problem might they need solved?" />
            </Field>
            <Field label="Possible service fit">
              <input value={intake.possible_service_fit} onChange={e => setField('possible_service_fit', e.target.value)} style={inputStyle} disabled={busy} placeholder="Which Lynde Engineering service might fit?" />
            </Field>
            <Field label="Additional notes">
              <textarea value={intake.additional_notes} onChange={e => setField('additional_notes', e.target.value)} rows={2} style={textareaStyle} disabled={busy} placeholder="Anything else worth knowing..." />
            </Field>
          </div>
        </details>
      </div>

      <div style={{ marginTop: 28 }}>
        <button onClick={analyzeAndSave} disabled={busy || !intake.source_text.trim()} style={{
          background: busy || !intake.source_text.trim() ? '#BDBDBD' : '#1a1a1a',
          color: '#fff', border: 'none', borderRadius: 9, padding: '13px 28px',
          fontSize: '1rem', fontWeight: 700,
          cursor: busy || !intake.source_text.trim() ? 'not-allowed' : 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: busy ? '#fff' : 'transparent', borderRadius: '50%', animation: busy ? 'spin 0.7s linear infinite' : 'none' }} />
          {phase === 'analyzing' ? 'Analyzing...' : phase === 'saving' ? 'Saving...' : 'Analyze & Save →'}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
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

const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #E8E8E8', fontSize: '0.88rem', outline: 'none', background: '#FAFAFA', color: '#333' }
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }
