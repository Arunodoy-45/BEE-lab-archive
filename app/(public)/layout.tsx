import Link from 'next/link'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <nav style={{ position:'sticky', top:0, zIndex:80, backdropFilter:'saturate(1.2) blur(14px)', background:'rgba(7,8,7,.72)', borderBottom:'1px solid var(--line)' }}>
        <div className="nav-inner">
          <Link href="/" className="logo-link">
            <div className="logo-mark">
              <div className="logo-mark-inner"><i>BEE</i><i>LAB</i></div>
              <span className="logo-dot">·</span>
            </div>
            <div>
              <div className="logo-name">BEE Lab Archive</div>
              <div className="logo-sub">BGCTUB · CSE Department</div>
            </div>
          </Link>
          <div className="nav-right">
            <Link href="/"      className="nav-link">Home</Link>
            <Link href="/boys"  className="nav-link">Boys</Link>
            <Link href="/girls" className="nav-link">Girls</Link>
            <Link href="/admin/login" className="nav-admin">admin ↗</Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <style>{`
        .nav-inner{max-width:1100px;margin:0 auto;padding:0 32px;height:58px;display:flex;align-items:center;justify-content:space-between}
        .logo-link{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
        .logo-mark{width:34px;height:34px;border:1.5px solid rgba(255,255,255,.25);border-radius:8px;display:grid;place-items:center;font-family:var(--font-mono),monospace;font-size:8.5px;font-weight:500;position:relative;flex-shrink:0}
        .logo-mark-inner{display:flex;flex-direction:column;align-items:flex-start;gap:1px}
        .logo-mark-inner i{font-style:normal;line-height:1}
        .logo-mark-inner i:last-child{border-top:1.2px solid rgba(255,255,255,.25);padding-top:1px;margin-top:1px}
        .logo-dot{position:absolute;color:var(--mint);font-size:15px;right:2px;top:-2px;line-height:1}
        .logo-name{font-size:14px;font-weight:700;letter-spacing:-.02em;color:var(--text)}
        .logo-sub{font-size:10px;color:var(--dim);margin-top:1px;font-family:var(--font-mono),monospace}
        .nav-right{display:flex;gap:2px;align-items:center}
        .nav-link{font-size:13.5px;font-weight:500;color:var(--muted);padding:7px 14px;border-radius:999px;text-decoration:none;transition:.15s}
        .nav-link:hover{color:var(--text);background:rgba(255,255,255,.05)}
        .nav-admin{font-size:11px;font-family:var(--font-mono),monospace;color:var(--dim);padding:7px 13px;border:1px solid var(--line2);border-radius:999px;text-decoration:none;transition:.15s}
        .nav-admin:hover{color:var(--muted);border-color:var(--muted)}
      `}</style>
    </div>
  )
}
