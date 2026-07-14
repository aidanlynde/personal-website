import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool(): Pool {
  if (pool) return pool

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

  pool.on('error', (err) => {
    console.error('Unexpected pool error', err)
  })

  return pool
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await getPool().query(text, params)
  return result.rows as T[]
}
