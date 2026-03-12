'use client'
import { useState } from 'react'
import { Plus, Lock, Globe, Edit3, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

const MOCK_POSTS = [
  { id: '1', title: 'How I grew to 10k followers in 6 months', status: 'published', tier: 'free',   views: 1240, date: 'Mar 10', emoji: '🚀' },
  { id: '2', title: 'My full content strategy breakdown',        status: 'published', tier: 'gold',   views: 380,  date: 'Mar 8',  emoji: '📋' },
  { id: '3', title: 'Behind the scenes: my studio setup',        status: 'published', tier: 'silver', views: 520,  date: 'Mar 5',  emoji: '🎬' },
  { id: '4', title: 'Exclusive Q&A with my gold members',        status: 'published', tier: 'gold',   views: 210,  date: 'Feb 28', emoji: '👑' },
  { id: '5', title: 'Draft: Upcoming collab announcement',       status: 'draft',     tier: 'free',   views: 0,    date: 'Mar 11', emoji: '📝' },
  { id: '6', title: 'Draft: Monthly favorites roundup',         status: 'draft',     tier: 'silver', views: 0,    date: 'Mar 9',  emoji: '⭐' },
]

const TIER_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  free:   { bg: '#f0fdf4', color: '#16a34a', label: '🌱 Free' },
  silver: { bg: '#f1f5f9', color: '#64748b', label: '⭐ Silver' },
  gold:   { bg: '#fffbeb', color: '#d97706', label: '👑 Gold' },
}

export default function ContentPage() {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filtered = MOCK_POSTS.filter(p => filter === 'all' || p.status === filter)

  const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '900px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: 0 }}>My Content</h1>
          <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {MOCK_POSTS.filter(p => p.status === 'published').length} published · {MOCK_POSTS.filter(p => p.status === 'draft').length} drafts
          </p>
        </div>
        <Link href="/dashboard/content/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: '#f4732a', color: '#fff', padding: '0.6rem 1.2rem',
          borderRadius: '100px', fontWeight: 800, fontSize: '0.85rem',
          textDecoration: 'none', boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
        }}>
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['all', 'published', 'draft'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.45rem 1.1rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '0.8rem',
            background: filter === f ? '#f4732a' : '#fff',
            color: filter === f ? '#fff' : '#9c8878',
            boxShadow: filter === f ? '0 4px 14px rgba(244,115,42,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
            transition: 'all 0.15s',
            textTransform: 'capitalize'
          }}>
            {f === 'all' ? 'All Posts' : f === 'published' ? 'Published' : 'Drafts'}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(post => {
          const tier = TIER_STYLE[post.tier]
          return (
            <div key={post.id} style={{ ...card, padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Emoji */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '14px',
                background: '#fff0e6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0
              }}>
                {post.emoji}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1a1612', marginBottom: '0.3rem',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {post.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.55rem',
                    borderRadius: '100px', background: tier.bg, color: tier.color }}>
                    {tier.label}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#9c8878', fontWeight: 700 }}>
                    {post.status === 'published' ? <Globe size={11} /> : <Lock size={11} />}
                    {post.status}
                  </span>
                  {post.views > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#9c8878', fontWeight: 700 }}>
                      <Eye size={11} /> {post.views.toLocaleString()} views
                    </span>
                  )}
                  <span style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 700 }}>{post.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button style={{
                  width: '34px', height: '34px', borderRadius: '10px', border: 'none',
                  background: '#fff0e6', color: '#f4732a', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Edit3 size={14} />
                </button>
                <button style={{
                  width: '34px', height: '34px', borderRadius: '10px', border: 'none',
                  background: '#fef2f2', color: '#ef4444', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}