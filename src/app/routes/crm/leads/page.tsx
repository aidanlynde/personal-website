'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { StatusBadge, WarmthBadge } from '@/app/components/crm/StatusBadge'
import { LeadScoreBadge } from '@/app/components/crm/LeadScoreBadge'
import type { LeadSummary, LeadStatus, LeadType } from '@/types/crm'

const STATUSES: { value: LeadStatus | ''; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'ready_for_outreach', label: 'Ready for Outreach' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

const LEAD_TYPES: { value: LeadType | ''; label: string }[] = [
  { value: '', label: 'All types' },
  { value: 'Startup', label: 'Startup' },
  { value: 'Small Business', label: 'Small Business' },
  { value: 'Family Business', label: 'Family Business' },
  { value: 'Referral Partner', label: 'Referral Partner' },
  { value: 'Enterprise', label: 'Enterprise' },
  { value: 'Other', label: 'Other' },
]

export default function LeadsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: '#aaa' }}>Loading...</div>}>
      <LeadsContent />
    </Suspense>
  )
}

function LeadsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [leads, setLeads] = useState<LeadSummary[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState(searchParams?.get('search') ?? '')
  const [status, setStatus] = useState<LeadStatus | ''>((searchParams?.get('status') as LeadStatus) ?? '')
  const [leadType, setLeadType] = useState<LeadType | ''>((searchParams?.get('lead_type') as LeadType) ?? '')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    if (leadType) params.set('lead_type', leadType)
    params.set('sort_by', sortBy)
    params.set('sort_order', sortOrder)
    params.set('limit', '200')

    const res = await crmFetch(`/leads?${params}`)
    const data = await res.json()
    setLeads(data.leads ?? [])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [search, status, leadType, sortBy, sortOrder])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  function toggleSort(col: string) {
    if (sortBy === col) setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortOrder('desc') }
  }

  const SortIcon = ({ col }: { col: string }) => {
    if (sortBy !== col) return <span style={{ color: '#ccc', marginLeft: 4 }}>↕</span>
    return <span style={{ color: '#104827', marginLeft: 4 }}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a' }}>All Leads</h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '0.85rem' }}>{total} total</p>
        </div>
        <Link href="/routes/crm/leads/new" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#104827', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
            + New Lead
          </button>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        <input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 7, border: '1.5px solid #E0E0E0', fontSize: '0.85rem', outline: 'none', minWidth: 200, background: '#fff' }} />
        <select value={status} onChange={e => setStatus(e.target.value as LeadStatus | '')}
          style={{ padding: '8px 12px', borderRadius: 7, border: '1.5px solid #E0E0E0', fontSize: '0.85rem', background: '#fff', cursor: 'pointer' }}>
          {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={leadType} onChange={e => setLeadType(e.target.value as LeadType | '')}
          style={{ padding: '8px 12px', borderRadius: 7, border: '1.5px solid #E0E0E0', fontSize: '0.85rem', background: '#fff', cursor: 'pointer' }}>
          {LEAD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F0F0F0', background: '#FAFAFA' }}>
              {[
                { label: 'Name', col: 'name' }, { label: 'Company', col: 'company' },
                { label: 'Type', col: null }, { label: 'Status', col: 'status' },
                { label: 'Warmth', col: null }, { label: 'Score', col: 'lead_score' },
                { label: 'Added', col: 'created_at' },
              ].map(({ label, col }) => (
                <th key={label} onClick={() => col && toggleSort(col)}
                  style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: col ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap' }}>
                  {label}{col && <SortIcon col={col} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>
                  No leads found. <Link href="/routes/crm/leads/new" style={{ color: '#104827' }}>Add your first lead.</Link>
                </td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id} onClick={() => router.push(`/routes/crm/leads/${lead.id}`)}
                style={{ borderBottom: '1px solid #F5F5F5', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#222' }}>{lead.name || '—'}</div>
                  {lead.title && <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 2 }}>{lead.title}</div>}
                </td>
                <td style={{ padding: '13px 16px', fontSize: '0.85rem', color: '#555' }}>{lead.company || '—'}</td>
                <td style={{ padding: '13px 16px', fontSize: '0.78rem', color: '#777' }}>{lead.lead_type || '—'}</td>
                <td style={{ padding: '13px 16px' }}><StatusBadge status={lead.status} /></td>
                <td style={{ padding: '13px 16px' }}>{lead.relationship_warmth ? <WarmthBadge warmth={lead.relationship_warmth} /> : '—'}</td>
                <td style={{ padding: '13px 16px' }}><LeadScoreBadge score={lead.lead_score} size="sm" /></td>
                <td style={{ padding: '13px 16px', fontSize: '0.78rem', color: '#999' }}>
                  {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
