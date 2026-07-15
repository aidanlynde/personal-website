'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isAuthenticated, clearToken, crmFetch } from '@/lib/crm-api'

const NAV = [
  { href: '/routes/crm/dashboard', label: 'Dashboard', icon: GridIcon },
  { href: '/routes/crm/leads', label: 'All Leads', icon: ListIcon },
  { href: '/routes/crm/leads/new', label: 'New Lead', icon: PlusIcon },
  { href: '/routes/crm/outreach', label: 'Outreach Queue', icon: SendIcon },
]

interface Props {
  children: React.ReactNode
}

export default function CRMLayout({ children }: Props) {
  const pathname = usePathname() ?? ''
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  // Client-side auth guard — redirect to login if no JWT in sessionStorage
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/routes/crm/login')
    }
  }, [router])

  async function logout() {
    setLoggingOut(true)
    try {
      await crmFetch('/admin/logout', { method: 'POST' })
    } finally {
      clearToken()
      router.push('/routes/crm/login')
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EDEDED' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 100,
        flexShrink: 0,
      }}>
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Lynde Engineering
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
            CRM
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = href === '/routes/crm/leads'
              ? pathname === href || (!!pathname && pathname.startsWith('/routes/crm/leads') && pathname !== '/routes/crm/leads/new')
              : pathname === href || (href !== '/routes/crm/dashboard' && !!pathname && pathname.startsWith(href))
            return (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 20px',
                  margin: '1px 8px',
                  borderRadius: 7,
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                  }}
                >
                  <Icon />
                  {label}
                </div>
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
            Aidan Lynde
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
          >
            {loggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: 220, flex: 1, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}
