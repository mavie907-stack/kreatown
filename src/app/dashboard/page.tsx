'use client'

import { useUser } from '@/hooks'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()// src/app/dashboard/page.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { formatRevenue, formatMemberCount, timeAgo } from '@/lib/utils'
import type { DashboardStats } from '@/types'

// ── MOCK DATA (replace with real Supabase queries) ──
const MOCK_STATS: DashboardStats = {
  monthly_revenue:      2840,
  monthly_revenue_prev: 2406,
  total_members:        44,
  total_members_prev:   38,
  palace_members:       7,
  avg_revenue_per_member: 64,
  revenue_by_month: [
    { month: 'Oct', amount: 820  },
    { month: 'Nov', amount: 1100 },
    { month: 'Dec', amount: 1450 },
    { month: 'Jan', amount: 1890 },
    { month: 'Feb', amount: 2400 },
    { month: 'Mar', amount: 2840 },
  ],
  members_by_month: [
    { month: 'Oct', count: 11 },
    { month: 'Nov', count: 18 },
    { month: 'Dec', count: 24 },
    { month: 'Jan', count: 31 },
    { month: 'Feb', count: 38 },
    { month: 'Mar', count: 44 },
  ],
  tier_breakdown: { free: 10, silver: 15, gold: 12, palace: 7 },
}

const RECENT_MEMBERS = [
  { name: 'Elif Yıldız',  handle: '@elif',      tier: 'palace', revenue: 1490, joined: '2026-03-12', emoji: '🌟' },
  { name: 'Ahmet Kaya',   handle: '@ahmetkaya', tier: 'gold',   revenue: 590,  joined: '2026-03-10', emoji: '🌻' },
  { name: 'Sara Demir',   handle: '@sarademir', tier: 'silver', revenue: 290,  joined: '2026-03-08', emoji: '📸' },
  { name: 'Can Öztürk',   handle: '@canoz',     tier: 'free',   revenue: 0,    joined: '2026-03-07', emoji: '🌱' },
  { name: 'Zeynep Al',    handle: '@zeynep',    tier: 'palace', revenue: 1490, joined: '2026-03-05', emoji: '💫' },
]

const ACTIVITY = [
  { icon: '🏯', type: 'palace', text: 'Elif Yıldız joined Palace tier', time: '2 hours ago' },
  { icon: '💬', type: 'msg',    text: 'Ahmet Kaya sent you a message',  time: '5 hours ago' },
  { icon: '❤️', type: 'like',   text: 'Your post got 142 likes',        time: 'Yesterday' },
  { icon: '🌱', type: 'free',   text: 'Can Öztürk joined as Free member', time: 'Yesterday' },
  { icon: '🏆', type: 'rank',   text: 'You moved to #3 on leaderboard',  time: '2 days ago' },
]

const TIER_COLORS: Record<string, string> = {
  palace: 'text-palace-light bg-palace/12 border-palace/20',
  gold:   'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
  silver: 'text-slate-300 bg-slate-400/10 border-slate-400/20',
  free:   'text-emerald bg-emerald/10 border-emerald/20',
}
const TIER_EMOJIS: Record<string, string> = { palace: '🏯', gold: '👑', silver: '⭐', free: '🌱' }

