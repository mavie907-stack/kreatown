'use client'
import { useState } from 'react'
import { Search, Mail } from 'lucide-react'

const MOCK_MEMBERS = [
  { id: '1', name: 'Jenna Loves',  username: 'jenna_loves', tier: 'gold',   joined: 'Jan 12', revenue: '$19/mo', initials: 'JL', color: 'linear-gradient(135deg,#f4732a,#fbbf24)' },
  { id: '2', name: 'Mike K',       username: 'mikek90',     tier: 'silver', joined: 'Jan 28', revenue: '$9/mo',  initials: 'MK', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)' },
  { id: '3', name: 'Sara Reads',   username: 'sara_reads',  tier: 'gold',   joined: 'Feb 3',  revenue: '$19/mo', initials: 'SR', color: 'linear-gradient(135deg,#34d399,#60a5fa)' },
  { id: '4', name: 'Tom Nova',     username: 'tomnova',     tier: 'free',   joined: 'Feb 14', revenue: 'Free',   initials: 'TN', color: 'linear-gradient(135deg,#f472b6,#f4732a)' },
  { id: '5', name: 'Alex Chen',    username: 'alexchen',    tier: 'gold',   joined: 'Feb 20', revenue: '$19/mo', initials: 'AC', color: 'linear-gradient(135deg,#f4732a,#f472b6)' },
  { id: '6', name: 'Priya Sharma', username: 'priyasharma', tier: 'silver', joined: 'Mar 1',  revenue: '$9/mo',  initials: 'PS', color: 'linear-gradient(135deg,#fbbf24,#34d399)' },
  { id: '7', name: 'James Wilson', username: 'jameswilson', tier: 'free',   joined: 'Mar 8',  revenue: 'Free',   initials: 'JW', color: 'linear-gradient(135deg,#a78bfa,#60a5fa)' },
  { id: '8', name: 'Luna Park',    username: 'lunapark',    tier: 'gold',   joined: 'Mar 10', revenue: '$19/mo', initials: 'LP', color: 'linear-gradient(135deg,#34d399,#fbbf24)' },
]

const TIER_STYLE: Record<string, { bg: string; color: string; label: string; emoji: string }> = {
  gold:   { bg: '#fffbeb', color: '#d97706', label: 'Gold',   emoji: '👑' },
  silver: { bg: '#f1f5f9', color: '#64748b', label: 'Silver', emoji: '⭐' },
  free:   { bg: '#f0fdf4', color: '#16a34a', label: 'Free',   emoji: '🌱' },
}

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'gold' | 'silver' | 'free'>('all')

  const filtered = MOCK_MEMBERS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.username.toLowerCase().includes(search.toLowerCase())
    const matchTier = filter === 'all' || m.tier === filter
    return matchSearch && matchTier
  })

  const card: React.CSSProperties = {
    background: '#fff', borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  const stats = [
    { label: 'Total Members',  value: MOCK_MEMBERS.length,                                  color: '#f4732a' },
    { label: 'Gold Members',   value: MOCK_MEMBERS.filter(m => m.tier === 'gold').length,   color: '#d97706' },
    { label: 'Silver Members', value: MOCK_MEMBERS.filter(m => m.tier === 'silver').length, color: '#64748b' },
    { label: 'Free Members',   value: MOCK_MEMBERS.filter(m => m.tier === 'free').length,   color: '#16a34a' },
  ]

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '900px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: '0 0 0.3rem' }}>Members</h1>
        <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>
          {MOCK_MEMBERS.length} total members
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.9rem', marginBottom: '1.5rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, padding: '1rem 1.2rem' }}>
            <div style={{ fontWeight: 900, fontSize: '1.8rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9c8878' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search members..."
            style={{
              width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.2rem',
              borderRadius: '100px', border: '1px solid rgba(244,115,42,0.2)',
              background: '#fff', fontFamily: 'Nunito, sans-serif', fontSize: '0.85rem',
              fontWeight: 600, outline: 'none', boxSizing: 'border-box', color: '#1a1612',
            }}
          />
        </div>
        {(['all', 'gold', 'silver', 'free'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.45rem 1rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '0.78rem',
            background: filter === f ? '#f4732a' : '#fff',
            color: filter === f ? '#fff' : '#9c8878',
            boxShadow: filter === f ? '0 4px 14px rgba(244,115,42,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
            textTransform: 'capitalize'
          }}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Members List */}
      <div style={{ ...card, overflow: 'hidden' }}>
        {filtered.map((member, i) => {
          const tier = TIER_STYLE[member.tier]
          return (
            <div key={member.id} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.9rem 1.4rem',
              borderBottom: i < filtered.length - 1 ? '1px solid rgba(244,115,42,0.08)' : 'none',
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', background: member.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.72rem', fontWeight: 900, flexShrink: 0
              }}>{member.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1a1612' }}>{member.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>@{member.username}</div>
              </div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem',
                borderRadius: '100px', background: tier.bg, color: tier.color
              }}>
                {tier.emoji} {tier.label}
              </span>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1a1612', minWidth: '60px', textAlign: 'right' }}>{member.revenue}</div>
              <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>Joined {member.joined}</div>
              <button style={{
                width: '32px', height: '32px', borderRadius: '10px', border: 'none',
                background: '#fff0e6', color: '#f4732a', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Mail size={13} />
              </button>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#9c8878', fontWeight: 700 }}>
            No members found
          </div>
        )}
      </div>
    </div>
  )
}