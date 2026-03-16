// src/app/dashboard/page.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useDashboardStats, useUser } from '@/hooks'

const TIER_PILL: Record<string, { bg: string; color: string; label: string }> = {
  palace: { bg: 'rgba(139,111,212,0.15)', color: '#b8a0e8', label: '🏯 Palace' },
  gold:   { bg: 'rgba(201,149,42,0.12)',  color: '#f5d58a', label: '👑 Gold'   },
  silver: { bg: 'rgba(150,170,190,0.12)', color: '#8ab0c8', label: '⭐ Silver' },
  free:   { bg: 'rgba(45,171,128,0.1)',   color: '#2dab80', label: '🌱 Free'   },
}
const TIER_AVATAR_BG: Record<string, string> = {
  palace: 'rgba(139,111,212,0.2)', gold: 'rgba(201,149,42,0.15)',
  silver: 'rgba(150,170,190,0.15)', free: 'rgba(45,171,128,0.12)',
}
const TIER_EMOJI: Record<string, string> = { palace: '🏯', gold: '👑', silver: '⭐', free: '🌱' }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const { user } = useUser()
  const { stats, recentMembers, loading } = useDashboardStats()
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const membersChartRef = useRef<HTMLCanvasElement>(null)
  const tierChartRef    = useRef<HTMLCanvasElement>(null)
  const chartInstancesRef = useRef<any[]>([])
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      if (stats) setProgressWidth(Math.min((stats.total_members / 50000) * 100, 100))
    }, 400)
    return () => clearTimeout(t)
  }, [stats])

  useEffect(() => {
    if (!stats) return
    chartInstancesRef.current.forEach(c => c?.destroy())
    chartInstancesRef.current = []
    import('chart.js/auto').then(({ default: Chart }) => {
      Chart.defaults.color = 'rgba(255,255,255,0.35)'
      Chart.defaults.borderColor = 'rgba(255,255,255,0.07)'
      Chart.defaults.font.family = "'DM Mono', monospace"
      Chart.defaults.font.size = 10
      if (revenueChartRef.current) {
        const ctx = revenueChartRef.current.getContext('2d')!
        const grad = ctx.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0, 'rgba(201,149,42,0.3)')
        grad.addColorStop(1, 'rgba(201,149,42,0)')
        chartInstancesRef.current.push(new Chart(ctx, { type: 'line', data: { labels: stats.revenue_by_month.map(d => d.month), datasets: [{ data: stats.revenue_by_month.map(d => d.amount), borderColor: '#c9952a', backgroundColor: grad, borderWidth: 2, fill: true, tension: 0.4, pointBackgroundColor: '#c9952a', pointRadius: 3, pointHoverRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleColor: '#f5d58a', bodyColor: 'rgba(255,255,255,0.6)', callbacks: { label: (c: any) => ' $' + c.parsed.y.toLocaleString() } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: (v: any) => '$' + (v/1000).toFixed(1) + 'k' } } } } }))
      }
      if (membersChartRef.current) {
        const ctx = membersChartRef.current.getContext('2d')!
        const grad = ctx.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0, 'rgba(139,111,212,0.3)')
        grad.addColorStop(1, 'rgba(139,111,212,0)')
        chartInstancesRef.current.push(new Chart(ctx, { type: 'line', data: { labels: stats.members_by_month.map(d => d.month), datasets: [{ data: stats.members_by_month.map(d => d.count), borderColor: '#8b6fd4', backgroundColor: grad, borderWidth: 2, fill: true, tension: 0.4, pointBackgroundColor: '#8b6fd4', pointRadius: 3, pointHoverRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleColor: '#b8a0e8', bodyColor: 'rgba(255,255,255,0.6)', callbacks: { label: (c: any) => ' ' + c.parsed.y + ' members' } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)' } } } } }))
      }
      if (tierChartRef.current) {
        const ctx = tierChartRef.current.getContext('2d')!
        chartInstancesRef.current.push(new Chart(ctx, { type: 'doughnut', data: { labels: ['Palace','Gold','Silver','Free'], datasets: [{ data: [stats.tier_breakdown.palace, stats.tier_breakdown.gold, stats.tier_breakdown.silver, stats.tier_breakdown.free], backgroundColor: ['rgba(139,111,212,0.8)','rgba(201,149,42,0.8)','rgba(138,176,200,0.7)','rgba(45,171,128,0.7)'], borderColor: '#161310', borderWidth: 2, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1a16', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 } } } }))
      }
    })
    return () => { chartInstancesRef.current.forEach(c => c?.destroy()); chartInstancesRef.current = [] }
  }, [stats])

  const displayName = user?.user_metadata?.display_name || user?.user_metadata?.username || 'Creator'
  const revenueChange = stats && stats.monthly_revenue_prev > 0 ? Math.round(((stats.monthly_revenue - stats.monthly_revenue_prev) / stats.monthly_revenue_prev) * 100) : 0
  const membersChange = stats ? stats.total_members - stats.total_members_prev : 0
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const palacePrice = 49, goldPrice = 19, silverPrice = 9
  const palaceRev = (stats?.tier_breakdown.palace ?? 0) * palacePrice
  const goldRev   = (stats?.tier_breakdown.gold   ?? 0) * goldPrice
  const silverRev = (stats?.tier_breakdown.silver ?? 0) * silverPrice
  const grossRev  = palaceRev + goldRev + silverRev
  const kreafee   = Math.round(grossRev * 0.08)
  const stripefee = Math.round(grossRev * 0.03)
  const netPayout = grossRev - kreafee - stripefee

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>🏯</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'rgba(255,255,255,0.28)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Loading your town...</div>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .kt-dash * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
        .fu1{animation:fadeUp .5s .05s ease both}.fu2{animation:fadeUp .5s .12s ease both}.fu3{animation:fadeUp .5s .20s ease both}.fu4{animation:fadeUp .5s .28s ease both}.fu5{animation:fadeUp .5s .36s ease both}
        .kpi-card{transition:border-color .2s,transform .2s}.kpi-card:hover{border-color:rgba(255,255,255,0.12)!important;transform:translateY(-2px)}
        .action-hover:hover{opacity:0.7}.payout-btn:hover{opacity:0.88}.activity-row:hover{background:rgba(255,255,255,0.02)!important}.member-row:hover td{background:rgba(255,255,255,0.02)!important}
        .progress-fill{transition:width 1.8s ease}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        @media(max-width:1100px){.charts-grid{grid-template-columns:1fr!important}.bottom-grid{grid-template-columns:1fr!important}.kpi-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.dash-content{padding:1rem 1rem 5rem!important}.kpi-val{font-size:1.6rem!important}.period-select{display:none!important}.topbar-sub{display:none!important}}
      `}</style>
      <div className="kt-dash" style={{ fontFamily:"'DM Sans',sans-serif", color:'rgba(255,255,255,0.92)' }}>
        {/* TOPBAR */}
        <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(14,12,10,0.9)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'0.9rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', fontWeight:700 }}>{getGreeting()}, {displayName} 👑</div>
            <div className="topbar-sub" style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.28)', marginTop:'0.1rem' }}>{today} · Your palace is running smoothly</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <select className="period-select" style={{ background:'#1e1a16', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.55)', fontSize:'0.78rem', padding:'0.45rem 0.75rem', borderRadius:'0.5rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", outline:'none' }}>
              <option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>All time</option>
            </select>
            <div style={{ position:'relative', width:34, height:34, background:'#1e1a16', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1rem' }}>
              🔔<div style={{ position:'absolute', top:6, right:6, width:7, height:7, borderRadius:'50%', background:'#f4732a', border:'1.5px solid #0e0c0a' }} />
            </div>
            <Link href={`/u/${user?.user_metadata?.username ?? 'me'}`} style={{ textDecoration:'none', background:'rgba(244,115,42,0.12)', color:'#f4732a', border:'1px solid rgba(244,115,42,0.25)', fontSize:'0.78rem', padding:'0.45rem 0.85rem', borderRadius:'0.5rem', whiteSpace:'nowrap' }}>View my town →</Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="dash-content" style={{ padding:'1.75rem 2rem 3rem' }}>

          {/* KPIs */}
          <div className="fu1 kpi-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.75rem' }}>
            {[
              { label:'Monthly Revenue', val:'$'+(stats?.monthly_revenue??0).toLocaleString(), change:revenueChange>=0?`↑ ${revenueChange}% vs last month`:`↓ ${Math.abs(revenueChange)}% vs last month`, up:revenueChange>=0, icon:'💰', accent:'#f5d58a', glow:'#c9952a' },
              { label:'Total Members',   val:String(stats?.total_members??0), change:membersChange>=0?`↑ ${membersChange} new this month`:`↓ ${Math.abs(membersChange)} this month`, up:membersChange>=0, icon:'👥', accent:'#f4732a', glow:'#f4732a' },
              { label:'Palace Members',  val:String(stats?.palace_members??0), change:'↑ top tier members', up:true, icon:'🏯', accent:'#b8a0e8', glow:'#8b6fd4' },
              { label:'Avg Rev / Member', val:'$'+(stats?.avg_revenue_per_member??0), change:'per member / month', up:true, icon:'📈', accent:'#2dab80', glow:'#2dab80' },
            ].map(k => (
              <div key={k.label} className="kpi-card" style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', padding:'1.25rem 1.25rem 1rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, right:0, width:60, height:60, borderRadius:'50%', background:k.glow, opacity:0.06, transform:'translate(20px,-20px)' }} />
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.7rem', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.6rem' }}>{k.label}</div>
                <div className="kpi-val" style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, lineHeight:1, letterSpacing:'-0.02em', color:k.accent }}>{k.val}</div>
                <div style={{ fontSize:'0.72rem', marginTop:'0.4rem', color:k.up?'#2dab80':'#e05252' }}>{k.change}</div>
                <div style={{ position:'absolute', bottom:'1rem', right:'1.1rem', fontSize:'1.6rem', opacity:0.18 }}>{k.icon}</div>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="fu2 charts-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.75rem' }}>
            {[
              { title:'Revenue over time', sub:'Monthly earnings · Last 6 months', ref:revenueChartRef, tag:revenueChange!==0?`${revenueChange>=0?'↑':'↓'} ${Math.abs(revenueChange)}% MoM`:null, tagUp:revenueChange>=0 },
              { title:'Member growth', sub:'Cumulative subscribers · Last 6 months', ref:membersChartRef, tag:membersChange!==0?`↑ ${membersChange} this month`:null, tagUp:true },
            ].map(c => (
              <div key={c.title} style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', padding:'1.25rem', overflow:'hidden' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.25rem' }}>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700 }}>{c.title}</div>
                    <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.28)', marginTop:'0.15rem' }}>{c.sub}</div>
                  </div>
                  {c.tag && <span style={{ fontSize:'0.65rem', padding:'0.2rem 0.55rem', borderRadius:'100px', fontWeight:500, background:c.tagUp?'rgba(45,171,128,0.12)':'rgba(224,82,82,0.12)', color:c.tagUp?'#2dab80':'#e05252' }}>{c.tag}</span>}
                </div>
                <div style={{ position:'relative', height:180 }}><canvas ref={c.ref} /></div>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="fu3 bottom-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'1rem' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

              {/* Members table */}
              <div style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', overflow:'hidden' }}>
                <div style={{ padding:'1.1rem 1.25rem 0.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700 }}>Recent members</div>
                  <Link href="/dashboard/members" className="action-hover" style={{ fontSize:'0.72rem', color:'#f4732a', textDecoration:'none' }}>See all {stats?.total_members??0} →</Link>
                </div>
                {recentMembers.length === 0 ? (
                  <div style={{ padding:'3rem', textAlign:'center', color:'rgba(255,255,255,0.28)', fontSize:'0.85rem' }}>
                    <div style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>🏡</div>No members yet — share your town!
                  </div>
                ) : (
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead><tr>{['Member','Tier','Revenue','Joined'].map(h=><th key={h} style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.62rem', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'0.08em', padding:'0.6rem 1.25rem', textAlign:'left', fontWeight:400, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {recentMembers.map((m,i)=>(
                        <tr key={i} className="member-row">
                          <td style={{ padding:'0.75rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                              <div style={{ width:28, height:28, borderRadius:'50%', background:TIER_AVATAR_BG[m.tier]??'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', flexShrink:0 }}>{m.emoji}</div>
                              <div><div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.92)' }}>{m.name}</div><div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.28)' }}>{m.handle}</div></div>
                            </div>
                          </td>
                          <td style={{ padding:'0.75rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.04)' }}><span style={{ fontSize:'0.62rem', padding:'0.18rem 0.5rem', borderRadius:'100px', fontWeight:500, background:TIER_PILL[m.tier]?.bg, color:TIER_PILL[m.tier]?.color }}>{TIER_PILL[m.tier]?.label}</span></td>
                          <td style={{ padding:'0.75rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.04)', fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:m.revenue>0?'#f5d58a':'rgba(255,255,255,0.28)' }}>{m.revenue>0?'$'+m.revenue:'$0'}</td>
                          <td style={{ padding:'0.75rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.04)', fontFamily:"'DM Mono',monospace", fontSize:'0.72rem', color:'rgba(255,255,255,0.28)' }}>{new Date(m.joined).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Tier breakdown */}
              <div style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', padding:'1.25rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', alignItems:'center' }}>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700, marginBottom:'0.2rem' }}>Tier breakdown</div>
                  <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.28)', marginBottom:'1rem' }}>{stats?.total_members??0} total members</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                    {(['palace','gold','silver','free'] as const).map(tier=>(
                      <div key={tier} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem' }}>
                        <span style={{ color:TIER_PILL[tier].color }}>{TIER_EMOJI[tier]} {tier.charAt(0).toUpperCase()+tier.slice(1)}</span>
                        <span style={{ color:'rgba(255,255,255,0.55)', fontFamily:"'DM Mono',monospace" }}>{stats?.tier_breakdown[tier]??0} members</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position:'relative', height:140 }}><canvas ref={tierChartRef} /></div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

              {/* House level */}
              <div className="fu4" style={{ background:'linear-gradient(135deg,rgba(139,111,212,0.12),rgba(201,149,42,0.08))', border:'1px solid rgba(139,111,212,0.25)', borderRadius:'1rem', padding:'1.25rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)', fontSize:'3.5rem', opacity:0.12, pointerEvents:'none' }}>🏯</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.62rem', color:'#b8a0e8', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'0.4rem' }}>Current residence</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.05rem', fontWeight:700 }}>🏯 Hilltop Palace</div>
                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.28)', marginTop:'0.15rem', marginBottom:'1rem' }}>Level 5 · All rooms unlocked</div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem' }}>
                  <span style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.28)' }}>Progress to Legend</span>
                  <span style={{ fontSize:'0.68rem', color:'#b8a0e8', fontFamily:"'DM Mono',monospace" }}>{stats?.total_members??0} / 50,000</span>
                </div>
                <div style={{ height:5, background:'rgba(255,255,255,0.07)', borderRadius:100, overflow:'hidden' }}>
                  <div className="progress-fill" style={{ height:'100%', width:progressWidth+'%', background:'linear-gradient(90deg,#8b6fd4,#f5d58a)', borderRadius:100 }} />
                </div>
                <div style={{ marginTop:'0.85rem', padding:'0.6rem 0.75rem', background:'rgba(255,255,255,0.04)', borderRadius:'0.5rem', display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.72rem', color:'rgba(255,255,255,0.55)' }}>
                  🌟 Next unlock: <strong style={{ color:'#f5d58a' }}>Legend Hall</strong> at 50K members
                </div>
              </div>

              {/* Payout */}
              <div className="fu4" style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', padding:'1.25rem' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'0.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)', marginBottom:'0.75rem' }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700 }}>This month's payout</div>
                  <span style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.28)' }}>Paid out on 28th</span>
                </div>
                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.28)' }}>Gross revenue</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', fontWeight:700, color:'#f5d58a', letterSpacing:'-0.02em', margin:'0.3rem 0' }}>${grossRev.toLocaleString()}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginTop:'1rem' }}>
                  {[
                    { label:`Palace (${stats?.tier_breakdown.palace??0} × $${palacePrice})`, val:`+$${palaceRev}`, pos:true },
                    { label:`Gold (${stats?.tier_breakdown.gold??0} × $${goldPrice})`, val:`+$${goldRev}`, pos:true },
                    { label:`Silver (${stats?.tier_breakdown.silver??0} × $${silverPrice})`, val:`+$${silverRev}`, pos:true },
                    null,
                    { label:'KreaTown fee (8%)', val:`−$${kreafee}`, pos:false },
                    { label:'Stripe processing', val:`−$${stripefee}`, pos:false },
                    null,
                    { label:'Net payout', val:`$${netPayout.toLocaleString()}`, pos:true, bold:true },
                  ].map((row,i) => row===null
                    ? <div key={i} style={{ height:1, background:'rgba(255,255,255,0.07)', margin:'0.1rem 0' }} />
                    : <div key={row.label} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', fontWeight:row.bold?500:400 }}>
                        <span style={{ color:row.bold?'rgba(255,255,255,0.92)':'rgba(255,255,255,0.28)' }}>{row.label}</span>
                        <span style={{ fontFamily:"'DM Mono',monospace", color:row.bold?'#f5d58a':row.pos?'#2dab80':'#e05252', fontSize:row.bold?'0.85rem':'0.78rem' }}>{row.val}</span>
                      </div>
                  )}
                </div>
                <button className="payout-btn" style={{ width:'100%', marginTop:'1rem', padding:'0.7rem', background:'linear-gradient(135deg,#c9952a,#e8a820)', color:'#1a1000', border:'none', borderRadius:'0.625rem', fontSize:'0.82rem', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'opacity .2s' }}>
                  💳 Request payout — ${netPayout.toLocaleString()}
                </button>
              </div>

              {/* Activity */}
              <div className="fu5" style={{ background:'#161310', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'1rem', overflow:'hidden' }}>
                <div style={{ padding:'1.1rem 1.25rem 0.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.95rem', fontWeight:700 }}>Town activity</div>
                  <button className="action-hover" style={{ fontSize:'0.72rem', color:'#f4732a', cursor:'pointer', background:'none', border:'none', fontFamily:"'DM Sans',sans-serif" }}>See all</button>
                </div>
                {[
                  { icon:'🏯', bg:'rgba(139,111,212,0.15)', bold:'Palace tier', text:'Your first Palace member is waiting', time:'Invite creators now' },
                  { icon:'💬', bg:'rgba(201,149,42,0.12)',   bold:'Messages',   text:'Set up messaging to connect with fans', time:'Dashboard → Messages' },
                  { icon:'🎵', bg:'rgba(244,115,42,0.15)',   bold:'3D Radio',   text:'3D Radio is live in your town', time:'My Town → 3D Radio' },
                  { icon:'🏆', bg:'rgba(139,111,212,0.15)', bold:'Competitions', text:'Monthly creator competitions launching', time:'Coming soon' },
                  { icon:'🌱', bg:'rgba(45,171,128,0.12)',   bold:'Get started', text:'Share your town to get your first members', time:'View my town →' },
                ].map((a,i)=>(
                  <div key={i} className="activity-row" style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.75rem 1.25rem', borderBottom:i<4?'1px solid rgba(255,255,255,0.04)':'none', transition:'background .15s' }}>
                    <div style={{ width:30, height:30, borderRadius:'50%', background:a.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', flexShrink:0, marginTop:'0.05rem' }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.55)', lineHeight:1.5 }}><strong style={{ color:'rgba(255,255,255,0.92)', fontWeight:500 }}>{a.bold}</strong> · {a.text}</div>
                      <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.28)', marginTop:'0.15rem', fontFamily:"'DM Mono',monospace" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