export default function DashboardPage() {
  const stats = MOCK_STATS
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const membersChartRef = useRef<HTMLCanvasElement>(null)
  const tierChartRef    = useRef<HTMLCanvasElement>(null)
  const [chartsLoaded, setChartsLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    import('chart.js/auto').then(({ default: Chart }) => {
      Chart.defaults.color = 'rgba(255,255,255,0.35)'
      Chart.defaults.borderColor = 'rgba(255,255,255,0.07)'

      // Revenue chart
      if (revenueChartRef.current) {
        const ctx = revenueChartRef.current.getContext('2d')!
        const grad = ctx.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0, 'rgba(201,149,42,0.3)')
        grad.addColorStop(1, 'rgba(201,149,42,0)')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: stats.revenue_by_month.map(d => d.month),
            datasets: [{ data: stats.revenue_by_month.map(d => d.amount), borderColor: '#c9952a', backgroundColor: grad, borderWidth: 2, fill: true, tension: 0.4, pointBackgroundColor: '#c9952a', pointRadius: 3 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', callbacks: { label: ctx => ' ₺' + ctx.parsed.y.toLocaleString() } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '₺' + (Number(v)/1000).toFixed(1) + 'k' } } } }
        })
      }

      // Members chart
      if (membersChartRef.current) {
        const ctx = membersChartRef.current.getContext('2d')!
        const grad = ctx.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0, 'rgba(124,92,191,0.3)')
        grad.addColorStop(1, 'rgba(124,92,191,0)')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: stats.members_by_month.map(d => d.month),
            datasets: [{ data: stats.members_by_month.map(d => d.count), borderColor: '#7c5cbf', backgroundColor: grad, borderWidth: 2, fill: true, tension: 0.4, pointBackgroundColor: '#7c5cbf', pointRadius: 3 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', callbacks: { label: ctx => ' ' + ctx.parsed.y + ' members' } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)' } } } }
        })
      }

      // Tier donut
      if (tierChartRef.current) {
        const ctx = tierChartRef.current.getContext('2d')!
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Palace', 'Gold', 'Silver', 'Free'],
            datasets: [{ data: [stats.tier_breakdown.palace, stats.tier_breakdown.gold, stats.tier_breakdown.silver, stats.tier_breakdown.free], backgroundColor: ['rgba(124,92,191,0.8)','rgba(201,149,42,0.8)','rgba(138,163,181,0.7)','rgba(45,171,128,0.7)'], borderColor: '#161310', borderWidth: 2 }]
          },
          options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16' } } }
        })
      }
      setChartsLoaded(true)
    })
  }, [])

  const revenueChange = Math.round(((stats.monthly_revenue - stats.monthly_revenue_prev) / stats.monthly_revenue_prev) * 100)
  const membersChange = stats.total_members - stats.total_members_prev

  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8 text-white">

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Monthly Revenue', value: '₺' + stats.monthly_revenue.toLocaleString('tr-TR'), change: `↑ ${revenueChange}% vs last month`, up: true,  icon: '💰', accent: 'text-yellow-300' },
          { label: 'Total Members',   value: stats.total_members.toString(),                        change: `↑ ${membersChange} new this month`, up: true,  icon: '👥', accent: 'text-orange' },
          { label: 'Palace Members',  value: stats.palace_members.toString(),                       change: '↑ 2 new this month',               up: true,  icon: '🏯', accent: 'text-palace-light' },
          { label: 'Avg / Member',    value: '₺' + stats.avg_revenue_per_member,                  change: '↑ ₺8 vs last month',               up: true,  icon: '📈', accent: 'text-emerald' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-dark-2 border border-white/7 rounded-2xl p-4 relative overflow-hidden hover:border-white/12 transition-colors">
            <div className="text-[10px] font-mono-kt text-white/30 uppercase tracking-widest mb-2">{kpi.label}</div>
            <div className={`font-display font-bold text-2xl md:text-3xl ${kpi.accent}`}>{kpi.value}</div>
            <div className={`text-xs mt-1 ${kpi.up ? 'text-emerald' : 'text-red-400'}`}>{kpi.change}</div>
            <div className="absolute bottom-3 right-3 text-2xl opacity-15">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-2 border border-white/7 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-display font-bold text-sm text-white">Revenue over time</div>
              <div className="text-xs text-white/30 mt-0.5">Monthly earnings · Last 6 months</div>
            </div>
            <span className="text-xs bg-emerald/12 text-emerald border border-emerald/20 px-2 py-0.5 rounded-full">↑ {revenueChange}% MoM</span>
          </div>
          <div className="h-44"><canvas ref={revenueChartRef} /></div>
        </div>
        <div className="bg-dark-2 border border-white/7 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-display font-bold text-sm text-white">Member growth</div>
              <div className="text-xs text-white/30 mt-0.5">Cumulative · Last 6 months</div>
            </div>
            <span className="text-xs bg-emerald/12 text-emerald border border-emerald/20 px-2 py-0.5 rounded-full">↑ 16% MoM</span>
          </div>
          <div className="h-44"><canvas ref={membersChartRef} /></div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-4">

        {/* LEFT: Members + Tier breakdown */}
        <div className="space-y-4">

          {/* Members table */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
              <div className="font-display font-bold text-sm text-white">Recent members</div>
              <Link href="/dashboard/members" className="text-xs text-orange hover:opacity-70 transition-opacity">See all 44 →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/7">
                    {['Member','Tier','Revenue','Joined'].map(h => (
                      <th key={h} className="text-left text-[10px] font-mono-kt text-white/25 uppercase tracking-widest px-5 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_MEMBERS.map(m => (
                    <tr key={m.handle} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-dark-3 flex items-center justify-center text-sm">{m.emoji}</div>
                          <div>
                            <div className="text-sm text-white">{m.name}</div>
                            <div className="text-xs text-white/30">{m.handle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${TIER_COLORS[m.tier]}`}>
                          {TIER_EMOJIS[m.tier]} {m.tier.charAt(0).toUpperCase() + m.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono-kt text-xs text-yellow-300">
                        {m.revenue > 0 ? '₺' + m.revenue.toLocaleString('tr-TR') : '—'}
                      </td>
                      <td className="px-5 py-3 font-mono-kt text-xs text-white/30">
                        {new Date(m.joined).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier breakdown */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl p-5 grid grid-cols-2 gap-6 items-center">
            <div>
              <div className="font-display font-bold text-sm text-white mb-1">Tier breakdown</div>
              <div className="text-xs text-white/30 mb-4">{stats.total_members} total members</div>
              <div className="space-y-2.5">
                {(['palace','gold','silver','free'] as const).map(tier => {
                  const count = stats.tier_breakdown[tier]
                  const revs = { palace: count * 1490, gold: count * 590, silver: count * 290, free: 0 }
                  return (
                    <div key={tier} className="flex justify-between text-xs">
                      <span className={TIER_COLORS[tier].split(' ')[0]}>{TIER_EMOJIS[tier]} {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                      <span className="text-white/50 font-mono-kt">{count} · ₺{revs[tier].toLocaleString('tr-TR')}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="h-36"><canvas ref={tierChartRef} /></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* House level */}
          <div className="bg-gradient-to-br from-palace/12 to-yellow-400/8 border border-palace/25 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-12">🏯</div>
            <div className="text-[10px] font-mono-kt text-palace-light uppercase tracking-widest mb-1">Current residence</div>
            <div className="font-display font-bold text-base text-white">🏯 Hilltop Palace</div>
            <div className="text-xs text-white/40 mt-0.5 mb-4">Level 5 · All rooms unlocked</div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/40">Progress to Legend</span>
              <span className="text-palace-light font-mono-kt">44 / 50,000</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-palace-light to-yellow-300" style={{ width: '0.088%' }} />
            </div>
            <div className="mt-3 flex items-center gap-2 bg-white/4 rounded-lg px-3 py-2 text-xs text-white/50">
              🌟 Next unlock: <span className="text-yellow-300 font-medium">Legend Hall</span> at 50K members
            </div>
          </div>

          {/* Payout */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/7">
              <div className="font-display font-bold text-sm text-white">This month's payout</div>
              <span className="text-[10px] text-white/25 font-mono-kt">Paid Mar 28</span>
            </div>
            <div className="text-xs text-white/30 mb-1">Gross revenue</div>
            <div className="font-display font-bold text-2xl text-yellow-300 mb-4">₺2,840</div>
            <div className="space-y-2">
              {[
                { label: 'Palace tier (7 × ₺1,490)', value: '+₺10,430', pos: true },
                { label: 'Gold tier (12 × ₺590)',    value: '+₺7,080',  pos: true },
                { label: 'Silver tier (15 × ₺290)',  value: '+₺4,350',  pos: true },
                null,
                { label: 'KreaTown fee (8%)',         value: '−₺1,749', pos: false },
                { label: 'Processing fee',            value: '−₺212',   pos: false },
                null,
                { label: 'Net payout',               value: '₺19,899', pos: true, bold: true },
              ].map((row, i) =>
                row === null
                  ? <div key={i} className="h-px bg-white/10" />
                  : (
                    <div key={row.label} className={`flex justify-between text-xs ${row.bold ? 'font-medium' : ''}`}>
                      <span className={row.bold ? 'text-white' : 'text-white/40'}>{row.label}</span>
                      <span className={`font-mono-kt ${row.bold ? 'text-yellow-300' : row.pos ? 'text-emerald' : 'text-red-400'}`}>{row.value}</span>
                    </div>
                  )
              )}
            </div>
            <button className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-[#1a0c00] text-sm font-medium hover:opacity-90 transition-opacity">
              💳 Request payout — ₺19,899
            </button>
          </div>

          {/* Activity */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
              <div className="font-display font-bold text-sm text-white">Town activity</div>
              <button className="text-xs text-orange hover:opacity-70 transition-opacity">See all</button>
            </div>
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-white/4 hover:bg-white/2 transition-colors last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  { palace: 'bg-palace/15', msg: 'bg-yellow-400/12', like: 'bg-orange/12', free: 'bg-emerald/10', rank: 'bg-palace/15' }[a.type]
                }`}>{a.icon}</div>
                <div>
                  <div className="text-sm text-white/70 leading-snug" dangerouslySetInnerHTML={{ __html: a.text.replace(/\d+/g, n => `<strong class="text-white">${n}</strong>`) }} />
                  <div className="text-[11px] text-white/25 mt-0.5 font-mono-kt">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-muted font-bold text-sm animate-pulse">
          ⏳ Loading your town...
        </p>
      </div>
    )
  }

  return <DashboardOverview profile={user} />
}
