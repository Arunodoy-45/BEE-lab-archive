'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATS = ["Ohm's Law",'Series & Parallel Circuits','Capacitors','Inductors & Transformers','AC Circuits','Diodes','Transistors','Op-Amps','Other']

export default function EditVideo({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [video, setVideo] = useState<any>(null)
  const [form, setForm] = useState({ title:'', description:'', category:'' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/videos/${params.id}`).then(r=>r.json()).then(d => {
      setVideo(d.video)
      setForm({ title: d.video.title, description: d.video.description||'', category: d.video.category })
    })
  }, [params.id])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(''); setSaving(true)
    try {
      const res = await fetch(`/api/videos/${params.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) { setError((await res.json()).error || 'Failed'); setSaving(false); return }
      router.push('/admin/videos')
    } catch { setError('Something went wrong.'); setSaving(false) }
  }

  const labelStyle = { display:'block' as const, fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase' as const, marginBottom:8 }
  const inputStyle = { width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid var(--line2)', borderRadius:10, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'Onest,sans-serif', outline:'none', boxSizing:'border-box' as const }

  if (!video) return <div style={{ textAlign:'center', padding:'80px', color:'var(--muted)', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>Loading…</div>

  return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'48px 32px 100px' }}>
      <Link href="/admin/videos" style={{ fontSize:13, color:'var(--muted)', textDecoration:'none', display:'inline-block', marginBottom:28 }}>← Back to Videos</Link>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--mint)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>/ Edit Video</div>
      <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:32, letterSpacing:'-.03em', margin:'0 0 32px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{video.title}</h1>
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:22 }}>
        <div><label style={labelStyle}>Title *</label><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inputStyle} /></div>
        <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} style={{ ...inputStyle, resize:'vertical' as const }} /></div>
        <div><label style={labelStyle}>Category *</label>
          <select required value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{ ...inputStyle, cursor:'pointer' }}>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div><label style={labelStyle}>Section</label><input disabled value={video.section} style={{ ...inputStyle, opacity:.5, cursor:'not-allowed' }} /></div>
          <div><label style={labelStyle}>Views</label><input disabled value={video.viewCount} style={{ ...inputStyle, opacity:.5, cursor:'not-allowed' }} /></div>
        </div>
        {error && <div style={{ background:'rgba(242,107,107,.08)', border:'1px solid rgba(242,107,107,.2)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--rose)' }}>{error}</div>}
        <div style={{ display:'flex', gap:12 }}>
          <button type="submit" disabled={saving} style={{ background:'var(--mint)', color:'#06160E', border:'none', borderRadius:999, padding:'13px 26px', fontSize:14, fontWeight:600, fontFamily:'Onest,sans-serif', cursor: saving ? 'not-allowed':'pointer', opacity: saving ? .5:1, transition:'.18s' }}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/videos" style={{ display:'inline-flex', alignItems:'center', padding:'13px 26px', borderRadius:999, border:'1px solid var(--line2)', fontSize:14, color:'var(--muted)', textDecoration:'none' }}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}
