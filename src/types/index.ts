// ─── USER / CREATOR ──────────────────────────────────────────
export interface User {
  id: string
  email: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  website?: string
  is_creator: boolean
  created_at: string
}

// ─── MEMBERSHIP TIERS ────────────────────────────────────────
export type TierLevel = 'free' | 'silver' | 'gold'

export interface Tier {
  id: string
  creator_id: string
  name: string
  level: TierLevel
  price: number           // monthly price in USD cents
  description: string
  perks: string[]
  stripe_price_id?: string
  created_at: string
}

// ─── CONTENT POSTS ───────────────────────────────────────────
export type PostType = 'text' | 'image' | 'video' | 'audio'

export interface Post {
  id: string
  creator_id: string
  title: string
  body?: string
  media_url?: string
  media_type?: PostType
  thumbnail_url?: string
  tier_required: TierLevel  // 'free' = everyone sees it
  published: boolean
  created_at: string
  updated_at: string
  // joined
  creator?: User
  likes_count?: number
  comments_count?: number
}

// ─── MEMBERSHIPS ─────────────────────────────────────────────
export interface Membership {
  id: string
  fan_id: string
  creator_id: string
  tier_id: string
  tier_level: TierLevel
  stripe_subscription_id?: string
  status: 'active' | 'cancelled' | 'past_due'
  started_at: string
  ends_at?: string
  // joined
  creator?: User
  tier?: Tier
}

// ─── MESSAGES ────────────────────────────────────────────────
export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  body: string
  read: boolean
  created_at: string
  // joined
  sender?: User
}

export interface Conversation {
  other_user: User
  last_message: Message
  unread_count: number
}

// ─── ANALYTICS ───────────────────────────────────────────────
export interface RevenuePoint {
  month: string       // e.g. "2026-03"
  amount: number      // in USD cents
  members: number
}

export interface DashboardStats {
  mrr: number                   // monthly recurring revenue (cents)
  mrr_change: number            // % change vs last month
  total_members: number
  new_members_this_week: number
  gold_members: number
  posts_count: number
  revenue_history: RevenuePoint[]
}

// ─── STRIPE ──────────────────────────────────────────────────
export interface StripeCheckoutSession {
  url: string
}

// ─── API RESPONSES ───────────────────────────────────────────
export interface ApiResponse<T> {
  data?: T
  error?: string
}
