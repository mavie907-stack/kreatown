import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User, DashboardStats } from '@/types'

// ─── useUser ─────────────────────────────────────────────────
export function useUser() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { setLoading(false); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      setUser(profile)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// ─── useDashboardStats ───────────────────────────────────────
export function useDashboardStats(creatorId?: string) {
  const [stats, setStats]     = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!creatorId) return

    const fetchStats = async () => {
      // Total members
      const { count: totalMembers } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', creatorId)
        .eq('status', 'active')

      // Gold members
      const { count: goldMembers } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', creatorId)
        .eq('tier_level', 'gold')
        .eq('status', 'active')

      // New members this week
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      const { count: newMembers } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', creatorId)
        .gte('started_at', oneWeekAgo.toISOString())

      // Posts count
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', creatorId)
        .eq('published', true)

      setStats({
        mrr: 0,              // calculated server-side via Stripe
        mrr_change: 0,
        total_members: totalMembers || 0,
        new_members_this_week: newMembers || 0,
        gold_members: goldMembers || 0,
        posts_count: postsCount || 0,
        revenue_history: [],
      })
      setLoading(false)
    }

    fetchStats()
  }, [creatorId])

  return { stats, loading }
}

// ─── useCreatorProfile ───────────────────────────────────────
export function useCreatorProfile(username: string) {
  const [creator, setCreator] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!username) return

    const fetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_creator', true)
        .single()

      setCreator(data)
      setLoading(false)
    }

    fetch()
  }, [username])

  return { creator, loading }
}
