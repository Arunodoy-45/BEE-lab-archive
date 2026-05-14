'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password }) })
      if (!res.ok) { setError((await res.json()).error || 'Invalid password'); setLoading(false); return }
      router.push('/admin/dashboard')
    } catch { setError('Something went wrong.'); setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none', color:'inherit', marginBottom:20 }}>
            <div style={{ width:36, height:36, border:'1.5px solid rgba(255,255,255,.25)', borderRadius:8, display:'grid', placeItems:'center', fontFamily:'var(--font-mono),monospace', fontSize:8.5, fontWeight:500, position:'relative' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:1 }}>
                <i style={{ fontStyle:'normal', lineHeight:1, fontSize:8.5 }}>BEE</i>
                <i style={{ fontStyle:'normal', borderTop:'1.2px solid rgba(255,255,255,.25)', paddingTop:1, marginTop:1, lineHeight:1, fontSize:8.5 }}>LAB</i>
              </div>
              <span style={{ position:'absolute', color:'var(--mint)', fontSize:14, right:2, top:-2, lineHeight:1 }}>·</span>
            </div>
            <span style={{ fontWeight:700, fontSize:14, letterSpacing:'-.02em' }}>BEE Lab Archive</span>
          </Link>
          <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:'-.04em', margin:'0 0 6px', color:'var(--text)' }}>Admin Panel</h1>
          <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, padding:28, display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ display:'block', fontSize:11, fontFamily:'var(--font-mono),monospace', color:'var(--muted)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:8 }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password" autoFocus
              style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid var(--line2)', borderRadius:10, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'var(--font-jakarta),sans-serif', outline:'none', transition:'.15s', boxSizing:'border-box' }} />
          </div>
          {error && <div style={{ background:'rgba(242,107,107,.08)', border:'1px solid rgba(242,107,107,.2)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--rose)' }}>{error}</div>}
          <button type="submit" disabled={loading||!password}
            style={{ background:'var(--mint)', color:'#06160E', border:'none', borderRadius:999, padding:'13px 24px', fontSize:14, fontWeight:700, fontFamily:'var(--font-jakarta),sans-serif', cursor: loading||!password ? 'not-allowed':'pointer', opacity: loading||!password ? .5:1, transition:'.18s', letterSpacing:'-.01em' }}>
            {loading ? 'Logging in…' : 'Login →'}
          </button>
          <div style={{ textAlign:'center', borderTop:'1px solid var(--line)', paddingTop:16 }}>
            <Link href="/" style={{ fontSize:13, color:'var(--muted)', textDecoration:'none' }}>← Back to archive</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
