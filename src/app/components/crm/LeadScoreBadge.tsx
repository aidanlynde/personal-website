'use client'

interface Props {
  score: number | null
  size?: 'sm' | 'md' | 'lg'
}

function scoreColor(score: number): string {
  if (score >= 70) return '#104827'
  if (score >= 50) return '#F9A825'
  if (score >= 30) return '#E65100'
  return '#757575'
}

export function LeadScoreBadge({ score, size = 'md' }: Props) {
  if (score == null) {
    return (
      <span style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>—</span>
    )
  }

  const color = scoreColor(score)
  const sizes = {
    sm: { width: 28, height: 28, fontSize: '0.7rem' },
    md: { width: 38, height: 38, fontSize: '0.9rem' },
    lg: { width: 56, height: 56, fontSize: '1.3rem' },
  }
  const s = sizes[size]

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.width,
      height: s.height,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      fontSize: s.fontSize,
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums',
      flexShrink: 0,
    }}>
      {score}
    </span>
  )
}
