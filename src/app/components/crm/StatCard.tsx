'use client'

interface Props {
  label: string
  value: number
  onClick?: () => void
  highlight?: boolean
}

export function StatCard({ label, value, onClick, highlight }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: highlight ? '#104827' : '#fff',
        color: highlight ? '#fff' : '#333',
        borderRadius: 12,
        padding: '20px 24px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{
        fontSize: '0.8rem',
        marginTop: 6,
        color: highlight ? 'rgba(255,255,255,0.8)' : '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>
    </div>
  )
}
