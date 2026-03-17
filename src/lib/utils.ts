// @ts-nocheck
// src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HouseLevel, HOUSE_LEVELS, TierLevel } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── HOUSE LEVEL ──
export function getHouseLevel(memberCount: number): HouseLevel {
  if (memberCount >= 25000) return 5
  if (memberCount >= 10000) return 4
  if (memberCount >= 5000)  return 3
  if (memberCount >= 1000)  return 2
  return 1
}

export function getHouseLevelProgress(memberCount: number): number {
  const level = getHouseLevel(memberCount)
  const { min_members, max_members } = HOUSE_LEVELS[level]
  return Math.min(((memberCount - min_members) / (max_members - min_members)) * 100, 100)
}

export function getMembersToNextLevel(memberCount: number): number {
  const level = getHouseLevel(memberCount)
  if (level === 5) return 0
  const nextLevel = (level + 1) as HouseLevel
  return HOUSE_LEVELS[nextLevel].min_members - memberCount
}

// ── TIER GATING ──
const tierRank: Record<TierLevel, number> = { free: 0, silver: 1, gold: 2, palace: 3 }

export function canAccessTier(userTier: TierLevel, requiredTier: TierLevel): boolean {
  return tierRank[userTier] >= tierRank[requiredTier]
}

// ── FORMATTING ──
export function formatRevenue(amount: number, currency = 'TRY'): string {
  const symbols: Record<string, string> = { TRY: '₺', USD: '$', EUR: '€' }
  const sym = symbols[currency] ?? currency
  if (amount >= 1000000) return sym + (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000)    return sym + (amount / 1000).toFixed(1) + 'K'
  return sym + amount.toLocaleString('tr-TR')
}

export function formatMemberCount(count: number): string {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000)    return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return formatDate(dateStr)
}

// ── AVATAR ──
export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// ── TRANSACTION ID ──
export function generateTxId(): string {
  return 'KT' + Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 5).toUpperCase()
}
