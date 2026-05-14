import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const ok = await verifyAdminSession()
  if (!ok) return NextResponse.json({ authenticated: false }, { status: 401 })
  return NextResponse.json({ authenticated: true })
}
