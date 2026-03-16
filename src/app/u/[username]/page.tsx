// src/app/u/[username]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const MOCK_POSTS = [
  { id:'1', title:'🚀 How I grew to 10k followers in 6 months', tier:'free', date:'March 10, 2026', excerpt:'In this post I break down exactly what I did — no fluff, no paid ads. Just the systems, the mindset shifts, and the exact content strategy that changed everything for me.', likes:142, comments:38, locked:false },
  { id:'2', title:'My full content strategy breakdown', tier:'gold', date:'March 8, 2026', excerpt:'', likes:89, comments:21, locked:true, lockMsg:'This post is exclusive to Gold members. Unlock everything in the Gold tier — strategy docs, Q&As, and behind-the-scenes content.', unlockLabel:'👑 Unlock Gold · $19/mo', unlockStyle:'gold' },
  { id:'3', title:'Behind the scenes: my studio setup', tier:'silver', date:'March 5, 2026', excerpt:'', likes:67, comments:14, locked:true, lockMsg:'Silver members get inside the house. Gear lists, setup tours, and monthly creator calls.', unlockLabel:'⭐ Unlock Silver · $9/mo', unlockStyle:'silver' },
  { id:'4', title:'1-on-1 strategy session recordings', tier:'palace', date:'Feb 28, 2026', excerpt:'', likes:203, comments:55, locked:true, lockMsg:'Palace members sit at the top of the hill. Direct access, private sessions, and the full view.', unlockLabel:'🏯 Enter the Palace · $49/mo', unlockStyle:'palace' },
]
const TIERS = [
  { key:'free',   icon:'🌱', name:'Garden Pass',       perk:'Free posts · Community access',         price:'Free', period:'forever' },
  { key:'silver', icon:'⭐', name:'Inside the House',  perk:'Exclusive posts · Studio tours · Calls', price:'$9',  period:'/ month' },
  { key:'gold',   icon:'👑', name:'Gold Suite',        perk:'Full strategy · DMs · Early access',     price:'$19', period:'/ month' },
  { key:'palace', icon:'🏯', name:'Palace Access',     perk:'1-on-1 · Private sessions · Top of hill',price:'$49', period:'/ month', featured:true },
]
const LEADERBOARD = [
  { rank:'1',  avatar:'📸', name:'Jenna',    members:'128', me:false },
  { rank:'2',  avatar:'🎵', name:'MikeNova', members:'89',  me:false },
  { rank:'#3', avatar:'🎨', name:'Topraq',   members:'44',  me:true, change:'↑2' },
  { rank:'4',  avatar:'✍️', name:'Anya',     members:'31',  me:false },
  { rank:'5',  avatar:'🎬', name:'SamFilms', members:'27',  me:false },
]
const UNLOCKS = [
  { emoji:'🎵', name:'Radio',      active:true  },
  { emoji:'📺', name:'3D TV',      active:true  },
  { emoji:'🏊', name:'Pool',       active:true  },
  { emoji:'🌿', name:'Garden',     active:true  },
  { emoji:'🎮', name:'Game Room',  active:true  },
  { emoji:'🌟', name:'Legend Hall',active:false },
]
const TIER_BADGE: Record<string, { bg:string; color:string; label:string }> = {
  free:   { bg:'rgba(45,138,110,0.1)',   color:'#1a6b50', label:'🌱 Free'   },
  silver: { bg:'rgba(143,163,181,0.15)', color:'#4a6275', label:'⭐ Silver' },
  gold:   { bg:'rgba(201,149,42,0.12)',  color:'#8a6500', label:'👑 Gold'   },
  palace: { bg:'rgba(124,92,191,0.12)',  color:'#5a3a9f', label:'🏯 Palace' },
}

