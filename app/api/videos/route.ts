import { NextRequest, NextResponse } from 'next/server'
import { getVideos, createVideo } from '@/lib/api/videos'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams
    const videos = await getVideos({
      category: p.get('category') || undefined,
      section: (p.get('section') as 'boys'|'girls') || undefined,
      search: p.get('search') || undefined,
      sort: (p.get('sort') as 'recent'|'popular'|'alphabetical') || undefined,
    })
    return NextResponse.json({ videos, total: videos.length })
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  if (!await verifyAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    if (!body.title || !body.category || !body.section || !body.githubUrl)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const video = await createVideo(body)
    return NextResponse.json(video, { status: 201 })
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
