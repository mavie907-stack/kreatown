'use client'
import { useDashboardStats } from '@/hooks'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Crown, FileText } from 'lucide-react'
// removed User import
import Link from 'next/link'

const MOCK_REVENUE = [
  { month: 'Sep', amount: 820 },
  { month: 'Oct', amount: 1240 },
  { month: 'Nov', amount: 1080 },
  { month: 'Dec', amount: 1760 },
  { month: 'Jan', amount: 1580 },
  { month: 'Feb', amount: 2200 },
  { month: 'Mar', amount: 2840 },
]

const MOCK_MEMBERS = [
  { name: '@jenna_loves', tier: 'gold', initials: 'JL', color: 'linear-gradient(135deg,#f4732a,#fbbf24)' },
  { name: '@mikek90', tier: 'silver', initials: 'MK', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)' },
  { name: '@sara_reads', tier: 'gold', initials: 'SR', color: 'linear-gradient(135deg,#34d399,#60a5fa)' },
  { name: '@tomnova', tier: 'free', initials: 'TN', color: 'linear-gradient(135deg,#f472b6,#f4732a)' },
]

const TIER_BADGE: Record<string, { bg: string; color: string }> = {
  gold:   { bg: '#fffbeb', color: '#d97706' },
  silver: { bg: '#f1f5f9', color: '#64748b' },
  free:   { bg: '#f0fdf4', color: '#16a34a' },
}

export default function DashboardOverview({ profile }: { profile: any }) {
  const { stats, loading } = useDashboardStats(profile?.id)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const kpis = [
    { label: 'Monthly Revenue', value: '$2,840', change: '+18%', up: true, icon: <TrendingUp size={16} /> },
    { label: 'Total Members', value: loading ? '...' : String(stats?.total_members ?? 0), change: '+24', up: true, icon: <Users size={16} /> },
    { label: 'Gold Members', value: loading ? '...' : String(stats?.gold_members ?? 0), change: '+3', up: true, icon: <Crown size={16} /> },
    { label: 'Posts Published', value: loading ? '...' : String(stats?.posts_count ?? 0), change: '2 drafts', up: false, icon: <FileText size={16} /> },
  ]

  const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '900px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.8rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: '0 0 0.3rem' }}>
            {greeting()}, {profile?.display_name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · {stats?.new_members_this_week ?? 0} new members this week
          </p>
        </div>
        <Link href="/dashboard/content" style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          background: '#f4732a', color: '#fff', textDecoration: 'none',
          padding: '0.6rem 1.2rem', borderRadius: '100px',
          fontWeight: 900, fontSize: '0.85rem',
          boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
        }}>
          + New Post
        </Link>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map(kpi => (
          <div key={kpi.label} style={{ ...card, padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ color: '#9c8878' }}>{kpi.icon}</span>
              <span style={{
                fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                borderRadius: '100px',
                background: kpi.up ? '#f0fdf4' : '#fef3c7',
                color: kpi.up ? '#16a34a' : '#d97706'
              }}>
                {kpi.up ? '↑' : '↓'} {kpi.change}
              </span>
            </div>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', color: '#1a1612', marginBottom: '0.2rem' }}>{kpi.value}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9c8878' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div style={{ ...card, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612', marginBottom: '1.2rem' }}>Revenue Growth</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={MOCK_REVENUE} barSize={28}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#9c8878' }} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid rgba(244,115,42,0.15)', borderRadius: '12px', fontFamily: 'Nunito', fontWeight: 700 }}
              formatter={(v) => [`$${v}`, 'Revenue']}
            />
            <Bar dataKey="amount" fill="url(#orangeGrad)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4732a" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* New Members */}
      <div style={{ ...card, padding: '1.5rem' }}>
        <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612', marginBottom: '1.2rem' }}>New Members</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {MOCK_MEMBERS.map(member => {
            const badge = TIER_BADGE[member.tier]
            return (
              <div key={member.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.75rem', flexShrink: 0 }}>
                    {member.initials}
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1a1612' }}>{member.name}</span>
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '100px', background: badge.bg, color: badge.color, textTransform: 'capitalize' }}>
                  {member.tier}
                </span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
