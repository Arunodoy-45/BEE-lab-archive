import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* HERO */}
      <div className="hero">
        <div className="sec-tag">/ BGCTUB · CSE · BEE Laboratory</div>
        <h1 className="hero-h1">
          <em>Lab Videos,</em><br />Organized &amp;<br />Archived.
        </h1>
        <p className="hero-sub">
          Session recordings for Basic Electrical Engineering lab — browse by section, watch at your own pace.
        </p>
        <div className="hero-cta">
          <Link href="/boys" className="btn-p">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            Browse Sessions
          </Link>
          <Link href="/girls" className="btn-o">View Archive</Link>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-n">8</div><div className="stat-l">Total Sessions</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">2</div><div className="stat-l">Sections</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">Free</div><div className="stat-l">Always</div></div>
        </div>
      </div>

      {/* STRIP */}
      <div className="strip">
        <div className="strip-inner">
          <span>Department · <b>BGCTUB CSE</b></span>
          <span className="sep">/</span>
          <span>Sessions · <b>Spring 2024</b></span>
          <span className="sep">/</span>
          <span>Sections · <b>Boys &amp; Girls</b></span>
          <span className="sep">/</span>
          <span>Access · <b>Free, always</b></span>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="sections-wrap">
        <div className="sec-head">
          <div>
            <div className="sec-tag">/ Browse</div>
            <h2>Pick your <em>section</em><br />to get started.</h2>
          </div>
          <p className="sec-note">Four lab sessions per section. Videos appear once uploaded and assigned by the admin.</p>
        </div>

        <div className="chapter-list">
          <Link href="/boys" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="chap">
              <div className="chap-num">BOYS<br />SECTION</div>
              <div className="chap-body">
                <div className="chap-t">Boys Section</div>
                <div className="chap-d">4 sessions · Spring 2024 BEE Lab recordings</div>
              </div>
              <div className="chap-time">4 videos</div>
              <div className="chap-arr">→</div>
            </div>
          </Link>
          <Link href="/girls" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="chap">
              <div className="chap-num">GIRLS<br />SECTION</div>
              <div className="chap-body">
                <div className="chap-t">Girls Section</div>
                <div className="chap-d">4 sessions · Spring 2024 BEE Lab recordings</div>
              </div>
              <div className="chap-time">4 videos</div>
              <div className="chap-arr">→</div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .hero{position:relative;z-index:2;padding:72px 32px 56px;text-align:center;max-width:860px;margin:0 auto}
        .sec-tag{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:18px}
        .hero-h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(44px,8vw,88px);line-height:.96;letter-spacing:-.035em;margin:0 0 20px}
        .hero-h1 em{font-style:normal;color:var(--mint)}
        .hero-sub{color:var(--muted);font-size:15px;margin:0 0 36px;letter-spacing:.01em}
        .hero-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:60px}
        .btn-p{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:999px;font-size:14px;font-weight:600;background:var(--mint);color:#06160E;text-decoration:none;transition:.18s;white-space:nowrap}
        .btn-p:hover{background:#5BFBA8;box-shadow:0 0 0 8px var(--mint-s)}
        .btn-o{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:999px;font-size:14px;font-weight:600;border:1px solid rgba(255,255,255,.18);color:var(--text);background:rgba(255,255,255,.02);text-decoration:none;transition:.18s;white-space:nowrap}
        .btn-o:hover{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.06)}
        .hero-stats{display:flex;gap:44px;justify-content:center;flex-wrap:wrap}
        .stat{text-align:center}
        .stat-n{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:var(--text);letter-spacing:-.03em}
        .stat-l{font-size:12px;color:var(--dim);margin-top:3px}
        .stat-div{width:1px;background:var(--line);align-self:stretch}
        .strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:22px 32px;background:rgba(255,255,255,.015);position:relative;z-index:1}
        .strip-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:12.5px;color:var(--muted)}
        .strip-inner b{color:var(--text);font-weight:600}
        .sep{color:var(--dim)}
        .sections-wrap{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:72px 32px 100px}
        .sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;margin-bottom:40px}
        .sec-head h2{font-family:'Syne',sans-serif;font-size:clamp(36px,5vw,60px);font-weight:800;letter-spacing:-.035em;line-height:.96;margin:0}
        .sec-head h2 em{font-style:normal;color:var(--mint)}
        .sec-note{max-width:300px;color:var(--muted);font-size:13px;margin:0}
        .chapter-list{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:20px;overflow:hidden}
        .chap{display:grid;grid-template-columns:88px 1fr auto 44px;align-items:center;gap:20px;padding:28px;background:var(--bg);transition:.2s;cursor:pointer}
        .chap:hover{background:#0D120F}
        .chap:hover .chap-arr{background:var(--mint);color:#06160E;border-color:var(--mint)}
        .chap-num{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.08em;font-weight:500;line-height:1.4}
        .chap-body{min-width:0}
        .chap-t{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;letter-spacing:-.015em;color:var(--text);margin-bottom:5px}
        .chap-d{font-size:13px;color:var(--muted)}
        .chap-time{font-size:12px;color:var(--dim);font-family:'JetBrains Mono',monospace;white-space:nowrap}
        .chap-arr{width:38px;height:38px;border-radius:50%;border:1px solid var(--line2);display:grid;place-items:center;color:var(--muted);font-size:16px;transition:.2s;flex-shrink:0;justify-self:end}
      `}</style>
    </div>
  )
}
