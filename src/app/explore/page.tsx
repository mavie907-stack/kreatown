import Link from 'next/link'

const CREATORS = [
  { name: 'Topraq Basyurt', username: 'topraq',   bio: 'Creator, storyteller & community builder 🏡', members: 44,  revenue: '$2,840', emoji: '🎨', color: 'linear-gradient(135deg,#f4732a,#fbbf24)', category: 'Art' },
  { name: 'Jenna Loves',    username: 'jenna',     bio: 'Photography, travel & lifestyle 📸',           members: 128, revenue: '$6,200', emoji: '📸', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)', category: 'Photography' },
  { name: 'MikeNova',       username: 'mikenova',  bio: 'Music producer & beatmaker 🎵',               members: 89,  revenue: '$4,100', emoji: '🎵', color: 'linear-gradient(135deg,#34d399,#60a5fa)', category: 'Music' },
  { name: 'Sara Reads',     username: 'sarareads', bio: 'Book reviews & reading lists 📚',             members: 67,  revenue: '$3,200', emoji: '📚', color: 'linear-gradient(135deg,#f472b6,#a78bfa)', category: 'Books' },
  { name: 'TomNova',        username: 'tomnova',   bio: 'Tech tutorials & coding tips 💻',             members: 210, revenue: '$9,800', emoji: '💻', color: 'linear-gradient(135deg,#fbbf24,#f4732a)', category: 'Tech' },
  { name: 'Luna Park',      username: 'lunapark',  bio: 'Fitness coach & wellness guru 💪',            members: 156, revenue: '$7,400', emoji: '💪', color: 'linear-gradient(135deg,#34d399,#fbbf24)', category: 'Fitness' },
  { name: 'Alex Chen',      username: 'alexchen',  bio: 'Street food & restaurant reviews 🍜',         members: 98,  revenue: '$4,600', emoji: '🍜', color: 'linear-gradient(135deg,#f4732a,#f472b6)', category: 'Food' },
  { name: 'Priya Sharma',   username: 'priya',     bio: 'Fashion designer & style tips 👗',            members: 183, revenue: '$8,500', emoji: '👗', color: 'linear-gradient(135deg,#a78bfa,#60a5fa)', category: 'Fashion' },
  { name: 'James Wilson',   username: 'jameswil',  bio: 'Personal finance & investing 📈',             members: 312, revenue: '$14,200', emoji: '📈', color: 'linear-gradient(135deg,#60a5fa,#34d399)', category: 'Finance' },
]

const CATEGORIES = ['All', 'Art', 'Music', 'Photography', 'Tech', 'Fitness', 'Food', 'Fashion', 'Finance', 'Books']

export default function ExplorePage() {
  const card: React.CSSProperties = {
    background: '#fff', borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fffbf5', fontFamily: 'Nunito, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        background: 'rgba(255,251,245,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(244,115,42,0.1)',
        padding: '0 2.5rem', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: '1.2rem', color: '#1a1612', textDecoration: 'none' }}>
          Kreatown<span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#f4732a', borderRadius: '50%', marginLeft: '3px', marginBottom: '2px' }}></span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/explore" style={{ fontWeight: 800, fontSize: '0.88rem', color: '#9c8878', textDecoration: 'none', padding: '0.45rem 1rem' }}>
  Explore
</Link>
          <Link href="/auth/login" style={{ fontWeight: 800, fontSize: '0.88rem', color: '#9c8878', textDecoration: 'none', padding: '0.45rem 1rem' }}>Log in</Link>
          <Link href="/auth/register" style={{
            padding: '0.5rem 1.2rem', borderRadius: '100px', fontWeight: 800, fontSize: '0.88rem',
            background: '#f4732a', color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
          }}>Start for free</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontWeight: 900, fontSize: '2.2rem', color: '#1a1612', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            Discover creators 🔍
          </h1>
          <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>
            Find your next favorite creator and support their work
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
          <input
            placeholder="Search creators..."
            style={{
              width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: '100px', border: '1px solid rgba(244,115,42,0.2)',
              background: '#fff', fontFamily: 'Nunito, sans-serif', fontSize: '0.9rem',
              fontWeight: 600, outline: 'none', boxSizing: 'border-box', color: '#1a1612',
              boxShadow: '0 4px 16px rgba(244,115,42,0.07)'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {CATEGORIES.map((cat, i) => (
            <span key={cat} style={{
              padding: '0.4rem 1rem', borderRadius: '100px', fontWeight: 800, fontSize: '0.78rem',
              background: i === 0 ? '#f4732a' : '#fff',
              color: i === 0 ? '#fff' : '#9c8878',
              border: '1px solid rgba(244,115,42,0.15)',
              cursor: 'pointer',
              boxShadow: i === 0 ? '0 4px 14px rgba(244,115,42,0.3)' : 'none'
            }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={{ ...card, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          {[
            { value: '500+', label: 'Creators' },
            { value: '12K+', label: 'Members' },
            { value: '$120K+', label: 'Paid out' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#f4732a' }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Creator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {CREATORS.map(creator => (
            <Link key={creator.username} href={`/${creator.username}`} style={{ textDecoration: 'none' }}>
              <div style={{ ...card, padding: '1.4rem', cursor: 'pointer', transition: 'transform 0.15s' }}>
                {/* Avatar + Category */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%', background: creator.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', flexShrink: 0
                  }}>{creator.emoji}</div>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.6rem',
                    borderRadius: '100px', background: '#fff0e6', color: '#f4732a'
                  }}>{creator.category}</span>
                </div>

                {/* Name + Bio */}
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#1a1612', marginBottom: '0.3rem' }}>{creator.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600, marginBottom: '0.3rem' }}>@{creator.username}</div>
                <div style={{ fontSize: '0.8rem', color: '#9c8878', fontWeight: 600, lineHeight: 1.5, marginBottom: '1rem',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                  {creator.bio}
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 900, fontSize: '1rem', color: '#f4732a' }}>{creator.members}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9c8878', marginLeft: '0.3rem' }}>members</span>
                  </div>
                  <div style={{
                    padding: '0.35rem 0.9rem', borderRadius: '100px',
                    background: '#f4732a', color: '#fff', fontWeight: 800, fontSize: '0.75rem',
                    boxShadow: '0 4px 10px rgba(244,115,42,0.3)'
                  }}>
                    Support
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(244,115,42,0.1)', padding: '1.5rem 2rem', textAlign: 'center', marginTop: '3rem' }}>
        <div style={{ fontSize: '0.78rem', color: '#9c8878', fontWeight: 600 }}>© 2026 Kreatown. Where creators belong.</div>
      </div>

    </div>
  )
}