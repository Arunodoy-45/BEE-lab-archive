'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PLACEHOLDER_SESSIONS = [
  { n: '01', title: "Ohm's Law & Resistance Measurement",    desc: 'Basic V-I characteristics, resistor colour codes, multimeter usage' },
  { n: '02', title: 'Series & Parallel Circuit Analysis',    desc: "Kirchhoff's voltage & current laws, equivalent resistance" },
  { n: '03', title: 'Capacitor Charging & Discharging',      desc: 'RC time constant, transient response, oscilloscope reading' },
  { n: '04', title: 'Inductor & Transformer Characteristics', desc: "Faraday's law, mutual inductance, transformer turns ratio" },
]

interface Video { id: string; title: string; description: string; category: string; viewCount: number; githubUrl: string }

export default function BoysPage() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    fetch('/api/videos?section=boys')
      .then(r => r.json())
      .then(d => setVideos(d.videos || []))
      .catch(() => {})
  }, [])

  const videoMap: Record<string, Video> = {}
  videos.forEach((v, i) => { videoMap[String(i + 1).padStart(2, '0')] = v })

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="page-wrap">
        <div className="page-head">
          <div className="sec-tag">/ Boys Section</div>
          <h1 className="page-h1">Boys <em>Session</em> Archive</h1>
          <p className="page-sub">Spring 2024 · BEE Lab · BGCTUB CSE Department</p>
        </div>

        <div className="session-list">
          {PLACEHOLDER_SESSIONS.map((s, i) => {
            const video = videoMap[s.n]
            return (
              <div key={s.n} className={`session ${video ? 'recorded' : ''}`}>
                {video
                  ? <Link href={`/video/${video.id}`} style={{ display: 'contents' }}>
                      <div className="snumb">SESSION<br />{s.n}</div>
                      <div className="sbody">
                        <div className="stitle">{video.title}</div>
                        <div className="sdesc">{video.description || s.desc}</div>
                      </div>
                      <div className="sbadge ok-badge">Recorded</div>
                      <div className="stime">{video.viewCount} views</div>
                      <div className="sarr">→</div>
                    </Link>
                  : <>
                      <div className="snumb">SESSION<br />{s.n}</div>
                      <div className="sbody">
                        <div className="stitle nr">{s.title}</div>
                        <div className="sdesc">{s.desc}</div>
                      </div>
                      <div className="sbadge nr-badge">Not recorded</div>
                      <div className="stime">– : –</div>
                      <div className="sarr disabled">→</div>
                    </>
                }
              </div>
            )
          })}
        </div>
      </div>
      <style>{pageStyles}</style>
    </div>
  )
}

const pageStyles = `
  .page-wrap{max-width:1100px;margin:0 auto;padding:60px 32px 100px;position:relative;z-index:1}
  .page-head{margin-bottom:44px}
  .sec-tag{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:14px}
  .page-h1{font-family:'Syne',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-.03em;margin:0 0 10px}
  .page-h1 em{font-style:normal;color:var(--mint)}
  .page-sub{font-size:13.5px;color:var(--muted);margin:0}
  .session-list{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:20px;overflow:hidden}
  .session{display:grid;grid-template-columns:96px 1fr auto auto 44px;align-items:center;gap:20px;padding:26px 28px;background:var(--bg);transition:.2s}
  .session > *{text-decoration:none;color:inherit;display:contents}
  .session.recorded{cursor:pointer}
  .session.recorded:hover{background:#0D120F}
  .session.recorded:hover .sarr{background:var(--mint);color:#06160E;border-color:var(--mint)}
  .snumb{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.08em;font-weight:500;line-height:1.5}
  .sbody{min-width:0}
  .stitle{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;letter-spacing:-.015em;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .stitle.nr{color:var(--dim)}
  .sdesc{font-size:12.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sbadge{font-size:10.5px;font-family:'JetBrains Mono',monospace;padding:4px 10px;border-radius:6px;white-space:nowrap;border:1px solid;flex-shrink:0}
  .nr-badge{color:rgba(242,107,107,.7);background:rgba(242,107,107,.06);border-color:rgba(242,107,107,.15)}
  .ok-badge{color:var(--mint);background:var(--mint-s);border-color:rgba(61,244,154,.2)}
  .stime{font-size:11px;color:var(--dim);font-family:'JetBrains Mono',monospace;white-space:nowrap;text-align:right}
  .sarr{width:38px;height:38px;border-radius:50%;border:1px solid var(--line2);display:grid;place-items:center;color:var(--muted);font-size:15px;transition:.2s;flex-shrink:0}
  .sarr.disabled{color:rgba(255,255,255,.1);border-color:rgba(255,255,255,.06)}
`
