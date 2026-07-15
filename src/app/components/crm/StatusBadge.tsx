'use client'

import type { LeadStatus, Priority, RelationshipWarmth } from '@/types/crm'

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  new: { label: 'New', bg: '#E8F4FD', text: '#1565C0' },
  needs_review: { label: 'Needs Review', bg: '#FFF3E0', text: '#E65100' },
  ready_for_outreach: { label: 'Ready', bg: '#EFEFEF', text: '#444' },
  contacted: { label: 'Contacted', bg: '#F3E5F5', text: '#6A1B9A' },
  meeting_scheduled: { label: 'Meeting', bg: '#E0F2F1', text: '#004D40' },
  proposal_sent: { label: 'Proposal', bg: '#FBE9E7', text: '#BF360C' },
  won: { label: 'Won', bg: '#333', text: '#ffffff' },
  lost: { label: 'Lost', bg: '#EEEEEE', text: '#757575' },
}

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  high: { label: 'High', color: '#E53935' },
  medium: { label: 'Medium', color: '#F9A825' },
  low: { label: 'Low', color: '#757575' },
}

const WARMTH_CONFIG: Record<RelationshipWarmth, { label: string; color: string }> = {
  hot: { label: 'Hot', color: '#E53935' },
  warm: { label: 'Warm', color: '#F9A825' },
  cold: { label: 'Cold', color: '#1565C0' },
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 10px',
      borderRadius: '99px',
      fontSize: '0.75rem',
      fontWeight: 500,
      background: cfg.bg,
      color: cfg.text,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  )
}

export function PriorityDot({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CONFIG[priority]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#555' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
      {cfg.label}
    </span>
  )
}

export function WarmthBadge({ warmth }: { warmth: RelationshipWarmth }) {
  const cfg = WARMTH_CONFIG[warmth]
  return (
    <span style={{ fontSize: '0.8rem', color: cfg.color, fontWeight: 500 }}>
      {cfg.label}
    </span>
  )
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  needs_review: 'Needs Review',
  ready_for_outreach: 'Ready for Outreach',
  contacted: 'Contacted',
  meeting_scheduled: 'Meeting Scheduled',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
}
