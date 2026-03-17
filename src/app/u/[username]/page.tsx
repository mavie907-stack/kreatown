// @ts-nocheck
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import CreatorHubClient from './CreatorHubClient'

interface PageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: `@${params.username} — KreaTown` }
}

export default async function CreatorHubPage({ params }: PageProps) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: creator } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!creator) notFound()

  const { data: tiers } = await supabase
    .from('tiers')
    .select('*')
    .eq('creator_id', creator.id)
    .order('position', { ascending: true })

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('creator_id', creator.id)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(12)

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
      subscribedTierId={null}
      currentUserId={null}
    />
  )
}
