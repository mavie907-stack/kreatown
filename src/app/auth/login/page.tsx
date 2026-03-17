// @ts-nocheck
// src/app/auth/login/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Nav */}
      <nav className="glass border-b border-orange-pale flex items-center justify-between px-6 h-14">
        <Link href="/" className="font-display font-bold text-xl text-brown">
          Krea<span className="text-orange">Town</span>
        </Link>
        <Link href="/auth/register" className="text-sm text-muted hover:text-brown transition-colors">
          No account? <span className="text-orange font-medium">Sign up</span>
        </Link>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏯</div>
            <h1 className="font-display font-bold text-3xl text-brown">Welcome back</h1>
            <p className="text-muted text-sm mt-2 font-light">Sign in to your town</p>
          </div>

          <div className="bg-white rounded-3xl border border-muted/12 p-7 shadow-sm">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-muted mb-1.5">Email</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" autoComplete="email"
                  className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-muted">Password</label>
                  <Link href="/auth/forgot" className="text-xs text-orange hover:opacity-70 transition-opacity">Forgot?</Link>
                </div>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40"
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-orange text-white font-medium py-3.5 rounded-xl shadow-orange hover:bg-orange-light hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-2">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                ) : 'Sign in to your town 🏡'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-muted/15" />
              <span className="text-xs text-muted">or</span>
              <div className="flex-1 h-px bg-muted/15" />
            </div>

            {/* Social auth */}
            <button
              onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } })
              }}
              className="w-full border border-muted/20 bg-white text-brown text-sm font-medium py-3 rounded-xl hover:bg-cream-dark transition-colors flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-muted mt-6">
            New to KreaTown?{' '}
            <Link href="/auth/register" className="text-orange font-medium hover:opacity-70 transition-opacity">
              Create your town →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
