import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/api/analytics'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!await verifyAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const p = req.nextUrl.searchParams
  const summary = await getAnalyticsSummary({
    startDate: p.get('startDate') ? new Date(p.get('startDate')!) : undefined,
    endDate: p.get('endDate') ? new Date(p.get('endDate')!) : undefined,
    videoId: p.get('videoId') || undefined,
  })
  return NextResponse.json(summary)
}
