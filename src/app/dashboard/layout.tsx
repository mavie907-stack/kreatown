// @ts-nocheck
// src/app/dashboard/layout.tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/hooks'

const NAV = [
  { section: 'Overview', items: [
    { href: '/dashboard',          icon: '📊', label: 'Dashboard'     },
    { href: '/dashboard/earnings', icon: '💰', label: 'Earnings'      },
    { href: '/dashboard/members',  icon: '👥', label: 'Members', badge: null },
    { href: '/dashboard/content',  icon: '✍️', label: 'Posts'         },
    { href: '/dashboard/messages', icon: '💬', label: 'Messages', badge: '3' },
  ]},
  { section: 'My Town', items: [
    { href: '/dashboard/town',     icon: '🏯', label: 'Town Square'   },
    { href: '/dashboard/radio',    icon: '🎵', label: '3D Radio'      },
    { href: '/dashboard/tv',       icon: '📺', label: '3D TV', soon: true },
  ]},
  { section: 'Settings', items: [
    { href: '/dashboard/settings', icon: '⚙️', label: 'Settings'      },
  ]},
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useUser()

  const displayName = user?.user_metadata?.display_name || user?.user_metadata?.username || 'Creator'
  const totalMembers = 0 // will come from real data later

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { font-family: 'DM Sans', sans-serif; background: #0e0c0a; color: rgba(255,255,255,0.92); display: flex; overflow: hidden; }
        .kt-layout { display: flex; height: 100vh; width: 100%; }
        .kt-sidebar { width: 240px; background: #161310; border-right: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; height: 100vh; flex-shrink: 0; position: relative; overflow: hidden; }
        .kt-sidebar::before { content: ''; position: absolute; bottom: -80px; left: -40px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(139,111,212,0.12) 0%, transparent 70%); pointer-events: none; }
        .kt-main { flex: 1; overflow-y: auto; background: #0e0c0a; display: flex; flex-direction: column; }
        .nav-item { display: flex; align-items: center; gap: 0.7rem; padding: 0.65rem 1.25rem; cursor: pointer; color: rgba(255,255,255,0.55); font-size: 0.82rem; transition: all .18s; border: none; background: none; width: 100%; text-align: left; text-decoration: none; border-left: 2px solid transparent; font-family: 'DM Sans', sans-serif; }
        .nav-item:hover { color: rgba(255,255,255,0.92); background: rgba(255,255,255,0.04); }
        .nav-item.active { color: #f4732a; background: rgba(244,115,42,0.08); border-left-color: #f4732a; font-weight: 500; }
        .nav-badge { margin-left: auto; background: #f4732a; color: white; font-size: 0.58rem; padding: 0.1rem 0.4rem; border-radius: 100px; font-weight: 500; }
        .nav-soon { margin-left: auto; font-size: 0.58rem; color: rgba(255,255,255,0.28); padding: 0.1rem 0.4rem; border: 1px solid rgba(255,255,255,0.07); border-radius: 100px; }
        .mobile-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 300; background: rgba(14,12,10,0.97); backdrop-filter: blur(16px); border-top: 1px solid rgba(255,255,255,0.07); padding: 0.5rem 0; justify-content: space-around; align-items: center; }
        .mnb-item { display: flex; flex-direction: column; align-items: center; gap: 0.18rem; cursor: pointer; padding: 0.3rem 0.75rem; border-radius: 0.5rem; text-decoration: none; }
        .mnb-item.active { background: rgba(244,115,42,0.12); }
        .mnb-icon { font-size: 1.1rem; }
        .mnb-label { font-size: 0.55rem; color: rgba(255,255,255,0.45); letter-spacing: 0.03em; }
        .mnb-item.active .mnb-label { color: #f4732a; }
        @media (max-width: 860px) { .kt-sidebar { width: 200px; } }
        @media (max-width: 640px) { .kt-sidebar { display: none; } .kt-main { width: 100%; } body { padding-bottom: 64px; } .mobile-nav { display: flex !important; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      <div className="kt-layout">
        {/* SIDEBAR */}
        <aside className="kt-sidebar">
          {/* Logo */}
          <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🏯</span>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
              Krea<span style={{ color: '#f4732a' }}>Town</span>
            </div>
          </div>

          {/* Creator info */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8b6fd4, #f4732a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, border: '1.5px solid rgba(139,111,212,0.4)' }}>
              🎨
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,0.92)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</div>
              <div style={{ fontSize: '0.65rem', color: '#b8a0e8', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.1rem' }}>🏯 Hilltop Palace</div>
            </div>
            <div style={{ background: 'rgba(139,111,212,0.15)', color: '#b8a0e8', fontSize: '0.6rem', padding: '0.15rem 0.45rem', borderRadius: '100px', border: '1px solid rgba(139,111,212,0.25)', fontWeight: 500, flexShrink: 0 }}>ADMIN</div>
          </div>

          {/* Nav */}
          <nav style={{ padding: '0.75rem 0', flex: 1, overflowY: 'auto' }}>
            {NAV.map(group => (
              <div key={group.section}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0.75rem 1.25rem 0.35rem' }}>
                  {group.section}
                </div>
                {group.items.map(item => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} className={`nav-item${isActive ? ' active' : ''}`}>
                      <span style={{ fontSize: '1rem', width: 18, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                      {item.label}
                      {'badge' in item && item.badge && <span className="nav-badge">{item.badge}</span>}
                      {'soon' in item && item.soon && <span className="nav-soon">Soon</span>}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Progress bar */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ background: 'rgba(139,111,212,0.1)', borderRadius: '0.625rem', padding: '0.75rem', border: '1px solid rgba(139,111,212,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)' }}>To Legend status</span>
                <span style={{ fontSize: '0.68rem', color: '#b8a0e8', fontFamily: "'DM Mono', monospace" }}>{totalMembers} / 50K</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: Math.min((totalMembers / 50000) * 100, 100) + '%', background: 'linear-gradient(90deg, #8b6fd4, #f5d58a)', borderRadius: 100, transition: 'width 1.5s ease' }} />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="kt-main">
          {children}
        </main>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        {[
          { href: '/dashboard',          icon: '📊', label: 'Dashboard' },
          { href: '/dashboard/earnings', icon: '💰', label: 'Earnings'  },
          { href: '/dashboard/members',  icon: '👥', label: 'Members'   },
          { href: '/dashboard/content',  icon: '✍️', label: 'Posts'     },
          { href: '/dashboard/town',     icon: '🏯', label: 'Town'      },
        ].map(item => (
          <Link key={item.href} href={item.href} className={`mnb-item${pathname === item.href ? ' active' : ''}`}>
            <span className="mnb-icon">{item.icon}</span>
            <span className="mnb-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
