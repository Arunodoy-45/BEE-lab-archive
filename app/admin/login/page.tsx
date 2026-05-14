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
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      if (!res.ok) { setError((await res.json()).error || 'Invalid password'); setLoading(false); return }
      router.push('/admin/dashboard')
    } catch { setError('Something went wrong.'); setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none', color:'inherit', marginBottom:24 }}>
            <div style={{ width:40, height:40, border:'1.5px solid var(--text)', borderRadius:10, display:'grid', placeItems:'center', fontFamily:'JetBrains Mono,monospace', fontSize:9, fontWeight:500, position:'relative' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:1, fontSize:9 }}>
                <i style={{ fontStyle:'normal', lineHeight:1 }}>BEE</i>
                <i style={{ fontStyle:'normal', borderTop:'1.2px solid var(--text)', paddingTop:1, marginTop:1, lineHeight:1 }}>LAB</i>
              </div>
              <span style={{ position:'absolute', color:'var(--mint)', fontSize:16, right:2, top:-2, lineHeight:1 }}>·</span>
            </div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>BEE Lab Archive</div>
          </Link>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:28, letterSpacing:'-.03em', margin:'0 0 8px', color:'var(--text)' }}>Admin Panel</h1>
          <p style={{ fontSize:13.5, color:'var(--muted)', margin:0 }}>Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:16, padding:28, display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ display:'block', fontSize:12, fontFamily:'JetBrains Mono,monospace', color:'var(--muted)', letterSpacing:'.06em', marginBottom:8 }}>PASSWORD</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" autoFocus
              style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid var(--line2)', borderRadius:10, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'Onest,sans-serif', outline:'none', transition:'.15s' }} />
          </div>

          {error && <div style={{ background:'rgba(242,107,107,.08)', border:'1px solid rgba(242,107,107,.2)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--rose)' }}>{error}</div>}

          <button type="submit" disabled={loading || !password}
            style={{ background:'var(--mint)', color:'#06160E', border:'none', borderRadius:999, padding:'13px 24px', fontSize:14, fontWeight:600, fontFamily:'Onest,sans-serif', cursor: loading||!password ? 'not-allowed' : 'pointer', opacity: loading||!password ? .5 : 1, transition:'.18s' }}>
            {loading ? 'Logging in…' : 'Login →'}
          </button>

          <div style={{ textAlign:'center', borderTop:'1px solid var(--line)', paddingTop:16, marginTop:4 }}>
            <Link href="/" style={{ fontSize:13, color:'var(--muted)', textDecoration:'none' }}>← Back to archive</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
