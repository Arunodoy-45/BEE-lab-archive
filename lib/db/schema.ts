import { pgTable, text, uuid, timestamp, integer, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const videos = pgTable('videos', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  section: text('section').notNull(), // 'boys' | 'girls'
  githubUrl: text('github_url').notNull().unique(),
  thumbnailUrl: text('thumbnail_url'),
  sortOrder: integer('sort_order').notNull().default(999),
  viewCount: integer('view_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, t => ({
  catIdx: index('idx_videos_category').on(t.category),
  secIdx: index('idx_videos_section').on(t.section),
  sortIdx: index('idx_videos_sort_order').on(t.sortOrder),
}))

export const videosRelations = relations(videos, ({ many }) => ({ analytics: many(videoAnalytics) }))

export const videoAnalytics = pgTable('video_analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  videoId: uuid('video_id').notNull().references(() => videos.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(), // 'view' | 'play' | 'watch_time'
  sessionId: text('session_id').notNull(),
  visitorIp: text('visitor_ip'),
  watchTimeSeconds: integer('watch_time_seconds'),
  videoDurationSeconds: integer('video_duration_seconds'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, t => ({
  vidIdx: index('idx_analytics_video_id').on(t.videoId),
  sessIdx: index('idx_analytics_session_id').on(t.sessionId),
  evtIdx: index('idx_analytics_event_type').on(t.eventType),
  tsIdx: index('idx_analytics_timestamp').on(t.timestamp),
}))

export const videoAnalyticsRelations = relations(videoAnalytics, ({ one }) => ({
  video: one(videos, { fields: [videoAnalytics.videoId], references: [videos.id] }),
}))
