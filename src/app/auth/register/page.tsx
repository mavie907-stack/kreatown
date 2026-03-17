// @ts-nocheck
// src/app/auth/register/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function RegisterPage() {
  const router  = useRouter()
  const [step,        setStep]        = useState(1)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [usernameOk,  setUsernameOk]  = useState<boolean | null>(null)
  const [checking,    setChecking]    = useState(false)

  // Step 1
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  // Step 2
  const [username,  setUsername]  = useState('')
  const [fullName,  setFullName]  = useState('')
  const [isCreator, setIsCreator] = useState(true)

  async function checkUsername(val: string) {
    if (val.length < 3) { setUsernameOk(null); return }
    setChecking(true)
    const supabase = createClient()
    const { data } = await supabase.from('profiles').select('id').eq('username', val).single()
    setUsernameOk(!data)
    setChecking(false)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (step === 1) { setStep(2); return }

    setLoading(true); setError('')
    const supabase = createClient()

    // Create auth user
    const { data, error: authErr } = await supabase.auth.signUp({ email, password })
    if (authErr || !data.user) { setError(authErr?.message ?? 'Registration failed'); setLoading(false); return }

    // Create profile
    const { error: profileErr } = await supabase.from('profiles').insert({
      id:         data.user.id,
      username:   username.toLowerCase(),
      full_name:  fullName,
      is_creator: isCreator,
      house_level: 1,
      member_count: 0,
      monthly_revenue: 0,
      silver_price_try: 290, gold_price_try: 590, palace_price_try: 1490,
      silver_price_usd: 9,   gold_price_usd: 19,  palace_price_usd: 49,
    })

    if (profileErr) { setError(profileErr.message); setLoading(false); return }
    router.push(isCreator ? '/dashboard' : '/')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <nav className="glass border-b border-orange-pale flex items-center justify-between px-6 h-14">
        <Link href="/" className="font-display font-bold text-xl text-brown">Krea<span className="text-orange">Town</span></Link>
        <Link href="/auth/login" className="text-sm text-muted hover:text-brown transition-colors">Already have an account? <span className="text-orange font-medium">Sign in</span></Link>
      </nav>

      {/* Progress */}
      <div className="flex justify-center pt-8 pb-2">
        <div className="flex items-center gap-2">
          {[1,2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                s < step ? 'bg-orange text-white' : s === step ? 'bg-orange text-white ring-4 ring-orange/15' : 'bg-cream-dark text-muted border border-muted/20'
              }`}>{s < step ? '✓' : s}</div>
              {s < 2 && <div className={`w-12 h-0.5 rounded-full ${s < step ? 'bg-orange' : 'bg-muted/20'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-7">
            <div className="text-4xl mb-3">{step === 1 ? '🏡' : '🎨'}</div>
            <h1 className="font-display font-bold text-3xl text-brown">
              {step === 1 ? 'Create your account' : 'Build your identity'}
            </h1>
            <p className="text-muted text-sm mt-2 font-light">
              {step === 1 ? 'Step 1 of 2 — your login details' : 'Step 2 of 2 — your creator profile'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-muted/12 p-7 shadow-sm">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com" autoComplete="email"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="At least 8 characters" minLength={8}
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Full name</label>
                    <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                      placeholder="Topraq Toros"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">@</span>
                      <input type="text" required value={username}
                        onChange={e => { const v = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''); setUsername(v); checkUsername(v) }}
                        placeholder="yourtown" minLength={3} maxLength={30}
                        className={`w-full pl-8 pr-10 py-3 border rounded-xl bg-white text-brown text-sm outline-none transition-all placeholder:text-muted/40 ${
                          usernameOk === true ? 'border-emerald focus:ring-2 focus:ring-emerald/10' :
                          usernameOk === false ? 'border-red-400 focus:ring-2 focus:ring-red-400/10' :
                          'border-muted/20 focus:border-orange focus:ring-2 focus:ring-orange/10'
                        }`} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                        {checking ? '⏳' : usernameOk === true ? '✅' : usernameOk === false ? '❌' : ''}
                      </div>
                    </div>
                    {usernameOk === false && <p className="text-xs text-red-500 mt-1">Username already taken</p>}
                    {usernameOk === true  && <p className="text-xs text-emerald mt-1">kreatown.com/@{username} is yours!</p>}
                  </div>

                  {/* Creator toggle */}
                  <div className={`rounded-xl p-4 border-2 cursor-pointer transition-all ${isCreator ? 'bg-orange-pale border-orange' : 'bg-cream-dark border-muted/20'}`}
                    onClick={() => setIsCreator(!isCreator)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isCreator ? 'bg-orange border-orange' : 'border-muted/40'}`}>
                        {isCreator && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-brown">I'm a creator 🏡</div>
                        <div className="text-xs text-muted mt-0.5">I want to build my own town and earn money</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button type="submit" disabled={loading || (step === 2 && usernameOk === false)}
                className="w-full bg-orange text-white font-medium py-3.5 rounded-xl shadow-orange hover:bg-orange-light hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating your town...</>
                  : step === 1 ? 'Continue →' : 'Build my town 🏡'
                }
              </button>
            </form>
          </div>

          {step === 2 && (
            <button onClick={() => setStep(1)} className="w-full mt-3 text-sm text-muted hover:text-brown transition-colors py-2">
              ← Back
            </button>
          )}

          <p className="text-center text-xs text-muted mt-5 leading-relaxed">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-orange hover:opacity-70">Terms</Link> and{' '}
            <Link href="/privacy" className="text-orange hover:opacity-70">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
