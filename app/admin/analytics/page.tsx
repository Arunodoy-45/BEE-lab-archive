'use client'
import { useState, useEffect } from 'react'

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const load = () => {
    setLoading(true)
    const url = new URL('/api/analytics/summary', window.location.origin)
    if (startDate) url.searchParams.set('startDate', startDate)
    if (endDate) url.searchParams.set('endDate', endDate)
    fetch(url.toString()).then(r=>r.json()).then(setData).finally(()=>setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleExport = async () => {
    setExporting(true)
    const url = new URL('/api/analytics/export', window.location.origin)
    if (startDate) url.searchParams.set('startDate', startDate)
    if (endDate) url.searchParams.set('endDate', endDate)
    const res = await fetch(url.toString())
    const blob = await res.blob()
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `bee-lab-analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); setExporting(false)
  }

  const labelStyle = { fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase' as const }
  const inputStyle = { background:'rgba(255,255,255,.04)', border:'1px solid var(--line2)', borderRadius:8, padding:'8px 12px', fontSize:13, color:'var(--text)', fontFamily:'Onest,sans-serif', outline:'none' }

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 32px 100px' }}>
      <div style={{ marginBottom:36 }}>
        <div style={{ ...labelStyle, marginBottom:12 }}>/ Analytics</div>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', letterSpacing:'-.03em', margin:'0 0 8px' }}>Analytics</h1>
        <p style={{ fontSize:13.5, color:'var(--muted)', margin:0 }}>Watch stats, plays, and visitor data for every session.</p>
      </div>

      <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:20, marginBottom:28, display:'flex', flexWrap:'wrap', gap:14, alignItems:'flex-end' }}>
        <div><div style={{ ...labelStyle, marginBottom:6, fontSize:10 }}>Start Date</div><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={inputStyle} /></div>
        <div><div style={{ ...labelStyle, marginBottom:6, fontSize:10 }}>End Date</div><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} style={inputStyle} /></div>
        <button onClick={load} style={{ background:'rgba(255,255,255,.06)', border:'1px solid var(--line2)', borderRadius:999, padding:'9px 20px', fontSize:13, fontWeight:500, color:'var(--text)', fontFamily:'Onest,sans-serif', cursor:'pointer' }}>Filter</button>
        <button onClick={handleExport} disabled={exporting} style={{ background:'var(--mint)', color:'#06160E', border:'none', borderRadius:999, padding:'9px 20px', fontSize:13, fontWeight:600, fontFamily:'Onest,sans-serif', cursor:'pointer', marginLeft:'auto' }}>
          {exporting ? 'Exporting…' : '↓ Export CSV'}
        </button>
      </div>

      {loading
        ? <div style={{ textAlign:'center', padding:'60px 0', color:'var(--muted)', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>Loading…</div>
        : <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:32 }}>
              {[['Total Plays', data?.totalPlays||0], ['Total Visits', data?.totalVisits||0], ['Unique Visitors', data?.totalUniqueVisitors||0], ['Avg Watch', `${Math.floor((data?.averageWatchTimeSeconds||0)/60)}m`]].map(([l,v]) => (
                <div key={l as string} style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:'20px 22px' }}>
                  <div style={{ ...labelStyle, fontSize:10, marginBottom:10 }}>{l}</div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontSize:30, fontWeight:800, color:'var(--mint)', letterSpacing:'-.03em' }}>{v}</div>
                </div>
              ))}
            </div>

            {(!data?.videosStats || data.videosStats.length === 0)
              ? <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:'40px 32px', textAlign:'center', color:'var(--muted)' }}>No analytics data yet. Share the archive link with students!</div>
              : <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, overflow:'hidden' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto auto auto', gap:16, padding:'12px 24px', borderBottom:'1px solid var(--line)', ...labelStyle, fontSize:10 }}>
                    <span>Title</span><span>Section</span><span>Plays</span><span>Visits</span><span>Unique</span><span>Avg Time</span>
                  </div>
                  {data.videosStats.map((s:any, i:number) => (
                    <div key={s.videoId} style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto auto auto', gap:16, alignItems:'center', padding:'18px 24px', borderBottom: i<data.videosStats.length-1 ? '1px solid var(--line)' : 'none' }}>
                      <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.videoTitle}</div>
                      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, padding:'3px 9px', borderRadius:6, background: s.section==='boys' ? 'rgba(59,130,246,.1)' : 'rgba(236,72,153,.1)', color: s.section==='boys' ? '#60a5fa' : '#f472b6' }}>{s.section}</span>
                      <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, color:'var(--mint)', fontSize:16 }}>{s.plays}</span>
                      <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, color:'var(--mint)', fontSize:16 }}>{s.visits}</span>
                      <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, color:'var(--mint)', fontSize:16 }}>{s.uniqueVisitors}</span>
                      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--muted)' }}>{Math.floor(s.avgWatchTimeSeconds/60)}m</span>
                    </div>
                  ))}
                </div>
            }
          </>
      }
    </div>
  )
}
