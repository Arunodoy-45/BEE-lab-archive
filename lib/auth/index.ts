import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-32-chars-minimum-here!'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const TOKEN_NAME = 'bee-lab-admin-token'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AdminSession { isAdmin: true; issuedAt: number }

export function createToken(payload: AdminSession) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: MAX_AGE })
}

export function verifyToken(token: string): AdminSession | null {
  try { return jwt.verify(token, JWT_SECRET) as AdminSession }
  catch { return null }
}

export function verifyAdminPassword(password: string) {
  return password === ADMIN_PASSWORD
}

export async function loginAdmin(password: string) {
  if (!verifyAdminPassword(password)) return { success: false, error: 'Invalid password' }
  const token = createToken({ isAdmin: true, issuedAt: Date.now() })
  return { success: true, token }
}

export async function setAdminCookie(token: string) {
  const store = await cookies()
  store.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function getAdminToken() {
  const store = await cookies()
  return store.get(TOKEN_NAME)?.value || null
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.delete(TOKEN_NAME)
}

export async function verifyAdminSession() {
  const token = await getAdminToken()
  if (!token) return false
  const session = verifyToken(token)
  return session?.isAdmin === true
}
