import { NextRequest, NextResponse } from 'next/server'
import { logAnalyticsEvent } from '@/lib/api/analytics'
import { incrementViewCount } from '@/lib/api/videos'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { eventType, sessionId, watchTimeSeconds, videoDurationSeconds } = body
    if (!eventType || !sessionId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
    await logAnalyticsEvent({ eventType, sessionId, videoId: params.id, visitorIp: ip, watchTimeSeconds, videoDurationSeconds })
    if (eventType === 'view') await incrementViewCount(params.id)
    return NextResponse.json({ success: true })
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
