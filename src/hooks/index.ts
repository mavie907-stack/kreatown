// @ts-nocheck
// src/hooks/index.ts
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { DashboardStats } from '@/types'

// ─── useUser ────────────────────────────────────────────────
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// ─── useDashboardStats ──────────────────────────────────────
export function useDashboardStats() {
  const { user } = useUser()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMembers, setRecentMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    async function fetchStats() {
      try {
        // 1. Fetch all active memberships for this creator
        const { data: memberships } = await supabase
          .from('memberships')
          .select('*, fan:profiles!memberships_fan_id_fkey(id, username, display_name, avatar_url)')
          .eq('creator_id', user!.id)
          .eq('status', 'active')
          .order('started_at', { ascending: false })

        const members = memberships ?? []

        // 2. Fetch creator's tiers to get prices
        const { data: tiers } = await supabase
          .from('tiers')
          .select('*')
          .eq('creator_id', user!.id)

        const tierPrices: Record<string, number> = {}
        ;(tiers ?? []).forEach((t: any) => {
          tierPrices[t.level] = t.price / 100 // cents to dollars
        })

        // 3. Calculate tier breakdown
        const tierBreakdown = { free: 0, silver: 0, gold: 0, palace: 0 }
        members.forEach((m: any) => {
          const level = m.tier_level as keyof typeof tierBreakdown
          if (level in tierBreakdown) tierBreakdown[level]++
        })

        // 4. Calculate monthly revenue
        let monthlyRevenue = 0
        members.forEach((m: any) => {
          monthlyRevenue += tierPrices[m.tier_level] ?? 0
        })

        // 5. Members by month (last 6 months)
        const now = new Date()
        const membersByMonth = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
          const month = d.toLocaleString('en', { month: 'short' })
          const count = members.filter((m: any) => {
            const joined = new Date(m.started_at)
            return joined <= new Date(d.getFullYear(), d.getMonth() + 1, 0)
          }).length
          return { month, count }
        })

        // 6. Revenue by month (estimate based on member growth)
        const revenueByMonth = membersByMonth.map(m => ({
          month: m.month,
          amount: Math.round(m.count * (monthlyRevenue / Math.max(members.length, 1)))
        }))

        // 7. Prev month stats
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const prevMembers = members.filter((m: any) => new Date(m.started_at) <= oneMonthAgo)
        const prevRevenue = Math.round(prevMembers.length * (monthlyRevenue / Math.max(members.length, 1)))

        // 8. Recent members (last 5)
        const recent = members.slice(0, 5).map((m: any) => ({
          name: m.fan?.display_name ?? 'Unknown',
          handle: '@' + (m.fan?.username ?? 'unknown'),
          tier: m.tier_level,
          revenue: tierPrices[m.tier_level] ?? 0,
          joined: m.started_at,
          emoji: { free: '🌱', silver: '⭐', gold: '👑', palace: '🏯' }[m.tier_level as string] ?? '🌱'
        }))

        setStats({
          monthly_revenue: monthlyRevenue,
          monthly_revenue_prev: prevRevenue,
          total_members: members.length,
          total_members_prev: prevMembers.length,
          palace_members: tierBreakdown.palace,
          avg_revenue_per_member: members.length > 0 ? Math.round(monthlyRevenue / members.length) : 0,
          revenue_by_month: revenueByMonth,
          members_by_month: membersByMonth,
          tier_breakdown: tierBreakdown,
        })
        setRecentMembers(recent)
      } catch (err) {
        console.error('Dashboard stats error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  return { stats, recentMembers, loading }
}
