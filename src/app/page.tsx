// src/app/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const LEVELS = [
  { num: 'Level 1', icon: '🏠', range: '0 – 1K',    name: 'The Cottage', unlock: 'Basic content feed + 2 tiers',       fill: 20 },
  { num: 'Level 2', icon: '🏡', range: '1K – 5K',   name: 'The House',   unlock: 'Unlock DMs + 3D garden',             fill: 40 },
  { num: 'Level 3', icon: '🏘️', range: '5K – 10K',  name: 'The Villa',   unlock: '3D Radio + pool + competitions',     fill: 60, featured: true },
  { num: 'Level 4', icon: '🏰', range: '10K – 25K', name: 'The Estate',  unlock: '3D TV + live events',                fill: 80 },
  { num: 'Level 5', icon: '🏯', range: '50K+',       name: 'The Mansion', unlock: 'Full town. Helipad. Legend status.', fill: 100 },
]
const FEATURES = [
  { icon: '🏡', title: 'Your own town',         desc: 'Your creator page is a living 3D world that evolves as you grow.', accent: true },
  { icon: '💰', title: 'Get paid monthly',      desc: 'Fans subscribe to your tiers. You earn automatically every month via Stripe.' },
  { icon: '🔒', title: 'Gated content rooms',   desc: 'Different rooms unlock different content. Free fans get the garden. Gold gets the penthouse.' },
  { icon: '🎮', title: 'Level-up competitions', desc: 'Compete with other creators in monthly growth challenges. Win rewards and house upgrades.' },
  { icon: '💬', title: 'Direct messages',       desc: 'Connect 1-on-1 with your biggest fans. Unlocks at 1K members.' },
  { icon: '📊', title: 'Creator analytics',     desc: 'Track revenue, member growth, content performance, and house level progress.' },
]
const CREATORS = [
  { banner: 'linear-gradient(135deg,rgba(244,115,42,0.13),rgba(212,168,67,0.13))', level: '🏘️ Level 3 · Villa',   avatar: '🎨', name: 'Topraq Toros',  handle: '@topraq · Creator & Storyteller', tier: '🔥 Growing fast',  tierCls: 'bronze', members: '44',  rev: '$2,840', posts: '4'  },
  { banner: 'linear-gradient(135deg,rgba(158,175,191,0.13),rgba(212,168,67,0.13))', level: '🏰 Level 4 · Estate', avatar: '📸', name: 'Jenna Williams', handle: '@jenna · Photographer',           tier: '⭐ Silver status', tierCls: 'silver', members: '128', rev: '$6,200', posts: '22' },
  { banner: 'linear-gradient(135deg,rgba(212,168,67,0.13),rgba(244,115,42,0.13))', level: '🏯 Level 5 · Mansion', avatar: '🎵', name: 'MikeNova',       handle: '@mikenova · Music Producer',     tier: '👑 Gold status',   tierCls: 'gold',   members: '89',  rev: '$4,100', posts: '17' },
]
const PLANS = [
  { name: 'Starter', price: '0',  period: '/ 3 months then $19/mo', cut: '+ 5% revenue share', features: ['Your own town page','Up to 2 membership tiers','Content feed + gating','Basic analytics','Level 1-2 house upgrades'], cta: 'Get started free', popular: false },
  { name: 'Pro',     price: '29', period: '/ month',                cut: '+ 5% revenue share', features: ['Everything in Starter','Unlimited membership tiers','DMs with fans','Level competitions access','All house levels unlocked','Priority support'], cta: 'Start Pro free', popular: true },
  { name: 'Studio',  price: '49', period: '/ month',                cut: '+ 3% revenue share', features: ['Everything in Pro','Lowest revenue share (3%)','3D TV & Radio early access','Custom town branding','Advanced analytics','Dedicated account manager'], cta: 'Go Studio', popular: false },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --orange:#f4732a; --orange-light:#ff9555; --orange-pale:#fff0e6; --cream:#fffbf5; --cream-dark:#f5efe3; --brown:#1a1612; --muted:#9c8878; --gold:#d4a843; --gold-light:#f5d58a; }
        html { scroll-behavior: smooth; }
        body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--brown); overflow-x:hidden; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up{animation:fadeUp 0.7s ease forwards}.fade-up-2{animation:fadeUp 0.7s 0.15s ease forwards;opacity:0}.fade-up-3{animation:fadeUp 0.7s 0.3s ease forwards;opacity:0}.fade-up-4{animation:fadeUp 0.7s 0.45s ease forwards;opacity:0}
        .btn-primary{background:var(--orange);color:white;padding:0.9rem 2rem;border-radius:100px;font-size:0.95rem;font-weight:500;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(244,115,42,0.35);display:inline-flex;align-items:center;gap:0.5rem}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(244,115,42,0.45)}
        .btn-secondary{color:var(--brown);font-size:0.95rem;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:0.4rem;border-bottom:1px solid var(--orange);padding-bottom:2px;transition:gap 0.2s}
        .btn-secondary:hover{gap:0.7rem}
        .level-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:1.25rem;padding:1.5rem 1rem;text-align:center;transition:all 0.3s}
        .level-card:hover{background:rgba(255,255,255,0.09);transform:translateY(-4px);border-color:rgba(244,115,42,0.4)}
        .level-card.featured{background:rgba(244,115,42,0.15);border-color:rgba(244,115,42,0.5)}
        .feature-card{padding:2rem;border-radius:1.5rem;border:1px solid rgba(156,136,120,0.15);transition:all 0.3s;background:white}
        .feature-card:hover{border-color:rgba(244,115,42,0.25);box-shadow:0 8px 40px rgba(244,115,42,0.08);transform:translateY(-3px)}
        .feature-card.accent{background:var(--orange);color:white;border-color:transparent}
        .creator-card{background:white;border-radius:1.5rem;border:1px solid rgba(156,136,120,0.12);overflow:hidden;transition:all 0.3s}
        .creator-card:hover{box-shadow:0 12px 48px rgba(26,22,18,0.1);transform:translateY(-4px)}
        .plan-card{border-radius:1.5rem;padding:2rem;border:1px solid rgba(156,136,120,0.15);background:white;position:relative;transition:all 0.3s}
        .plan-card.popular{background:var(--brown);color:white;border-color:transparent;box-shadow:0 16px 56px rgba(26,22,18,0.2)}
        .plan-card:not(.popular):hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(26,22,18,0.08)}
        .plan-cta{display:block;text-align:center;margin-top:2rem;padding:0.85rem;border-radius:100px;font-size:0.875rem;font-weight:500;text-decoration:none;transition:all 0.2s;border:1.5px solid rgba(156,136,120,0.25);color:var(--brown)}
        .plan-card.popular .plan-cta{background:var(--orange);color:white;border-color:transparent;box-shadow:0 4px 20px rgba(244,115,42,0.4)}
        .plan-cta:hover{border-color:var(--orange);color:var(--orange)}
        .plan-card.popular .plan-cta:hover{background:var(--orange-light);color:white}
        .town-badge{position:absolute;background:white;border-radius:1rem;padding:0.75rem 1.1rem;box-shadow:0 8px 32px rgba(26,22,18,0.15);display:flex;align-items:center;gap:0.75rem}
        .b1{top:12%;left:-8%;animation:float 3s ease-in-out infinite}
        .b2{bottom:22%;right:-8%;animation:float 3s 1s ease-in-out infinite}
        .b3{top:48%;left:-10%;animation:float 3s 0.5s ease-in-out infinite}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
        .hamburger span{width:22px;height:2px;background:var(--brown);border-radius:2px;transition:all .25s;display:block}
        .mobile-cta-bar{display:none}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(244,115,42,0.3);border-radius:3px}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;padding:7rem 1.5rem 3rem!important}.hero-visual{order:-1;max-width:380px;margin:0 auto}.town-badge{display:none!important}.levels-grid{grid-template-columns:repeat(3,1fr)!important}.features-grid{grid-template-columns:1fr 1fr!important}.creators-grid{grid-template-columns:1fr 1fr!important}.plans-grid{grid-template-columns:1fr!important;max-width:420px;margin:0 auto}.nav-links{display:none!important}.hamburger{display:flex!important}.btn-nav-desktop{display:none!important}}
        @media(max-width:600px){.hero-grid{padding:5.5rem 1.25rem 2.5rem!important;text-align:center}.hero-ctas{justify-content:center;flex-direction:column;align-items:center}.btn-primary{width:100%;max-width:280px;justify-content:center}.hero-stats{justify-content:center!important}.levels-grid{grid-template-columns:repeat(5,200px)!important;overflow-x:auto;padding-bottom:1rem;scrollbar-width:none;scroll-snap-type:x mandatory}.levels-grid::-webkit-scrollbar{display:none}.level-card{scroll-snap-align:start}.features-grid{grid-template-columns:1fr!important}.creators-grid{grid-template-columns:1fr!important}.plans-grid{grid-template-columns:1fr!important;max-width:100%}.cta-btns{flex-direction:column;align-items:center}.btn-cta-primary,.btn-cta-secondary{width:100%;max-width:280px;text-align:center;justify-content:center}footer{flex-direction:column!important;text-align:center;gap:0.75rem;padding:1.75rem 1.25rem!important}.mobile-cta-bar{display:flex!important;position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(255,251,245,0.96);backdrop-filter:blur(16px);border-top:1px solid rgba(244,115,42,0.15);padding:0.75rem 1.25rem;gap:0.75rem;align-items:center}body{padding-bottom:80px}}
      `}</style>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1.2rem 3rem',background:scrolled?'rgba(255,251,245,0.95)':'rgba(255,251,245,0.85)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(244,115,42,0.12)',transition:'background 0.3s'}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.5rem',fontWeight:700,color:'var(--brown)',letterSpacing:'-0.02em'}}>Krea<span style={{color:'var(--orange)'}}>Town</span></div>
        <div className="nav-links" style={{display:'flex',gap:'2rem',alignItems:'center'}}>
          {[['#concept','How it works'],['#creators','Creators'],['#plans','Pricing']].map(([href,label])=>(
            <a key={href} href={href} style={{fontSize:'0.875rem',color:'var(--muted)',textDecoration:'none'}}>{label}</a>
          ))}
          <Link href="/auth/login" style={{fontSize:'0.875rem',color:'var(--muted)',textDecoration:'none'}}>Log in</Link>
          <Link href="/auth/register" className="btn-nav-desktop" style={{background:'var(--orange)',color:'white',padding:'0.6rem 1.4rem',borderRadius:'100px',fontSize:'0.875rem',fontWeight:500,textDecoration:'none',boxShadow:'0 2px 12px rgba(244,115,42,0.3)'}}>Start for free 🏡</Link>
        </div>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} style={{display:'none'}}>
          <span style={{transform:menuOpen?'translateY(7px) rotate(45deg)':'none'}}/><span style={{opacity:menuOpen?0:1}}/><span style={{transform:menuOpen?'translateY(-7px) rotate(-45deg)':'none'}}/>
        </button>
      </nav>

      {menuOpen&&(
        <div style={{position:'fixed',top:56,left:0,right:0,zIndex:99,background:'rgba(255,251,245,0.98)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(244,115,42,0.12)',display:'flex',flexDirection:'column',padding:'1rem 1.25rem',gap:'0.25rem'}}>
          {[['#concept','How it works'],['#features','Features'],['#creators','Creators'],['#plans','Pricing'],['/auth/login','Log in'],['/auth/register','Start for free 🏡']].map(([href,label])=>(
            <a key={href} href={href} onClick={()=>setMenuOpen(false)} style={{fontSize:'1rem',color:'var(--brown)',textDecoration:'none',padding:'0.65rem 0',borderBottom:'1px solid rgba(156,136,120,0.1)'}}>{label}</a>
          ))}
        </div>
      )}

      <section style={{minHeight:'100vh',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,right:0,width:'60%',height:'100%',background:'radial-gradient(ellipse at 70% 40%, rgba(244,115,42,0.07) 0%, transparent 70%)',pointerEvents:'none'}}/>
        <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',alignItems:'center',padding:'8rem 3rem 4rem',gap:'3rem',minHeight:'100vh'}}>
          <div>
            <div className="fade-up" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'var(--orange-pale)',border:'1px solid rgba(244,115,42,0.2)',color:'var(--orange)',padding:'0.35rem 0.9rem',borderRadius:'100px',fontSize:'0.78rem',fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:'1.5rem'}}>
              🏡 Your town. Your fans. Your money.
            </div>
            <h1 className="fade-up-2" style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.8rem, 5vw, 4.2rem)',fontWeight:900,lineHeight:1.08,letterSpacing:'-0.03em',marginBottom:'1.5rem'}}>
              Build your world.<br/>
              <span style={{background:'linear-gradient(135deg, var(--orange), var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Grow your empire.</span>
            </h1>
            <p className="fade-up-3" style={{fontSize:'1.1rem',color:'var(--muted)',lineHeight:1.7,maxWidth:480,marginBottom:'2.5rem',fontWeight:300}}>
              Kreatown is the only creator platform where your success literally builds your world. Start with a cottage. Earn your mansion.
            </p>
            <div className="fade-up-4 hero-ctas" style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}}>
              <Link href="/auth/register" className="btn-primary">Start building free 🏡</Link>
              <a href="#concept" className="btn-secondary">See how it works →</a>
            </div>
            <div className="fade-up-4 hero-stats" style={{display:'flex',gap:'2.5rem',marginTop:'3.5rem',paddingTop:'2rem',borderTop:'1px solid rgba(156,136,120,0.2)'}}>
              {[['500+','Creators'],['$120K+','Paid out'],['12K+','Members']].map(([num,label])=>(
                <div key={label}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:'1.8rem',fontWeight:700,display:'block',letterSpacing:'-0.02em'}}>{num}</span>
                  <span style={{fontSize:'0.8rem',color:'var(--muted)',letterSpacing:'0.02em'}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual" style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{position:'relative',width:'100%',maxWidth:560,aspectRatio:'4/5'}}>
              <div style={{width:'100%',height:'100%',borderRadius:'2rem',background:'linear-gradient(135deg,rgba(244,115,42,0.15),rgba(212,168,67,0.1))',boxShadow:'0 32px 80px rgba(26,22,18,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8rem'}}>🏯</div>
              <div className="town-badge b1"><span style={{fontSize:'1.4rem'}}>🏡</span><div><strong style={{display:'block',fontSize:'0.9rem',fontWeight:500,color:'var(--brown)'}}>Topraq</strong><span style={{fontSize:'0.75rem',color:'var(--muted)'}}>44 members · Level 2</span></div></div>
              <div className="town-badge b2"><span style={{fontSize:'1.4rem'}}>💰</span><div><strong style={{display:'block',fontSize:'0.9rem',fontWeight:500,color:'var(--brown)'}}>$6,200/mo</strong><span style={{fontSize:'0.75rem',color:'var(--muted)'}}>Jenna · 128 members</span></div></div>
              <div className="town-badge b3"><span style={{fontSize:'1.4rem'}}>🔥</span><div><strong style={{display:'block',fontSize:'0.9rem',fontWeight:500,color:'var(--brown)'}}>Level up!</strong><span style={{fontSize:'0.75rem',color:'var(--muted)'}}>Pool unlocked</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="concept" style={{padding:'6rem 3rem',background:'var(--brown)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-50%',left:'30%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(244,115,42,0.12) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'4rem'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'1rem'}}>The KreaTown system</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,lineHeight:1.15,color:'white',letterSpacing:'-0.02em'}}>Your house grows<br/><span style={{color:'var(--gold-light)'}}>with your audience</span></h2>
            <p style={{fontSize:'1rem',color:'rgba(255,255,255,0.55)',marginTop:'1rem',fontWeight:300,maxWidth:520,margin:'1rem auto 0',lineHeight:1.7}}>Every new member you earn upgrades your world. From a cozy starter cottage to a hilltop mansion — the platform rewards your growth visually, tangibly, and financially.</p>
          </div>
          <div className="levels-grid" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1rem',marginTop:'3rem'}}>
            {LEVELS.map(l=>(
              <div key={l.num} className={'level-card'+(l.featured?' featured':'')}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.65rem',color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.8rem'}}>{l.num}</div>
                <span style={{fontSize:'2.2rem',marginBottom:'0.8rem',display:'block'}}>{l.icon}</span>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.05rem',fontWeight:700,color:'white'}}>{l.range}</div>
                <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.5)',marginTop:'0.25rem',fontWeight:300}}>{l.name}</div>
                <div style={{fontSize:'0.7rem',color:'var(--gold-light)',marginTop:'0.8rem',lineHeight:1.4,minHeight:'2.5rem',display:'flex',alignItems:'center',justifyContent:'center'}}>{l.unlock}</div>
                <div style={{height:3,background:'rgba(255,255,255,0.08)',borderRadius:100,marginTop:'1rem',overflow:'hidden'}}>
                  <div style={{height:'100%',width:l.fill+'%',background:'var(--orange)',borderRadius:100}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{padding:'7rem 3rem',background:'var(--cream)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:'4rem'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'0.75rem'}}>Everything you need</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:700,letterSpacing:'-0.025em',lineHeight:1.15,maxWidth:480}}>Not just a page.<br/><em style={{color:'var(--orange)'}}>A living world.</em></h2>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',fontWeight:300,maxWidth:400,marginTop:'0.75rem',lineHeight:1.7}}>Every tool a creator needs — from payments to community — built inside your growing universe.</p>
          </div>
          <div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
            {FEATURES.map(f=>(
              <div key={f.title} className={'feature-card'+(f.accent?' accent':'')}>
                <span style={{fontSize:'1.6rem',marginBottom:'1.2rem',display:'block'}}>{f.icon}</span>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',fontWeight:700,color:f.accent?'white':'var(--brown)',marginBottom:'0.6rem'}}>{f.title}</div>
                <p style={{fontSize:'0.875rem',color:f.accent?'rgba(255,255,255,0.8)':'var(--muted)',lineHeight:1.7,fontWeight:300}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="creators" style={{padding:'6rem 3rem',background:'var(--cream-dark)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'0.75rem'}}>Already earning</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.8rem,3vw,2.6rem)',fontWeight:700,letterSpacing:'-0.025em'}}>Creators building their towns</h2>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',marginTop:'0.5rem',fontWeight:300}}>See how creators are growing their worlds on Kreatown</p>
          </div>
          <div className="creators-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
            {CREATORS.map(c=>(
              <div key={c.name} className="creator-card">
                <div style={{height:80,background:c.banner,position:'relative',display:'flex',alignItems:'flex-end',padding:'0.8rem'}}>
                  <div style={{background:'white',borderRadius:'0.5rem',padding:'0.25rem 0.6rem',fontSize:'0.7rem',fontWeight:500,color:'var(--brown)',boxShadow:'0 2px 8px rgba(0,0,0,0.12)'}}>{c.level}</div>
                </div>
                <div style={{padding:'1.25rem'}}>
                  <div style={{width:52,height:52,borderRadius:'50%',fontSize:'1.4rem',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'-2rem',marginBottom:'0.75rem',border:'3px solid white',boxShadow:'0 2px 12px rgba(0,0,0,0.1)',background:'var(--cream-dark)'}}>{c.avatar}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:'var(--brown)'}}>{c.name}</div>
                  <div style={{fontSize:'0.78rem',color:'var(--muted)',marginTop:'0.1rem'}}>{c.handle}</div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:'0.3rem',fontSize:'0.7rem',fontWeight:500,padding:'0.2rem 0.6rem',borderRadius:'100px',marginTop:'0.75rem',background:c.tierCls==='gold'?'rgba(212,168,67,0.12)':c.tierCls==='silver'?'rgba(158,175,191,0.15)':'rgba(244,115,42,0.1)',color:c.tierCls==='gold'?'#8a6500':c.tierCls==='silver'?'#4a6070':'var(--orange)'}}>{c.tier}</div>
                  <div style={{display:'flex',gap:'1.5rem',marginTop:'1.2rem',paddingTop:'1rem',borderTop:'1px solid rgba(156,136,120,0.12)'}}>
                    {[['Members',c.members],['Per month',c.rev],['Posts',c.posts]].map(([label,val])=>(
                      <div key={label}><span style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:'var(--brown)',display:'block'}}>{val}</span><span style={{fontSize:'0.72rem',color:'var(--muted)'}}>{label}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" style={{padding:'7rem 3rem',background:'var(--cream)'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'4rem'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',marginBottom:'0.75rem'}}>Simple pricing</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.8rem,3vw,2.6rem)',fontWeight:700,letterSpacing:'-0.025em'}}>Grow together, earn together</h2>
            <p style={{fontSize:'0.95rem',color:'var(--muted)',marginTop:'0.5rem',fontWeight:300}}>The bigger you grow, the better your deal gets.</p>
          </div>
          <div className="plans-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
            {PLANS.map(p=>(
              <div key={p.name} className={'plan-card'+(p.popular?' popular':'')}>
                {p.popular&&<div style={{position:'absolute',top:'-0.75rem',left:'50%',transform:'translateX(-50%)',background:'var(--orange)',color:'white',fontSize:'0.7rem',fontWeight:500,padding:'0.3rem 0.9rem',borderRadius:'100px',textTransform:'uppercase',whiteSpace:'nowrap'}}>Most Popular</div>}
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.1em',color:p.popular?'rgba(255,255,255,0.5)':'var(--muted)',marginBottom:'1rem'}}>{p.name}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'2.4rem',fontWeight:700,color:p.popular?'white':'var(--brown)',letterSpacing:'-0.03em',lineHeight:1}}>
                  <sup style={{fontSize:'1rem',verticalAlign:'top',marginTop:'0.4rem',marginRight:'0.1rem'}}>$</sup>{p.price}<span style={{fontSize:'0.85rem',fontWeight:300,color:p.popular?'rgba(255,255,255,0.5)':'var(--muted)'}}> {p.period}</span>
                </div>
                <div style={{fontSize:'0.82rem',color:p.popular?'var(--gold-light)':'var(--orange)',fontWeight:500,marginTop:'0.3rem',marginBottom:'1.5rem'}}>{p.cut}</div>
                <ul style={{listStyle:'none'}}>
                  {p.features.map(f=>(
                    <li key={f} style={{fontSize:'0.875rem',color:p.popular?'rgba(255,255,255,0.65)':'var(--muted)',padding:'0.45rem 0',borderBottom:'1px solid '+(p.popular?'rgba(255,255,255,0.08)':'rgba(156,136,120,0.1)'),display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <span style={{color:p.popular?'var(--gold-light)':'var(--orange)',fontSize:'0.8rem',flexShrink:0}}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className="plan-cta">{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'8rem 3rem',background:'var(--brown)',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(244,115,42,0.15) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'0.72rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--orange)',display:'block',marginBottom:'1.5rem'}}>Ready to build?</span>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:900,color:'white',lineHeight:1.1,letterSpacing:'-0.03em',maxWidth:700,margin:'0 auto 1.5rem'}}>Your town is waiting.<br/><span style={{color:'var(--gold-light)'}}>Start with a cottage.</span></h2>
        <p style={{fontSize:'1rem',color:'rgba(255,255,255,0.5)',maxWidth:460,margin:'0 auto 3rem',lineHeight:1.7,fontWeight:300}}>Join hundreds of creators already building their worlds on KreaTown. Free to start — no credit card needed.</p>
        <div className="cta-btns" style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/auth/register" className="btn-cta-primary" style={{background:'var(--orange)',color:'white',padding:'1rem 2.5rem',borderRadius:'100px',fontSize:'1rem',fontWeight:500,textDecoration:'none',boxShadow:'0 4px 24px rgba(244,115,42,0.4)',display:'inline-flex',alignItems:'center',gap:'0.5rem'}}>Build your town free 🏡</Link>
          <a href="#concept" className="btn-cta-secondary" style={{color:'rgba(255,255,255,0.65)',fontSize:'1rem',textDecoration:'none',padding:'1rem 2rem',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'100px'}}>See how it works</a>
        </div>
      </section>

      <footer style={{background:'#0f0d0b',color:'rgba(255,255,255,0.4)',padding:'2.5rem 3rem',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:'0.82rem'}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',color:'white',fontWeight:700}}>Krea<span style={{color:'var(--orange)'}}>Town</span></div>
        <div>© 2026 KreaTown. Where creators belong.</div>
        <div style={{display:'flex',gap:'1.5rem'}}>
          <Link href="/privacy" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>Privacy</Link>
          <Link href="/terms" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>Terms</Link>
          <a href="mailto:hello@kreatown.com" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>Contact</a>
        </div>
      </footer>

      <div className="mobile-cta-bar">
        <Link href="/auth/register" className="btn-primary" style={{flex:1,justifyContent:'center',borderRadius:'0.875rem'}}>🏡 Start free</Link>
        <Link href="/auth/login" style={{color:'var(--muted)',fontSize:'0.82rem',textDecoration:'none',whiteSpace:'nowrap'}}>Log in</Link>
      </div>
    </>
  )
}
