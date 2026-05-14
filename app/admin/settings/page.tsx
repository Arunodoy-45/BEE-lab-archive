export default function AdminSettings() {
  return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'48px 32px 100px' }}>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--mint)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>/ Settings</div>
      <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:36, letterSpacing:'-.03em', margin:'0 0 32px' }}>Settings</h1>
      <div style={{ background:'var(--bg2)', border:'1px solid rgba(242,107,107,.2)', borderRadius:14, padding:22, marginBottom:20 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'var(--rose)', marginBottom:10 }}>⚠ Password Management</div>
        <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.7, margin:0 }}>The admin password is stored as an environment variable (<code style={{ fontFamily:'JetBrains Mono,monospace', color:'var(--mint)', fontSize:11 }}>ADMIN_PASSWORD</code>). To change it, update this variable in your Vercel project settings or <code style={{ fontFamily:'JetBrains Mono,monospace', color:'var(--mint)', fontSize:11 }}>.env.local</code>, then redeploy.</p>
      </div>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:22, marginBottom:20 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, marginBottom:10 }}>🔐 Session Security</div>
        <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.7, margin:0 }}>Sessions are secured with JWT tokens in httpOnly cookies. Sessions expire after 7 days. Signing secret is set via <code style={{ fontFamily:'JetBrains Mono,monospace', color:'var(--mint)', fontSize:11 }}>JWT_SECRET</code>.</p>
      </div>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:14, padding:22 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, marginBottom:10 }}>📊 Data</div>
        <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.7, margin:0 }}>All analytics are stored in your Neon PostgreSQL database. No sensitive user information is collected — tracking is session-based and anonymous.</p>
      </div>
    </div>
  )
}
