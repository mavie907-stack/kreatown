// @ts-nocheck
// src/types/creator.ts

export interface CreatorProfile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  cover_url: string | null
  is_creator: boolean
  stripe_account_id: string | null
  created_at: string
}

export interface Tier {
  id: string
  name: string
  description: string | null
  price_monthly: number
  features: string[] | null
  position: number
}

export type PostType = 'text' | 'image' | 'video' | 'audio' | 'link'
export type TierRequired = 'free' | 'silver' | 'gold'

export interface Post {
  id: string
  title: string
  excerpt: string | null
  cover_image: string | null
  tier_required: TierRequired
  post_type: PostType
  created_at: string
  likes_count: number
  comments_count: number
}
