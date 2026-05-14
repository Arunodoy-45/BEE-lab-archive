'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminVideos() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/videos').then(r=>r.json()).then(d=>setVideos(d.videos||[])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/videos/${id}`, { method: 'DELETE' })
    setVideos(v => v.filter(x => x.id !== id))
  }

  const labelStyle = { fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase' as const }

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 32px 100px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:40 }}>
        <div>
          <div style={{ ...labelStyle, marginBottom:12 }}>/ Videos</div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', letterSpacing:'-.03em', margin:'0 0 8px' }}>Video Management</h1>
          <p style={{ fontSize:13.5, color:'var(--muted)', margin:0 }}>Add, edit and organise archive sessions.</p>
        </div>
        <Link href="/admin/videos/upload" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:999, background:'var(--mint)', color:'#06160E', fontWeight:600, fontSize:13.5, textDecoration:'none', whiteSpace:'nowrap', marginTop:8 }}>
          + New Video
        </Link>
      </div>

      {loading
        ? <div style={{ textAlign:'center', padding:'60px 0', color:'var(--muted)', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>Loading…</div>
        : videos.length === 0
          ? <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, padding:'48px 32px', textAlign:'center' }}>
              <p style={{ color:'var(--muted)', marginBottom:16 }}>No videos yet.</p>
              <Link href="/admin/videos/upload" style={{ color:'var(--mint)', textDecoration:'none', fontSize:14 }}>Add your first video →</Link>
            </div>
          : <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, overflow:'hidden' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto auto', gap:16, padding:'12px 24px', borderBottom:'1px solid var(--line)', ...labelStyle }}>
                <span>Title</span><span>Section</span><span>Category</span><span>Views</span><span>Actions</span>
              </div>
              {videos.map((v, i) => (
                <div key={v.id} style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto auto', gap:16, alignItems:'center', padding:'18px 24px', borderBottom: i<videos.length-1 ? '1px solid var(--line)' : 'none', transition:'.15s' }}>
                  <div>
                    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v.title}</div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--dim)' }}>ID: {v.id.slice(0,8)}…</div>
                  </div>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, padding:'3px 9px', borderRadius:6, background: v.section==='boys' ? 'rgba(59,130,246,.1)' : 'rgba(236,72,153,.1)', color: v.section==='boys' ? '#60a5fa' : '#f472b6', border: `1px solid ${v.section==='boys' ? 'rgba(59,130,246,.2)' : 'rgba(236,72,153,.2)'}` }}>
                    {v.section}
                  </span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--muted)' }}>{v.category}</span>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:16, color:'var(--mint)' }}>{v.viewCount}</span>
                  <div style={{ display:'flex', gap:10 }}>
                    <Link href={`/admin/videos/${v.id}/edit`} style={{ fontSize:12, color:'var(--mint)', textDecoration:'none' }}>Edit</Link>
                    <button onClick={() => handleDelete(v.id, v.title)} style={{ fontSize:12, color:'var(--rose)', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'Onest,sans-serif' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  )
}
