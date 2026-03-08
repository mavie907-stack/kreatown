export const dynamic = 'force-dynamic'

'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <div style={{minHeight:'100vh',background:'#fffbf5',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Nunito,sans-serif'}}>
      <div style={{width:'100%',maxWidth:'380px',padding:'2rem'}}>
        <div style={{fontWeight:900,fontSize:'1.2rem',marginBottom:'2rem',color:'#1a1612'}}>Kreatown<span style={{display:'inline-block',width:'7px',height:'7px',background:'#f4732a',borderRadius:'50%',marginLeft:'3px',marginBottom:'2px'}}></span></div>
        <h1 style={{fontWeight:900,fontSize:'2rem',marginBottom:'0.5rem',color:'#1a1612'}}>Welcome back 👋</h1>
        <p style={{color:'#9c8878',fontWeight:600,marginBottom:'2rem'}}>Sign in to your town</p>
        {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'10px',padding:'0.75rem',marginBottom:'1rem',color:'#ef4444',fontSize:'0.85rem',fontWeight:600}}>{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'0.75rem',boxSizing:'border-box' as const,outline:'none'}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'1rem',boxSizing:'border-box' as const,outline:'none'}} />
        <button onClick={handleLogin} disabled={loading} style={{width:'100%',padding:'0.9rem',background:'#f4732a',color:'#fff',border:'none',borderRadius:'12px',fontSize:'0.95rem',fontWeight:800,cursor:'pointer',fontFamily:'Nunito,sans-serif'}}>
          {loading ? 'Signing in...' : 'Sign in 🚀'}
        </button>
        <p style={{textAlign:'center' as const,marginTop:'1.5rem',color:'#9c8878',fontSize:'0.85rem',fontWeight:600}}>
          No account yet? <Link href="/auth/register" style={{color:'#f4732a',fontWeight:800}}>Join Kreatown</Link>
        </p>
      </div>
    </div>
  )
}
