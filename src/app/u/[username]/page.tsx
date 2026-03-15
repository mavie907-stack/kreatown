// src/app/u/[username]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { HOUSE_LEVELS, TIER_CONFIG } from '@/types'
import { getHouseLevel, getHouseLevelProgress, getMembersToNextLevel, canAccessTier } from '@/lib/utils'
import type { Profile, Post, TierLevel } from '@/types'

interface PageProps {
  params: { username: string }
}

// Fetch creator profile from Supabase
async function getCreatorProfile(username: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('is_creator', true)
    .single()
  return data
}

// Fetch creator posts
async function getCreatorPosts(creatorId: string): Promise<Post[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('creator_id', creatorId)
    .order('published_at', { ascending: false })
    .limit(10)
  return data ?? []
}

export default async function CreatorHubPage({ params }: PageProps) {
  const profile = await getCreatorProfile(params.username)
  if (!profile) notFound()

  const posts = await getCreatorPosts(profile.id)
  const houseLevel = getHouseLevel(profile.member_count)
  const houseInfo  = HOUSE_LEVELS[houseLevel]
  const progress   = getHouseLevelProgress(profile.member_count)
  const toNext     = getMembersToNextLevel(profile.member_count)

  // Current user tier — in real app, get from session + subscription query
  const userTier: TierLevel = 'free'

  return (
    <div className="min-h-screen bg-cream">
      {/* NAV */}
      <nav className="sticky top-0 z-50 glass border-b border-orange-pale flex items-center justify-between px-4 md:px-6 h-14">
        <Link href="/" className="font-display font-bold text-lg text-brown">
          Krea<span className="text-orange">Town</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-muted hidden md:block">Log in</Link>
          <Link href={`/checkout/${params.username}`}
            className="bg-orange text-white text-sm font-medium px-4 py-2 rounded-full shadow-orange hover:bg-orange-light transition-all">
            Join {profile.full_name.split(' ')[0]}'s town 🏡
          </Link>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div className="relative h-64 md:h-[420px] overflow-hidden">
        {profile.banner_url ? (
          <Image src={profile.banner_url} alt="Banner" fill className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-palace-pale via-cream-dark to-gold-pale" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

        {/* Admin badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gold/90 text-[#3a2800] text-xs font-medium px-3 py-1.5 rounded-full border border-gold-light/50">
          👑 Town Admin
        </div>

        {/* House level badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-palace/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-xl border border-palace-light/30">
          <span className="text-base">{houseInfo.emoji}</span>
          <div>
            <div className="font-medium">{houseInfo.name}</div>
            <div className="opacity-70 text-[10px]">Level {houseLevel} · {profile.member_count >= 25000 ? 'Legend status' : `${progress.toFixed(0)}% to next`}</div>
          </div>
        </div>

        {/* Stats on banner (desktop) */}
        <div className="absolute bottom-16 left-4 hidden md:flex gap-3">
          {[
            { num: profile.member_count, label: 'Members' },
            { num: `$${(profile.monthly_revenue / 1000).toFixed(1)}K`, label: 'Per month' },
          ].map(s => (
            <div key={s.label} className="bg-white/12 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white text-center">
              <div className="font-display font-bold text-xl">{s.num}</div>
              <div className="text-xs opacity-70">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level progress bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3">
          <span className="text-white text-xs font-medium whitespace-nowrap">
            {houseInfo.emoji} Level {houseLevel} · {houseInfo.name}
          </span>
          <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange to-gold-light rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="text-white/50 text-xs whitespace-nowrap">
            {toNext > 0 ? `${toNext.toLocaleString()} to next` : '🌟 Legend'}
          </span>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4 pb-5 border-b border-muted/15">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative -mt-10 md:-mt-12 flex-shrink-0">
              <div className="level-ring w-20 h-20 md:w-24 md:h-24 rounded-full p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-palace to-orange flex items-center justify-center text-4xl border-2 border-cream overflow-hidden">
                  {profile.avatar_url
                    ? <Image src={profile.avatar_url} alt={profile.full_name} fill className="object-cover" />
                    : '🎨'
                  }
                </div>
              </div>
              {/* Online dot */}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald border-2 border-cream" />
            </div>
            {/* Name + info */}
            <div className="pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-bold text-2xl md:text-3xl text-brown">{profile.full_name}</h1>
                <span className="bg-palace text-white text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wide">✦ VERIFIED</span>
              </div>
              <p className="text-sm text-muted mt-0.5">@{profile.username} · Creator & Storyteller</p>
              {profile.bio && <p className="text-sm text-brown/70 mt-2 font-light leading-relaxed max-w-lg line-clamp-3">{profile.bio}</p>}
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="bg-palace-pale text-palace border border-palace/20 text-xs px-2.5 py-1 rounded-full">{houseInfo.emoji} Palace Owner</span>
                <span className="bg-cream-dark text-muted border border-muted/20 text-xs px-2.5 py-1 rounded-full">🌍 Istanbul</span>
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 pb-1">
            <Link href={`/checkout/${params.username}`}
              className="bg-orange text-white font-medium px-5 py-2.5 rounded-full shadow-orange hover:bg-orange-light hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm">
              🏡 Join my town
            </Link>
            <button className="bg-white text-brown border border-muted/25 px-4 py-2.5 rounded-full hover:border-orange hover:text-orange transition-all text-sm flex items-center gap-1.5">
              💬 Message
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">

        {/* FEED */}
        <div>
          {/* Tabs */}
          <div className="flex border-b border-muted/15 mb-5 overflow-x-auto no-scrollbar">
            {['All Posts', 'Free', 'Members', 'Palace'].map((tab, i) => (
              <button key={tab}
                className={`px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  i === 0 ? 'border-orange text-brown font-medium' : 'border-transparent text-muted hover:text-brown'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              // Fallback sample posts
              SAMPLE_POSTS.map(post => (
                <PostCard key={post.id} post={post} userTier={userTier} creatorUsername={params.username} />
              ))
            ) : posts.map(post => (
              <PostCard key={post.id} post={post} userTier={userTier} creatorUsername={params.username} />
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          {/* House card */}
          <div className="bg-brown rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-44 overflow-hidden">
              <Image src="/Luxury.png" alt="Palace" fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-palace/90 text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  {houseInfo.emoji} Level {houseLevel} · {houseInfo.name}
                </span>
                <span className="text-white/60 text-xs">📍 Top of the Hill</span>
              </div>
            </div>
            <div className="p-4">
              <div className="font-display font-bold text-white text-sm">{profile.full_name}'s Palace</div>
              <div className="text-white/40 text-xs mt-1 mb-4">Level {houseLevel} · All rooms unlocked</div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-white/40">Progress to Legend</span>
                <span className="text-palace-light font-mono-kt">{profile.member_count.toLocaleString()} / 50K</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-palace-light to-gold-light"
                  style={{ width: `${Math.min((profile.member_count / 50000) * 100, 100)}%` }} />
              </div>
              {/* Unlocked rooms */}
              <div className="mt-4">
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Unlocked rooms</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[['🎵','Radio'],['📺','3D TV'],['🏊','Pool'],['🌿','Garden'],['🎮','Games'],['🌟','Legend']].map(([e,n], i) => (
                    <div key={n} className={`rounded-lg px-2 py-1.5 flex items-center gap-1.5 border text-xs ${
                      i < 5
                        ? 'bg-palace/20 border-palace/30 text-palace-light'
                        : 'bg-white/5 border-white/8 text-white/30'
                    }`}>
                      <span>{e}</span><span className="truncate">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tiers */}
          <div className="bg-white rounded-3xl border border-muted/12 overflow-hidden">
            <div className="px-5 py-4 border-b border-muted/10">
              <h3 className="font-display font-bold text-base text-brown">Join the town</h3>
              <p className="text-xs text-muted mt-0.5">Choose your place in the world</p>
            </div>
            {(['free','silver','gold','palace'] as TierLevel[]).map(tier => {
              const tc = TIER_CONFIG[tier]
              const prices = { free: 'Free', silver: '₺290', gold: '₺590', palace: '₺1,490' }
              return (
                <Link href={tier === 'free' ? '#' : `/checkout/${params.username}?tier=${tier}`} key={tier}
                  className={`flex items-center gap-3 px-5 py-3.5 border-b border-muted/8 hover:bg-cream transition-colors last:border-0 ${
                    tier === 'palace' ? 'bg-palace-pale' : ''
                  }`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: tc.bgColor }}>
                    {tc.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-brown">{tc.name}</div>
                    <div className="text-xs text-muted mt-0.5 truncate">
                      {{ free: 'Free posts · Community', silver: 'Exclusive posts · Calls', gold: 'Strategy · DMs · Early', palace: '1-on-1 · Private station' }[tier]}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`font-display font-bold text-base ${tier === 'palace' ? 'text-palace' : 'text-brown'}`}>
                      {prices[tier]}
                    </div>
                    <div className="text-[10px] text-muted">{tier === 'free' ? 'forever' : '/ mo'}</div>
                  </div>
                </Link>
              )
            })}
            <div className="px-5 py-3">
              <Link href={`/checkout/${params.username}`}
                className="block w-full text-center bg-orange text-white text-sm font-medium py-3 rounded-full shadow-orange hover:bg-orange-light transition-all">
                Choose your tier 🏡
              </Link>
            </div>
          </div>

          {/* Town link */}
          <Link href={`/u/${params.username}/town`}
            className="block bg-gradient-to-br from-palace-pale to-gold-pale border border-palace/20 rounded-3xl p-5 hover:-translate-y-0.5 hover:shadow-palace transition-all text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="font-display font-bold text-base text-brown">View the town</div>
            <div className="text-xs text-muted mt-1">See where you live in {profile.full_name}'s world</div>
          </Link>
        </div>

      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar md:hidden flex items-center gap-2 px-4 py-3">
        <Link href={`/checkout/${params.username}`}
          className="flex-1 bg-orange text-white text-sm font-medium py-3 rounded-2xl text-center shadow-orange">
          🏡 Join my town
        </Link>
        <button className="bg-white border border-muted/25 px-4 py-3 rounded-2xl text-brown text-sm">
          💬
        </button>
      </div>
    </div>
  )
}

// ── POST CARD COMPONENT ──
function PostCard({ post, userTier, creatorUsername }: {
  post: Post
  userTier: TierLevel
  creatorUsername: string
}) {
  const hasAccess = canAccessTier(userTier, post.tier)
  const tc = TIER_CONFIG[post.tier]

  return (
    <div className="bg-white rounded-2xl border border-muted/12 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-muted/8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-palace to-orange flex items-center justify-center text-sm flex-shrink-0">🎨</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-brown">Topraq Toros</div>
          <div className="text-xs text-muted">{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: tc.bgColor, color: tc.color }}>
          {tc.emoji} {tc.name}
        </span>
      </div>

      <div className="px-5 pt-4 pb-3">
        <h3 className="font-display font-bold text-lg text-brown leading-snug">{post.title}</h3>
        {hasAccess ? (
          <p className="text-sm text-muted mt-2 font-light leading-relaxed">{post.excerpt ?? post.content.slice(0, 200) + '...'}</p>
        ) : (
          <div className="mt-4 bg-cream-dark border border-dashed border-muted/30 rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-muted mb-3 font-light">
              {{ silver: 'Silver members get inside the house.', gold: 'Gold members get the full suite.', palace: 'Palace members sit at the top of the hill.' }[post.tier as 'silver'|'gold'|'palace']}
            </p>
            <Link href={`/checkout/${creatorUsername}?tier=${post.tier}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: tc.bgColor, color: tc.color, border: `1px solid ${tc.bgColor}` }}>
              {tc.emoji} Unlock {tc.name}
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 px-5 py-3 border-t border-muted/8">
        <button className="text-xs text-muted flex items-center gap-1.5 hover:text-orange transition-colors">❤️ {post.like_count}</button>
        <button className="text-xs text-muted flex items-center gap-1.5 hover:text-orange transition-colors">💬 {post.comment_count}</button>
        <button className="text-xs text-muted flex items-center gap-1.5 hover:text-orange transition-colors ml-auto">🔗 Share</button>
      </div>
    </div>
  )
}

// ── SAMPLE POSTS (fallback when no DB data) ──
const SAMPLE_POSTS: Post[] = [
  { id: '1', creator_id: 'x', title: '🚀 How I grew to 10k followers in 6 months', content: 'In this post I break down exactly what I did — no fluff, no paid ads...', excerpt: 'In this post I break down exactly what I did — no fluff, no paid ads. Just the systems, the mindset shifts, and the exact content strategy that changed everything for me.', tier: 'free',   published_at: '2026-03-10', like_count: 142, comment_count: 38, media_urls: [] },
  { id: '2', creator_id: 'x', title: 'My full content strategy breakdown',         content: '',                                                                                  excerpt: null,                                                                                                                                                                         tier: 'gold',   published_at: '2026-03-08', like_count: 89,  comment_count: 21, media_urls: [] },
  { id: '3', creator_id: 'x', title: 'Behind the scenes: my studio setup',          content: '',                                                                                  excerpt: null,                                                                                                                                                                         tier: 'silver', published_at: '2026-03-05', like_count: 67,  comment_count: 14, media_urls: [] },
  { id: '4', creator_id: 'x', title: '1-on-1 strategy session recordings',          content: '',                                                                                  excerpt: null,                                                                                                                                                                         tier: 'palace', published_at: '2026-02-28', like_count: 203, comment_count: 55, media_urls: [] },
]

// Metadata
export async function generateMetadata({ params }: PageProps) {
  const profile = await getCreatorProfile(params.username)
  return {
    title: profile ? `${profile.full_name} (@${profile.username}) — KreaTown` : 'Creator — KreaTown',
    description: profile?.bio ?? `Join ${params.username}'s town on KreaTown`,
  }
}
