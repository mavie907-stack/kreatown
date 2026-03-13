'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function CreatorPage({ params }) {
  const [profile, setProfile] = useState(null)
  const [tiers, setTiers] = useState([])
  const [posts, setPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const [expandedPost, setExpandedPost] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single()

      if (profileData) {
        setProfile(profileData)

        const { data: tiersData } = await supabase
          .from('tiers')
          .select('*')
          .eq('creator_id', profileData.id)
          .order('price_monthly', { ascending: true })

        const { data: postsData } = await supabase
          .from('posts')
          .select('*')
          .eq('author_id', profileData.id)
          .eq('published', true)
          .order('created_at', { ascending: false })

        setTiers(tiersData || [])
        setPosts((postsData || []).map(p => ({ ...p, comments: [], likes: 0 })))
      }
      setLoading(false)
    }
    fetchData()
  }, [params.username])

  const card = { background: '#fff', borderRadius: '20px', border: '1px solid rgba(244,115,42,0.12)', boxShadow: '0 4px 24px rgba(244,115,42,0.07)' }

  const TIER_BADGE = {
    free:   { bg: '#f0fdf4', color: '#16a34a', label: 'Free' },
    silver: { bg: '#f1f5f9', color: '#64748b', label: 'Silver' },
    gold:   { bg: '#fffbeb', color: '#d97706', label: 'Gold' },
  }

  const handleLike = (postId) => {
    setLikedPosts(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId])
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: likedPosts.includes(postId) ? p.likes - 1 : p.likes + 1 } : p))
  }

  const handleComment = (postId) => {
    const text = commentText.trim()
    if (text.length === 0) return
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, { id: Date.now().toString(), author: 'You', initials: 'Y', color: 'linear-gradient(135deg,#f4732a,#fbbf24)', text, time: 'just now' }] } : p))
    setCommentText('')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#fffbf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontWeight: 800, color: '#9c8878' }}>Loading...</div>
    </div>
  )

  if (!profile) return (
    <div style={{ minHeight: '100vh', background: '#fffbf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontWeight: 800, color: '#9c8878' }}>Creator not found</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fffbf5', fontFamily: 'Nunito, sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid rgba(244,115,42,0.1)', padding: '0 2rem', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: '1.1rem', color: '#1a1612', textDecoration: 'none' }}>
          Kreatown<span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#f4732a', borderRadius: '50%', marginLeft: '2px', marginBottom: '1px' }}></span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/explore" style={{ fontWeight: 800, fontSize: '0.82rem', color: '#9c8878', textDecoration: 'none', padding: '0.45rem 1rem' }}>Explore</Link>
          <Link href="/auth/login" style={{ padding: '0.45rem 1.1rem', borderRadius: '100px', fontWeight: 800, fontSize: '0.82rem', border: '1.5px solid rgba(244,115,42,0.3)', color: '#f4732a', textDecoration: 'none' }}>Log in</Link>
          <Link href="/auth/register" style={{ padding: '0.45rem 1.1rem', borderRadius: '100px', fontWeight: 800, fontSize: '0.82rem', background: '#f4732a', color: '#fff', textDecoration: 'none' }}>Join free</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
          <div>
            <div style={{ ...card, padding: '2rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#f4732a,#fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                  {profile.display_name?.charAt(0) || 'T'}
                </div>
                <div>
                  <h1 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#1a1612', margin: '0 0 0.2rem' }}>{profile.display_name}</h1>
                  <div style={{ fontSize: '0.85rem', color: '#9c8878', fontWeight: 600 }}>@{profile.username}</div>
                </div>
              </div>
              <p style={{ color: '#1a1612', fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{profile.bio}</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#f4732a' }}>{posts.length}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>Posts</div>
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#f4732a' }}>{tiers.length}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>Tiers</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {posts.map(post => {
                const badge = TIER_BADGE[post.tier_level] || TIER_BADGE.free
                const locked = post.tier_level !== 'free'
                const isExpanded = expandedPost === post.id
                return (
                  <div key={post.id} style={card}>
                    <div style={{ padding: '1.2rem 1.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#fff0e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                          {locked ? '🔒' : '🚀'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1a1612', marginBottom: '0.4rem' }}>{post.title}</div>
                          <div style={{ fontSize: '0.82rem', color: '#9c8878', fontWeight: 600, marginBottom: '0.6rem', lineHeight: 1.5 }}>{post.body?.substring(0, 100)}...</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '100px', background: badge.bg, color: badge.color }}>{badge.label}</span>
                            <span style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(244,115,42,0.08)' }}>
                        <button onClick={() => handleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '0.8rem', fontWeight: 800, color: likedPosts.includes(post.id) ? '#f4732a' : '#9c8878' }}>
                          <Heart size={14} fill={likedPosts.includes(post.id) ? '#f4732a' : 'none'} /> {post.likes}
                        </button>
                        <button onClick={() => setExpandedPost(isExpanded ? null : post.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '0.8rem', fontWeight: 800, color: '#9c8878' }}>
                          <MessageCircle size={14} /> {post.comments.length} comments
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{ borderTop: '1px solid rgba(244,115,42,0.08)', padding: '1rem 1.4rem' }}>
                        {post.comments.map(comment => (
                          <div key={comment.id} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: comment.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.65rem', flexShrink: 0 }}>{comment.initials}</div>
                            <div style={{ background: '#fffbf5', borderRadius: '12px', padding: '0.5rem 0.9rem', flex: 1 }}>
                              <span style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1a1612' }}>{comment.author}</span>
                              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1a1612' }}>{comment.text}</div>
                            </div>
                          </div>
                        ))}
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.5rem' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#f4732a,#fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.65rem' }}>Y</div>
                          <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleComment(post.id)} placeholder="Write a comment..." style={{ flex: 1, padding: '0.5rem 0.9rem', borderRadius: '100px', border: '1px solid rgba(244,115,42,0.2)', background: '#fffbf5', fontFamily: 'Nunito, sans-serif', fontSize: '0.82rem', fontWeight: 600, outline: 'none', color: '#1a1612' }} />
                          <button onClick={() => handleComment(post.id)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f4732a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Send size={13} color="#fff" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '1.5rem' }}>
            <div style={{ fontWeight: 900, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878' }}>
              Join {profile.display_name}'s community
            </div>
            {tiers.map(tier => (
              <div key={tier.id} style={{ ...card, padding: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{tier.tier_level === 'gold' ? '👑' : '⭐'}</span>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612' }}>{tier.name}</div>
                    <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#f4732a' }}>${tier.price_monthly}/mo</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#9c8878', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.5 }}>{tier.description}</p>
                <button style={{ width: '100%', padding: '0.65rem', borderRadius: '100px', border: 'none', background: '#f4732a', color: '#fff', fontWeight: 900, fontSize: '0.88rem', fontFamily: 'Nunito, sans-serif', cursor: 'pointer' }}>
                  Join for ${tier.price_monthly}/mo
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
