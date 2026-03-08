'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, display_name: displayName, is_creator: true } }
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <div style={{minHeight:'100vh',background:'#fffbf5',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Nunito,sans-serif'}}>
      <div style={{width:'100%',maxWidth:'380px',padding:'2rem'}}>
        <div style={{fontWeight:900,fontSize:'1.2rem',marginBottom:'2rem',color:'#1a1612'}}>Kreatown<span style={{display:'inline-block',width:'7px',height:'7px',background:'#f4732a',borderRadius:'50%',marginLeft:'3px',marginBottom:'2px'}}></span></div>
        <h1 style={{fontWeight:900,fontSize:'2rem',marginBottom:'0.5rem',color:'#1a1612'}}>Join Kreatown 🏡</h1>
        <p style={{color:'#9c8878',fontWeight:600,marginBottom:'2rem'}}>Create your creator account</p>
        {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'10px',padding:'0.75rem',marginBottom:'1rem',color:'#ef4444',fontSize:'0.85rem',fontWeight:600}}>{error}</div>}
        {step === 1 ? (
          <>
            <input type="text" placeholder="Display Name" value={displayName} onChange={e=>setDisplayName(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'0.75rem',boxSizing:'border-box' as const,outline:'none'}} />
            <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'1rem',boxSizing:'border-box' as const,outline:'none'}} />
            <button onClick={()=>setStep(2)} style={{width:'100%',padding:'0.9rem',background:'#f4732a',color:'#fff',border:'none',borderRadius:'12px',fontSize:'0.95rem',fontWeight:800,cursor:'pointer',fontFamily:'Nunito,sans-serif'}}>Continue →</button>
          </>
        ) : (
          <>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'0.75rem',boxSizing:'border-box' as const,outline:'none'}} />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:'0.85rem 1rem',borderRadius:'12px',border:'1.5px solid rgba(244,115,42,0.2)',background:'#fff',fontSize:'0.9rem',fontFamily:'Nunito,sans-serif',marginBottom:'1rem',boxSizing:'border-box' as const,outline:'none'}} />
            <button onClick={handleRegister} disabled={loading} style={{width:'100%',padding:'0.9rem',background:'#f4732a',color:'#fff',border:'none',borderRadius:'12px',fontSize:'0.95rem',fontWeight:800,cursor:'pointer',fontFamily:'Nunito,sans-serif'}}>
              {loading ? 'Creating account...' : 'Join Kreatown 🚀'}
            </button>
            <button onClick={()=>setStep(1)} style={{width:'100%',padding:'0.7rem',background:'transparent',color:'#9c8878',border:'none',borderRadius:'12px',fontSize:'0.85rem',fontWeight:700,cursor:'pointer',fontFamily:'Nunito,sans-serif',marginTop:'0.5rem'}}>← Back</button>
          </>
        )}
        <p style={{textAlign:'center' as const,marginTop:'1.5rem',color:'#9c8878',fontSize:'0.85rem',fontWeight:600}}>
          Already have an account? <Link href="/auth/login" style={{color:'#f4732a',fontWeight:800}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