export default function CreatorHubPage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('gold')
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('profiles').select('*').eq('username', params.username).single()
      .then(({ data }) => { if (data) setProfile(data) })
  }, [params.username])

  const displayName = profile?.display_name || 'Topraq Toros'
  const bio = profile?.bio || 'Building my town one post at a time 🏡 — sharing everything about growing an audience and creating content that matters.'
  const filteredPosts = MOCK_POSTS.filter(p => activeTab==='all' || p.tier===activeTab || (activeTab==='members' && p.tier!=='free'))
  const tierPrice: Record<string,string> = { free:'Free', silver:'$9/mo', gold:'$19/mo', palace:'$49/mo' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--orange:#f4732a;--orange-light:#ff9555;--orange-pale:#fff0e6;--cream:#fffbf5;--cream-dark:#f5efe3;--brown:#1a1612;--brown-mid:#4a3728;--muted:#9c8878;--gold:#c9952a;--gold-light:#f5d58a;--gold-pale:#fdf4dc;--palace:#7c5cbf;--palace-light:#a98cdf;--palace-pale:#f2eefb}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--brown);overflow-x:hidden}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fu1{animation:fadeUp .6s .1s ease both}.fu2{animation:fadeUp .6s .2s ease both}.fu3{animation:fadeUp .6s .3s ease both}.fu4{animation:fadeUp .6s .4s ease both}
        .post-card{background:white;border-radius:1.25rem;border:1px solid rgba(156,136,120,0.12);margin-bottom:1.25rem;overflow:hidden;transition:all .25s}
        .post-card:hover{box-shadow:0 8px 40px rgba(26,22,18,0.07);transform:translateY(-2px)}
        .post-action{font-size:0.78rem;color:var(--muted);display:flex;align-items:center;gap:0.3rem;cursor:pointer;transition:color .2s;background:none;border:none;font-family:'DM Sans',sans-serif}
        .post-action:hover{color:var(--orange)}
        .tier-opt{padding:1rem 1.25rem;border-bottom:1px solid rgba(156,136,120,0.08);cursor:pointer;transition:background .2s;display:flex;align-items:center;justify-content:space-between;gap:0.75rem}
        .tier-opt:hover{background:var(--cream)}
        .tier-opt.featured{background:var(--palace-pale)}
        .lb-item{padding:0.75rem 1.25rem;display:flex;align-items:center;gap:0.75rem;border-bottom:1px solid rgba(156,136,120,0.06);transition:background .15s}
        .lb-item:hover{background:var(--cream)}.lb-item:last-child{border-bottom:none}.lb-item.me{background:var(--palace-pale)}
        .feed-tab{padding:0.75rem 1.25rem;font-size:0.875rem;color:var(--muted);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;font-family:'DM Sans',sans-serif}
        .feed-tab.active{color:var(--brown);border-bottom-color:var(--orange);font-weight:500}
        .btn-sub{background:var(--orange);color:white;padding:0.75rem 1.75rem;border-radius:100px;font-size:0.9rem;font-weight:500;box-shadow:0 4px 20px rgba(244,115,42,.35);transition:all .25s;cursor:pointer;border:none;display:flex;align-items:center;gap:0.4rem;font-family:'DM Sans',sans-serif}
        .btn-sub:hover{background:var(--orange-light);transform:translateY(-2px)}
        .btn-dm{background:white;color:var(--brown);padding:0.75rem 1.25rem;border-radius:100px;font-size:0.875rem;border:1px solid rgba(156,136,120,0.25);cursor:pointer;display:flex;align-items:center;gap:0.4rem;transition:all .2s;font-family:'DM Sans',sans-serif}
        .btn-dm:hover{border-color:var(--orange);color:var(--orange)}
        .modal-bg{display:none;position:fixed;inset:0;background:rgba(26,22,18,0.55);backdrop-filter:blur(6px);z-index:500;align-items:center;justify-content:center}
        .modal-bg.open{display:flex}
        @keyframes modalIn{from{transform:scale(0.92) translateY(12px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        .modal{background:white;border-radius:1.5rem;width:90%;max-width:420px;padding:2rem;position:relative;animation:modalIn .3s ease}
        .modal-tier{border:1.5px solid rgba(156,136,120,0.2);border-radius:1rem;padding:0.875rem 1rem;cursor:pointer;transition:all .2s;display:flex;justify-content:space-between;align-items:center}
        .modal-tier:hover{border-color:var(--orange)}.modal-tier.selected{border-color:var(--palace);background:var(--palace-pale)}
        .unlock-item{background:rgba(255,255,255,0.06);border-radius:0.625rem;padding:0.6rem 0.75rem;display:flex;align-items:center;gap:0.4rem;border:1px solid rgba(255,255,255,0.07)}
        .unlock-item.active{background:rgba(124,92,191,0.2);border-color:rgba(124,92,191,0.3)}.unlock-item.locked{opacity:0.45}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(244,115,42,0.3);border-radius:2px}
        @media(max-width:860px){.main-grid{grid-template-columns:1fr!important}.sidebar{order:-1}.hero-ban{height:380px!important}.banner-stats{display:none!important}.prof-header{flex-direction:column!important;align-items:flex-start!important}}
        @media(max-width:600px){.nav-links a{display:none!important}.hero-ban{height:260px!important;margin-top:52px!important}.prof-wrap{padding:0 0.875rem!important}.prof-actions{display:none!important}.main-grid{padding:1rem 0.875rem 5.5rem!important}.mob-bar{display:flex!important}body{padding-bottom:72px}}
        .mob-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(255,251,245,0.96);backdrop-filter:blur(16px);border-top:1px solid rgba(244,115,42,0.12);padding:0.65rem 1rem;gap:0.65rem;align-items:center}
      `}</style>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 2.5rem',background:'rgba(255,251,245,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(244,115,42,0.1)'}}>
        <Link href="/" style={{fontFamily:"'Playfair Display',serif",fontSize:'1.35rem',fontWeight:700,color:'var(--brown)',textDecoration:'none'}}>Krea<span style={{color:'var(--orange)'}}>Town</span></Link>
        <div className="nav-links" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          <a href="/" style={{fontSize:'0.85rem',color:'var(--muted)',textDecoration:'none'}}>Explore</a>
          <Link href="/auth/login" style={{fontSize:'0.85rem',color:'var(--muted)',textDecoration:'none'}}>Log in</Link>
          <button onClick={()=>setModalOpen(true)} style={{background:'var(--orange)',color:'white',padding:'0.55rem 1.25rem',borderRadius:'100px',fontSize:'0.85rem',fontWeight:500,border:'none',cursor:'pointer',boxShadow:'0 2px 12px rgba(244,115,42,.3)',fontFamily:"'DM Sans',sans-serif"}}>
            Join {displayName.split(' ')[0]}'s Town 🏡
          </button>
        </div>
      </nav>

      <div className="hero-ban" style={{position:'relative',height:520,overflow:'hidden',marginTop:60}}>
        <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#3a2060,#7c5cbf,#c9952a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8rem'}}>🏯</div>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(26,22,18,0.15) 0%,rgba(26,22,18,0.05) 40%,rgba(26,22,18,0.65) 100%)'}}/>
        <div style={{position:'absolute',top:'1.5rem',left:'2rem',background:'rgba(212,168,67,0.92)',backdropFilter:'blur(8px)',color:'#3a2800',borderRadius:'1rem',padding:'0.5rem 1rem',display:'flex',alignItems:'center',gap:'0.4rem',fontSize:'0.72rem',fontWeight:500,letterSpacing:'0.05em',textTransform:'uppercase',border:'1px solid rgba(245,213,138,0.6)'}}>👑 Town Admin</div>
        <div style={{position:'absolute',top:'1.5rem',right:'2rem',background:'rgba(124,92,191,0.92)',backdropFilter:'blur(8px)',color:'white',borderRadius:'1rem',padding:'0.65rem 1.1rem',display:'flex',alignItems:'center',gap:'0.6rem',border:'1px solid rgba(169,140,223,0.4)'}}>
          <span style={{fontSize:'1.3rem'}}>🏯</span>
          <div style={{fontSize:'0.75rem',lineHeight:1.4}}><strong style={{display:'block',fontWeight:500,fontSize:'0.82rem'}}>Hilltop Palace</strong><span style={{opacity:0.7}}>Level 5 · Legend status</span></div>
        </div>
        <div className="banner-stats" style={{position:'absolute',bottom:'5.5rem',left:'2rem',display:'flex',gap:'1rem'}}>
          {[['44','Members'],['$2,840','Per month'],['4','Posts'],['#3','Leaderboard']].map(([num,label])=>(
            <div key={label} style={{background:'rgba(255,251,245,0.12)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'0.75rem',padding:'0.6rem 1rem',color:'white',textAlign:'center'}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',fontWeight:700,display:'block'}}>{num}</span>
              <span style={{fontSize:'0.68rem',opacity:0.7,letterSpacing:'0.04em'}}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(26,22,18,0.7)',backdropFilter:'blur(8px)',padding:'0.9rem 2rem',display:'flex',alignItems:'center',gap:'1.5rem'}}>
          <div style={{color:'white',fontSize:'0.78rem',fontWeight:500,whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'0.4rem'}}>🏯 Level 5 · Hilltop Palace</div>
          <div style={{flex:1,height:6,background:'rgba(255,255,255,0.15)',borderRadius:100,overflow:'hidden'}}><div style={{height:'100%',width:'0.09%',background:'linear-gradient(90deg,var(--orange),var(--gold-light))',borderRadius:100}}/></div>
          <div style={{color:'rgba(255,255,255,0.55)',fontSize:'0.72rem',whiteSpace:'nowrap'}}>44 / 50K members · Next: <strong style={{color:'var(--gold-light)'}}>Legend 🌟</strong></div>
        </div>
      </div>

      <div className="prof-wrap" style={{maxWidth:1080,margin:'0 auto',padding:'0 2rem'}}>
        <div className="fu1 prof-header" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:'1.75rem 0 1.5rem',borderBottom:'1px solid rgba(156,136,120,0.15)'}}>
          <div style={{position:'relative',display:'inline-block'}}>
            <div style={{position:'absolute',inset:-6,borderRadius:'50%',border:'2px solid transparent',background:'linear-gradient(var(--cream),var(--cream)) padding-box, linear-gradient(135deg,var(--palace),var(--gold)) border-box'}}/>
            <div style={{width:96,height:96,borderRadius:'50%',background:'linear-gradient(135deg,var(--palace),var(--orange))',border:'4px solid var(--cream)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.8rem',boxShadow:'0 8px 32px rgba(124,92,191,0.25)',position:'relative',zIndex:2}}>🎨</div>
            <div style={{position:'absolute',bottom:4,right:4,width:20,height:20,borderRadius:'50%',background:'#2d8a6e',border:'2px solid var(--cream)',zIndex:3}}/>
          </div>
          <div style={{flex:1,padding:'1.5rem 1.5rem 0'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',fontWeight:700,color:'var(--brown)',letterSpacing:'-0.025em',display:'flex',alignItems:'center',gap:'0.6rem'}}>
              {displayName}
              <span style={{background:'var(--palace)',color:'white',fontSize:'0.65rem',padding:'0.2rem 0.5rem',borderRadius:'100px',fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>✦ VERIFIED</span>
            </div>
            <div style={{fontSize:'0.875rem',color:'var(--muted)',marginTop:'0.2rem'}}>@{params.username} · Creator, Storyteller & Community Builder</div>
            <p style={{fontSize:'0.9rem',color:'var(--brown-mid)',marginTop:'0.6rem',lineHeight:1.6,maxWidth:520,fontWeight:300}}>{bio}</p>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'0.75rem',flexWrap:'wrap'}}>
              {['🏯 Palace Owner','✍️ Storytelling','📈 Growth','🎨 Creative','🌍 Istanbul'].map(tag=>(
                <span key={tag} style={{fontSize:'0.72rem',padding:'0.25rem 0.7rem',borderRadius:'100px',background:tag.includes('Palace')?'var(--palace-pale)':'var(--cream-dark)',color:tag.includes('Palace')?'var(--palace)':'var(--muted)',border:`1px solid ${tag.includes('Palace')?'rgba(124,92,191,0.2)':'rgba(156,136,120,0.2)'}`}}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="prof-actions" style={{display:'flex',gap:'0.75rem',paddingTop:'1.5rem',alignItems:'center'}}>
            <button className="btn-sub" onClick={()=>setModalOpen(true)}>🏡 Join my town</button>
            <button className="btn-dm">💬 Message</button>
          </div>
        </div>
      </div>

      <div className="main-grid" style={{maxWidth:1080,margin:'0 auto',padding:'2rem 2rem 4rem',display:'grid',gridTemplateColumns:'1fr 340px',gap:'2rem'}}>
        <div className="fu2">
          <div style={{display:'flex',gap:0,marginBottom:'1.5rem',borderBottom:'1px solid rgba(156,136,120,0.15)'}}>
            {[['all','All Posts'],['free','Free'],['members','Members'],['palace','Palace']].map(([key,label])=>(
              <button key={key} className={`feed-tab${activeTab===key?' active':''}`} onClick={()=>setActiveTab(key)}>{label}</button>
            ))}
          </div>
          {filteredPosts.map(post=>(
            <div key={post.id} className="post-card">
              <div style={{padding:'1.2rem 1.5rem 0.8rem',display:'flex',alignItems:'center',gap:'0.75rem'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,var(--palace),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>🎨</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'0.85rem',fontWeight:500,color:'var(--brown)'}}>{displayName}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--muted)'}}>{post.date}</div>
                </div>
                <span style={{fontSize:'0.68rem',padding:'0.2rem 0.6rem',borderRadius:'100px',fontWeight:500,background:TIER_BADGE[post.tier]?.bg,color:TIER_BADGE[post.tier]?.color}}>{TIER_BADGE[post.tier]?.label}</span>
              </div>
              <div style={{padding:'0 1.5rem 1rem'}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',fontWeight:700,color:'var(--brown)',lineHeight:1.3,marginBottom:'0.5rem',letterSpacing:'-0.01em'}}>{post.title}</div>
                {post.excerpt&&<p style={{fontSize:'0.875rem',color:'var(--muted)',lineHeight:1.65,fontWeight:300}}>{post.excerpt}</p>}
              </div>
              {post.locked&&(
                <div style={{margin:'0.75rem 1.5rem 1.25rem',borderRadius:'0.875rem',overflow:'hidden'}}>
                  <div style={{background:'linear-gradient(135deg,var(--cream-dark),var(--cream))',padding:'1.5rem',textAlign:'center',border:'1px dashed rgba(156,136,120,0.3)',borderRadius:'0.875rem'}}>
                    <span style={{fontSize:'1.8rem',marginBottom:'0.5rem',display:'block'}}>{post.tier==='palace'?'🏯':'🔒'}</span>
                    <p style={{fontSize:'0.875rem',color:'var(--muted)',marginBottom:'1rem',fontWeight:300}}>{post.lockMsg}</p>
                    <button onClick={()=>setModalOpen(true)} style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.6rem 1.25rem',borderRadius:'100px',fontSize:'0.82rem',fontWeight:500,cursor:'pointer',border:'none',fontFamily:"'DM Sans',sans-serif",background:post.unlockStyle==='gold'?'var(--gold-pale)':post.unlockStyle==='silver'?'rgba(143,163,181,0.12)':'var(--palace-pale)',color:post.unlockStyle==='gold'?'var(--gold)':post.unlockStyle==='silver'?'#4a6275':'var(--palace)'}}>{post.unlockLabel}</button>
                  </div>
                </div>
              )}
              <div style={{padding:'0.75rem 1.5rem',borderTop:'1px solid rgba(156,136,120,0.1)',display:'flex',alignItems:'center',gap:'1.2rem'}}>
                <button className="post-action">❤️ {post.likes}</button>
                <button className="post-action">💬 {post.comments}</button>
                <button className="post-action">🔗 Share</button>
              </div>
            </div>
          ))}
        </div>

        <div className="fu3 sidebar">
          <div style={{background:'var(--brown)',borderRadius:'1.5rem',overflow:'hidden',marginBottom:'1.5rem',boxShadow:'0 12px 48px rgba(26,22,18,0.2)'}}>
            <div style={{position:'relative',height:200,overflow:'hidden',background:'linear-gradient(135deg,rgba(124,92,191,0.4),#1a1612)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem'}}>
              🏯
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(26,22,18,0.8) 100%)'}}/>
              <div style={{position:'absolute',bottom:'0.75rem',left:'0.75rem',right:'0.75rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{background:'rgba(124,92,191,0.9)',color:'white',fontSize:'0.7rem',padding:'0.3rem 0.7rem',borderRadius:'0.5rem',fontWeight:500,backdropFilter:'blur(4px)',border:'1px solid rgba(169,140,223,0.4)'}}>🏯 Level 5 · Palace</div>
                <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.68rem'}}>📍 Top of the Hill</div>
              </div>
            </div>
            <div style={{padding:'1.25rem'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:'white',marginBottom:'0.25rem'}}>Topraq's Hilltop Palace</div>
              <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.45)',marginBottom:'1.25rem',fontWeight:300}}>Unlocked at 10,000 members · Admin residence</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.4rem'}}>
                <span style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.45)'}}>Progress to Legend</span>
                <span style={{fontSize:'0.72rem',color:'var(--gold-light)',fontWeight:500}}>44 / 50K</span>
              </div>
              <div style={{height:5,background:'rgba(255,255,255,0.1)',borderRadius:100,overflow:'hidden'}}><div style={{height:'100%',width:'0.09%',background:'linear-gradient(90deg,var(--palace-light),var(--gold-light))',borderRadius:100}}/></div>
              <div style={{marginTop:'1.2rem'}}>
                <div style={{fontSize:'0.68rem',color:'rgba(255,255,255,0.35)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.6rem'}}>Unlocked rooms</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                  {UNLOCKS.map(u=>(
                    <div key={u.name} className={`unlock-item${u.active?' active':' locked'}`}>
                      <span style={{fontSize:'1rem'}}>{u.emoji}</span>
                      <span style={{fontSize:'0.68rem',color:u.active?'var(--palace-light)':'rgba(255,255,255,0.65)'}}>{u.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{background:'white',borderRadius:'1.5rem',border:'1px solid rgba(156,136,120,0.12)',overflow:'hidden',marginBottom:'1.5rem'}}>
            <div style={{padding:'1.2rem 1.25rem 0.75rem',borderBottom:'1px solid rgba(156,136,120,0.1)'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:'var(--brown)'}}>Join the town</div>
              <div style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:'0.1rem'}}>Choose your place in the world</div>
            </div>
            {TIERS.map(t=>(
              <div key={t.key} className={`tier-opt${t.featured?' featured':''}`}>
                <div style={{width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0,background:t.key==='free'?'rgba(45,138,110,0.1)':t.key==='silver'?'rgba(143,163,181,0.12)':t.key==='gold'?'var(--gold-pale)':'var(--palace-pale)'}}>{t.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'0.875rem',fontWeight:500,color:t.featured?'var(--palace)':'var(--brown)'}}>{t.name}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--muted)',marginTop:'0.1rem'}}>{t.perk}</div>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1rem',fontWeight:700,color:t.featured?'var(--palace)':'var(--brown)',textAlign:'right',flexShrink:0}}>
                  {t.price}<span style={{fontSize:'0.68rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif",fontWeight:300,display:'block'}}>{t.period}</span>
                </div>
              </div>
            ))}
            <button onClick={()=>setModalOpen(true)} style={{display:'block',textAlign:'center',margin:'1rem 1.25rem',padding:'0.75rem',borderRadius:'100px',background:'var(--orange)',color:'white',fontSize:'0.875rem',fontWeight:500,border:'none',cursor:'pointer',boxShadow:'0 3px 16px rgba(244,115,42,.3)',width:'calc(100% - 2.5rem)',fontFamily:"'DM Sans',sans-serif"}}>
              Choose your tier 🏡
            </button>
          </div>

          <div className="fu4" style={{background:'white',borderRadius:'1.5rem',border:'1px solid rgba(156,136,120,0.12)',overflow:'hidden'}}>
            <div style={{padding:'1.1rem 1.25rem 0.75rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(156,136,120,0.1)'}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'0.95rem',fontWeight:700,color:'var(--brown)'}}>🏆 Town Leaderboard</div>
                <div style={{fontSize:'0.68rem',color:'var(--muted)'}}>March 2026 · Fastest growing</div>
              </div>
            </div>
            {LEADERBOARD.map(item=>(
              <div key={item.rank} className={`lb-item${item.me?' me':''}`}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'0.75rem',color:item.me?'var(--palace)':'var(--muted)',width:20,textAlign:'center',flexShrink:0,fontWeight:item.me?500:400}}>{item.rank}</div>
                <div style={{width:28,height:28,borderRadius:'50%',fontSize:'0.75rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:item.me?'var(--palace-pale)':'var(--cream-dark)'}}>{item.avatar}</div>
                <div style={{flex:1,fontSize:'0.82rem',color:item.me?'var(--palace)':'var(--brown)',fontWeight:item.me?500:400}}>
                  {item.name} {item.change&&<span style={{fontSize:'0.65rem',color:'#2d8a6e'}}>{item.change}</span>}
                </div>
                <div style={{fontSize:'0.75rem',color:item.me?'var(--palace)':'var(--muted)',textAlign:'right'}}>{item.members} members</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`modal-bg${modalOpen?' open':''}`} onClick={e=>{if(e.target===e.currentTarget)setModalOpen(false)}}>
        <div className="modal">
          <button onClick={()=>setModalOpen(false)} style={{position:'absolute',top:'1rem',right:'1rem',background:'var(--cream-dark)',border:'none',borderRadius:'50%',width:30,height:30,cursor:'pointer',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)'}}>✕</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',fontWeight:700,color:'var(--brown)',marginBottom:'0.3rem'}}>Join {displayName.split(' ')[0]}'s Town 🏡</div>
          <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'1.5rem'}}>Choose your place. Unlock your room.</p>
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'1.5rem'}}>
            {TIERS.map(t=>(
              <div key={t.key} className={`modal-tier${selectedTier===t.key?' selected':''}`} onClick={()=>setSelectedTier(t.key)}>
                <div>
                  <div style={{fontSize:'0.875rem',fontWeight:500,color:selectedTier===t.key?'var(--palace)':'var(--brown)'}}>{t.icon} {t.name}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--muted)',marginTop:'0.15rem'}}>{t.perk}</div>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:selectedTier===t.key?'var(--palace)':'var(--brown)'}}>{t.price}{t.period!=='forever'?'/mo':''}</div>
              </div>
            ))}
          </div>
          <Link href="/auth/register" style={{display:'block',width:'100%',padding:'0.9rem',borderRadius:'100px',background:'var(--orange)',color:'white',border:'none',fontSize:'0.95rem',fontWeight:500,cursor:'pointer',boxShadow:'0 4px 20px rgba(244,115,42,.35)',textAlign:'center',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
            Join for {tierPrice[selectedTier]} — Enter the town 🏡
          </Link>
        </div>
      </div>

      <div className="mob-bar">
        <button className="btn-sub" onClick={()=>setModalOpen(true)} style={{flex:1,justifyContent:'center',borderRadius:'0.875rem',fontSize:'0.875rem',padding:'0.8rem 1rem'}}>🏡 Join my town</button>
        <button className="btn-dm" style={{borderRadius:'0.875rem',padding:'0.8rem 1rem'}}>💬 Message</button>
      </div>
    </>
  )
}
