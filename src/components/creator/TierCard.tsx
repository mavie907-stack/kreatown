'use client'

// src/components/creator/TierCard.tsx
import type { Tier } from '@/types/creator'

interface Props {
  tier: Tier
  isPopular: boolean
  isSubscribed: boolean
  onSubscribe: () => void
  isOwner: boolean
}

export default function TierCard({ tier, isPopular, isSubscribed, onSubscribe, isOwner }: Props) {
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col border transition-colors"
      style={{
        background: isPopular
          ? 'linear-gradient(145deg, rgba(124,92,191,0.12), rgba(244,115,42,0.08))'
          : 'rgba(255,255,255,0.03)',
        borderColor: isPopular
          ? 'rgba(124,92,191,0.4)'
          : 'rgba(255,255,255,0.07)',
      }}
    >
      {isPopular && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-semibold"
          style={{ background: '#7c5cbf', color: '#fff' }}
        >
          Most popular
        </span>
      )}

      {/* Tier name + price */}
      <h3 className="font-semibold text-base mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#f0ece4' }}>
        {tier.name}
      </h3>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-bold" style={{ color: isPopular ? '#7c5cbf' : '#f4732a' }}>
          ${tier.price_monthly}
        </span>
        <span className="text-sm" style={{ color: '#9c8878' }}>/mo</span>
      </div>

      {/* Description */}
      {tier.description && (
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#9c8878' }}>
          {tier.description}
        </p>
      )}

      {/* Features */}
      {tier.features && tier.features.length > 0 && (
        <ul className="flex flex-col gap-2 mb-6 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#c4b5a5' }}>
              <span style={{ color: '#f4732a', marginTop: '1px' }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {!isOwner && (
        <button
          onClick={onSubscribe}
          disabled={isSubscribed}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 mt-auto"
          style={{
            background: isSubscribed ? 'transparent' : isPopular ? '#7c5cbf' : '#f4732a',
            color: isSubscribed ? '#9c8878' : '#fff',
            border: isSubscribed ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        >
          {isSubscribed ? '✓ Current plan' : `Join ${tier.name}`}
        </button>
      )}
    </div>
  )
}
