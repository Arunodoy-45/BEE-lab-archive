'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getOrCreateSessionId } from '@/lib/api/analytics'

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sessionId = useRef('')
  const tracked = useRef(false)

  useEffect(() => { sessionId.current = getOrCreateSessionId() }, [])

  useEffect(() => {
    fetch(`/api/videos/${params.id}`).then(r => r.json()).then(d => {
      setVideo(d.video); setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.id])

  useEffect(() => {
    if (video && !tracked.current) {
      tracked.current = true
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'view', sessionId: sessionId.current }),
      }).catch(() => {})
    }
  }, [video, params.id])

  useEffect(() => {
    const el = videoRef.current; if (!el) return
    let start: number | null = null
    const onPlay = () => {
      start = Date.now()
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'play', sessionId: sessionId.current, videoDurationSeconds: Math.round(el.duration) }),
      }).catch(() => {})
    }
    const onStop = () => {
      if (!start) return
      const secs = Math.round((Date.now() - start) / 1000)
      fetch(`/api/videos/${params.id}/analytics`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'watch_time', sessionId: sessionId.current, watchTimeSeconds: secs, videoDurationSeconds: Math.round(el.duration) }),
      }).catch(() => {})
      start = null
    }
    el.addEventListener('play', onPlay); el.addEventListener('pause', onStop); el.addEventListener('ended', onStop)
    return () => { el.removeEventListener('play', onPlay); el.removeEventListener('pause', onStop); el.removeEventListener('ended', onStop) }
  }, [params.id])

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', color:'var(--muted)' }}>Loading…</div>
  if (!video) return <div style={{ textAlign:'center', padding:'80px 32px', color:'var(--muted)' }}>Video not found. <Link href="/" style={{ color:'var(--mint)' }}>Go home</Link></div>

  return (
    <div style={{ position:'relative', zIndex:1 }}>
      <div className="vpage-wrap">
        <Link href={video.section === 'boys' ? '/boys' : '/girls'} className="back-link">
          ← Back to {video.section === 'boys' ? 'Boys' : 'Girls'} Section
        </Link>

        <div className="vplayer">
          <video ref={videoRef} src={video.githubUrl} controls className="video-el" controlsList="nodownload" />
        </div>

        <div className="vmeta">
          <div>
            <div className="vcat">{video.category} · {video.section === 'boys' ? 'Boys' : 'Girls'} Section</div>
            <h1 className="vtitle">{video.title}</h1>
            {video.description && <p className="vdesc">{video.description}</p>}
          </div>
          <div className="vviews">
            <div className="vviews-n">{video.viewCount}</div>
            <div className="vviews-l">Total Views</div>
          </div>
        </div>
      </div>

      <style>{`
        .vpage-wrap{max-width:1100px;margin:0 auto;padding:40px 32px 100px;position:relative;z-index:1}
        .back-link{font-size:13px;color:var(--muted);text-decoration:none;transition:.15s;display:inline-block;margin-bottom:24px}
        .back-link:hover{color:var(--mint)}
        .vplayer{background:#000;border-radius:14px;overflow:hidden;border:1px solid var(--line);margin-bottom:28px}
        .video-el{width:100%;aspect-ratio:16/9;display:block}
        .vmeta{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap}
        .vcat{font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--mint);margin-bottom:10px}
        .vtitle{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,36px);font-weight:800;letter-spacing:-.025em;margin:0 0 12px;color:var(--text)}
        .vdesc{font-size:14px;color:var(--muted);line-height:1.65;max-width:680px;margin:0}
        .vviews{text-align:right;flex-shrink:0}
        .vviews-n{font-family:'Syne',sans-serif;font-size:36px;font-weight:800;color:var(--mint);letter-spacing:-.03em}
        .vviews-l{font-size:11px;color:var(--dim);margin-top:2px}
      `}</style>
    </div>
  )
}
