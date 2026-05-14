'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SESSIONS = [
  { n:'01', title:"Ohm's Law & Resistance Measurement",    desc:'V-I characteristics, resistor colour codes, multimeter usage' },
  { n:'02', title:'Series & Parallel Circuit Analysis',    desc:"Kirchhoff's voltage & current laws, equivalent resistance" },
  { n:'03', title:'Capacitor Charging & Discharging',      desc:'RC time constant, transient response, oscilloscope reading' },
  { n:'04', title:'Inductor & Transformer Characteristics', desc:"Faraday's law, mutual inductance, transformer turns ratio" },
]

export default function BoysPage() {
  const [videos, setVideos] = useState<any[]>([])
  useEffect(() => { fetch('/api/videos?section=boys').then(r=>r.json()).then(d=>setVideos(d.videos||[])).catch(()=>{}) }, [])
  const map: Record<string,any> = {}
  videos.forEach((v,i) => { map[String(i+1).padStart(2,'0')] = v })

  return (
    <div style={{ position:'relative', zIndex:1 }}>
      <div className="pw">
        <div className="ph">
          <div className="ptag">/ Boys Section</div>
          <h1 className="ph1">Boys <em>Session</em> Archive</h1>
          <p className="psub">Spring 2024 · BEE Lab · BGCTUB CSE Department</p>
        </div>
        <div className="slist">
          {SESSIONS.map(s => {
            const v = map[s.n]
            return v ? (
              <Link key={s.n} href={`/video/${v.id}`} style={{ textDecoration:'none', display:'block' }}>
                <div className="srow rec">
                  <div className="snum">SESSION<br/>{s.n}</div>
                  <div className="sbody">
                    <div className="stitle">{v.title}</div>
                    <div className="sdesc">{v.description || s.desc}</div>
                  </div>
                  <div className="sbadge ok">Recorded</div>
                  <div className="stime">{v.viewCount} views</div>
                  <div className="sarr">→</div>
                </div>
              </Link>
            ) : (
              <div key={s.n} className="srow">
                <div className="snum">SESSION<br/>{s.n}</div>
                <div className="sbody">
                  <div className="stitle dim">{s.title}</div>
                  <div className="sdesc">{s.desc}</div>
                </div>
                <div className="sbadge nr">Not recorded</div>
                <div className="stime">— : —</div>
                <div className="sarr off">→</div>
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
  .pw{max-width:1100px;margin:0 auto;padding:60px 32px 100px}
  .ph{margin-bottom:44px}
  .ptag{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:14px;font-family:var(--font-mono),monospace}
  .ph1{font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-.04em;margin:0 0 10px;color:var(--text);line-height:.96}
  .ph1 em{font-style:normal;color:var(--mint)}
  .psub{font-size:13.5px;color:var(--muted);margin:0}
  .slist{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden}
  .srow{display:grid;grid-template-columns:96px 1fr auto auto 44px;align-items:center;gap:20px;padding:26px 28px;background:var(--bg);transition:.2s}
  .srow.rec{cursor:pointer}
  .srow.rec:hover{background:#0c110e}
  .srow.rec:hover .sarr{background:var(--mint);color:#06160E;border-color:var(--mint)}
  .snum{font-family:var(--font-mono),monospace;font-size:10.5px;color:rgba(255,255,255,.28);letter-spacing:.1em;font-weight:500;line-height:1.5}
  .sbody{min-width:0}
  .stitle{font-size:16px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .stitle.dim{color:var(--dim)}
  .sdesc{font-size:12.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sbadge{font-size:10.5px;font-family:var(--font-mono),monospace;padding:4px 10px;border-radius:6px;white-space:nowrap;border:1px solid;flex-shrink:0}
  .sbadge.nr{color:rgba(242,107,107,.65);background:rgba(242,107,107,.06);border-color:rgba(242,107,107,.14)}
  .sbadge.ok{color:var(--mint);background:var(--mint-s);border-color:rgba(61,244,154,.2)}
  .stime{font-size:11px;color:var(--dim);font-family:var(--font-mono),monospace;white-space:nowrap;text-align:right}
  .sarr{width:38px;height:38px;border-radius:50%;border:1px solid var(--line2);display:grid;place-items:center;color:var(--muted);font-size:15px;transition:.2s;flex-shrink:0}
  .sarr.off{color:rgba(255,255,255,.1);border-color:rgba(255,255,255,.06)}
`
