'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { crmLogin, setToken } from '@/lib/crm-api'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await crmLogin(password)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Incorrect password.')
        setLoading(false)
        return
      }

      setToken(data.token)
      router.push('/routes/crm/dashboard')
    } catch {
      setError('Could not reach the CRM server. Is it running?')
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: '#EDEDED',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', borderRadius: 14, padding: '40px 44px',
        width: '100%', maxWidth: 380,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
            Lynde Engineering
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
            CRM
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: '0.88rem', color: '#888' }}>
            Internal access only
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: '#555', marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter admin password"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px', borderRadius: 8,
              border: error ? '1.5px solid #E53935' : '1.5px solid #E0E0E0',
              fontSize: '0.95rem', outline: 'none',
              background: '#FAFAFA', color: '#333',
            }}
          />
          {error && (
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#E53935' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              marginTop: 20, width: '100%',
              padding: '11px', borderRadius: 8,
              background: loading || !password ? '#BDBDBD' : '#1a1a1a',
              color: '#fff', border: 'none',
              fontSize: '0.95rem', fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
