import { db } from '@/lib/db/client'
import { videos } from '@/lib/db/schema'
import { eq, and, or, ilike, desc, sql } from 'drizzle-orm'

export interface VideoInput {
  title: string; description?: string; category: string
  section: 'boys' | 'girls'; githubUrl: string; thumbnailUrl?: string
}
export interface Video extends VideoInput {
  id: string; viewCount: number; sortOrder: number
  createdAt: Date; updatedAt: Date
}

export async function getVideos(filters?: {
  category?: string; section?: 'boys' | 'girls'; search?: string
  sort?: 'recent' | 'popular' | 'alphabetical'
}): Promise<Video[]> {
  const conditions = []
  if (filters?.category) conditions.push(eq(videos.category, filters.category))
  if (filters?.section)  conditions.push(eq(videos.section, filters.section))
  if (filters?.search)   conditions.push(or(ilike(videos.title, `%${filters.search}%`), ilike(videos.description!, `%${filters.search}%`)))

  let q = db.select().from(videos)
  if (conditions.length) q = q.where(and(...conditions)) as typeof q
  if (filters?.sort === 'popular')     q = q.orderBy(desc(videos.viewCount)) as typeof q
  else if (filters?.sort === 'alphabetical') q = q.orderBy(videos.title) as typeof q
  else q = q.orderBy(videos.sortOrder, desc(videos.createdAt)) as typeof q

  return q.execute() as Promise<Video[]>
}

export async function getVideoById(id: string): Promise<Video | null> {
  const r = await db.select().from(videos).where(eq(videos.id, id)).execute()
  return (r[0] as Video) || null
}

export async function createVideo(input: VideoInput): Promise<Video> {
  const r = await db.insert(videos).values({ ...input, createdAt: new Date(), updatedAt: new Date() }).returning().execute()
  return r[0] as Video
}

export async function updateVideo(id: string, input: Partial<VideoInput>): Promise<Video | null> {
  const r = await db.update(videos).set({ ...input, updatedAt: new Date() }).where(eq(videos.id, id)).returning().execute()
  return (r[0] as Video) || null
}

export async function deleteVideo(id: string): Promise<boolean> {
  const r = await db.delete(videos).where(eq(videos.id, id)).execute()
  return (r.rowCount ?? 0) > 0
}

export async function incrementViewCount(id: string) {
  await db.update(videos).set({ viewCount: sql`view_count + 1`, updatedAt: new Date() }).where(eq(videos.id, id)).execute()
}

export async function reorderVideos(orders: { id: string; sortOrder: number }[]) {
  for (const { id, sortOrder } of orders) {
    await db.update(videos).set({ sortOrder }).where(eq(videos.id, id)).execute()
  }
}
