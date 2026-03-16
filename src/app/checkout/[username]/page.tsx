'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// ─── Config: swap these when QNB sends keys ───────────────────────────────
const QNB_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_QNB_MERCHANT_ID ?? 'PENDING',
  apiEndpoint: process.env.NEXT_PUBLIC_QNB_API_URL ?? 'https://api.qnbfinansbank.com/payment/v1',
  iban: process.env.NEXT_PUBLIC_QNB_IBAN ?? 'TR00 0011 1000 0000 0000 0000 00',
  accountName: 'KreaTown Teknoloji A.Ş.',
  bankName: 'QNB Finansbank A.Ş.',
}

const TIERS = [
  { id: 'free',   icon: '🌱', name: 'Garden Pass',     perks: 'Free posts · Community access · Town view',   prices: { TRY: 0,    USD: 0,  EUR: 0  }, period: 'forever' },
  { id: 'silver', icon: '⭐', name: 'Inside the House', perks: 'Exclusive posts · Studio tours · Monthly calls', prices: { TRY: 290,  USD: 9,  EUR: 8  }, period: '/ month' },
  { id: 'gold',   icon: '👑', name: 'Gold Suite',       perks: 'Full strategy · DMs · Early access · Analytics', prices: { TRY: 590,  USD: 19, EUR: 17 }, period: '/ month', popular: true },
  { id: 'palace', icon: '🏯', name: 'Palace Access',    perks: '1-on-1 sessions · Private radio · Top of the hill', prices: { TRY: 1490, USD: 49, EUR: 45 }, period: '/ month' },
]

const CURRENCY_SYMBOLS: Record<string, string> = { TRY: '₺', USD: '$', EUR: '€' }

type Currency = 'TRY' | 'USD' | 'EUR'
type Step = 1 | 2 | 3
type PayMethod = 'card' | 'eft'

