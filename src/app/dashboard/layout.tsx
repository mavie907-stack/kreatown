// src/app/dashboard/layout.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { HOUSE_LEVELS } from '@/types'
import { getHouseLevel, getHouseLevelProgress } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard',          icon: '📊', label: 'Dashboard',   section: 'Overview' },
  { href: '/dashboard/earnings', icon: '💰', label: 'Earnings',    section: 'Overview' },
  { href: '/dashboard/members',  icon: '👥', label: 'Members',     section: 'Overview', badge: true },
  { href: '/dashboard/content',  icon: '✍️', label: 'Posts',       section: 'Content' },
  { href: '/dashboard/messages', icon: '💬', label: 'Messages',    section: 'Content', badge: true },
  { href: '/dashboard/radio',    icon: '🎵', label: '3D Radio',    section: 'My Town' },
  { href: '/dashboard/tv',       icon: '📺', label: '3D TV',       section: 'My Town', soon: true },
  { href: '/dashboard/settings', icon: '⚙️', label: 'Settings',    section: 'Settings' },
]

const MOBILE_TABS = [
  { href: '/dashboard',          icon: '📊', label: 'Overview' },
  { href: '/dashboard/earnings', icon: '💰', label: 'Earnings' },
  { href: '/dashboard/members',  icon: '👥', label: 'Members' },
  { href: '/dashboard/content',  icon: '✍️', label: 'Posts' },
  { href: '/dashboard/messages', icon: '💬', label: 'Messages' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [profile, setProfile]   = useState<any>(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(data ?? { username: 'topraq', full_name: 'Topraq Toros', member_count: 44, house_level: 5 })
      setLoading(false)
    })
  }, [])

  const memberCount = profile?.member_count ?? 44
  const houseLevel  = getHouseLevel(memberCount)
  const houseInfo   = HOUSE_LEVELS[houseLevel]
  const progress    = getHouseLevelProgress(memberCount)

  const sections = [...new Set(NAV_ITEMS.map(n => n.section))]

  return (
    <div className="flex h-screen overflow-hidden bg-dark">

      {/* ── SIDEBAR ── */}
      <aside className="hidden md:flex w-60 flex-col bg-dark-2 border-r border-white/7 flex-shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/7">
          <span className="text-xl">🏯</span>
          <span className="font-display font-bold text-lg text-white">
            Krea<span className="text-orange">Town</span>
          </span>
        </div>

        {/* Creator badge */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/7">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-palace to-orange flex items-center justify-center text-base flex-shrink-0 border border-palace/40">
            🎨
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{profile?.full_name ?? 'Loading...'}</div>
            <div className="text-xs text-palace-light flex items-center gap-1 mt-0.5">
              {houseInfo.emoji} {houseInfo.name}
            </div>
          </div>
          <span className="text-[10px] bg-palace/15 text-palace-light border border-palace/25 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
            ADMIN
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {sections.map(section => (
            <div key={section}>
              <div className="font-mono-kt text-[10px] text-white/25 uppercase tracking-widest px-5 py-2 mt-2">
                {section}
              </div>
              {NAV_ITEMS.filter(n => n.section === section).map(item => {
                const active = pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-5 py-2.5 text-sm border-l-2 transition-all ${
                      active
                        ? 'text-orange bg-orange/8 border-orange font-medium'
                        : 'text-white/50 border-transparent hover:text-white hover:bg-white/4'
                    }`}>
                    <span className="w-5 text-center">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.soon && (
                      <span className="text-[9px] text-white/25 border border-white/10 rounded-full px-1.5 py-0.5">Soon</span>
                    )}
                    {item.badge && !item.soon && (
                      <span className="w-4 h-4 rounded-full bg-orange text-white text-[10px] flex items-center justify-center font-medium">3</span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Level progress */}
        <div className="px-4 pb-4 border-t border-white/7 pt-4">
          <div className="bg-palace/10 border border-palace/20 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/40">To Legend status</span>
              <span className="font-mono-kt text-xs text-palace-light">{memberCount} / 50K</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-palace-light to-gold-light transition-all"
                style={{ width: `${Math.min((memberCount / 50000) * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="sticky top-0 z-50 glass-dark border-b border-white/7 px-4 md:px-8 h-14 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="font-display font-bold text-base text-white">
              Good evening, {profile?.full_name?.split(' ')[0] ?? 'Creator'} 👑
            </div>
            <div className="text-xs text-white/25 hidden md:block">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-dark-3 border border-white/12 text-white/50 text-xs px-3 py-1.5 rounded-lg outline-none hidden md:block cursor-pointer">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <div className="relative w-8 h-8 bg-dark-3 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:border-white/20 transition-colors">
              🔔
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange border border-dark" />
            </div>
            <Link href={`/u/${profile?.username ?? 'topraq'}`}
              className="text-xs text-orange bg-orange/12 border border-orange/25 px-3 py-1.5 rounded-lg hover:bg-orange/20 transition-colors hidden md:block">
              View my town →
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-2/97 backdrop-blur-lg border-t border-white/7"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex justify-around py-2">
          {MOBILE_TABS.map(tab => {
            const active = pathname === tab.href ||
              (tab.href !== '/dashboard' && pathname.startsWith(tab.href))
            return (
              <Link key={tab.href} href={tab.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1">
                <span className={`text-xl transition-all ${active ? '' : 'opacity-40'}`}>{tab.icon}</span>
                <span className={`text-[10px] transition-colors ${active ? 'text-orange' : 'text-white/35'}`}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
