// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { HOUSE_LEVELS } from '@/types'

// Mock creator data — replace with Supabase query
const FEATURED_CREATORS = [
  { username: 'topraq', name: 'Topraq Toros', emoji: '🎨', members: 44, revenue: 2840, level: 5, tag: 'Creator & Storyteller' },
  { username: 'jenna',  name: 'Jenna Williams',emoji: '📸', members: 128,revenue: 6200, level: 4, tag: 'Photographer' },
  { username: 'mikenova',name:'MikeNova',      emoji: '🎵', members: 89, revenue: 4100, level: 5, tag: 'Music Producer' },
]

const STATS = [
  { num: '500+',  label: 'Creators' },
  { num: '$120K+',label: 'Paid out' },
  { num: '12K+',  label: 'Members'  },
]

const FEATURES = [
  { icon: '🏡', title: 'Your own town',      desc: 'Your creator page is a living 3D world. Share kreatown.com/@you everywhere.' },
  { icon: '💰', title: 'Get paid monthly',   desc: 'Fans subscribe to your tiers. Automatic payouts via QNB every month.' },
  { icon: '🔒', title: 'Gated rooms',        desc: 'Free fans get the garden. Gold gets the suite. Palace gets the penthouse.' },
  { icon: '🎮', title: 'Competitions',       desc: 'Monthly growth challenges. Win house upgrades and platform features.' },
  { icon: '💬', title: 'Direct messages',    desc: '1-on-1 with your biggest fans. Unlocks at 1K members.' },
  { icon: '📊', title: 'Creator analytics',  desc: 'Revenue, growth, content performance — all in your palace dashboard.' },
]

