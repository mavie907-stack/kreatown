import Link from 'next/link'

const FEATURES = [
  { emoji: '💰', title: 'Get paid monthly',        desc: 'Fans subscribe to your tiers and you get paid automatically every month.' },
  { emoji: '🔒', title: 'Exclusive content',        desc: 'Gate your best posts behind membership tiers. Free, Silver, and Gold.' },
  { emoji: '💬', title: 'Direct messages',          desc: 'Connect with your biggest fans 1-on-1 through built-in messaging.' },
  { emoji: '📊', title: 'Creator analytics',        desc: 'Track your revenue, members, and content performance in one dashboard.' },
  { emoji: '🏡', title: 'Your own town',            desc: 'Get your own page at kreatown.com/@you — share it everywhere.' },
  { emoji: '🚀', title: 'Launch in minutes',        desc: 'Set up your profile, create tiers, and start earning today.' },
]

const CREATORS = [
  { name: 'Topraq',   username: 'topraq',   members: 44,  revenue: '$2,840', emoji: '🎨', color: 'linear-gradient(135deg,#f4732a,#fbbf24)' },
  { name: 'Jenna',    username: 'jenna',    members: 128, revenue: '$6,200', emoji: '📸', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)' },
  { name: 'MikeNova', username: 'mikenova', members: 89,  revenue: '$4,100', emoji: '🎵', color: 'linear-gradient(135deg,#34d399,#60a5fa)' },
]

export default function HomePage() {
  const s = {
    card: {
      background: '#fff', borderRadius: '20px',
      border: '1px solid rgba(244,115,42,0.12)',
      boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
    } as React.CSSProperties
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fffbf5', fontFamily: 'Nunito, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        background: 'rgba(255,251,245,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(244,115,42,0.1)',
        padding: '0 2.5rem', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#1a1612' }}>
          Kreatown<span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#f4732a', borderRadius: '50%', marginLeft: '3px', marginBottom: '2px' }}></span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ fontWeight: 800, fontSize: '0.88rem', color: '#9c8878', textDecoration: 'none', padding: '0.45rem 1rem' }}>
            Log in
          </Link>
          <Link href="/auth/register" style={{
            padding: '0.5rem 1.2rem', borderRadius: '100px', fontWeight: 800, fontSize: '0.88rem',
            background: '#f4732a', color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
          }}>
            Start for free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: '#fff0e6', color: '#f4732a',
          fontWeight: 800, fontSize: '0.78rem', padding: '0.35rem 1rem',
          borderRadius: '100px', marginBottom: '1.5rem', letterSpacing: '0.05em'
        }}>
          🏡 Your town. Your fans. Your money.
        </div>
        <h1 style={{
          fontWeight: 900, fontSize: '3.2rem', color: '#1a1612',
          lineHeight: 1.15, margin: '0 0 1.2rem', letterSpacing: '-0.02em'
        }}>
          Build your membership.<br />
          <span style={{ color: '#f4732a' }}>Own your audience.</span>
        </h1>
        <p style={{
          fontSize: '1.1rem', color: '#9c8878', fontWeight: 600,
          lineHeight: 1.7, margin: '0 0 2.5rem', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto'
        }}>
          Kreatown lets creators build paid memberships, share exclusive content, and connect directly with their biggest fans — no algorithm, no middleman.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <Link href="/auth/register" style={{
            padding: '0.85rem 2rem', borderRadius: '100px', fontWeight: 900, fontSize: '1rem',
            background: '#f4732a', color: '#fff', textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(244,115,42,0.35)'
          }}>
            Start building for free 🚀
          </Link>
          <Link href="/topraq" style={{
            padding: '0.85rem 2rem', borderRadius: '100px', fontWeight: 900, fontSize: '1rem',
            border: '2px solid rgba(244,115,42,0.25)', color: '#f4732a', textDecoration: 'none',
            background: '#fff'
          }}>
            See an example →
          </Link>
        </div>

        {/* Social proof */}
        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' as const }}>
          {[
            { value: '500+', label: 'Creators' },
            { value: '$120K+', label: 'Paid out' },
            { value: '12K+', label: 'Members' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: '1.4rem', color: '#f4732a' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9c8878', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Cards */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {CREATORS.map(c => (
            <Link key={c.username} href={`/${c.username}`} style={{ textDecoration: 'none' }}>
              <div style={{ ...s.card, padding: '1.4rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', flexShrink: 0
                  }}>{c.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#1a1612' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9c8878', fontWeight: 600 }}>@{c.username}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#f4732a' }}>{c.members}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>Members</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#16a34a' }}>{c.revenue}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>Per month</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '2rem', color: '#1a1612', textAlign: 'center', margin: '0 0 2.5rem', letterSpacing: '-0.02em' }}>
          Everything you need to <span style={{ color: '#f4732a' }}>thrive</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ ...s.card, padding: '1.4rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>{f.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#1a1612', marginBottom: '0.4rem' }}>{f.title}</div>
              <div style={{ fontSize: '0.82rem', color: '#9c8878', fontWeight: 600, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 6rem', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg,#f4732a,#fbbf24)',
          borderRadius: '28px', padding: '3rem 2rem',
          boxShadow: '0 20px 60px rgba(244,115,42,0.25)'
        }}>
          <h2 style={{ fontWeight: 900, fontSize: '2rem', color: '#fff', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
            Ready to build your town?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '1rem', margin: '0 0 1.8rem' }}>
            Join hundreds of creators already earning on Kreatown.
          </p>
          <Link href="/auth/register" style={{
            display: 'inline-block', padding: '0.85rem 2.2rem', borderRadius: '100px',
            background: '#fff', color: '#f4732a', fontWeight: 900, fontSize: '1rem',
            textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            Start for free 🏡
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(244,115,42,0.1)', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612', marginBottom: '0.3rem' }}>
          Kreatown<span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#f4732a', borderRadius: '50%', marginLeft: '2px', marginBottom: '1px' }}></span>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#9c8878', fontWeight: 600 }}>© 2026 Kreatown. Where creators belong.</div>
      </div>

    </div>
  )
}