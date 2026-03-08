'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/hooks'
import {
  LayoutDashboard, FileText, Users, MessageCircle,
  DollarSign, Link2, Settings, LogOut, Menu, X
} from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard',           icon: LayoutDashboard, label: 'Overview'    },
  { href: '/dashboard/content',   icon: FileText,        label: 'My Content'  },
  { href: '/dashboard/members',   icon: Users,           label: 'Members'     },
  { href: '/dashboard/messages',  icon: MessageCircle,   label: 'Messages'    },
  { href: '/dashboard/earnings',  icon: DollarSign,      label: 'Earnings'    },
  { href: '/dashboard/settings',  icon: Settings,        label: 'Settings'    },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname          = usePathname()
  const { user, loading } = useUser()
  const [open, setOpen]   = useState(false)
  const router            = useRouter()
  const supabase          = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-[#fffbf5]">

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-[#fdf9f5]
        border-r border-brand-orange/10 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-brand-orange/10">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-xl font-black text-brand-brown tracking-tight">
              Kreatown
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-orange mb-0.5" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5
                  text-sm font-bold transition-all duration-150
                  ${active
                    ? 'bg-brand-orange-pale text-brand-orange'
                    : 'text-brand-muted hover:bg-brand-orange-pale/50 hover:text-brand-brown'
                  }
                `}
              >
                <Icon size={16} strokeWidth={2.5} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User + Signout */}
        <div className="p-4 border-t border-brand-orange/10">
          {!loading && user && (
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-yellow flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                {user.display_name?.[0]?.toUpperCase() || 'K'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-brand-brown truncate">{user.display_name}</p>
                <p className="text-xs text-brand-muted truncate">@{user.username}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs font-bold text-brand-muted hover:text-red-500 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#fffbf5]/90 backdrop-blur border-b border-brand-orange/10 flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-black text-brand-brown">
          Kreatown<span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange ml-0.5 mb-1" />
        </Link>
        <button onClick={() => setOpen(!open)} className="text-brand-muted">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── OVERLAY (mobile) ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0 overflow-auto">
        {children}
      </main>

    </div>
  )
}
