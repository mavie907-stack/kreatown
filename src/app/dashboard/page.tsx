'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({ totalMembers: 0, mrr: 0, totalPosts: 0 })
  const [loading, setLoading] = useState(true)
  const [activeNav, setActiveNav] = useState('overview')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (prof) setProfile(prof)
      const { count: mc } = await supabase.from('memberships').select('*', { count: 'exact', head: true }).eq('creator_id', user.id).eq('status', 'active')
      const { count: pc } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('author_id', user.id)
      setStats({ totalMembers: mc||0, mrr: (mc||0)*9, totalPosts: pc||0 })
      setLoading(false)
    }
    load()
  }, [])

  const initials = profile?.display_name ? profile.display_name.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase() : '?'
  if (loading) return <div style={{minHeight:'100vh',background:'#fffbf5',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#9c8878',fontWeight:700,fontFamily:'Nunito,sans-serif'}}>⏳ Loading your town...</p></div>

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#fffbf5',fontFamily:'Nunito,sans-serif'}}>
      <aside style={{width:'220px',background:'#fdf9f5',borderRight:'1px solid rgba(244,115,42,0.13)',display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,bottom:0,zIndex:50}}>
        <div style={{padding:'1.3rem 1.5rem',fontWeight:900,fontSize:'1.15rem',borderBottom:'1px solid rgba(244,115,42,0.13)',color:'#1a1612'}}>Kreatown<span style={{display:'inline-block',width:'7px',height:'7px',background:'#f4732a',borderRadius:'50%',marginLeft:'3px',marginBottom:'2px'}}></span></div>
        <nav style={{flex:1,padding:'0.8rem 0.5rem'}}>
          {[['overview','📊','Overview'],['content','📝','My Content'],['members','👥','Members'],['messages','💬','Messages'],['earnings','💰','Earnings'],['settings','⚙️','Settings']].map(([id,icon,label])=>(
            <button key={id} onClick={()=>setActiveNav(id)} style={{display:'flex',alignItems:'center',gap:'0.7rem',padding:'0.6rem 1rem',borderRadius:'10px',fontSize:'0.82rem',fontWeight:activeNav===id?800:700,color:activeNav===id?'#f4732a':'#9c8878',background:activeNav===id?'#fff0e6':'transparent',border:'none',cursor:'pointer',width:'100%',fontFamily:'Nunito,sans-serif',marginBottom:'2px',textAlign:'left'}}><span>{icon}</span>{label}</button>
          ))}
        </nav>
        <div style={{padding:'1rem 1.2rem',borderTop:'1px solid rgba(244,115,42,0.13)',display:'flex',alignItems:'center',gap:'0.7rem'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#f4732a,#fbbf24)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:900,color:'#fff'}}>{initials}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'0.78rem',fontWeight:800,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{profile?.display_name||'Creator'}</div>
            <div style={{fontSize:'0.68rem',color:'#9c8878'}}>@{profile?.username||'...'}</div>
          </div>
          <button onClick={async()=>{await supabase.auth.signOut();router.push('/auth/login')}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:'#9c8878'}}>↪</button>
        </div>
      </aside>
      <main style={{marginLeft:'220px',flex:1,padding:'2rem 2.5rem'}}>
        <h1 style={{fontWeight:900,fontSize:'1.6rem',marginBottom:'0.3rem',color:'#1a1612'}}>Welcome back, {profile?.display_name?.split(' ')[0]||'Creator'} 👋</h1>
        <p style={{color:'#9c8878',fontWeight:600,fontSize:'0.85rem',marginBottom:'2rem'}}>Here's what's happening in your town</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          {[['👥','Members',stats.totalMembers],['💰','MRR','$'+stats.mrr],['📝','Posts',stats.totalPosts]].map(([icon,label,val],i)=>(
            <div key={i} style={{background:'#fff',border:'1px solid rgba(244,115,42,0.13)',borderRadius:'16px',padding:'1.3rem'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>{icon}</div>
              <div style={{fontWeight:900,fontSize:'1.8rem',color:'#1a1612'}}>{val}</div>
              <div style={{fontSize:'0.7rem',fontWeight:800,textTransform:'uppercase' as const,letterSpacing:'0.07em',color:'#9c8878'}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{background:'linear-gradient(135deg,#fff0e6,#fffbeb)',border:'1.5px solid rgba(244,115,42,0.2)',borderRadius:'20px',padding:'2rem',textAlign:'center' as const}}>
          <div style={{fontSize:'2.5rem',marginBottom:'0.8rem'}}>🏡</div>
          <h2 style={{fontWeight:900,fontSize:'1.2rem',marginBottom:'0.5rem',color:'#1a1612'}}>Your town is live!</h2>
          <p style={{color:'#9c8878',fontWeight:600,fontSize:'0.85rem',marginBottom:'1.2rem'}}>Share your Hub page and start getting members</p>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:'0.85rem',fontWeight:700,color:'#f4732a',background:'rgba(244,115,42,0.1)',padding:'0.6rem 1.2rem',borderRadius:'100px',display:'inline-block'}}>
            kreatown.com/u/{profile?.username}
          </div>
        </div>
      </main>
    </div>
  )
}
