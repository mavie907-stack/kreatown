'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Check } from 'lucide-react'

export default function RegisterPage() {
  const [step, setStep]             = useState<1 | 2>(1)
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [username, setUsername]     = useState('')
  const [displayName, setDisplay]   = useState('')
  const [isCreator, setIsCreator]   = useState(true)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const router   = useRouter()
  const supabase = createClient()

  const handleRegister = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, display_name: displayName, is_creator: isCreator },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-2xl font-black text-brand-brown">Kreatown</span>
            <span className="w-2 h-2 rounded-full bg-brand-orange mb-0.5" />
          </Link>
          <p className="text-sm text-brand-muted font-semibold mt-2">Your creative home awaits 🏡</p>
        </div>

        <div className="card p-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-5">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all
                  ${step >= s ? 'bg-brand-orange text-white' : 'bg-brand-cream-2 text-brand-muted'}`}>
                  {step > s ? <Check size={12} /> : s}
                </div>
                <span className={`text-xs font-bold ${step >= s ? 'text-brand-brown' : 'text-brand-muted'}`}>
                  {s === 1 ? 'Your account' : 'Your profile'}
                </span>
                {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-brand-orange' : 'bg-brand-orange/20'}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Email</label>
                <input type="email" placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" placeholder="At least 8 characters" value={password}
                  onChange={e => setPassword(e.target.value)} className="input" />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!email || password.length < 8}
                className="btn-primary justify-center w-full py-3 disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Display Name</label>
                <input type="text" placeholder="Alex Johnson" value={displayName}
                  onChange={e => setDisplay(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Username</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted font-bold text-sm">@</span>
                  <input type="text" placeholder="alexjohnson" value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="input pl-8" />
                </div>
              </div>

              {/* Creator or Fan toggle */}
              <div>
                <label className="label">I am a...</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: true,  label: '🎨 Creator',  sub: 'I make content' },
                    { val: false, label: '👥 Fan',       sub: 'I support creators' },
                  ].map(({ val, label, sub }) => (
                    <button
                      key={String(val)}
                      onClick={() => setIsCreator(val)}
                      className={`p-3 rounded-xl border-2 text-left transition-all
                        ${isCreator === val
                          ? 'border-brand-orange bg-brand-orange-pale'
                          : 'border-brand-orange/15 hover:border-brand-orange/40'}`}
                    >
                      <div className="text-sm font-bold text-brand-brown">{label}</div>
                      <div className="text-xs text-brand-muted">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading || !username || !displayName}
                className="btn-primary justify-center w-full py-3 disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? 'Creating your town...' : 'Join Kreatown 🏡'}
              </button>
            </div>
          )}

          <p className="text-center text-sm text-brand-muted font-semibold mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-orange font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
