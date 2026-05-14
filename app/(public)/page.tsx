import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ position:'relative', zIndex:1 }}>

      {/* HERO */}
      <div className="hero">
        <div className="sec-tag">/ BGCTUB · CSE · BEE Laboratory</div>
        <h1 className="hero-h1">
          <em>Lab Videos,</em><br />Organized &amp;<br />Archived.
        </h1>
        <p className="hero-sub">
          Session recordings for Basic Electrical Engineering lab —<br />browse by section, watch at your own pace.
        </p>
        <div className="hero-cta">
          <a href="#sections" className="btn-p">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            Browse Sessions
          </a>
          <a href="#sections" className="btn-o">View Archive</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-n">8</div><div className="stat-l">Total Sessions</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">2</div><div className="stat-l">Sections</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">Free</div><div className="stat-l">Always</div></div>
        </div>
      </div>

      {/* INFO STRIP */}
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

      {/* SECTION LIST */}
      <div id="sections" className="sections-wrap">
        <div className="sec-head">
          <div>
            <div className="sec-tag-sm">/ Browse</div>
            <h2>Pick your <em>section</em><br />to get started.</h2>
          </div>
          <p className="sec-note">Four lab sessions per section. Videos appear once uploaded and assigned by the admin.</p>
        </div>

        <div className="chapter-list">
          <Link href="/boys" style={{ textDecoration:'none', display:'block' }}>
            <div className="chap">
              <div className="chap-num">BOYS<br />SECTION</div>
              <div className="chap-body">
                <div className="chap-t">Boys Section</div>
                <div className="chap-d">4 sessions · Spring 2024 BEE Lab recordings</div>
              </div>
              <div className="chap-badge">4 videos</div>
              <div className="chap-arr">→</div>
            </div>
          </Link>
          <Link href="/girls" style={{ textDecoration:'none', display:'block' }}>
            <div className="chap">
              <div className="chap-num">GIRLS<br />SECTION</div>
              <div className="chap-body">
                <div className="chap-t">Girls Section</div>
                <div className="chap-d">4 sessions · Spring 2024 BEE Lab recordings</div>
              </div>
              <div className="chap-badge">4 videos</div>
              <div className="chap-arr">→</div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .hero{position:relative;z-index:2;padding:80px 32px 64px;text-align:center;max-width:860px;margin:0 auto}
        .sec-tag{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:20px;font-family:var(--font-mono),monospace}
        .hero-h1{font-weight:800;font-size:clamp(44px,8vw,88px);line-height:.95;letter-spacing:-.04em;margin:0 0 22px;color:var(--text)}
        .hero-h1 em{font-style:normal;color:var(--mint)}
        .hero-sub{color:var(--muted);font-size:15px;margin:0 0 36px;line-height:1.65}
        .hero-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:64px}
        .btn-p{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:999px;font-size:14px;font-weight:700;background:var(--mint);color:#06160E;text-decoration:none;transition:.18s;letter-spacing:-.01em}
        .btn-p:hover{background:#5BFBA8;box-shadow:0 0 0 8px var(--mint-s)}
        .btn-o{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:999px;font-size:14px;font-weight:600;border:1px solid rgba(255,255,255,.18);color:var(--text);background:rgba(255,255,255,.02);text-decoration:none;transition:.18s}
        .btn-o:hover{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.06)}
        .hero-stats{display:flex;gap:48px;justify-content:center;flex-wrap:wrap;align-items:center}
        .stat{text-align:center}
        .stat-n{font-size:28px;font-weight:800;color:var(--text);letter-spacing:-.04em;line-height:1}
        .stat-l{font-size:11.5px;color:var(--dim);margin-top:4px;font-family:var(--font-mono),monospace}
        .stat-div{width:1px;height:32px;background:var(--line)}
        .strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:20px 32px;background:rgba(255,255,255,.012);position:relative;z-index:1}
        .strip-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:12.5px;color:var(--muted)}
        .strip-inner b{color:var(--text);font-weight:600}
        .sep{color:var(--dim)}
        .sections-wrap{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:80px 32px 110px;scroll-margin-top:70px}
        .sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;margin-bottom:40px}
        .sec-tag-sm{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--mint);margin-bottom:14px;font-family:var(--font-mono),monospace}
        .sec-head h2{font-size:clamp(36px,5vw,58px);font-weight:800;letter-spacing:-.04em;line-height:.95;margin:0;color:var(--text)}
        .sec-head h2 em{font-style:normal;color:var(--mint)}
        .sec-note{max-width:300px;color:var(--muted);font-size:13px;margin:0;line-height:1.65}
        .chapter-list{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden}
        .chap{display:grid;grid-template-columns:96px 1fr auto 44px;align-items:center;gap:20px;padding:28px 28px;background:var(--bg);transition:.2s;cursor:pointer}
        .chap:hover{background:#0c110e}
        .chap:hover .chap-arr{background:var(--mint);color:#06160E;border-color:var(--mint)}
        .chap-num{font-family:var(--font-mono),monospace;font-size:10.5px;color:rgba(255,255,255,.28);letter-spacing:.1em;font-weight:500;line-height:1.5}
        .chap-body{min-width:0}
        .chap-t{font-size:17px;font-weight:700;letter-spacing:-.02em;color:var(--text);margin-bottom:5px}
        .chap-d{font-size:13px;color:var(--muted)}
        .chap-badge{font-size:11px;font-family:var(--font-mono),monospace;color:var(--muted);white-space:nowrap}
        .chap-arr{width:38px;height:38px;border-radius:50%;border:1px solid var(--line2);display:grid;place-items:center;color:var(--muted);font-size:16px;transition:.2s;justify-self:end}
      `}</style>
    </div>
  )
}
