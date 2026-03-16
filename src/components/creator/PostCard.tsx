'use client'

// src/components/creator/PostCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/types/creator'

const TYPE_ICON: Record<string, string> = {
  image: '🖼',
  video: '▶',
  audio: '🎵',
  text: '✍',
  link: '🔗',
}

const TIER_BADGE: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: '#22c55e' },
  silver: { label: 'Silver', color: '#a1a1aa' },
  gold: { label: 'Gold', color: '#f5d58a' },
}

interface Props {
  post: Post
  isLocked: boolean
  isLiked: boolean
  onLike: () => void
  creatorUsername: string
}

export default function PostCard({ post, isLocked, isLiked, onLike, creatorUsername }: Props) {
  const badge = TIER_BADGE[post.tier_required] ?? TIER_BADGE.free
  const icon = TYPE_ICON[post.post_type] ?? '✍'
  const timeAgo = formatTimeAgo(post.created_at)

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-colors group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Cover image */}
      {post.cover_image && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(14,12,10,0.5)' }}>
              <span className="text-2xl">🔒</span>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">{icon}</span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ color: badge.color, background: badge.color + '18', border: `1px solid ${badge.color}30` }}>
            {badge.label}
          </span>
          <span className="text-xs ml-auto" style={{ color: '#9c8878' }}>{timeAgo}</span>
        </div>

        {/* Title */}
        <Link href={isLocked ? '#' : `/u/${creatorUsername}/post/${post.id}`}
          className="block font-semibold text-sm leading-snug hover:opacity-80 transition-opacity mb-1"
          style={{ color: '#f0ece4' }}>
          {post.title}
        </Link>

        {/* Excerpt */}
        {post.excerpt && !isLocked && (
          <p className="text-xs line-clamp-2 mb-3" style={{ color: '#9c8878' }}>
            {post.excerpt}
          </p>
        )}
        {isLocked && (
          <p className="text-xs mb-3" style={{ color: '#9c8878' }}>
            Subscribe to read this post
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <button
            onClick={onLike}
            disabled={isLocked}
            className="flex items-center gap-1.5 text-xs transition-colors hover:opacity-80 disabled:opacity-30"
            style={{ color: isLiked ? '#f4732a' : '#9c8878' }}
          >
            <span>{isLiked ? '♥' : '♡'}</span>
            <span>{post.likes_count + (isLiked ? 1 : 0)}</span>
          </button>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#9c8878' }}>
            <span>💬</span>
            <span>{post.comments_count}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
