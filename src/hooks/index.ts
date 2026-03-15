// src/hooks/useUser.ts
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

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

// ─────────────────────────────────────────────
// src/hooks/useProfile.ts
// ─────────────────────────────────────────────
// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase'
// import type { Profile } from '@/types'
//
// export function useProfile(username: string) {
//   const [profile, setProfile] = useState<Profile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()
//
//   useEffect(() => {
//     if (!username) return
//     supabase
//       .from('profiles')
//       .select('*')
//       .eq('username', username)
//       .single()
//       .then(({ data }) => { setProfile(data); setLoading(false) })
//   }, [username])
//
//   return { profile, loading }
// }

// ─────────────────────────────────────────────
// src/hooks/useMembers.ts
// ─────────────────────────────────────────────
// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase'
// import type { Member } from '@/types'
//
// export function useMembers(creatorId: string) {
//   const [members, setMembers] = useState<Member[]>([])
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()
//
//   useEffect(() => {
//     if (!creatorId) return
//     supabase
//       .from('subscriptions')
//       .select('*, profile:profiles(username, full_name, avatar_url)')
//       .eq('creator_id', creatorId)
//       .eq('status', 'active')
//       .order('started_at', { ascending: false })
//       .then(({ data }) => { setMembers(data ?? []); setLoading(false) })
//   }, [creatorId])
//
//   return { members, loading }
// }

// ─────────────────────────────────────────────
// src/hooks/usePosts.ts
// ─────────────────────────────────────────────
// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase'
// import type { Post, TierLevel } from '@/types'
//
// export function usePosts(creatorId: string, userTier: TierLevel = 'free') {
//   const [posts, setPosts] = useState<Post[]>([])
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()
//
//   useEffect(() => {
//     if (!creatorId) return
//     supabase
//       .from('posts')
//       .select('*')
//       .eq('creator_id', creatorId)
//       .order('published_at', { ascending: false })
//       .then(({ data }) => { setPosts(data ?? []); setLoading(false) })
//   }, [creatorId])
//
//   return { posts, loading }
// }

// ─────────────────────────────────────────────
// src/hooks/useSubscription.ts
// ─────────────────────────────────────────────
// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase'
// import { useUser } from './useUser'
// import type { Subscription } from '@/types'
//
// export function useSubscription(creatorId: string) {
//   const { user } = useUser()
//   const [subscription, setSubscription] = useState<Subscription | null>(null)
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()
//
//   useEffect(() => {
//     if (!user || !creatorId) { setLoading(false); return }
//     supabase
//       .from('subscriptions')
//       .select('*')
//       .eq('user_id', user.id)
//       .eq('creator_id', creatorId)
//       .eq('status', 'active')
//       .single()
//       .then(({ data }) => { setSubscription(data); setLoading(false) })
//   }, [user, creatorId])
//
//   return { subscription, loading, tier: subscription?.tier ?? 'free' }
// }

// ─────────────────────────────────────────────
// src/hooks/useDashboardStats.ts
// ─────────────────────────────────────────────
// 'use client'
// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase'
// import type { DashboardStats } from '@/types'
//
// export function useDashboardStats(creatorId: string) {
//   const [stats, setStats] = useState<DashboardStats | null>(null)
//   const [loading, setLoading] = useState(true)
//   const supabase = createClient()
//
//   useEffect(() => {
//     if (!creatorId) return
//     // Call a Supabase RPC or aggregate query
//     supabase.rpc('get_dashboard_stats', { p_creator_id: creatorId })
//       .then(({ data }) => { setStats(data); setLoading(false) })
//   }, [creatorId])
//
//   return { stats, loading }
// }
