'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { crmFetch } from '@/lib/crm-api'
import { StatCard } from '@/app/components/crm/StatCard'
import { StatusBadge } from '@/app/components/crm/StatusBadge'
import { LeadScoreBadge } from '@/app/components/crm/LeadScoreBadge'
import type { CRMStats, LeadSummary } from '@/types/crm'

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<CRMStats | null>(null)
  const [recentLeads, setRecentLeads] = useState<LeadSummary[]>([])
  const [highPriority, setHighPriority] = useState<LeadSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [statsRes, recentRes, priorityRes] = await Promise.all([
        crmFetch('/stats'),
        crmFetch('/leads?limit=5&sort_by=created_at&sort_order=desc'),
        crmFetch('/leads?priority=high&limit=5&sort_by=lead_score&sort_order=desc'),
      ])
      const [statsData, recentData, priorityData] = await Promise.all([
        statsRes.json(),
        recentRes.json(),
        priorityRes.json(),
      ])
      setStats(statsData)
      setRecentLeads(recentData.leads ?? [])
      setHighPriority(priorityData.leads ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#1a1a1a' }}>
          {greeting}, Aidan
        </h1>
        <p style={{ margin: '6px 0 0', color: '#888', fontSize: '0.9rem' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Link href="/routes/crm/leads/new" style={{ textDecoration: 'none' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#104827', color: '#fff',
          padding: '10px 20px', borderRadius: 8,
          fontSize: '0.9rem', fontWeight: 600, marginBottom: 32, cursor: 'pointer',
        }}>
          + New Lead
        </div>
      </Link>

      {loading ? (
        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Loading...</div>
      ) : stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginBottom: 36 }}>
            <StatCard label="Total" value={stats.total} highlight onClick={() => router.push('/routes/crm/leads')} />
            <StatCard label="New" value={stats.new} onClick={() => router.push('/routes/crm/leads?status=new')} />
            <StatCard label="Needs Review" value={stats.needs_review} onClick={() => router.push('/routes/crm/leads?status=needs_review')} />
            <StatCard label="Ready" value={stats.ready_for_outreach} onClick={() => router.push('/routes/crm/outreach')} />
            <StatCard label="Contacted" value={stats.contacted} onClick={() => router.push('/routes/crm/leads?status=contacted')} />
            <StatCard label="Meeting" value={stats.meeting_scheduled} onClick={() => router.push('/routes/crm/leads?status=meeting_scheduled')} />
            <StatCard label="Won" value={stats.won} />
            <StatCard label="Lost" value={stats.lost} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Section title="Recent Leads">
              {recentLeads.length === 0 ? (
                <Empty>No leads yet. <Link href="/routes/crm/leads/new" style={{ color: '#104827' }}>Add your first one.</Link></Empty>
              ) : recentLeads.map(lead => <LeadRow key={lead.id} lead={lead} />)}
            </Section>
            <Section title="High Priority">
              {highPriority.length === 0 ? (
                <Empty>No high priority leads.</Empty>
              ) : highPriority.map(lead => <LeadRow key={lead.id} lead={lead} />)}
            </Section>
          </div>
        </>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>{children}</p>
}

function LeadRow({ lead }: { lead: LeadSummary }) {
  return (
    <Link href={`/routes/crm/leads/${lead.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5F5F5', cursor: 'pointer' }}>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>{lead.name || 'Unknown'}</div>
          <div style={{ fontSize: '0.78rem', color: '#888', marginTop: 2 }}>{lead.company || lead.lead_type || '—'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusBadge status={lead.status} />
          <LeadScoreBadge score={lead.lead_score} size="sm" />
        </div>
      </div>
    </Link>
  )
}