export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-orange-pale flex items-center justify-between px-6 md:px-12 h-14">
        <span className="font-display font-bold text-xl text-brown">
          Krea<span className="text-orange">Town</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#concept" className="text-sm text-muted hover:text-brown transition-colors">How it works</Link>
          <Link href="#creators" className="text-sm text-muted hover:text-brown transition-colors">Creators</Link>
          <Link href="#plans"    className="text-sm text-muted hover:text-brown transition-colors">Pricing</Link>
          <Link href="/auth/login" className="text-sm text-muted hover:text-brown transition-colors">Log in</Link>
          <Link href="/auth/register"
            className="bg-orange text-white text-sm font-medium px-5 py-2 rounded-full shadow-orange hover:bg-orange-light transition-all hover:-translate-y-0.5">
            Start for free 🏡
          </Link>
        </div>
        {/* Mobile hamburger — handled by MobileNav component */}
        <Link href="/auth/register"
          className="md:hidden bg-orange text-white text-sm font-medium px-4 py-2 rounded-full">
          Start free
        </Link>
      </nav>

      {/* HERO */}
      <section className="min-h-screen grid md:grid-cols-2 items-center gap-8 px-6 md:px-12 pt-24 pb-12">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-orange-pale border border-orange/20 text-orange text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            🏡 Your town. Your fans. Your money.
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl leading-[1.08] tracking-tight mb-6">
            Build your world.<br/>
            <span className="text-gradient-orange">Grow your empire.</span>
          </h1>
          <p className="text-lg text-muted font-light leading-relaxed max-w-lg mb-8">
            KreaTown is the only creator platform where your success literally builds your world.
            Start with a cottage. Earn your palace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register"
              className="bg-orange text-white font-medium px-8 py-4 rounded-full shadow-orange hover:shadow-orange-lg hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2">
              Start building free 🏡
            </Link>
            <Link href="#concept"
              className="text-brown font-medium border-b border-orange pb-0.5 hover:gap-2 transition-all self-center text-center">
              See how it works →
            </Link>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-muted/20">
            {STATS.map(s => (
              <div key={s.label}>
                <span className="font-display font-bold text-2xl text-brown block">{s.num}</span>
                <span className="text-xs text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/Luxury.png" alt="KreaTown" fill className="object-cover object-top" priority />
          </div>
        </div>
      </section>

      {/* LEVEL SYSTEM */}
      <section id="concept" className="bg-brown py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(244,115,42,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-width mx-auto relative">
          <div className="text-center mb-12">
            <p className="font-mono-kt text-xs text-orange tracking-widest uppercase mb-3">The KreaTown System</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Your house grows<br/>
              <em className="not-italic text-gold-light">with your audience</em>
            </h2>
            <p className="text-white/50 mt-4 font-light max-w-lg mx-auto">
              Every new member upgrades your world — from a cozy cottage to a hilltop palace.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.entries(HOUSE_LEVELS) as [string, typeof HOUSE_LEVELS[1]][]).map(([lvl, data], i) => (
              <div key={lvl}
                className={`rounded-2xl p-5 text-center border transition-all hover:-translate-y-1 ${
                  i === 2
                    ? 'bg-orange/15 border-orange/40'
                    : 'bg-white/5 border-white/10 hover:border-orange/30'
                }`}>
                <p className="font-mono-kt text-xs text-white/35 uppercase tracking-widest mb-3">Level {lvl}</p>
                <div className="text-3xl mb-3">{data.emoji}</div>
                <div className="font-display font-bold text-white text-sm">
                  {data.min_members === 0 ? '0' : (data.min_members / 1000) + 'K'}
                  {' – '}
                  {data.max_members >= 999999 ? '∞' : (data.max_members / 1000) + 'K'}
                </div>
                <div className="text-white/50 text-xs mt-1">{data.name}</div>
                <div className="text-gold-light/80 text-xs mt-3 leading-snug">{data.unlocks[0]}</div>
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange to-gold-light" style={{ width: `${(i + 1) * 20}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 md:px-12 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="font-mono-kt text-xs text-orange tracking-widest uppercase mb-3">Everything you need</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
              Not just a page.<br/><em className="not-italic text-orange">A living world.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                  i === 0 ? 'bg-orange text-white border-transparent' : 'bg-white border-muted/15 hover:border-orange/25'
                }`}>
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className={`font-display font-bold text-lg mb-2 ${i === 0 ? 'text-white' : 'text-brown'}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed font-light ${i === 0 ? 'text-white/80' : 'text-muted'}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATORS */}
      <section id="creators" className="py-20 px-6 md:px-12 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono-kt text-xs text-orange tracking-widest uppercase mb-3">Already earning</p>
            <h2 className="font-display font-bold text-4xl">Creators building their towns</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_CREATORS.map(c => (
              <Link href={`/u/${c.username}`} key={c.username}
                className="bg-white rounded-3xl border border-muted/12 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all block">
                <div className="h-20 bg-gradient-to-br from-orange-pale to-gold-pale flex items-end p-3">
                  <span className="text-xs font-medium bg-white rounded-lg px-2 py-1 shadow-sm">
                    {HOUSE_LEVELS[c.level as 1|2|3|4|5].emoji} Level {c.level}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-3xl mb-2 -mt-8 w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center border-3 border-white shadow">{c.emoji}</div>
                  <div className="font-display font-bold text-lg text-brown">{c.name}</div>
                  <div className="text-xs text-muted mt-0.5">{c.tag}</div>
                  <div className="flex gap-6 mt-4 pt-4 border-t border-muted/10">
                    <div><span className="font-display font-bold text-lg text-brown">{c.members}</span><span className="text-xs text-muted ml-1">members</span></div>
                    <div><span className="font-display font-bold text-lg text-brown">${c.revenue.toLocaleString()}</span><span className="text-xs text-muted ml-1">/mo</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-brown text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,115,42,0.15),transparent_65%)] pointer-events-none" />
        <div className="relative">
          <p className="font-mono-kt text-xs text-orange tracking-widest uppercase mb-4">Ready to build?</p>
          <h2 className="font-display font-black text-5xl md:text-7xl text-white leading-tight mb-4">
            Your town is waiting.<br/><em className="not-italic text-gold-light">Start with a cottage.</em>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-md mx-auto mb-10">
            Free to start. No credit card. Your palace is one audience away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"
              className="bg-orange text-white font-medium px-10 py-4 rounded-full shadow-orange-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 justify-center">
              Build your town free 🏡
            </Link>
            <Link href="#concept"
              className="text-white/60 border border-white/15 px-8 py-4 rounded-full hover:border-white/40 hover:text-white transition-all">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0d0b] text-white/40 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <span className="font-display font-bold text-white text-lg">Krea<span className="text-orange">Town</span></span>
        <span>© 2026 KreaTown. Where creators belong.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
          <Link href="/terms"   className="hover:text-white/70 transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
        </div>
      </footer>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar md:hidden flex items-center gap-3 px-5 py-3">
        <Link href="/auth/register"
          className="flex-1 bg-orange text-white text-sm font-medium py-3 rounded-2xl text-center shadow-orange">
          🏡 Start for free
        </Link>
        <Link href="/auth/login"
          className="text-muted text-sm font-medium whitespace-nowrap">
          Log in
        </Link>
      </div>
    </main>
  )
}
