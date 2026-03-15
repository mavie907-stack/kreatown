// src/app/checkout/[username]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { TIER_CONFIG } from '@/types'
import { formatPrice } from '@/lib/qnb'
import type { TierLevel } from '@/types'
import type { Currency } from '@/lib/qnb'

const PRICES = {
  silver: { TRY: 290,  USD: 9,   EUR: 8.5  },
  gold:   { TRY: 590,  USD: 19,  EUR: 17.5 },
  palace: { TRY: 1490, USD: 49,  EUR: 45   },
}

const TIER_FEATURES: Record<string, string[]> = {
  free:   ['Free posts & community', 'Town view access', 'Public radio'],
  silver: ['All free features', 'Exclusive posts', 'Studio tours', 'Monthly calls'],
  gold:   ['All silver features', 'Full strategy content', 'Direct messages', 'Early access', '3D Radio & TV'],
  palace: ['All gold features', '1-on-1 sessions', 'Private station', 'Top of the hill', 'Weekly Q&A'],
}

export default function CheckoutPage({ params }: { params: { username: string } }) {
  const router     = useRouter()
  const search     = useSearchParams()
  const initTier   = (search.get('tier') as TierLevel) || null

  const [step,      setStep]      = useState<1|2|3>(1)
  const [tier,      setTier]      = useState<TierLevel | null>(initTier)
  const [currency,  setCurrency]  = useState<Currency>('TRY')
  const [payMethod, setPayMethod] = useState<'card'|'eft'>('card')
  const [agreed,    setAgreed]    = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [txId,      setTxId]      = useState('')

  // Card fields
  const [cardName,   setCardName]   = useState('')
  const [cardNum,    setCardNum]    = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv,    setCardCvv]    = useState('')
  const [cardEmail,  setCardEmail]  = useState('')

  const amount = tier && tier !== 'free' ? PRICES[tier as keyof typeof PRICES]?.[currency] ?? 0 : 0
  const amountStr = tier === 'free' ? 'Free' : formatPrice(amount, currency)

  const tc = tier ? TIER_CONFIG[tier] : null

  // Format card number
  function fmtCard(v: string) {
    return v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  }
  function fmtExpiry(v: string) {
    const d = v.replace(/\D/g,'').slice(0,4)
    return d.length >= 2 ? d.slice(0,2) + ' / ' + d.slice(2) : d
  }

  async function processPayment() {
    if (!agreed) { setError('Please agree to the terms'); return }
    if (!tier)   { setError('Please select a tier'); return }

    setLoading(true); setError('')

    try {
      const resp = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorId:   params.username, // ideally the creator's UUID
          tier,
          currency,
          paymentMethod: payMethod,
          cardDetails: payMethod === 'card' ? {
            cardNumber: cardNum, cardHolder: cardName,
            expiry: cardExpiry, cvv: cardCvv, email: cardEmail,
          } : undefined,
        }),
      })
      const data = await resp.json()

      if (!resp.ok) { setError(data.error ?? 'Payment failed'); return }
      if (data.requiresRedirect) { window.location.href = data.redirectUrl; return }

      setTxId(data.transactionId ?? 'KT' + Date.now().toString(36).toUpperCase())
      setStep(3)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-orange-pale flex items-center justify-between px-5 h-14">
        <Link href="/" className="font-display font-bold text-xl text-brown">Krea<span className="text-orange">Town</span></Link>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-2 h-2 rounded-full bg-emerald" />
          Secure checkout
        </div>
        <Link href={`/u/${params.username}`} className="text-sm text-muted hover:text-brown transition-colors">← Back</Link>
      </nav>

      {/* Progress */}
      {step < 3 && (
        <div className="max-w-xl mx-auto flex items-center gap-0 px-6 pt-5 pb-1">
          {['Choose tier','Payment','Confirm'].map((label, i) => {
            const s = i + 1
            const active = s === step
            const done   = s < step
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border transition-all ${
                    done ? 'bg-orange border-orange text-white' :
                    active ? 'bg-orange border-orange text-white ring-4 ring-orange/12' :
                    'bg-white border-muted/25 text-muted'
                  }`}>{done ? '✓' : s}</div>
                  <span className={`text-[10px] whitespace-nowrap hidden sm:block ${active || done ? 'text-orange' : 'text-muted'}`}>{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 mx-1 rounded-full ${done ? 'bg-orange' : 'bg-muted/15'}`} />}
              </div>
            )
          })}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 pb-20 md:pb-8">

        {/* LEFT */}
        <div>
          {/* STEP 1: TIER */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="font-display font-bold text-2xl text-brown mb-1">Choose your place 🏡</h2>
              <p className="text-muted text-sm font-light mb-5">Pick the tier that fits. Upgrade or downgrade anytime.</p>

              {/* Currency */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="text-sm text-muted">Pay in:</span>
                {(['TRY','USD','EUR'] as Currency[]).map(c => (
                  <button key={c} onClick={() => setCurrency(c)}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                      currency === c ? 'bg-brown text-white border-brown' : 'bg-white text-brown border-muted/20 hover:border-muted/40'
                    }`}>
                    {{ TRY:'🇹🇷 TRY', USD:'🇺🇸 USD', EUR:'🇪🇺 EUR' }[c]}
                  </button>
                ))}
              </div>

              {/* Tiers */}
              <div className="space-y-3 mb-6">
                {(['free','silver','gold','palace'] as TierLevel[]).map(t => {
                  const tc2 = TIER_CONFIG[t]
                  const p   = t === 'free' ? 'Free' : formatPrice(PRICES[t as keyof typeof PRICES][currency], currency)
                  const sel = tier === t
                  return (
                    <div key={t} onClick={() => setTier(t)}
                      className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-0.5 ${
                        t === 'gold' ? '-translate-y-0.5' : ''
                      } ${sel && t !== 'palace' ? 'border-orange shadow-orange/20 shadow-lg' : ''
                        } ${sel && t === 'palace' ? 'border-palace shadow-palace/20 shadow-lg' : ''
                        } ${!sel ? 'border-muted/15 bg-white hover:border-muted/30' : 'bg-white'
                      }`}>
                      {t === 'gold' && !sel && (
                        <div className="absolute -top-2.5 left-4 bg-orange text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full tracking-wide uppercase">Most popular</div>
                      )}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: tc2.bgColor }}>
                        {tc2.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-brown">{tc2.name}</div>
                        <div className="text-xs text-muted mt-0.5 truncate">{TIER_FEATURES[t][1] ?? TIER_FEATURES[t][0]}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-display font-bold text-lg ${sel && t === 'palace' ? 'text-palace' : sel ? 'text-orange' : 'text-brown'}`}>{p}</div>
                        <div className="text-[10px] text-muted">{t === 'free' ? 'forever' : '/ mo'}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        sel ? (t === 'palace' ? 'bg-palace border-palace' : 'bg-orange border-orange') : 'border-muted/30'
                      }`}>
                        {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  )
                })}
              </div>

              <button onClick={() => tier && setStep(2)} disabled={!tier}
                className="w-full bg-orange text-white font-medium py-4 rounded-2xl shadow-orange hover:bg-orange-light hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
                Continue to payment →
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="font-display font-bold text-2xl text-brown mb-1">Payment details 💳</h2>
              <p className="text-muted text-sm font-light mb-5">Secured by QNB Finansbank.</p>

              {/* Method tabs */}
              <div className="flex bg-cream-dark rounded-xl border border-muted/15 p-1 mb-5 gap-1">
                {[['card','💳 Credit / Debit card'],['eft','🏦 Havale / EFT']] .map(([m,label]) => (
                  <button key={m} onClick={() => setPayMethod(m as 'card'|'eft')}
                    className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${
                      payMethod === m ? 'bg-white text-brown font-medium shadow-sm' : 'text-muted hover:text-brown'
                    }`}>{label}</button>
                ))}
              </div>

              {/* Card form */}
              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Cardholder name</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Topraq Toros"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Card number</label>
                    <input value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))} placeholder="0000 0000 0000 0000"
                      inputMode="numeric" maxLength={19}
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm font-mono-kt outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted mb-1.5">Expiry</label>
                      <input value={cardExpiry} onChange={e => setCardExpiry(fmtExpiry(e.target.value))} placeholder="MM / YY"
                        inputMode="numeric" maxLength={7}
                        className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm font-mono-kt outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted mb-1.5">CVV</label>
                      <input value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="•••" type="password"
                        inputMode="numeric" maxLength={4}
                        className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Email (for receipt)</label>
                    <input value={cardEmail} onChange={e => setCardEmail(e.target.value)} type="email" placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                </div>
              )}

              {/* EFT form */}
              {payMethod === 'eft' && (
                <div className="space-y-4">
                  <div className="bg-orange-pale border border-orange/15 rounded-2xl p-4">
                    <div className="text-sm font-medium text-brown mb-2">🏦 QNB Bank Transfer Details</div>
                    <div className="text-xs text-muted space-y-1">
                      <div><span className="font-mono-kt text-brown">Bank:</span> QNB Finansbank A.Ş.</div>
                      <div><span className="font-mono-kt text-brown">IBAN:</span> TR00 0011 1000 0000 0000 0000 00</div>
                      <div><span className="font-mono-kt text-brown">Name:</span> KreaTown Teknoloji A.Ş.</div>
                      <div className="text-orange mt-2">⚡ Add your email as description for automatic matching.</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Your full name</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Ad Soyad"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Your email</label>
                    <input value={cardEmail} onChange={e => setCardEmail(e.target.value)} type="email" placeholder="siz@ornek.com"
                      className="w-full px-4 py-3 border border-muted/20 rounded-xl bg-white text-brown text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all placeholder:text-muted/40" />
                  </div>
                  <div className="bg-cream-dark rounded-xl p-4 text-xs text-muted">
                    Access activates within <strong className="text-brown">2 business hours</strong> of your transfer.
                  </div>
                </div>
              )}

              {/* Agree */}
              <div className="flex items-start gap-3 mt-5" onClick={() => setAgreed(!agreed)}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all mt-0.5 ${agreed ? 'bg-orange border-orange' : 'border-muted/30 bg-white'}`}>
                  {agreed && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <p className="text-xs text-muted leading-relaxed cursor-pointer">
                  I agree to the <Link href="/terms" className="text-orange">Terms of Service</Link> and <Link href="/privacy" className="text-orange">Privacy Policy</Link>. I understand my subscription renews automatically each month.
                </p>
              </div>

              {/* Secure badges */}
              <div className="flex gap-4 mt-4 mb-5">
                {['🔒 256-bit SSL','🏦 QNB secured','✓ PCI compliant'].map(b => (
                  <div key={b} className="text-xs text-muted flex items-center gap-1">{b}</div>
                ))}
              </div>

              {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

              <button onClick={processPayment} disabled={loading || !agreed}
                className={`w-full text-white font-medium py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  tier === 'palace'
                    ? 'bg-palace shadow-palace hover:opacity-90'
                    : 'bg-orange shadow-orange hover:bg-orange-light hover:-translate-y-0.5'
                }`}>
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
                  : `Pay ${amountStr} / month`
                }
              </button>
              <button onClick={() => setStep(1)} className="w-full mt-3 text-sm text-muted py-2 hover:text-brown transition-colors">← Change tier</button>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="text-center py-8 animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-emerald/10 border-2 border-emerald/25 flex items-center justify-center text-4xl mx-auto mb-5 animate-pop-in">🏡</div>
              <h2 className="font-display font-bold text-3xl text-brown">Welcome to the town!</h2>
              <p className="text-muted text-sm font-light mt-2 mb-6">You're now a member of {params.username}'s world.</p>

              <div className="bg-white border border-muted/12 rounded-2xl p-5 text-left mb-6 space-y-3">
                {[
                  ['Member',        cardName || 'Member'],
                  ['Tier',          tc ? `${tc.emoji} ${tc.name}` : '—'],
                  ['Amount',        amountStr + ' / mo'],
                  ['Payment',       payMethod === 'card' ? 'Credit card' : 'Havale/EFT'],
                  ['Transaction ID', txId],
                  ['Next billing',  new Date(Date.now() + 30*24*3600*1000).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm border-b border-muted/8 pb-2 last:border-0 last:pb-0">
                    <span className="text-muted">{label}</span>
                    <span className="font-mono-kt text-xs text-brown">{value}</span>
                  </div>
                ))}
              </div>

              <Link href={`/u/${params.username}`}
                className="inline-flex items-center gap-2 bg-orange text-white font-medium px-8 py-3.5 rounded-2xl shadow-orange hover:bg-orange-light hover:-translate-y-0.5 transition-all">
                Enter the town 🏡
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="md:sticky md:top-20">
          <div className="bg-white border border-muted/12 rounded-3xl p-5">
            {/* Creator */}
            <div className="flex items-center gap-3 pb-4 border-b border-muted/10 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-palace to-orange flex items-center justify-center text-xl border-2 border-palace/20">🎨</div>
              <div>
                <div className="font-display font-bold text-base text-brown capitalize">{params.username}</div>
                <div className="text-xs text-muted">@{params.username}</div>
                <div className="text-[10px] bg-palace-pale text-palace border border-palace/20 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 mt-0.5">🏯 Palace Creator</div>
              </div>
            </div>

            <div className="text-[10px] font-mono-kt text-muted uppercase tracking-widest mb-3">Your order</div>

            {tier ? (
              <>
                <div className="bg-cream-dark rounded-xl p-3.5 mb-4">
                  <div className="text-sm font-medium text-brown mb-2">{tc?.emoji} {tc?.name}</div>
                  <div className="space-y-1">
                    {TIER_FEATURES[tier].map(f => (
                      <div key={f} className="text-xs text-muted flex items-center gap-1.5">
                        <span className="text-emerald text-[10px]">✓</span>{f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-orange-pale rounded-xl p-3 mb-4 border border-orange/12">
                  <div className="font-display font-bold text-2xl text-orange">{amountStr}</div>
                  <div className="text-xs text-muted mt-0.5">{tier === 'free' ? 'forever' : 'per month'}</div>
                  {currency !== 'TRY' && tier !== 'free' && (
                    <div className="text-[10px] text-muted font-mono-kt mt-1">≈ ₺{PRICES[tier as keyof typeof PRICES]?.TRY.toLocaleString('tr-TR')} TRY</div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-cream-dark rounded-xl p-4 text-center text-sm text-muted mb-4">Select a tier to see pricing</div>
            )}

            <div className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-2.5">
              <span>🏦</span>
              <span className="text-xs text-muted">Secured by <strong className="text-brown">QNB Finansbank</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA bar */}
      {step < 3 && (
        <div className="md:hidden mobile-bottom-bar flex items-center gap-3 px-4 py-3">
          {step === 1 ? (
            <button onClick={() => tier && setStep(2)} disabled={!tier}
              className="flex-1 bg-orange text-white font-medium py-3 rounded-2xl shadow-orange text-sm disabled:opacity-40">
              Continue → {tier && amountStr}
            </button>
          ) : (
            <button onClick={processPayment} disabled={loading || !agreed}
              className="flex-1 bg-orange text-white font-medium py-3 rounded-2xl shadow-orange text-sm disabled:opacity-40">
              {loading ? 'Processing...' : `Pay ${amountStr}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
