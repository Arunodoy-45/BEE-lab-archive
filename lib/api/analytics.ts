import { db } from '@/lib/db/client'
import { videoAnalytics, videos } from '@/lib/db/schema'
import { eq, gte, lte, and, sql, count, avg, sum } from 'drizzle-orm'

export interface AnalyticsEvent {
  eventType: 'view' | 'play' | 'watch_time'; sessionId: string; videoId: string
  visitorIp?: string; watchTimeSeconds?: number; videoDurationSeconds?: number
}

export async function logAnalyticsEvent(event: AnalyticsEvent) {
  await db.insert(videoAnalytics).values({ ...event, timestamp: new Date() }).execute()
}

export interface VideoStats {
  videoId: string; videoTitle: string; category: string; section: string
  plays: number; visits: number; uniqueVisitors: number
  avgWatchTimeSeconds: number; totalWatchHours: number
}

export async function getAnalyticsSummary(opts?: { startDate?: Date; endDate?: Date; videoId?: string }) {
  const conditions = []
  if (opts?.startDate) conditions.push(gte(videoAnalytics.timestamp, opts.startDate))
  if (opts?.endDate)   conditions.push(lte(videoAnalytics.timestamp, opts.endDate))
  if (opts?.videoId)   conditions.push(eq(videoAnalytics.videoId, opts.videoId))

  const rows = await db
    .select({
      videoId: videoAnalytics.videoId,
      videoTitle: videos.title,
      videoCategory: videos.category,
      videoSection: videos.section,
      plays: sql<number>`count(*) filter (where ${videoAnalytics.eventType} = 'play')`,
      views: sql<number>`count(*) filter (where ${videoAnalytics.eventType} = 'view')`,
      uniqueSessions: sql<number>`count(distinct ${videoAnalytics.sessionId})`,
      avgWatch: avg(videoAnalytics.watchTimeSeconds),
      totalWatch: sum(videoAnalytics.watchTimeSeconds),
    })
    .from(videoAnalytics)
    .innerJoin(videos, eq(videoAnalytics.videoId, videos.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .groupBy(videoAnalytics.videoId, videos.id, videos.title, videos.category, videos.section)
    .execute()

  let totalPlays = 0, totalVisits = 0, totalUnique = 0, totalWatch = 0
  const videosStats: VideoStats[] = rows.map((r: any) => {
    const plays = Number(r.plays) || 0
    const visits = Number(r.views) || 0
    const unique = Number(r.uniqueSessions) || 0
    const watchSecs = Number(r.totalWatch) || 0
    totalPlays += plays; totalVisits += visits; totalUnique += unique; totalWatch += watchSecs
    return {
      videoId: r.videoId, videoTitle: r.videoTitle, category: r.videoCategory, section: r.videoSection,
      plays, visits, uniqueVisitors: unique,
      avgWatchTimeSeconds: Math.round(Number(r.avgWatch) || 0),
      totalWatchHours: Number((watchSecs / 3600).toFixed(2)),
    }
  })
  return { totalPlays, totalVisits, totalUniqueVisitors: totalUnique, averageWatchTimeSeconds: Math.round(totalWatch / (rows.length || 1)), videosStats }
}

export async function getAnalyticsCSV(opts?: { startDate?: Date; endDate?: Date }) {
  const { videosStats } = await getAnalyticsSummary(opts)
  const headers = ['Video ID','Video Title','Category','Section','Plays','Visits','Unique Visitors','Avg Watch Time (s)','Total Watch Hours']
  const rows = videosStats.map(s => [s.videoId, `"${s.videoTitle}"`, s.category, s.section, s.plays, s.visits, s.uniqueVisitors, s.avgWatchTimeSeconds, s.totalWatchHours])
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
}

export function generateSessionId() {
  return `s-${Date.now()}-${Math.random().toString(36).slice(2,9)}`
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId()
  const key = 'bee-lab-session'
  let id = localStorage.getItem(key)
  if (!id) { id = generateSessionId(); localStorage.setItem(key, id) }
  return id
}