function formatCardNum(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(val: string) {
  const d = val.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + ' / ' + d.slice(2) : d
}
function formatIBAN(val: string) {
  return val.replace(/\D/g, '').slice(0, 24).replace(/(.{4})/g, '$1 ').trim()
}

export default function CheckoutPage() {
  const params = useSearchParams()
  const defaultTier = params.get('tier') ?? 'gold'
  const creatorUsername = params.get('creator') ?? 'topraq'

  const [step, setStep] = useState<Step>(1)
  const [tier, setTier] = useState(defaultTier)
  const [currency, setCurrency] = useState<Currency>('TRY')
  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Card form
  const [cardName, setCardName] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardEmail, setCardEmail] = useState('')

  // EFT form
  const [eftIban, setEftIban] = useState('')
  const [eftName, setEftName] = useState('')
  const [eftEmail, setEftEmail] = useState('')

  const selectedTier = TIERS.find(t => t.id === tier) ?? TIERS[2]
  const sym = CURRENCY_SYMBOLS[currency]
  const price = selectedTier.prices[currency]
  const cardBrand = cardNum.startsWith('4') ? '💳 Visa' : cardNum.startsWith('5') ? '💳 MC' : '💳'

  function validate() {
    const errs: Record<string, string> = {}
    if (!agreed) { errs.agree = 'Please agree to terms'; return errs }
    if (payMethod === 'card') {
      if (!cardName.trim()) errs.name = 'Enter cardholder name'
      if (cardNum.replace(/\s/g, '').length < 16) errs.card = 'Enter valid card number'
      if (cardExpiry.length < 7) errs.expiry = 'Enter expiry date'
      if (cardCvv.length < 3) errs.cvv = 'Enter CVV'
      if (!cardEmail.includes('@')) errs.email = 'Enter valid email'
    } else {
      if (eftIban.replace(/\s/g, '').length < 22) errs.iban = 'Enter valid IBAN'
      if (!eftName.trim()) errs.eftname = 'Enter your name'
      if (!eftEmail.includes('@')) errs.eftemail = 'Enter valid email'
    }
    return errs
  }

  async function handlePay() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // TODO: replace with real QNB API call when keys arrive
    // const res = await fetch('/api/checkout/qnb', { method:'POST', body: JSON.stringify({...}) })
    await new Promise(r => setTimeout(r, 1800)) // mock delay
    setLoading(false)
    setSuccess(true)
    setStep(3)
  }

  const S = {
    wrap: { fontFamily:"'DM Sans',sans-serif", background:'#fffbf5', color:'#1a1612', minHeight:'100vh' } as React.CSSProperties,
    nav: { position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', height:56, background:'rgba(255,251,245,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(156,136,120,0.18)' } as React.CSSProperties,
    logo: { fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:700, color:'#1a1612', textDecoration:'none' },
  }

  return (
    <div style={S.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input{outline:none;font-family:'DM Sans',sans-serif;}
        input:focus{border-color:#f4732a!important;box-shadow:0 0 0 3px rgba(244,115,42,0.08)!important;}
        .tier-card:hover{border-color:rgba(156,136,120,0.32)!important;box-shadow:0 4px 16px rgba(26,22,18,0.06)!important;}
        .btn-pay:hover:not(:disabled){background:#ff9555!important;transform:translateY(-1px);box-shadow:0 6px 28px rgba(244,115,42,0.4)!important;}
        .btn-back:hover{border-color:rgba(156,136,120,0.32)!important;color:#1a1612!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
        @media(max-width:720px){.page-grid{grid-template-columns:1fr!important;}.order-card{display:none!important;}}
      `}</style>

      {/* Nav */}
      <nav style={S.nav}>
        <Link href={`/u/${creatorUsername}`} style={S.logo as any}>Krea<span style={{ color:'#f4732a' }}>Town</span></Link>
        <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.72rem', color:'#9c8878' }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:'#2dab80' }} />
          Secure checkout
        </div>
        <Link href={`/u/${creatorUsername}`} style={{ fontSize:'0.78rem', color:'#9c8878', textDecoration:'none' }}>← Back</Link>
      </nav>

      {/* Progress */}
      <div style={{ maxWidth:560, margin:'0 auto', padding:'1.5rem 1.5rem 0', display:'flex', alignItems:'center' }}>
        {[{n:1,label:'Choose tier'},{n:2,label:'Payment'},{n:3,label:'Confirm'}].map(({n,label},i) => (
          <div key={n} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem', position:'relative' }}>
            {i < 2 && <div style={{ position:'absolute', top:14, left:'50%', width:'100%', height:1.5, background: step > n ? '#f4732a' : 'rgba(156,136,120,0.18)' }} />}
            <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:500, position:'relative', zIndex:1, border: step >= n ? '1.5px solid #f4732a' : '1.5px solid rgba(156,136,120,0.18)', background: step >= n ? '#f4732a' : '#fffbf5', color: step >= n ? 'white' : '#9c8878', boxShadow: step === n ? '0 0 0 4px rgba(244,115,42,0.12)' : 'none' }}>
              {step > n ? '✓' : n}
            </div>
            <span style={{ fontSize:'0.62rem', color: step >= n ? '#f4732a' : '#9c8878', fontWeight: step >= n ? 500 : 400, whiteSpace:'nowrap' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Page grid */}
      <div className="page-grid" style={{ maxWidth:960, margin:'0 auto', padding:'2rem 1.5rem 4rem', display:'grid', gridTemplateColumns:'1fr 380px', gap:'2rem', alignItems:'start' }}>

        {/* LEFT: steps */}
        <div>

          {/* STEP 1: Choose tier */}
          {step === 1 && (
            <div style={{ animation:'fadeUp .4s ease both' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.35rem', fontWeight:700, marginBottom:'0.25rem' }}>Choose your place 🏡</div>
              <p style={{ fontSize:'0.85rem', color:'#9c8878', marginBottom:'1.5rem', fontWeight:300 }}>Pick the tier that fits. Upgrade or downgrade anytime.</p>

              {/* Currency */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
                <span style={{ fontSize:'0.82rem', color:'#9c8878' }}>Pay in:</span>
                {(['TRY','USD','EUR'] as Currency[]).map(c => (
                  <button key={c} onClick={() => setCurrency(c)}
                    style={{ padding:'0.42rem 0.875rem', borderRadius:100, border:'1px solid', fontSize:'0.78rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', background: currency===c ? '#1a1612' : 'white', color: currency===c ? 'white' : '#1a1612', borderColor: currency===c ? '#1a1612' : 'rgba(156,136,120,0.18)' }}>
                    {c==='TRY'?'🇹🇷':c==='USD'?'🇺🇸':'🇪🇺'} {c}
                  </button>
                ))}
              </div>

              {/* Tier cards */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.75rem' }}>
                {TIERS.map(t => (
                  <div key={t.id} className="tier-card"
                    onClick={() => setTier(t.id)}
                    style={{ border: `${tier===t.id ? 2 : 1.5}px solid`, borderRadius:16, padding:'1.1rem 1.25rem', cursor:'pointer', transition:'all .2s', position:'relative', display:'flex', alignItems:'center', gap:'1rem', background:'white', borderColor: tier===t.id ? '#f4732a' : 'rgba(156,136,120,0.18)', boxShadow: tier===t.id ? '0 0 0 3px rgba(244,115,42,0.08)' : 'none' }}>
                    {t.popular && <div style={{ position:'absolute', top:-10, left:'1.25rem', background:'#f4732a', color:'white', fontSize:'0.58rem', padding:'0.15rem 0.55rem', borderRadius:100, fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase' }}>Most popular</div>}
                    <div style={{ width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0, background: t.id==='free'?'rgba(45,171,128,0.1)': t.id==='silver'?'rgba(143,163,181,0.12)': t.id==='gold'?'rgba(201,149,42,0.12)':'rgba(124,92,191,0.12)' }}>{t.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'0.9rem', fontWeight:500 }}>{t.name}</div>
                      <div style={{ fontSize:'0.72rem', color:'#9c8878', marginTop:2 }}>{t.perks}</div>
                    </div>
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.25rem', fontWeight:700, color: t.id==='free' ? '#2dab80' : '#1a1612' }}>
                        {t.id==='free' ? 'Free' : `${sym}${t.prices[currency].toLocaleString()}`}
                      </div>
                      <div style={{ fontSize:'0.65rem', color:'#9c8878' }}>{t.period}</div>
                    </div>
                    <div style={{ width:18, height:18, borderRadius:'50%', border:'1.5px solid', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', borderColor: tier===t.id ? '#f4732a' : 'rgba(156,136,120,0.18)', background: tier===t.id ? '#f4732a' : 'transparent', transition:'all .18s' }}>
                      {tier===t.id && <div style={{ width:8, height:8, borderRadius:'50%', background:'white' }} />}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(2)} style={{ width:'100%', padding:'1rem', borderRadius:14, background:'#f4732a', color:'white', border:'none', fontSize:'1rem', fontWeight:500, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 20px rgba(244,115,42,0.3)', transition:'all .2s' }}>
                Continue to payment →
              </button>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && !success && (
            <div style={{ animation:'fadeUp .4s ease both' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.35rem', fontWeight:700, marginBottom:'0.25rem' }}>Payment details 💳</div>
              <p style={{ fontSize:'0.85rem', color:'#9c8878', marginBottom:'1.5rem', fontWeight:300 }}>All transactions secured by QNB.</p>

              {/* Pay method tabs */}
              <div style={{ display:'flex', marginBottom:'1.5rem', border:'1px solid rgba(156,136,120,0.18)', borderRadius:12, overflow:'hidden', background:'#f5efe3' }}>
                {[{id:'card',label:'💳 Credit / Debit card'},{id:'eft',label:'🏦 Havale / EFT'}].map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id as PayMethod)}
                    style={{ flex:1, padding:'0.7rem 0.5rem', textAlign:'center', fontSize:'0.78rem', cursor:'pointer', fontFamily:'inherit', border:'none', transition:'all .18s', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.35rem', background: payMethod===m.id ? 'white' : 'transparent', color: payMethod===m.id ? '#1a1612' : '#9c8878', fontWeight: payMethod===m.id ? 500 : 400, boxShadow: payMethod===m.id ? '0 1px 6px rgba(26,22,18,0.08)' : 'none', borderRadius: payMethod===m.id ? 10 : 0, margin: payMethod===m.id ? 3 : 0 }}>
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Card form */}
              {payMethod === 'card' && (
                <div>
                  {[
                    { label:'Cardholder name', id:'name', val:cardName, set:setCardName, placeholder:'Topraq Toros', type:'text', err: errors.name },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom:'1.1rem' }}>
                      <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>{f.label}</label>
                      <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder} type={f.type}
                        style={{ width:'100%', padding:'0.75rem 0.875rem', border:`1px solid ${f.err?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem', transition:'border-color .15s' }} />
                      {f.err && <div style={{ fontSize:'0.65rem', color:'#e05252', marginTop:4 }}>{f.err}</div>}
                    </div>
                  ))}

                  <div style={{ marginBottom:'1.1rem' }}>
                    <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Card number</label>
                    <div style={{ position:'relative' }}>
                      <input value={cardNum} onChange={e=>setCardNum(formatCardNum(e.target.value))} placeholder="0000 0000 0000 0000"
                        maxLength={19} inputMode="numeric"
                        style={{ width:'100%', padding:'0.75rem 3.5rem 0.75rem 0.875rem', border:`1px solid ${errors.card?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem', letterSpacing:'0.08em', fontFamily:"'DM Mono',monospace" }} />
                      <span style={{ position:'absolute', right:'0.875rem', top:'50%', transform:'translateY(-50%)', fontSize:'1.1rem' }}>{cardBrand}</span>
                    </div>
                    {errors.card && <div style={{ fontSize:'0.65rem', color:'#e05252', marginTop:4 }}>{errors.card}</div>}
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem', marginBottom:'1.1rem' }}>
                    <div>
                      <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Expiry date</label>
                      <input value={cardExpiry} onChange={e=>setCardExpiry(formatExpiry(e.target.value))} placeholder="MM / YY"
                        maxLength={7} inputMode="numeric"
                        style={{ width:'100%', padding:'0.75rem 0.875rem', border:`1px solid ${errors.expiry?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem' }} />
                    </div>
                    <div>
                      <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>CVV</label>
                      <input value={cardCvv} onChange={e=>setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="•••"
                        maxLength={4} type="password" inputMode="numeric"
                        style={{ width:'100%', padding:'0.75rem 0.875rem', border:`1px solid ${errors.cvv?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom:'1.1rem' }}>
                    <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Email (for receipt)</label>
                    <input value={cardEmail} onChange={e=>setCardEmail(e.target.value)} placeholder="you@example.com" type="email"
                      style={{ width:'100%', padding:'0.75rem 0.875rem', border:`1px solid ${errors.email?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem' }} />
                    {errors.email && <div style={{ fontSize:'0.65rem', color:'#e05252', marginTop:4 }}>{errors.email}</div>}
                  </div>
                </div>
              )}

              {/* EFT form */}
              {payMethod === 'eft' && (
                <div>
                  <div style={{ background:'rgba(244,115,42,0.06)', border:'1px solid rgba(244,115,42,0.15)', borderRadius:14, padding:'1rem 1.1rem', marginBottom:'1.25rem' }}>
                    <div style={{ fontSize:'0.82rem', fontWeight:500, marginBottom:'0.5rem' }}>🏦 QNB Bank Transfer Details</div>
                    <div style={{ fontSize:'0.75rem', color:'#9c8878', lineHeight:1.8 }}>
                      <div><span style={{ fontFamily:"'DM Mono',monospace", color:'#1a1612' }}>Bank:</span> {QNB_CONFIG.bankName}</div>
                      <div><span style={{ fontFamily:"'DM Mono',monospace", color:'#1a1612' }}>IBAN:</span> {QNB_CONFIG.iban}</div>
                      <div><span style={{ fontFamily:"'DM Mono',monospace", color:'#1a1612' }}>Account:</span> {QNB_CONFIG.accountName}</div>
                      <div style={{ marginTop:'0.35rem', fontSize:'0.68rem', color:'#f4732a' }}>⚡ Add your email as description so we can match your payment.</div>
                    </div>
                  </div>

                  <div style={{ marginBottom:'1.1rem' }}>
                    <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Your IBAN (for confirmation)</label>
                    <div style={{ position:'relative' }}>
                      <span style={{ position:'absolute', left:'0.875rem', top:'50%', transform:'translateY(-50%)', fontSize:'0.82rem', color:'#9c8878', fontFamily:"'DM Mono',monospace", pointerEvents:'none' }}>TR</span>
                      <input value={eftIban} onChange={e=>setEftIban(formatIBAN(e.target.value))} placeholder="00 0000 0000 0000 0000 0000 00"
                        maxLength={32} inputMode="numeric"
                        style={{ width:'100%', padding:'0.75rem 0.875rem 0.75rem 3rem', border:`1px solid ${errors.iban?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem', fontFamily:"'DM Mono',monospace", letterSpacing:'0.06em' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom:'1.1rem' }}>
                    <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Your full name</label>
                    <input value={eftName} onChange={e=>setEftName(e.target.value)} placeholder="Ad Soyad"
                      style={{ width:'100%', padding:'0.75rem 0.875rem', border:'1px solid rgba(156,136,120,0.18)', borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem' }} />
                  </div>
                  <div style={{ marginBottom:'1.1rem' }}>
                    <label style={{ display:'block', fontSize:'0.75rem', color:'#9c8878', marginBottom:'0.35rem' }}>Email (to verify payment)</label>
                    <input value={eftEmail} onChange={e=>setEftEmail(e.target.value)} placeholder="siz@ornek.com" type="email"
                      style={{ width:'100%', padding:'0.75rem 0.875rem', border:`1px solid ${errors.eftemail?'#e05252':'rgba(156,136,120,0.18)'}`, borderRadius:10, background:'white', color:'#1a1612', fontSize:'0.875rem' }} />
                  </div>
                  <div style={{ background:'#f5efe3', borderRadius:12, padding:'0.875rem 1rem', fontSize:'0.72rem', color:'#9c8878', lineHeight:1.6 }}>
                    After transfer, your membership activates within <strong style={{ color:'#1a1612' }}>2 business hours</strong>. You'll receive a confirmation email from KreaTown.
                  </div>
                </div>
              )}

              {/* Agree */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', marginTop:'1.25rem', marginBottom:'1.25rem' }}>
                <div onClick={() => setAgreed(!agreed)}
                  style={{ width:18, height:18, borderRadius:4, border:'1.5px solid', flexShrink:0, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', marginTop:1, background: agreed?'#f4732a':'white', borderColor: agreed?'#f4732a':errors.agree?'#e05252':'rgba(156,136,120,0.18)', color:'white', fontSize:'0.65rem', transition:'all .15s' }}>
                  {agreed && '✓'}
                </div>
                <div onClick={() => setAgreed(!agreed)} style={{ fontSize:'0.75rem', color:'#9c8878', lineHeight:1.5, cursor:'pointer' }}>
                  I agree to the <Link href="/terms" style={{ color:'#f4732a' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color:'#f4732a' }}>Privacy Policy</Link>. I understand my subscription renews automatically each month.
                </div>
              </div>
              {errors.agree && <div style={{ fontSize:'0.65rem', color:'#e05252', marginBottom:'0.75rem' }}>{errors.agree}</div>}

              {/* Secure badges */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.875rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
                {['🔒 256-bit SSL','🏦 QNB secured','✓ PCI compliant'].map(b => (
                  <div key={b} style={{ display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.65rem', color:'#9c8878' }}>{b}</div>
                ))}
              </div>

              <button className="btn-pay" onClick={handlePay} disabled={loading}
                style={{ width:'100%', padding:'1rem', borderRadius:14, background:'#f4732a', color:'white', border:'none', fontSize:'1rem', fontWeight:500, cursor: loading?'not-allowed':'pointer', fontFamily:'inherit', boxShadow:'0 4px 20px rgba(244,115,42,0.3)', transition:'all .2s', opacity: loading?0.75:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}>
                {loading
                  ? <><div style={{ width:18, height:18, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', animation:'spin .7s linear infinite' }} /> Processing...</>
                  : <>Pay {selectedTier.id==='free' ? 'nothing' : `${sym}${price.toLocaleString()}/mo`} — Join the town 🏡</>}
              </button>
              <button className="btn-back" onClick={() => setStep(1)}
                style={{ width:'100%', padding:'0.75rem', borderRadius:14, marginTop:'0.75rem', background:'transparent', color:'#9c8878', border:'1px solid rgba(156,136,120,0.18)', fontSize:'0.875rem', cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>
                ← Back to tiers
              </button>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && success && (
            <div style={{ textAlign:'center', padding:'2rem 0', animation:'fadeUp .5s ease both' }}>
              <div style={{ width:80, height:80, borderRadius:'50%', background:'rgba(45,171,128,0.1)', border:'2px solid rgba(45,171,128,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.2rem', margin:'0 auto 1.5rem', animation:'popIn .5s .2s cubic-bezier(.34,1.56,.64,1) both' }}>✅</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', fontWeight:700, letterSpacing:'-0.02em' }}>You're in the town! 🏡</div>
              <p style={{ fontSize:'0.9rem', color:'#9c8878', marginTop:'0.5rem', fontWeight:300, lineHeight:1.6 }}>
                Welcome to <strong style={{ color:'#1a1612' }}>{selectedTier.name}</strong>. Your membership is now active.
                {payMethod === 'eft' && ' We\'ll confirm your bank transfer within 2 business hours.'}
              </p>
              <div style={{ background:'white', border:'1px solid rgba(156,136,120,0.18)', borderRadius:16, padding:'1.25rem', margin:'1.5rem 0', textAlign:'left' }}>
                <div style={{ fontSize:'0.72rem', color:'#9c8878', marginBottom:'0.75rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.05em' }}>Receipt</div>
                {[
                  ['Plan', selectedTier.name],
                  ['Amount', selectedTier.id==='free' ? 'Free' : `${sym}${price.toLocaleString()}/month`],
                  ['Method', payMethod==='card' ? 'Credit card' : 'Bank transfer (EFT)'],
                  ['Status', payMethod==='card' ? '✅ Active' : '⏳ Pending confirmation'],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid rgba(156,136,120,0.1)', fontSize:'0.82rem' }}>
                    <span style={{ color:'#9c8878' }}>{k}</span>
                    <span style={{ fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <Link href={`/u/${creatorUsername}`} style={{ display:'inline-block', padding:'0.875rem 2rem', borderRadius:12, background:'#f4732a', color:'white', textDecoration:'none', fontWeight:500, fontSize:'0.95rem', boxShadow:'0 4px 20px rgba(244,115,42,0.3)' }}>
                Enter the town →
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT: Order summary */}
        <div className="order-card" style={{ background:'white', borderRadius:20, border:'1px solid rgba(156,136,120,0.18)', padding:'1.5rem', position:'sticky', top:80 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', fontWeight:700, marginBottom:'1rem' }}>Order summary</div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(156,136,120,0.1)' }}>
            <div style={{ width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', background: selectedTier.id==='free'?'rgba(45,171,128,0.1)': selectedTier.id==='silver'?'rgba(143,163,181,0.12)': selectedTier.id==='gold'?'rgba(201,149,42,0.12)':'rgba(124,92,191,0.12)' }}>{selectedTier.icon}</div>
            <div>
              <div style={{ fontSize:'0.9rem', fontWeight:500 }}>{selectedTier.name}</div>
              <div style={{ fontSize:'0.7rem', color:'#9c8878' }}>{creatorUsername}'s town</div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.82rem', marginBottom:'0.5rem' }}>
            <span style={{ color:'#9c8878' }}>Monthly total</span>
            <span style={{ fontWeight:600, fontFamily:"'Playfair Display',serif", fontSize:'1.1rem' }}>
              {selectedTier.id==='free' ? 'Free' : `${sym}${price.toLocaleString()}`}
            </span>
          </div>
          <div style={{ fontSize:'0.65rem', color:'#9c8878', marginBottom:'1rem' }}>Renews monthly. Cancel anytime.</div>
          <div style={{ background:'rgba(244,115,42,0.06)', borderRadius:10, padding:'0.75rem', fontSize:'0.72rem', color:'#9c8878' }}>
            {selectedTier.perks.split(' · ').map((p,i) => (
              <div key={i} style={{ padding:'0.15rem 0' }}>✓ {p}</div>
            ))}
          </div>
          <div style={{ marginTop:'1rem', padding:'0.75rem', borderRadius:10, background:'#f5efe3', display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.68rem', color:'#9c8878' }}>
            🏦 Secured by QNB Finansbank
          </div>
        </div>
      </div>
    </div>
  )
}
