'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function HubPage({ params }: { params: { username: string } }) {
  const supabase = createClient()
  const [creator, setCreator] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: prof } = await supabase.from('profiles').select('*').eq('username', params.username).single()
      if (prof) {
        setCreator(prof)
        const { data: postData } = await supabase.from('posts').select('*').eq('author_id', prof.id).eq('published', true).eq('tier_level', 'free').order('created_at', { ascending: false }).limit(6)
        setPosts(postData || [])
      }
      setLoading(false)
    }
    load()
  }, [params.username])

  if (loading) return <div style={{minHeight:'100vh',background:'#fffbf5',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Nunito,sans-serif'}}><p style={{color:'#9c8878',fontWeight:700}}>⏳ Loading...</p></div>
  if (!creator) return <div style={{minHeight:'100vh',background:'#fffbf5',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Nunito,sans-serif'}}><div style={{textAlign:'center'}}><div style={{fontSize:'3rem'}}>🏚️</div><h1 style={{fontWeight:900,color:'#1a1612'}}>Town not found</h1></div></div>

  const initials = creator.display_name.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()

  return (
    <div style={{minHeight:'100vh',background:'#fffbf5',fontFamily:'Nunito,sans-serif'}}>
      <nav style={{background:'rgba(255,251,245,0.9)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(244,115,42,0.1)',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{fontWeight:900,fontSize:'1.1rem',color:'#1a1612'}}>Kreatown<span style={{display:'inline-block',width:'6px',height:'6px',background:'#f4732a',borderRadius:'50%',marginLeft:'3px',marginBottom:'2px'}}></span></div>
        <a href="/auth/login" style={{padding:'0.5rem 1.1rem',background:'#f4732a',color:'#fff',borderRadius:'100px',fontSize:'0.8rem',fontWeight:800,textDecoration:'none'}}>Sign in</a>
      </nav>
      <div style={{background:'linear-gradient(135deg,#fff0e6 0%,#fffbf5 60%)',borderBottom:'1px solid rgba(244,115,42,0.1)',padding:'3rem 1.5rem 2.5rem'}}>
        <div style={{maxWidth:'640px',margin:'0 auto',textAlign:'center'}}>
          {creator.avatar_url ? (
            <img src={creator.avatar_url} alt={creator.display_name} style={{width:'96px',height:'96px',borderRadius:'50%',objectFit:'cover',border:'3px solid #fff',boxShadow:'0 4px 20px rgba(244,115,42,0.2)',marginBottom:'1.2rem'}} />
          ) : (
            <div style={{width:'96px',height:'96px',borderRadius:'50%',background:'linear-gradient(135deg,#f4732a,#fbbf24)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',fontWeight:900,color:'#fff',margin:'0 auto 1.2rem',boxShadow:'0 4px 20px rgba(244,115,42,0.2)'}}>{initials}</div>
          )}
          <h1 style={{fontWeight:900,fontSize:'1.8rem',color:'#1a1612',marginBottom:'0.3rem'}}>{creator.display_name}</h1>
          <div style={{fontSize:'0.82rem',color:'#9c8878',fontWeight:700,fontFamily:'DM Mono,monospace',marginBottom:'0.8rem'}}>@{creator.username}</div>
          {creator.bio && <p style={{color:'#1a1612',fontWeight:600,fontSize:'0.95rem',maxWidth:'40ch',margin:'0 auto 1.5rem',lineHeight:1.6}}>{creator.bio}</p>}
          <button onClick={()=>setJoined(true)} style={{padding:'0.85rem 2.5rem',background:joined?'#22c55e':'#f4732a',color:'#fff',border:'none',borderRadius:'100px',fontSize:'1rem',fontWeight:800,cursor:'pointer',fontFamily:'Nunito,sans-serif',boxShadow:joined?'0 4px 14px rgba(34,197,94,0.3)':'0 4px 14px rgba(244,115,42,0.3)',transition:'all 0.2s'}}>
            {joined?'✅ Joined!':'🏡 Join this town — Free'}
          </button>
        </div>
      </div>
      <div style={{maxWidth:'640px',margin:'2rem auto',padding:'0 1.5rem'}}>
        <h2 style={{fontWeight:900,fontSize:'1.1rem',color:'#1a1612',marginBottom:'1rem'}}>Membership Tiers</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem'}}>
          {[['🌱','Free','$0','Free posts'],['⭐','Fan','$9/mo','Exclusive content'],['🔥','Superfan','$19/mo','Everything']].map(([icon,name,price,desc],i)=>(
            <div key={i} style={{background:i===0?'#f0fdf4':i===1?'#fff0e6':'#fefce8',border:`1.5px solid ${i===0?'#86efac':i===1?'#f4732a':'#fbbf24'}`,borderRadius:'16px',padding:'1.2rem',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.4rem'}}>{icon}</div>
              <div style={{fontWeight:900,fontSize:'0.9rem',color:'#1a1612',marginBottom:'0.2rem'}}>{name}</div>
              <div style={{fontWeight:800,fontSize:'1rem',color:'#f4732a',marginBottom:'0.4rem'}}>{price}</div>
              <div style={{fontSize:'0.72rem',color:'#9c8878',fontWeight:600}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:'640px',margin:'0 auto 4rem',padding:'0 1.5rem'}}>
        <h2 style={{fontWeight:900,fontSize:'1.1rem',color:'#1a1612',marginBottom:'1rem'}}>Latest Posts</h2>
        {posts.length===0 ? (
          <div style={{background:'#fff',border:'1px solid rgba(244,115,42,0.13)',borderRadius:'16px',padding:'2.5rem',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.8rem'}}>📝</div>
            <p style={{color:'#9c8878',fontWeight:600,fontSize:'0.9rem'}}>No posts yet — check back soon!</p>
          </div>
        ) : posts.map(post=>(
          <div key={post.id} style={{background:'#fff',border:'1px solid rgba(244,115,42,0.13)',borderRadius:'16px',padding:'1.3rem',marginBottom:'0.75rem'}}>
            <div style={{fontWeight:800,fontSize:'1rem',color:'#1a1612',marginBottom:'0.4rem'}}>{post.title}</div>
            {post.body && <p style={{color:'#9c8878',fontSize:'0.85rem',fontWeight:600,lineHeight:1.5,margin:0}}>{post.body.slice(0,120)}{post.body.length>120?'...':''}</p>}
          </div>
        ))}
      </div>
      <div style={{borderTop:'1px solid rgba(244,115,42,0.1)',padding:'1.5rem',textAlign:'center'}}>
        <a href="/" style={{fontSize:'0.8rem',color:'#9c8878',fontWeight:700,textDecoration:'none'}}>Powered by Kreatown<span style={{display:'inline-block',width:'5px',height:'5px',background:'#f4732a',borderRadius:'50%',marginLeft:'2px',marginBottom:'1px'}}></span></a>
      </div>
    </div>
  )
}
