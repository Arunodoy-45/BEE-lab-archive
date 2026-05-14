import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin, setAdminCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 })
  const result = await loginAdmin(password)
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 401 })
  if (result.token) await setAdminCookie(result.token)
  return NextResponse.json({ success: true })
}
