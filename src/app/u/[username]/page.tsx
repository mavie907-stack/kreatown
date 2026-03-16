// src/app/u/[username]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Database } from '@/types/database'
import CreatorHubClient from './CreatorHubClient'

interface PageProps {
  params: { username: string }
}

// Dynamic metadata for SEO / social sharing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio, avatar_url')
    .eq('username', params.username)
    .single()

  if (!profile) return { title: 'Creator not found — Kreatown' }

  return {
    title: `${profile.display_name} (@${params.username}) — Kreatown`,
    description: profile.bio ?? `Support ${profile.display_name} on Kreatown`,
    openGraph: {
      title: `${profile.display_name} on Kreatown`,
      description: profile.bio ?? '',
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
  }
}

export default async function CreatorHubPage({ params }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  // 1. Fetch the creator's profile
  const { data: creator, error: creatorError } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      bio,
      avatar_url,
      cover_url,
      is_creator,
      stripe_account_id,
      created_at
    `)
    .eq('username', params.username)
    .eq('is_creator', true)
    .single()

  if (creatorError || !creator) notFound()

  // 2. Fetch membership tiers
  const { data: tiers } = await supabase
    .from('tiers')
    .select('id, name, description, price_monthly, features, position')
    .eq('creator_id', creator.id)
    .order('position', { ascending: true })

  // 3. Fetch public/free posts (most recent 12)
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      excerpt,
      cover_image,
      tier_required,
      post_type,
      created_at,
      likes_count,
      comments_count
    `)
    .eq('creator_id', creator.id)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(12)

  // 4. Check if current visitor is subscribed (for gated content)
  const { data: { session } } = await supabase.auth.getSession()
  let subscribedTierId: string | null = null

  if (session?.user) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('tier_id, status')
      .eq('subscriber_id', session.user.id)
      .eq('creator_id', creator.id)
      .eq('status', 'active')
      .single()

    subscribedTierId = subscription?.tier_id ?? null
  }

  // 5. Fetch member count (public stat)
  const { count: memberCount } = await supabase
    .from('subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('creator_id', creator.id)
    .eq('status', 'active')

  return (
    <CreatorHubClient
      creator={creator}
      tiers={tiers ?? []}
      posts={posts ?? []}
      memberCount={memberCount ?? 0}
      subscribedTierId={subscribedTierId}
      currentUserId={session?.user?.id ?? null}
    />
  )
}
