// src/types/index.ts

export type TierLevel = 'free' | 'silver' | 'gold' | 'palace'

export type HouseLevel = 1 | 2 | 3 | 4 | 5

export interface Profile {
  id: string
  username: string
  full_name: string
  bio: string | null
  avatar_url: string | null
  banner_url: string | null
  is_creator: boolean
  house_level: HouseLevel
  member_count: number
  monthly_revenue: number
  created_at: string
  // Creator-specific
  silver_price_try: number | null
  gold_price_try: number | null
  palace_price_try: number | null
  silver_price_usd: number | null
  gold_price_usd: number | null
  palace_price_usd: number | null
}

export interface Post {
  id: string
  creator_id: string
  title: string
  content: string
  excerpt: string | null
  tier: TierLevel
  published_at: string
  like_count: number
  comment_count: number
  media_urls: string[]
}

export interface Member {
  id: string
  user_id: string
  creator_id: string
  tier: TierLevel
  currency: 'TRY' | 'USD' | 'EUR'
  amount: number
  status: 'active' | 'cancelled' | 'paused'
  started_at: string
  next_billing: string
  profile: {
    username: string
    full_name: string
    avatar_url: string | null
  }
}

export interface Subscription {
  id: string
  tier: TierLevel
  status: 'active' | 'cancelled' | 'paused'
  currency: 'TRY' | 'USD' | 'EUR'
  amount: number
  creator_id: string
  next_billing: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
  sender: {
    username: string
    avatar_url: string | null
  }
}

export interface TownResident {
  user_id: string
  username: string
  full_name: string
  avatar_url: string | null
  emoji: string
  tier: TierLevel
  location_x: number // percentage 0-100
  location_y: number // percentage 0-100
  is_online: boolean
  joined_at: string
}

export interface DashboardStats {
  monthly_revenue: number
  monthly_revenue_prev: number
  total_members: number
  total_members_prev: number
  palace_members: number
  avg_revenue_per_member: number
  revenue_by_month: { month: string; amount: number }[]
  members_by_month: { month: string; count: number }[]
  tier_breakdown: {
    free: number
    silver: number
    gold: number
    palace: number
  }
}

export const HOUSE_LEVELS: Record<HouseLevel, {
  name: string
  emoji: string
  min_members: number
  max_members: number
  unlocks: string[]
  color: string
}> = {
  1: { name: 'Cottage',       emoji: '🏠', min_members: 0,     max_members: 999,   unlocks: ['Content feed', '2 tiers'],              color: '#2dab80' },
  2: { name: 'House',         emoji: '🏡', min_members: 1000,  max_members: 4999,  unlocks: ['DMs', '3D Garden'],                     color: '#8fa3b5' },
  3: { name: 'Villa',         emoji: '🏘️', min_members: 5000,  max_members: 9999,  unlocks: ['3D Radio 🎵', 'Pool', 'Competitions'],  color: '#c9952a' },
  4: { name: 'Estate',        emoji: '🏰', min_members: 10000, max_members: 24999, unlocks: ['3D TV 📺', 'Live events'],              color: '#f4732a' },
  5: { name: 'Hilltop Palace',emoji: '🏯', min_members: 25000, max_members: 999999,unlocks: ['Full town', 'Legend status 🌟'],        color: '#7c5cbf' },
}

export const TIER_CONFIG: Record<TierLevel, {
  name: string
  emoji: string
  color: string
  bgColor: string
}> = {
  free:   { name: 'Garden Pass',      emoji: '🌱', color: '#0a5230', bgColor: 'rgba(45,171,128,0.1)'  },
  silver: { name: 'Inside the House', emoji: '⭐', color: '#2a4a5e', bgColor: 'rgba(143,163,181,0.12)'},
  gold:   { name: 'Gold Suite',       emoji: '👑', color: '#7a5000', bgColor: 'rgba(201,149,42,0.12)' },
  palace: { name: 'Palace Access',    emoji: '🏯', color: '#4a2a8f', bgColor: 'rgba(124,92,191,0.12)' },
}
