import { NextRequest, NextResponse } from 'next/server'
import { getVideoById, updateVideo, deleteVideo } from '@/lib/api/videos'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)
  if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ video })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await verifyAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const updated = await updateVideo(params.id, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await verifyAdminSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const ok = await deleteVideo(params.id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
