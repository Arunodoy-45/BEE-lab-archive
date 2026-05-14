'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GirlsPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/videos?section=girls')
      .then(r => r.json())
      .then(d => setVideos(d.videos || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ position:'relative', zIndex:1 }}>
      <div className="pw">
        <div className="ph">
          <div className="ptag">/ Girls Section</div>
          <h1 className="ph1">Girls <em>Session</em> Archive</h1>
          <p className="psub">Spring 2024 · BEE Lab · BGCTUB CSE Department</p>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'64px 0', color:'var(--muted)', fontFamily:'var(--font-mono),monospace', fontSize:12 }}>Loading…</div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', border:'1px solid var(--line)', borderRadius:18, background:'var(--bg2)' }}>
            <div style={{ fontSize:13, color:'var(--dim)', fontFamily:'var(--font-mono),monospace', marginBottom:12 }}>NO VIDEOS YET</div>
            <p style={{ fontSize:14, color:'var(--muted)', margin:0 }}>Videos will appear here once the admin assigns them.</p>
          </div>
        ) : (
          <div className="slist">
            {videos.map((v, i) => (
              <Link key={v.id} href={`/video/${v.id}`} style={{ textDecoration:'none', display:'block' }}>
                <div className="srow">
                  <div className="snum">SESSION<br />{String(i + 1).padStart(2, '0')}</div>
                  <div className="sbody">
                    <div className="stitle">{v.title}</div>
                    <div className="sdesc">{v.description || v.category}</div>
                  </div>
                  <div className="sbadge">{v.viewCount} views</div>
                  <div className="sarr">→</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{pageStyles}</style>
    </div>
  )
}

const pageStyles = `
  .pw{max-width:1100px;margin:0 auto;padding:60px 32px 100px}
  .ph{margin-bottom:44px}
  .ptag{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:14px;font-family:var(--font-mono),monospace}
  .ph1{font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-.04em;margin:0 0 10px;color:var(--text);line-height:.96}
  .ph1 em{font-style:normal;color:var(--mint)}
  .psub{font-size:13.5px;color:var(--muted);margin:0}
  .slist{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden}
  .srow{display:grid;grid-template-columns:96px 1fr auto 44px;align-items:center;gap:20px;padding:26px 28px;background:var(--bg);transition:.2s;cursor:pointer}
  .srow:hover{background:#0c110e}
  .srow:hover .sarr{background:var(--mint);color:#06160E;border-color:var(--mint)}
  .snum{font-family:var(--font-mono),monospace;font-size:10.5px;color:rgba(255,255,255,.28);letter-spacing:.1em;font-weight:500;line-height:1.5}
  .sbody{min-width:0}
  .stitle{font-size:16px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sdesc{font-size:12.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sbadge{font-size:11px;font-family:var(--font-mono),monospace;color:var(--dim);white-space:nowrap;flex-shrink:0}
  .sarr{width:38px;height:38px;border-radius:50%;border:1px solid var(--line2);display:grid;place-items:center;color:var(--muted);font-size:15px;transition:.2s;flex-shrink:0}
`
