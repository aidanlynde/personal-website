// All CRM API calls go through Railway backend.
// NEXT_PUBLIC_CRM_API_URL must be set in .env.local (dev) and Vercel (prod).
const API_URL = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'http://localhost:4000'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('crm_token')
}

export function setToken(token: string): void {
  sessionStorage.setItem('crm_token', token)
}

export function clearToken(): void {
  sessionStorage.removeItem('crm_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

function handleUnauthorized() {
  clearToken()
  if (typeof window !== 'undefined') {
    window.location.href = '/routes/crm/login'
  }
}

// JSON requests
export async function crmFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (res.status === 401) handleUnauthorized()
  return res
}

// Multipart uploads (audio transcription)
export async function crmUpload(path: string, formData: FormData): Promise<Response> {
  const token = getToken()
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers, body: formData })
  if (res.status === 401) handleUnauthorized()
  return res
}

// Login doesn't need auth header
export async function crmLogin(password: string): Promise<Response> {
  return fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
}
