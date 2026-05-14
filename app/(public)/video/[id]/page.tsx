'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getOrCreateSessionId } from '@/lib/session'

function getGDriveEmbedUrl(url: string): string | null {
  // Match: /file/d/FILE_ID/view  or  /file/d/FILE_ID/preview
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`
  // Match: ?id=FILE_ID  or  &id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idMatch) return `https://drive.google.com/file/d/${idMatch[1]}/preview`
  return null
}

function isGoogleDrive(url: string) {
  return url.includes('drive.google.com') || url.includes('docs.google.com')
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sessionId = useRef('')
  const tracked = useRef(false)

  useEffect(() => { sessionId.current = getOrCreateSessionId() }, [])

  useEffect(() => {
    fetch(`/api/videos/${params.id}`)
      .then(r => r.json())
      .then(d => { setVideo(d.video); setLoading(false) })
      .catch(() => setLoading(false))
  }, [params.id])

  // Track view
  useEffect(() => {
    if (video && !tracked.current) {
      tracked.current = true
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'view', sessionId: sessionId.current }),
      }).catch(() => {})
    }
  }, [video, params.id])

  // Track play/watch time (native video only)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    let start: number | null = null
    const onPlay = () => {
      start = Date.now()
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'play', sessionId: sessionId.current, videoDurationSeconds: Math.round(el.duration || 0) }),
      }).catch(() => {})
    }
    const onStop = () => {
      if (!start) return
      const secs = Math.round((Date.now() - start) / 1000)
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'watch_time', sessionId: sessionId.current, watchTimeSeconds: secs, videoDurationSeconds: Math.round(el.duration || 0) }),
      }).catch(() => {})
      start = null
    }
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onStop)
    el.addEventListener('ended', onStop)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onStop)
      el.removeEventListener('ended', onStop)
    }
  }, [params.id, video])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--muted)', fontFamily: 'var(--font-mono),monospace', fontSize: 13 }}>
      Loading…
    </div>
  )

  if (!video) return (
    <div style={{ textAlign: 'center', padding: '80px 32px', color: 'var(--muted)' }}>
      Video not found. <Link href="/" style={{ color: 'var(--mint)' }}>Go home</Link>
    </div>
  )

  const gdrive = isGoogleDrive(video.githubUrl)
  const embedUrl = gdrive ? getGDriveEmbedUrl(video.githubUrl) : null

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '44px 32px 100px' }}>
        <Link
          href={video.section === 'boys' ? '/boys' : '/girls'}
          style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24, fontWeight: 500 }}
        >
          ← Back to {video.section === 'boys' ? 'Boys' : 'Girls'} Section
        </Link>

        {/* Player */}
        <div style={{ background: '#000', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 28 }}>
          {gdrive && embedUrl ? (
            <iframe
              src={embedUrl}
              style={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 'none' }}
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              src={video.githubUrl}
              controls
              style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
              controlsList="nodownload"
            />
          )}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono),monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--mint)', marginBottom: 10 }}>
              BEE Lab · {video.section === 'boys' ? 'Boys' : 'Girls'} Section
            </div>
            <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 12px', color: 'var(--text)', lineHeight: 1.1 }}>
              {video.title}
            </h1>
            {video.description && (
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 680, margin: 0 }}>
                {video.description}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--mint)', letterSpacing: '-.04em', lineHeight: 1 }}>
              {video.viewCount}
            </div>
            <div style={{ fontFamily: 'var(--font-mono),monospace', fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>
              Total Views
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
