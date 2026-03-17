'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  creator: any
  tiers: any[]
  posts: any[]
  memberCount: number
  subscribedTierId: string | null
  currentUserId: string | null
}

type Tab = 'posts' | 'tiers' | 'about'

export default function CreatorHubClient({ creator, tiers, posts, memberCount, subscribedTierId, currentUserId }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('posts')
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState(tiers[0] ?? null)

  const isOwner = currentUserId === creator.id
  const isSubscribed = subscribedTierId !== null
  const lowestPrice = tiers.length > 0 ? Math.min(...tiers.map((t: any) => t.price_monthly)) : null

  const handleSubscribe = (tier: any) => {
    if (!currentUserId) { router.push('/auth/login?redirect=/u/' + creator.username); return }
    router.push(`/checkout?tier=${tier.id}&creator=${creator.username}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0c0a', color: '#f0ece4', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Cover */}
      <div style={{ height: 220, background: 'linear-gradient(135deg, #1a1410, #2a1f0e, #1a1214)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0e0c0a 100%)' }} />
        {isOwner && (
          <Link href="/dashboard/settings" style={{ position: 'absolute', top: 16, right: 16, fontSize: '0.75rem', padding: '0.4rem 1rem', borderRadius: 100, border: '1px solid rgba(244,115,42,0.4)', color: '#f4732a', background: 'rgba(14,12,10,0.7)', textDecoration: 'none' }}>
            Edit profile
          </Link>
        )}
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Profile header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: -48, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 96, height: 96, borderRadius: 16, background: 'linear-gradient(135deg, #f4732a, #7c5cbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '4px solid #0e0c0a', flexShrink: 0 }}>
              {creator.avatar_url ? <img src={creator.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} /> : (creator.display_name?.[0] ?? '🎨')}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>{creator.display_name ?? creator.username}</h1>
              <p style={{ color: '#9c8878', fontSize: '0.85rem', margin: '4px 0 8px' }}>@{creator.username}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem' }}>
                <span style={{ color: '#f5d58a' }}><strong>{memberCount}</strong> <span style={{ color: '#9c8878' }}>members</span></span>
                <span style={{ color: '#9c8878' }}>{posts.length} posts</span>
                {lowestPrice !== null && lowestPrice > 0 && <span style={{ color: '#9c8878' }}>from <span style={{ color: '#f4732a' }}>${lowestPrice}/mo</span></span>}
              </div>
            </div>
            {!isOwner && (
              <button onClick={() => tiers[0] && handleSubscribe(tiers[0])}
                style={{ padding: '0.6rem 1.5rem', borderRadius: 100, background: isSubscribed ? 'transparent' : '#f4732a', color: isSubscribed ? '#f5d58a' : 'white', border: isSubscribed ? '1px solid rgba(245,213,138,0.3)' : 'none', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
                {isSubscribed ? '✓ Subscribed' : lowestPrice !== null && lowestPrice > 0 ? `Join from $${lowestPrice}/mo` : 'Follow'}
              </button>
            )}
          </div>
          {creator.bio && <p style={{ color: '#c4b5a5', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 560, margin: 0 }}>{creator.bio}</p>}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }}>
          {(['posts', 'tiers', 'about'] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', background: 'transparent', border: 'none', cursor: 'pointer', color: activeTab === tab ? '#f4732a' : '#9c8878', fontWeight: activeTab === tab ? 600 : 400, borderBottom: activeTab === tab ? '2px solid #f4732a' : '2px solid transparent', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {activeTab === 'posts' && (
          <div style={{ paddingBottom: 64 }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9c8878' }}>
                <p>No posts yet</p>
                {isOwner && <Link href="/dashboard/content" style={{ color: '#f4732a', fontSize: '0.85rem' }}>Create your first post →</Link>}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {posts.map((post: any) => (
                  <div key={post.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 100, background: 'rgba(244,115,42,0.1)', color: '#f4732a' }}>{post.tier_level ?? 'free'}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9c8878' }}>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 8 }}>{post.title}</div>
                    {post.body && <p style={{ fontSize: '0.8rem', color: '#9c8878', lineHeight: 1.6, margin: 0 }}>{post.body.slice(0, 120)}{post.body.length > 120 ? '...' : ''}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tiers tab */}
        {activeTab === 'tiers' && (
          <div style={{ paddingBottom: 64 }}>
            {tiers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9c8878' }}>
                <p>No tiers set up yet</p>
                {isOwner && <Link href="/dashboard/settings" style={{ color: '#f4732a', fontSize: '0.85rem' }}>Create membership tiers →</Link>}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {tiers.map((tier: any, i: number) => (
                  <div key={tier.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${i === 1 ? 'rgba(124,92,191,0.4)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700 }}>{tier.name}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f4732a' }}>${tier.price_monthly}<span style={{ fontSize: '0.8rem', color: '#9c8878', fontWeight: 400 }}>/mo</span></div>
                    {tier.description && <p style={{ fontSize: '0.8rem', color: '#9c8878', margin: 0 }}>{tier.description}</p>}
                    {!isOwner && (
                      <button onClick={() => handleSubscribe(tier)}
                        style={{ padding: '0.6rem', borderRadius: 10, background: subscribedTierId === tier.id ? 'transparent' : '#f4732a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500, marginTop: 'auto' }}>
                        {subscribedTierId === tier.id ? '✓ Current plan' : `Join ${tier.name}`}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* About tab */}
        {activeTab === 'about' && (
          <div style={{ paddingBottom: 64, maxWidth: 520 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: 12 }}>About {creator.display_name}</h2>
              <p style={{ color: '#c4b5a5', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>{creator.bio ?? 'No bio yet.'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(244,115,42,0.07)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f4732a' }}>{memberCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9c8878' }}>Members</div>
                </div>
                <div style={{ background: 'rgba(124,92,191,0.07)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7c5cbf' }}>{posts.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9c8878' }}>Posts</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
