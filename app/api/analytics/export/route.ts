import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsCSV } from '@/lib/api/analytics'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!await verifyAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const p = req.nextUrl.searchParams
  const csv = await getAnalyticsCSV({
    startDate: p.get('startDate') ? new Date(p.get('startDate')!) : undefined,
    endDate: p.get('endDate') ? new Date(p.get('endDate')!) : undefined,
  })
  return new NextResponse(csv, {
    headers: { 'Content-Type': 'text/csv', 'Content-Disposition': `attachment; filename="bee-lab-analytics-${new Date().toISOString().split('T')[0]}.csv"` }
  })
}
