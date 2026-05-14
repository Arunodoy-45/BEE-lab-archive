'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return }
    fetch('/api/admin/check-auth').then(r => {
      if (r.ok) setAuthed(true); else router.push('/admin/login')
    }).catch(() => router.push('/admin/login')).finally(() => setChecking(false))
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (checking) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--bg)', color:'var(--mint)', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>Verifying session…</div>
  if (!authed) return null

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/videos', label: 'Videos' },
    { href: '/admin/analytics', label: 'Analytics' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', fontFamily:'var(--font-jakarta),sans-serif', position:'relative', zIndex:1 }}>
      <nav style={{ background:'rgba(7,8,7,.9)', backdropFilter:'blur(14px)', borderBottom:'1px solid var(--line)', padding:'0 32px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:80 }}>
        <Link href="/admin/dashboard" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'inherit' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--mint)', letterSpacing:'.1em' }}>BEE LAB</div>
          <div style={{ width:1, height:16, background:'var(--line2)' }} />
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>Admin</div>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{ fontSize:13, fontWeight:500, color: pathname.startsWith(item.href) ? 'var(--mint)' : 'var(--muted)', padding:'6px 14px', borderRadius:999, textDecoration:'none', transition:'.15s', background: pathname.startsWith(item.href) ? 'var(--mint-s)' : 'transparent' }}>
              {item.label}
            </Link>
          ))}
          <button onClick={async () => { await fetch('/api/admin/logout', { method:'POST' }); router.push('/admin/login') }}
            style={{ marginLeft:8, fontSize:12, color:'var(--rose)', background:'none', border:'1px solid rgba(242,107,107,.2)', borderRadius:999, padding:'6px 14px', cursor:'pointer', fontFamily:'var(--font-jakarta),sans-serif', transition:'.15s' }}>
            Logout
          </button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
