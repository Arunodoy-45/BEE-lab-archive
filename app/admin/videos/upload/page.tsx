'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UploadVideo() {
  const router = useRouter()
  const [form, setForm] = useState({ title:'', description:'', section:'boys', githubUrl:'', thumbnailUrl:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/videos', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, category: 'BEE Lab' }),
      })
      if (!res.ok) { setError((await res.json()).error || 'Failed'); setLoading(false); return }
      router.push('/admin/videos')
    } catch { setError('Something went wrong.'); setLoading(false) }
  }

  const labelStyle = { display:'block' as const, fontSize:11, fontFamily:'var(--font-mono),monospace', color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase' as const, marginBottom:8 }
  const inputStyle = { width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid var(--line2)', borderRadius:10, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'var(--font-jakarta),sans-serif', outline:'none', boxSizing:'border-box' as const }

  return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'48px 32px 100px' }}>
      <Link href="/admin/videos" style={{ fontSize:13, color:'var(--muted)', textDecoration:'none', display:'inline-block', marginBottom:28 }}>← Back to Videos</Link>
      <div style={{ fontFamily:'var(--font-mono),monospace', fontSize:11, color:'var(--mint)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>/ New Video</div>
      <h1 style={{ fontFamily:'var(--font-jakarta),sans-serif', fontWeight:800, fontSize:36, letterSpacing:'.03em', margin:'0 0 32px' }}>Add Video</h1>

      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:22 }}>
        <div><label style={labelStyle}>Title *</label><input required value={form.title} onChange={e=>inp('title',e.target.value)} placeholder="e.g. Session 01 — Ohm's Law" style={inputStyle} /></div>
        <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e=>inp('description',e.target.value)} rows={3} placeholder="Session notes or topic overview..." style={{ ...inputStyle, resize:'vertical' as const }} /></div>
        <div>
          <label style={labelStyle}>Section *</label>
          <select required value={form.section} onChange={e=>inp('section',e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>GitHub Raw Video URL *</label>
          <input required type="url" value={form.githubUrl} onChange={e=>inp('githubUrl',e.target.value)} placeholder="https://raw.githubusercontent.com/..." style={inputStyle} />
          <div style={{ fontSize:11, color:'var(--dim)', marginTop:6, fontFamily:'var(--font-mono),monospace' }}>Use the "Raw" link from GitHub for the video file</div>
        </div>
        <div>
          <label style={labelStyle}>Thumbnail URL (optional)</label>
          <input type="url" value={form.thumbnailUrl} onChange={e=>inp('thumbnailUrl',e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>
        {error && <div style={{ background:'rgba(242,107,107,.08)', border:'1px solid rgba(242,107,107,.2)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--rose)' }}>{error}</div>}
        <div style={{ display:'flex', gap:12 }}>
          <button type="submit" disabled={loading} style={{ background:'var(--mint)', color:'#06160E', border:'none', borderRadius:999, padding:'13px 26px', fontSize:14, fontWeight:700, fontFamily:'var(--font-jakarta),sans-serif', cursor: loading ? 'not-allowed':'pointer', opacity: loading ? .5:1, transition:'.18s' }}>
            {loading ? 'Creating…' : 'Create Video'}
          </button>
          <Link href="/admin/videos" style={{ display:'inline-flex', alignItems:'center', padding:'13px 26px', borderRadius:999, border:'1px solid var(--line2)', fontSize:14, color:'var(--muted)', textDecoration:'none' }}>Cancel</Link>
        </div>
      </form>

      <div style={{ marginTop:48, background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:22 }}>
        <div style={{ fontFamily:'var(--font-jakarta),sans-serif', fontWeight:700, fontSize:14, marginBottom:14, color:'var(--text)' }}>📂 Where to upload videos in GitHub</div>
        <ol style={{ fontSize:13, color:'var(--muted)', paddingLeft:18, lineHeight:2 }}>
          <li>Push <code style={{ fontFamily:'var(--font-mono),monospace', color:'var(--mint)', fontSize:11 }}>.mp4</code> files into the <code style={{ fontFamily:'var(--font-mono),monospace', color:'var(--mint)', fontSize:11 }}>/videos/</code> folder of this repo</li>
          <li>Navigate to the file on GitHub → click <b style={{ color:'var(--text)' }}>Raw</b></li>
          <li>Copy the URL and paste it above</li>
        </ol>
        <div style={{ fontFamily:'var(--font-mono),monospace', fontSize:11, color:'var(--dim)', marginTop:10, background:'rgba(255,255,255,.03)', borderRadius:8, padding:'10px 14px', wordBreak:'break-all' as const }}>
          https://raw.githubusercontent.com/Arunodoy-45/BEE-lab-archive/main/videos/boys/session-01.mp4
        </div>
      </div>
    </div>
  )
}
