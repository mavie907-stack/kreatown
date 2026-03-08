'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const router  = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
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

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-2xl font-black text-brand-brown">Kreatown</span>
            <span className="w-2 h-2 rounded-full bg-brand-orange mb-0.5" />
          </Link>
          <p className="text-sm text-brand-muted font-semibold mt-2">Welcome back 👋</p>
        </div>

        {/* Card */}
        <div className="card p-6">
          <h1 className="font-display text-xl font-black text-brand-brown mb-5 tracking-tight">
            Sign in to your town
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="btn-primary justify-center w-full py-3 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign in 🚀'}
            </button>
          </div>

          <p className="text-center text-sm text-brand-muted font-semibold mt-4">
            No account yet?{' '}
            <Link href="/auth/register" className="text-brand-orange font-bold hover:underline">
              Join Kreatown
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
