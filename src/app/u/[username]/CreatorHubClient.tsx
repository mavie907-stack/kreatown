'use client'

// src/app/u/[username]/CreatorHubClient.tsx
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { CreatorProfile, Tier, Post } from '@/types/creator'
import PostCard from '@/components/creator/PostCard'
import TierCard from '@/components/creator/TierCard'
import SubscribeModal from '@/components/creator/SubscribeModal'

interface Props {
  creator: CreatorProfile
  tiers: Tier[]
  posts: Post[]
  memberCount: number
  subscribedTierId: string | null
  currentUserId: string | null
}

type Tab = 'posts' | 'about' | 'tiers'

export default function CreatorHubClient({
  creator,
  tiers,
  posts,
  memberCount,
  subscribedTierId,
  currentUserId,
}: Props) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [activeTab, setActiveTab] = useState<Tab>('posts')
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const isOwner = currentUserId === creator.id
  const isSubscribed = subscribedTierId !== null

  const freePosts = posts.filter(p => p.tier_required === 'free')
  const lockedPosts = posts.filter(p => p.tier_required !== 'free')

  const handleSubscribe = (tier: Tier) => {
    if (!currentUserId) {
      router.push('/auth/login?redirect=/u/' + creator.username)
      return
    }
    setSelectedTier(tier)
    setIsSubscribeOpen(true)
  }

  const handleLike = async (postId: string) => {
    if (!currentUserId) {
      router.push('/auth/login')
      return
    }
    if (likedPosts.has(postId)) return
    setLikedPosts(prev => new Set([...prev, postId]))
    await supabase.from('post_likes').insert({ post_id: postId, user_id: currentUserId })
  }

  const lowestTierPrice = tiers.length > 0
    ? Math.min(...tiers.map(t => t.price_monthly))
    : null

  return (
    <div className="min-h-screen" style={{ background: '#0e0c0a', color: '#f0ece4' }}>

      {/* ── Cover image ── */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1410 0%, #2a1f0e 50%, #1a1214 100%)' }}>
        {creator.cover_url && (
          <Image
            src={creator.cover_url}
            alt="Cover"
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, #0e0c0a 100%)' }} />

        {isOwner && (
          <Link
            href="/dashboard/settings"
            className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(244,115,42,0.4)', color: '#f4732a', background: 'rgba(14,12,10,0.7)' }}
          >
            Edit profile
          </Link>
        )}
      </div>

      {/* ── Profile header ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 mb-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 flex-shrink-0"
            style={{ borderColor: '#0e0c0a', background: '#2a2420' }}>
            {creator.avatar_url ? (
              <Image src={creator.avatar_url} alt={creator.display_name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-semibold"
                style={{ background: 'linear-gradient(135deg, #f4732a, #7c5cbf)', color: '#fff' }}>
                {creator.display_name[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Name + stats */}
          <div className="flex-1 pb-1">
            <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
              {creator.display_name}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#9c8878' }}>@{creator.username}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm" style={{ color: '#f5d58a' }}>
                <span className="font-semibold">{memberCount.toLocaleString()}</span>
                <span className="ml-1" style={{ color: '#9c8878' }}>members</span>
              </span>
              <span className="text-sm" style={{ color: '#9c8878' }}>
                {posts.length} posts
              </span>
              {lowestTierPrice !== null && (
                <span className="text-sm" style={{ color: '#9c8878' }}>
                  from <span style={{ color: '#f4732a' }}>${lowestTierPrice}/mo</span>
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          {!isOwner && (
            <div className="flex gap-2 pb-1">
              {isSubscribed ? (
                <span className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: 'rgba(245,213,138,0.1)', color: '#f5d58a', border: '1px solid rgba(245,213,138,0.3)' }}>
                  ✓ Subscribed
                </span>
              ) : (
                <button
                  onClick={() => tiers[0] && handleSubscribe(tiers[0])}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: '#f4732a', color: '#fff' }}
                >
                  {lowestTierPrice !== null ? `Join from $${lowestTierPrice}/mo` : 'Subscribe'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        {creator.bio && (
          <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: '#c4b5a5' }}>
            {creator.bio}
          </p>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {(['posts', 'tiers', 'about'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 text-sm capitalize transition-colors relative"
              style={{
                color: activeTab === tab ? '#f4732a' : '#9c8878',
                fontWeight: activeTab === tab ? 600 : 400,
              }}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: '#f4732a' }} />
              )}
            </button>
          ))}
        </div>

        {/* ── Posts tab ── */}
        {activeTab === 'posts' && (
          <div className="pb-16">
            {posts.length === 0 ? (
              <div className="text-center py-16" style={{ color: '#9c8878' }}>
                <p className="text-lg mb-2">No posts yet</p>
                {isOwner && (
                  <Link href="/dashboard/content"
                    className="text-sm underline" style={{ color: '#f4732a' }}>
                    Create your first post →
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Free posts */}
                {freePosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {freePosts.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isLocked={false}
                        onLike={() => handleLike(post.id)}
                        isLiked={likedPosts.has(post.id)}
                        creatorUsername={creator.username}
                      />
                    ))}
                  </div>
                )}

                {/* Locked posts — show blurred previews */}
                {lockedPosts.length > 0 && !isSubscribed && !isOwner && (
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40 pointer-events-none select-none blur-[2px]">
                      {lockedPosts.slice(0, 4).map(post => (
                        <PostCard
                          key={post.id}
                          post={post}
                          isLocked={true}
                          onLike={() => {}}
                          isLiked={false}
                          creatorUsername={creator.username}
                        />
                      ))}
                    </div>
                    {/* Unlock gate */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
                      style={{ background: 'rgba(14,12,10,0.6)' }}>
                      <div className="text-center p-6 rounded-2xl border"
                        style={{ background: 'rgba(20,16,12,0.9)', borderColor: 'rgba(244,115,42,0.25)' }}>
                        <p className="text-lg font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {lockedPosts.length} exclusive {lockedPosts.length === 1 ? 'post' : 'posts'} locked
                        </p>
                        <p className="text-sm mb-4" style={{ color: '#9c8878' }}>
                          Subscribe to unlock all content from {creator.display_name}
                        </p>
                        <button
                          onClick={() => tiers[0] && handleSubscribe(tiers[0])}
                          className="px-5 py-2 rounded-xl text-sm font-semibold"
                          style={{ background: '#f4732a', color: '#fff' }}
                        >
                          {lowestTierPrice !== null ? `Unlock from $${lowestTierPrice}/mo` : 'Subscribe'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscribed — show all posts unlocked */}
                {lockedPosts.length > 0 && (isSubscribed || isOwner) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lockedPosts.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isLocked={false}
                        onLike={() => handleLike(post.id)}
                        isLiked={likedPosts.has(post.id)}
                        creatorUsername={creator.username}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Tiers tab ── */}
        {activeTab === 'tiers' && (
          <div className="pb-16">
            {tiers.length === 0 ? (
              <div className="text-center py-16" style={{ color: '#9c8878' }}>
                <p className="text-lg mb-2">No tiers set up yet</p>
                {isOwner && (
                  <Link href="/dashboard/settings"
                    className="text-sm underline" style={{ color: '#f4732a' }}>
                    Create membership tiers →
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier, i) => (
                  <TierCard
                    key={tier.id}
                    tier={tier}
                    isPopular={i === 1 && tiers.length === 3}
                    isSubscribed={subscribedTierId === tier.id}
                    onSubscribe={() => handleSubscribe(tier)}
                    isOwner={isOwner}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── About tab ── */}
        {activeTab === 'about' && (
          <div className="pb-16 max-w-xl">
            <div className="rounded-2xl p-6 border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
              <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                About {creator.display_name}
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#c4b5a5' }}>
                {creator.bio ?? 'This creator hasn\'t added a bio yet.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: 'rgba(244,115,42,0.07)' }}>
                  <p className="text-2xl font-semibold" style={{ color: '#f4732a' }}>
                    {memberCount.toLocaleString()}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9c8878' }}>Members</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(124,92,191,0.07)' }}>
                  <p className="text-2xl font-semibold" style={{ color: '#7c5cbf' }}>
                    {posts.length}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9c8878' }}>Posts</p>
                </div>
              </div>
              <p className="text-xs mt-4" style={{ color: '#9c8878' }}>
                Member since {new Date(creator.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Subscribe modal ── */}
      {isSubscribeOpen && selectedTier && (
        <SubscribeModal
          creator={creator}
          tier={selectedTier}
          allTiers={tiers}
          onClose={() => setIsSubscribeOpen(false)}
          onTierChange={setSelectedTier}
        />
      )}
    </div>
  )
}
