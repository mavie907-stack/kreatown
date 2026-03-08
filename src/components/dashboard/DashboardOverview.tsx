'use client'
import { useDashboardStats } from '@/hooks'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Crown, FileText, Plus } from 'lucide-react'
import type { User } from '@/types'
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
  { name: '@jenna_loves',  tier: 'gold',   initials: 'JL', color: 'from-orange-400 to-yellow-400' },
  { name: '@mikek90',      tier: 'silver', initials: 'MK', color: 'from-blue-400 to-purple-400'  },
  { name: '@sara_reads',   tier: 'gold',   initials: 'SR', color: 'from-emerald-400 to-blue-400' },
  { name: '@tomnova',      tier: 'free',   initials: 'TN', color: 'from-pink-400 to-orange-400'  },
]

const TIER_BADGE: Record<string, string> = {
  gold:   'bg-amber-50 text-amber-600',
  silver: 'bg-slate-100 text-slate-500',
  free:   'bg-green-50 text-green-600',
}

const TIER_EMOJI: Record<string, string> = {
  gold: '👑', silver: '⭐', free: '🌱',
}

export default function DashboardOverview({ profile }: { profile: User }) {
  const { stats, loading } = useDashboardStats(profile?.id)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const kpis = [
    {
      label: 'Monthly Revenue',
      value: '$2,840',
      change: '+18%',
      up: true,
      icon: <TrendingUp size={16} />,
    },
    {
      label: 'Total Members',
      value: loading ? '...' : String(stats?.total_members ?? 312),
      change: '+24',
      up: true,
      icon: <Users size={16} />,
    },
    {
      label: 'Gold Members',
      value: loading ? '...' : String(stats?.gold_members ?? 48),
      change: '+3',
      up: true,
      icon: <Crown size={16} />,
    },
    {
      label: 'Posts Published',
      value: loading ? '...' : String(stats?.posts_count ?? 67),
      change: '2 drafts',
      up: false,
      icon: <FileText size={16} />,
    },
  ]

  return (
    <div className="p-6 max-w-5xl">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black text-brand-brown tracking-tight">
            {greeting()}, {profile?.display_name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-brand-muted font-semibold mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {stats && ` · ${stats.new_members_this_week} new members this week`}
          </p>
        </div>
        <Link href="/dashboard/content/new" className="btn-primary text-sm py-2.5 px-4">
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-brand-muted">{k.icon}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full font-mono
                ${k.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {k.up ? '↑' : '↓'} {k.change}
              </span>
            </div>
            <div className="font-display text-2xl font-black text-brand-brown tracking-tight">
              {k.value}
            </div>
            <div className="text-xs text-brand-muted font-bold uppercase tracking-wider mt-0.5">
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Revenue Chart */}
        <div className="card p-5 lg:col-span-3">
          <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-4">
            Revenue Growth
          </h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={MOCK_REVENUE} barSize={28}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9c8878', fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid rgba(244,115,42,0.15)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  boxShadow: '0 4px 24px rgba(244,115,42,0.08)',
                }}
                formatter={(v: number) => [`$${v}`, 'Revenue']}
              />
              <Bar
                dataKey="amount"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f4732a" />
                  <stop offset="100%" stopColor="rgba(244,115,42,0.3)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Members */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              New Members
            </h3>
            <Link href="/dashboard/members" className="text-xs font-bold text-brand-orange hover:underline">
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {m.initials}
                </div>
                <span className="text-sm font-bold text-brand-brown flex-1 truncate">{m.name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TIER_BADGE[m.tier]}`}>
                  {TIER_EMOJI[m.tier]} {m.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
