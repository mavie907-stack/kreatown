// @ts-nocheck
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/hooks'
import { LayoutDashboard, FileText, Users, MessageCircle, DollarSign, Settings, LogOut, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/dashboard',           icon: LayoutDashboard, label: 'Overview'    },
  { href: '/dashboard/town',      icon: Globe,           label: 'Town Square' },
  { href: '/dashboard/content',   icon: FileText,        label: 'My Content'  },
  { href: '/dashboard/members',   icon: Users,           label: 'Members'     },
  { href: '/dashboard/messages',  icon: MessageCircle,   label: 'Messages'    },
  { href: '/dashboard/earnings',  icon: DollarSign,      label: 'Earnings'    },
  { href: '/dashboard/settings',  icon: Settings,        label: 'Settings'    },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, loading } = useUser()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fffbf5', fontFamily: 'Nunito, sans-serif' }}>
      <aside style={{
        width: '220px', background: '#fdf9f5', borderRight: '1px solid rgba(244,115,42,0.13)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50
      }}>
        <div style={{ padding: '1.3rem 1.5rem', fontWeight: 900, fontSize: '1.15rem', borderBottom: '1px solid rgba(244,115,42,0.13)', color: '#1a1612' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#1a1612' }}>
            Kreatown<span style={{ display: 'inline-block', width: '7px', height: '7px', background: '#f4732a', borderRadius: '50%', marginLeft: '3px', marginBottom: '2px' }}></span>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: '0.8rem 0.5rem' }}>
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem',
                fontWeight: active ? 800 : 700,
                color: active ? '#f4732a' : '#9c8878',
                background: active ? '#fff0e6' : 'transparent',
                textDecoration: 'none', marginBottom: '2px',
              }}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '1rem 1.2rem', borderTop: '1px solid rgba(244,115,42,0.13)' }}>
          {!loading && user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#f4732a,#fbbf24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 900, color: '#fff', flexShrink: 0
              }}>
                {user.display_name?.[0]?.toUpperCase() || 'K'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.display_name}</div>
                <div style={{ fontSize: '0.68rem', color: '#9c8878' }}>@{user.username}</div>
              </div>
            </div>
          )}
          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.8rem', color: '#9c8878', fontFamily: 'Nunito, sans-serif',
            padding: '0.4rem 0.5rem', borderRadius: '8px', width: '100%'
          }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>
      <main style={{ marginLeft: '220px', flex: 1, minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}