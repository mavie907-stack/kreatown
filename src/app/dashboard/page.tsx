// src/app/dashboard/page.tsx
'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDashboardStats } from '@/hooks'

const TIER_COLORS: Record<string, string> = {
  palace: 'text-palace-light bg-palace/12 border-palace/20',
  gold:   'text-yellow-300 bg-yellow-400/10 border-yellow-400/20',
  silver: 'text-slate-300 bg-slate-400/10 border-slate-400/20',
  free:   'text-emerald bg-emerald/10 border-emerald/20',
}
const TIER_EMOJIS: Record<string, string> = { palace: '🏯', gold: '👑', silver: '⭐', free: '🌱' }

export default function DashboardPage() {
  const { stats, recentMembers, loading } = useDashboardStats()
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const membersChartRef = useRef<HTMLCanvasElement>(null)
  const tierChartRef    = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!stats) return
    import('chart.js/auto').then(({ default: Chart }) => {
      Chart.defaults.color = 'rgba(255,255,255,0.35)'
      Chart.defaults.borderColor = 'rgba(255,255,255,0.07)'

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
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', callbacks: { label: ctx => ' $' + ctx.parsed.y.toLocaleString() } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (Number(v)/1000).toFixed(1) + 'k' } } } }
        })
      }

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
    })
  }, [stats])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-white/30 text-sm font-mono-kt animate-pulse">Loading your town...</div>
    </div>
  )

  if (!stats) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-white/30 text-sm font-mono-kt">No data yet — invite your first members! 🏡</div>
    </div>
  )

  const revenueChange = stats.monthly_revenue_prev > 0
    ? Math.round(((stats.monthly_revenue - stats.monthly_revenue_prev) / stats.monthly_revenue_prev) * 100)
    : 0
  const membersChange = stats.total_members - stats.total_members_prev

  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8 text-white">

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Monthly Revenue', value: '$' + stats.monthly_revenue.toLocaleString(), change: revenueChange >= 0 ? `↑ ${revenueChange}% vs last month` : `↓ ${Math.abs(revenueChange)}% vs last month`, up: revenueChange >= 0, icon: '💰', accent: 'text-yellow-300' },
          { label: 'Total Members',   value: stats.total_members.toString(),               change: membersChange >= 0 ? `↑ ${membersChange} new this month` : `↓ ${Math.abs(membersChange)} this month`, up: membersChange >= 0, icon: '👥', accent: 'text-orange' },
          { label: 'Palace Members',  value: stats.palace_members.toString(),              change: '🏯 top tier',  up: true, icon: '🏯', accent: 'text-palace-light' },
          { label: 'Avg / Member',    value: '$' + stats.avg_revenue_per_member,           change: 'per month',    up: true, icon: '📈', accent: 'text-emerald' },
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
          </div>
          <div className="h-44"><canvas ref={revenueChartRef} /></div>
        </div>
        <div className="bg-dark-2 border border-white/7 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-display font-bold text-sm text-white">Member growth</div>
              <div className="text-xs text-white/30 mt-0.5">Cumulative · Last 6 months</div>
            </div>
          </div>
          <div className="h-44"><canvas ref={membersChartRef} /></div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-4">
        <div className="space-y-4">

          {/* Members table */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
              <div className="font-display font-bold text-sm text-white">Recent members</div>
              <Link href="/dashboard/members" className="text-xs text-orange hover:opacity-70 transition-opacity">See all {stats.total_members} →</Link>
            </div>
            {recentMembers.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/30 text-sm">No members yet — share your town! 🏡</div>
            ) : (
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
                    {recentMembers.map(m => (
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
                          {m.revenue > 0 ? '$' + m.revenue.toLocaleString() : '—'}
                        </td>
                        <td className="px-5 py-3 font-mono-kt text-xs text-white/30">
                          {new Date(m.joined).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tier breakdown */}
          <div className="bg-dark-2 border border-white/7 rounded-2xl p-5 grid grid-cols-2 gap-6 items-center">
            <div>
              <div className="font-display font-bold text-sm text-white mb-1">Tier breakdown</div>
              <div className="text-xs text-white/30 mb-4">{stats.total_members} total members</div>
              <div className="space-y-2.5">
                {(['palace','gold','silver','free'] as const).map(tier => {
                  const count = stats.tier_breakdown[tier]
                  return (
                    <div key={tier} className="flex justify-between text-xs">
                      <span className={TIER_COLORS[tier].split(' ')[0]}>{TIER_EMOJIS[tier]} {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                      <span className="text-white/50 font-mono-kt">{count} members</span>
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
          <div className="bg-dark-2 border border-white/7 rounded-2xl p-5">
            <div className="font-display font-bold text-sm text-white mb-1">🏡 Your Town</div>
            <div className="text-xs text-white/40 mt-0.5 mb-4">{stats.total_members} members · Keep growing!</div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/40">Member count</span>
              <span className="text-yellow-300 font-mono-kt">{stats.total_members}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-300"
                style={{ width: Math.min((stats.total_members / 1000) * 100, 100) + '%' }} />
            </div>
            <div className="mt-3 text-xs text-white/40">
              Next level at 1,000 members 🏡
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
