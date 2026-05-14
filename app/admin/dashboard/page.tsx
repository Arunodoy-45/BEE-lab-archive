'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [data, setData] = useState({ totalVideos: 0, totalPlays: 0, totalVisits: 0, uniqueVisitors: 0, topVideos: [] as any[] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetch('/api/videos').then(r=>r.json()), fetch('/api/analytics/summary').then(r=>r.json())])
      .then(([vd, ad]) => {
        setData({
          totalVideos: vd.videos?.length || 0,
          totalPlays: ad.totalPlays || 0,
          totalVisits: ad.totalVisits || 0,
          uniqueVisitors: ad.totalUniqueVisitors || 0,
          topVideos: (ad.videosStats || []).sort((a:any,b:any) => b.plays-a.plays).slice(0,5),
        })
      }).finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Total Videos', value: data.totalVideos },
    { label: 'Total Plays', value: data.totalPlays.toLocaleString() },
    { label: 'Total Visits', value: data.totalVisits.toLocaleString() },
    { label: 'Unique Visitors', value: data.uniqueVisitors.toLocaleString() },
  ]

  const quickActions = [
    { href: '/admin/videos/upload', icon: '＋', title: 'Add New Video', desc: 'Upload video metadata to the archive' },
    { href: '/admin/videos', icon: '▶', title: 'Manage Videos', desc: 'Edit, reorder, or remove sessions' },
    { href: '/admin/analytics', icon: '◈', title: 'View Analytics', desc: 'Detailed watch and engagement stats' },
  ]

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', color:'var(--muted)', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>Loading…</div>

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 32px 100px' }}>
      <div style={{ marginBottom:40 }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--mint)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>/ Dashboard</div>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', letterSpacing:'-.03em', margin:'0 0 8px' }}>Overview</h1>
        <p style={{ fontSize:13.5, color:'var(--muted)', margin:0 }}>Your BEE Lab archive at a glance.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:40 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:'20px 22px' }}>
            <div style={{ fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:10 }}>{s.label}</div>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:32, fontWeight:800, color:'var(--mint)', letterSpacing:'-.03em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:40 }}>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:16, marginBottom:20 }}>Top Videos by Plays</div>
          {data.topVideos.length === 0
            ? <p style={{ fontSize:13, color:'var(--dim)' }}>No play data yet. Add videos and share the link!</p>
            : data.topVideos.map((v:any,i:number) => (
                <div key={v.videoId} style={{ display:'flex', alignItems:'center', gap:14, paddingBottom:14, marginBottom:14, borderBottom: i<data.topVideos.length-1 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--dim)', minWidth:20 }}>{String(i+1).padStart(2,'0')}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v.videoTitle}</div>
                    <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{v.category}</div>
                  </div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18, color:'var(--mint)' }}>{v.plays}</div>
                </div>
              ))
          }
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {quickActions.map(a => (
            <Link key={a.href} href={a.href} style={{ textDecoration:'none', display:'block', background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:'20px 22px', transition:'.2s', color:'inherit' }}
              onMouseOver={e => (e.currentTarget.style.borderColor='var(--line2)')}
              onMouseOut={e => (e.currentTarget.style.borderColor='var(--line)')}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, background:'var(--mint-s)', border:'1px solid rgba(61,244,154,.2)', borderRadius:9, display:'grid', placeItems:'center', fontSize:14, color:'var(--mint)', flexShrink:0 }}>{a.icon}</div>
                <div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:3 }}>{a.title}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{a.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
