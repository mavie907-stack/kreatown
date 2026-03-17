// @ts-nocheck
'use client'

// src/components/creator/SubscribeModal.tsx
import { useState } from 'react'
import type { CreatorProfile, Tier } from '@/types/creator'

interface Props {
  creator: CreatorProfile
  tier: Tier
  allTiers: Tier[]
  onClose: () => void
  onTierChange: (tier: Tier) => void
}

export default function SubscribeModal({ creator, tier, allTiers, onClose, onTierChange }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          creatorId: creator.id,
          creatorUsername: creator.username,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      window.location.href = data.url // redirect to Stripe Checkout
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Sheet */}
      <div
        className="w-full max-w-md rounded-2xl p-6 border"
        style={{ background: '#1a1410', borderColor: 'rgba(244,115,42,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#f0ece4' }}>
            Join {creator.display_name}
          </h2>
          <button onClick={onClose} className="text-xl" style={{ color: '#9c8878' }}>×</button>
        </div>

        {/* Tier selector */}
        {allTiers.length > 1 && (
          <div className="flex flex-col gap-2 mb-5">
            {allTiers.map(t => (
              <button
                key={t.id}
                onClick={() => onTierChange(t)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors"
                style={{
                  borderColor: tier.id === t.id ? '#f4732a' : 'rgba(255,255,255,0.07)',
                  background: tier.id === t.id ? 'rgba(244,115,42,0.07)' : 'transparent',
                }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: '#f0ece4' }}>{t.name}</p>
                  {t.description && (
                    <p className="text-xs mt-0.5" style={{ color: '#9c8878' }}>{t.description}</p>
                  )}
                </div>
                <span className="text-sm font-semibold ml-4" style={{ color: '#f4732a' }}>
                  ${t.price_monthly}/mo
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Selected tier summary */}
        <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: '#c4b5a5' }}>{tier.name}</span>
            <span className="text-base font-semibold" style={{ color: '#f4732a' }}>
              ${tier.price_monthly}/month
            </span>
          </div>
          {tier.features && tier.features.slice(0, 3).map((f, i) => (
            <p key={i} className="text-xs flex items-center gap-1.5 mt-1" style={{ color: '#9c8878' }}>
              <span style={{ color: '#f4732a' }}>✓</span> {f}
            </p>
          ))}
        </div>

        {error && (
          <p className="text-sm mb-4 px-3 py-2 rounded-lg"
            style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)' }}>
            {error}
          </p>
        )}

        {/* Checkout button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: '#f4732a', color: '#fff' }}
        >
          {loading ? 'Redirecting to checkout…' : `Subscribe for $${tier.price_monthly}/month`}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: '#9c8878' }}>
          Secured by Stripe. Cancel any time.
        </p>
      </div>
    </div>
  )
}
