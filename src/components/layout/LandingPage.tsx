'use client'

// src/components/layout/LandingPage.tsx
// Your exact index.html design, converted to a Next.js client component
// All creator links fixed to use /u/[username] routing

import { useEffect } from 'react'

export default function LandingPage() {
  useEffect(() => {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger')
    const mobileMenu = document.getElementById('mobileMenu')
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open')
        hamburger.classList.toggle('open')
      })
    }
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('open')
        hamburger?.classList.remove('open')
      })
    })
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --cream:#fffbf5;--cream2:#f5efe3;--brown:#1a1612;--brown2:#2e2420;
          --muted:#9c8878;--orange:#f4732a;--orange-light:#ff9555;
          --orange-pale:#fff0e6;--gold:#c9952a;--gold-light:#f5d58a;
          --gold-pale:#fdf4dc;--palace:#7c5cbf;--palace-light:#b8a0e8;
          --border:rgba(156,136,120,0.18);--border2:rgba(156,136,120,0.32);
        }
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--brown);}
        a{text-decoration:none;color:inherit;}

        /* NAV */
        nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 2.5rem;background:rgba(255,251,245,0.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
        .nav-logo{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--brown);}
        .nav-logo span{color:var(--orange);}
        .nav-links{display:flex;align-items:center;gap:2rem;}
        .nav-links a{font-size:0.875rem;color:var(--muted);transition:color .2s;}
        .nav-links a:hover{color:var(--brown);}
        .btn-nav{background:var(--orange);color:white!important;padding:0.55rem 1.25rem;border-radius:100px;font-weight:500;font-size:0.85rem;box-shadow:0 2px 12px rgba(244,115,42,.25);transition:all .2s;}
        .btn-nav:hover{background:var(--orange-light)!important;transform:translateY(-1px);}
        .hamburger{display:none;flex-direction:column;gap:5px;padding:4px;background:none;border:none;cursor:pointer;}
        .hamburger span{width:22px;height:2px;background:var(--brown);border-radius:2px;transition:all .25s;display:block;}
        .mobile-menu{display:none;position:fixed;top:60px;left:0;right:0;background:rgba(255,251,245,0.98);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);z-index:99;flex-direction:column;padding:0.5rem 0;}
        .mobile-menu.open{display:flex;}
        .mobile-menu a{padding:0.875rem 2rem;font-size:1rem;color:var(--brown);border-bottom:1px solid var(--border);}
        .mobile-menu a:last-child{border-bottom:none;color:var(--orange);font-weight:500;}
        @media(max-width:768px){.nav-links{display:none;}.hamburger{display:flex;}}

        /* HERO */
        .hero{position:relative;padding:5rem 3rem 5rem;overflow:hidden;background:var(--cream);}
        .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 40%,rgba(244,115,42,0.07) 0%,transparent 70%);pointer-events:none;}
        .hero-badge{display:inline-block;background:var(--orange-pale);border:1px solid rgba(244,115,42,.2);color:var(--orange);padding:.35rem .9rem;border-radius:100px;font-size:.75rem;font-weight:500;letter-spacing:.03em;margin-bottom:1.5rem;}
        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5.5vw,4.2rem);font-weight:900;line-height:1.1;letter-spacing:-.03em;margin-bottom:1.5rem;max-width:700px;}
        .hero h1 .gradient-text{background:linear-gradient(135deg,var(--orange),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .hero p{font-size:1.1rem;color:var(--muted);line-height:1.7;max-width:520px;margin-bottom:2rem;}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}
        .btn-primary{background:var(--orange);color:white;padding:.875rem 2rem;border-radius:100px;font-weight:500;font-size:1rem;box-shadow:0 4px 20px rgba(244,115,42,.3);transition:all .2s;display:inline-block;}
        .btn-primary:hover{background:var(--orange-light);transform:translateY(-2px);box-shadow:0 8px 28px rgba(244,115,42,.4);}
        .btn-secondary{color:var(--brown);font-size:.95rem;font-weight:500;display:inline-flex;align-items:center;gap:.4rem;padding:.875rem 1.5rem;border-radius:100px;border:1.5px solid var(--border2);transition:all .2s;}
        .btn-secondary:hover{border-color:var(--orange);color:var(--orange);}
        .hero-stats{display:flex;gap:3rem;margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border);}
        .hero-stat .stat-num{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;}
        .hero-stat .stat-label{font-size:.8rem;color:var(--muted);letter-spacing:.02em;}

        /* CONCEPT SECTION */
        .section-concept{padding:5rem 3rem;background:var(--brown);color:white;position:relative;overflow:hidden;}
        .section-concept::before{content:'';position:absolute;top:-80px;right:-80px;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(244,115,42,.12) 0%,transparent 70%);}
        .concept-tag{display:inline-block;font-family:'DM Mono',monospace;font-size:.65rem;color:var(--orange);margin-bottom:1rem;letter-spacing:.1em;text-transform:uppercase;}
        .concept-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;color:white;letter-spacing:-.02em;margin-bottom:1rem;max-width:600px;}
        .concept-title em{font-style:normal;color:var(--gold-light);}
        .concept-sub{font-size:1rem;color:rgba(255,255,255,.55);margin-top:1rem;max-width:500px;}
        .concept-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:3rem;}
        .concept-item{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:1rem;padding:1.5rem;transition:all .2s;}
        .concept-item:hover{background:rgba(255,255,255,.09);border-color:rgba(244,115,42,.4);}
        .concept-item.featured{background:rgba(244,115,42,.15);border-color:rgba(244,115,42,.5);}
        .ci-tag{font-family:'DM Mono',monospace;font-size:.65rem;color:rgba(255,255,255,.35);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.6rem;}
        .ci-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:white;margin-bottom:.4rem;}
        .ci-desc{font-size:.75rem;color:rgba(255,255,255,.5);}
        .ci-level{display:inline-block;font-size:.7rem;color:var(--gold-light);margin-top:.6rem;}
        .ci-level-bar-wrap{height:3px;background:rgba(255,255,255,.08);border-radius:100px;margin-top:.4rem;}
        .ci-level-bar{height:100%;background:var(--orange);border-radius:100px;}

        /* FEATURES */
        .section-features{padding:7rem 3rem;background:var(--cream);}
        .section-header{text-align:center;margin-bottom:4rem;}
        .section-header h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;letter-spacing:-.02em;margin-bottom:.75rem;}
        .section-header h2 em{font-style:italic;color:var(--orange);}
        .section-header p{color:var(--muted);font-size:1rem;max-width:500px;margin:0 auto;}
        .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto;}
        .feature-card{background:white;border-radius:1.25rem;padding:2rem;border:1px solid var(--border);transition:all .2s;}
        .feature-card:hover{border-color:var(--border2);box-shadow:0 8px 32px rgba(26,22,18,.06);transform:translateY(-2px);}
        .feature-icon{width:48px;height:48px;border-radius:12px;background:var(--orange-pale);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1.25rem;}
        .feature-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:.5rem;}
        .feature-desc{font-size:.875rem;color:var(--muted);line-height:1.7;}

        /* CREATORS */
        .section-creators{padding:7rem 3rem;background:var(--cream2);}
        .creators-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;max-width:1000px;margin:2.5rem auto 0;}
        .creator-card{background:white;border-radius:1.25rem;overflow:hidden;border:1px solid var(--border);transition:all .2s;cursor:pointer;}
        .creator-card:hover{border-color:var(--border2);box-shadow:0 8px 32px rgba(26,22,18,.08);transform:translateY(-3px);}
        .creator-banner{height:90px;position:relative;display:flex;align-items:flex-end;padding:.75rem 1rem;}
        .creator-level-badge{background:rgba(26,22,18,.6);backdrop-filter:blur(8px);color:white;font-size:.65rem;padding:.25rem .65rem;border-radius:100px;font-weight:500;}
        .creator-body{padding:1.25rem;}
        .creator-avatar{width:52px;height:52px;border-radius:50%;background:var(--orange-pale);border:3px solid white;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-top:-26px;margin-bottom:.75rem;position:relative;z-index:1;}
        .creator-name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;margin-bottom:.2rem;}
        .creator-handle{font-size:.75rem;color:var(--muted);margin-bottom:.75rem;}
        .creator-tier{font-size:.7rem;padding:.2rem .6rem;border-radius:100px;display:inline-block;margin-bottom:1rem;}
        .tier-bronze{background:rgba(244,115,42,.1);color:#c4592a;}
        .tier-silver{background:rgba(143,163,181,.12);color:#4a6275;}
        .tier-gold{background:rgba(201,149,42,.12);color:#8a6010;}
        .creator-stats{display:flex;gap:1rem;}
        .c-stat-num{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;display:block;}
        .c-stat-label{font-size:.65rem;color:var(--muted);}

        /* PLANS */
        .section-plans{padding:7rem 3rem;background:var(--cream);}
        .plans-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;max-width:960px;margin:2.5rem auto 0;}
        .plan-card{background:white;border-radius:1.5rem;padding:2rem;border:1.5px solid var(--border);position:relative;transition:all .2s;}
        .plan-card.featured{border-color:var(--orange);box-shadow:0 0 0 4px rgba(244,115,42,.08);}
        .plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--orange);color:white;font-size:.65rem;padding:.25rem .75rem;border-radius:100px;font-weight:600;white-space:nowrap;letter-spacing:.03em;}
        .plan-name{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:.3rem;}
        .plan-price{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;margin:.75rem 0 .25rem;}
        .plan-price span{font-size:.9rem;font-weight:400;color:var(--muted);}
        .plan-trial{font-size:.75rem;color:var(--orange);margin-bottom:1.25rem;}
        .plan-features{list-style:none;display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.75rem;}
        .plan-features li{font-size:.82rem;color:var(--muted);display:flex;align-items:center;gap:.5rem;}
        .plan-features li::before{content:'✓';color:var(--orange);font-weight:700;font-size:.9rem;}
        .plan-cta{display:block;text-align:center;padding:.875rem;border-radius:.875rem;font-weight:500;font-size:.9rem;transition:all .2s;border:1.5px solid var(--border);}
        .plan-card.featured .plan-cta{background:var(--orange);color:white;border-color:var(--orange);box-shadow:0 4px 16px rgba(244,115,42,.3);}
        .plan-cta:hover{border-color:var(--orange);color:var(--orange);}
        .plan-card.featured .plan-cta:hover{background:var(--orange-light);}

        /* CTA */
        .section-cta{padding:7rem 3rem;text-align:center;background:var(--cream2);}
        .section-cta h2{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-.02em;margin-bottom:1rem;}
        .section-cta p{font-size:1rem;color:var(--muted);max-width:480px;margin:0 auto 2.5rem;}
        .cta-btns{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;}
        .btn-cta-primary{background:var(--orange);color:white;padding:1rem 2.5rem;border-radius:100px;font-weight:500;font-size:1rem;box-shadow:0 4px 20px rgba(244,115,42,.3);transition:all .2s;}
        .btn-cta-primary:hover{background:var(--orange-light);transform:translateY(-2px);}
        .btn-cta-secondary{color:var(--brown);font-size:.95rem;font-weight:500;padding:1rem 2rem;border-radius:100px;border:1.5px solid var(--border2);transition:all .2s;}
        .btn-cta-secondary:hover{border-color:var(--orange);color:var(--orange);}

        /* FOOTER */
        footer{background:var(--brown);color:white;padding:3rem 3rem 2rem;}
        .footer-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2.5rem;flex-wrap:wrap;gap:2rem;}
        .footer-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;}
        .footer-logo span{color:var(--orange);}
        .footer-desc{font-size:.82rem;color:rgba(255,255,255,.4);margin-top:.4rem;max-width:240px;line-height:1.7;}
        .footer-links{display:flex;gap:1.5rem;}
        .footer-links a{font-size:.82rem;color:rgba(255,255,255,.5);transition:color .2s;}
        .footer-links a:hover{color:var(--orange);}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;}
        .footer-copy{font-size:.78rem;color:rgba(255,255,255,.3);}

        /* MOBILE ACTION BAR */
        .mobile-bar{display:none;position:fixed;bottom:0;left:0;right:0;padding:.875rem 1.25rem;background:rgba(255,251,245,.97);backdrop-filter:blur(16px);border-top:1px solid var(--border);z-index:90;gap:.75rem;}
        @media(max-width:640px){
          .mobile-bar{display:flex;}
          .hero{padding:3.5rem 1.5rem 4rem;}
          .section-concept,.section-features,.section-creators,.section-plans,.section-cta{padding:4rem 1.5rem;}
          footer{padding:2.5rem 1.5rem 1.5rem;}
          .hero-stats{gap:1.5rem;}
          .footer-top{flex-direction:column;}
        }
        .mobile-btn-start{flex:1;background:var(--orange);color:white;border:none;padding:.875rem;border-radius:100px;font-weight:500;font-size:.95rem;cursor:pointer;font-family:inherit;}
        .mobile-btn-login{padding:.875rem 1.25rem;border-radius:100px;border:1.5px solid var(--border2);background:transparent;font-weight:500;font-size:.9rem;cursor:pointer;color:var(--brown);font-family:inherit;}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">Krea<span>Town</span></div>
        <div className="nav-links">
          <a href="#concept">How it works</a>
          <a href="#creators">Creators</a>
          <a href="#plans">Pricing</a>
          <a href="/auth/login">Log in</a>
          <a href="/auth/register" className="btn-nav">Start for free 🏡</a>
        </div>
        <button className="hamburger" id="hamburger">
          <span /><span /><span />
        </button>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <a href="#concept">How it works</a>
        <a href="#creators">Creators</a>
        <a href="#plans">Pricing</a>
        <a href="/auth/login">Log in</a>
        <a href="/auth/register">Start for free 🏡</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🏡 The creator membership platform</div>
        <h1>Build your membership.<br /><span className="gradient-text">Own your audience.</span></h1>
        <p>KreaTown lets creators build paid memberships, share exclusive content, and connect directly with their biggest fans — no algorithm, no middleman.</p>
        <div className="hero-btns">
          <a href="/auth/register" className="btn-primary">Start building free 🏡</a>
          <a href="#concept" className="btn-secondary">See how it works →</a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="stat-num">500+</div><div className="stat-label">Creators</div></div>
          <div className="hero-stat"><div className="stat-num">$120K+</div><div className="stat-label">Paid out</div></div>
          <div className="hero-stat"><div className="stat-num">12K+</div><div className="stat-label">Members</div></div>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="section-concept" id="concept">
        <div className="concept-tag">// How it works</div>
        <h2 className="concept-title">Your town.<br /><em>Your rules.</em></h2>
        <p className="concept-sub">Every creator gets their own town — a page, a community, and a way to earn. Fans buy into your world through membership tiers.</p>
        <div className="concept-grid">
          {[
            { tag:'01 · Start', title:'Build your town', desc:'Get your own page at kreatown.com/@you', level:'🏠 Level 1', pct:20 },
            { tag:'02 · Grow', title:'Unlock new rooms', desc:'Radio, TV, Pool, Garden as you grow', level:'🏰 Level 3', pct:45 },
            { tag:'03 · Earn', title:'Get paid monthly', desc:'Fans subscribe to your tiers', level:'🏯 Level 5', pct:72, featured:true },
            { tag:'04 · Legend', title:'Reach legend status', desc:'Top creators unlock the Legend Hall', level:'🌟 Legend', pct:100 },
          ].map(c => (
            <div key={c.tag} className={`concept-item${c.featured?' featured':''}`}>
              <div className="ci-tag">{c.tag}</div>
              <div className="ci-title">{c.title}</div>
              <div className="ci-desc">{c.desc}</div>
              <div className="ci-level">{c.level}</div>
              <div className="ci-level-bar-wrap"><div className="ci-level-bar" style={{ width:`${c.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-features" id="features">
        <div className="section-header">
          <h2>Everything you need to <em>thrive</em></h2>
          <p>Built for creators who want to own their audience and get paid on their own terms.</p>
        </div>
        <div className="features-grid">
          {[
            { icon:'💰', title:'Get paid monthly', desc:'Fans subscribe to your tiers and you get paid automatically every month through QNB.' },
            { icon:'🔒', title:'Exclusive content', desc:'Gate your best posts behind membership tiers. Free, Silver, Gold, and Palace.' },
            { icon:'💬', title:'Direct messages', desc:"Connect with your biggest fans 1-on-1 through built-in messaging powered by Pusher." },
            { icon:'📊', title:'Creator analytics', desc:'Track your revenue, members, and content performance in one beautiful dashboard.' },
            { icon:'🏡', title:'Your own town', desc:'Get your own page at kreatown.com/@you — complete with rooms, radio, and TV.' },
            { icon:'🚀', title:'Launch in minutes', desc:'Set up your profile, create tiers, and start earning today. No code required.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CREATORS */}
      <section className="section-creators" id="creators">
        <div className="section-header">
          <h2>Meet the <em>creators</em></h2>
          <p>Real creators already building their towns and earning on KreaTown.</p>
        </div>
        <div className="creators-grid">
          {[
            { href:'/u/topraq', emoji:'🎨', name:'Topraq Toros', handle:'@topraq · Creator & Storyteller', tier:'🔥 Growing fast', tierClass:'tier-bronze', level:'🏘️ Level 3 · Villa', bg:'linear-gradient(135deg,#f4732a22,#d4a84322)', members:44, revenue:'$2,840', posts:4 },
            { href:'/u/jenna', emoji:'📸', name:'Jenna Williams', handle:'@jenna · Photographer', tier:'⭐ Silver status', tierClass:'tier-silver', level:'🏰 Level 4 · Estate', bg:'linear-gradient(135deg,#9eafbf22,#d4a84322)', members:128, revenue:'$6,200', posts:22 },
            { href:'/u/mikenova', emoji:'🎵', name:'MikeNova', handle:'@mikenova · Music Producer', tier:'👑 Gold status', tierClass:'tier-gold', level:'🏯 Level 5 · Mansion', bg:'linear-gradient(135deg,#d4a84322,#f4732a22)', members:89, revenue:'$4,100', posts:17 },
          ].map(c => (
            <a key={c.href} href={c.href} className="creator-card">
              <div className="creator-banner" style={{ background: c.bg }}>
                <div className="creator-level-badge">{c.level}</div>
              </div>
              <div className="creator-body">
                <div className="creator-avatar">{c.emoji}</div>
                <div className="creator-name">{c.name}</div>
                <div className="creator-handle">{c.handle}</div>
                <div className={`creator-tier ${c.tierClass}`}>{c.tier}</div>
                <div className="creator-stats">
                  <div><span className="c-stat-num">{c.members}</span><span className="c-stat-label">Members</span></div>
                  <div><span className="c-stat-num">{c.revenue}</span><span className="c-stat-label">Per month</span></div>
                  <div><span className="c-stat-num">{c.posts}</span><span className="c-stat-label">Posts</span></div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section className="section-plans" id="plans">
        <div className="section-header">
          <h2>Simple, honest <em>pricing</em></h2>
          <p>Start free. Upgrade when you're ready to grow.</p>
        </div>
        <div className="plans-grid">
          {[
            { name:'Starter', price:'$0', period:'/mo for 3 months', then:'then $19/mo', trial:'Free for 3 months', features:['Up to 100 members','All post types','Basic analytics','5% revenue share'], cta:'Get started free', href:'/auth/register' },
            { name:'Pro', price:'$29', period:'/mo', then:'', trial:'Most popular for growing creators', features:['Unlimited members','Radio & TV rooms','Advanced analytics','Priority support','5% revenue share'], cta:'Start Pro free', href:'/auth/register', featured:true, badge:'Most popular' },
            { name:'Studio', price:'$49', period:'/mo', then:'', trial:'For serious creators', features:['Everything in Pro','Reduced 3% revenue share','Custom domain','White-label option','Dedicated support'], cta:'Go Studio', href:'/auth/register' },
          ].map(p => (
            <div key={p.name} className={`plan-card${p.featured?' featured':''}`}>
              {p.badge && <div className="plan-badge">{p.badge}</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.price}<span>{p.period}</span></div>
              {p.then && <div style={{ fontSize:'.75rem', color:'var(--muted)', marginBottom:'.5rem' }}>{p.then}</div>}
              <div className="plan-trial" style={{ color: p.featured?'var(--orange)':'var(--muted)', fontSize:'.75rem', marginBottom:'1.25rem' }}>{p.trial}</div>
              <ul className="plan-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href={p.href} className="plan-cta">{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <h2>Ready to build your town? 🏡</h2>
        <p>Join hundreds of creators already earning on KreaTown. Your audience is waiting.</p>
        <div className="cta-btns">
          <a href="/auth/register" className="btn-cta-primary">Build your town free 🏡</a>
          <a href="#concept" className="btn-cta-secondary">See how it works</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Krea<span>Town</span></div>
            <div className="footer-desc">Where creators belong. Build your town, own your audience.</div>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:hello@kreatown.com">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 KreaTown. Where creators belong.</div>
        </div>
      </footer>

      {/* Mobile action bar */}
      <div className="mobile-bar">
        <button className="mobile-btn-login" onClick={() => window.location.href='/auth/login'}>Log in</button>
        <button className="mobile-btn-start" onClick={() => window.location.href='/auth/register'}>🏡 Start free</button>
      </div>
    </>
  )
}
