// @ts-nocheck
'use client'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const REVENUE_DATA = [
  { month: 'Sep', revenue: 820  },
  { month: 'Oct', revenue: 1240 },
  { month: 'Nov', revenue: 1080 },
  { month: 'Dec', revenue: 1760 },
  { month: 'Jan', revenue: 1580 },
  { month: 'Feb', revenue: 2200 },
  { month: 'Mar', revenue: 2840 },
]

const TRANSACTIONS = [
  { id: '1', name: 'Jenna Loves',  tier: 'gold',   amount: '+$19.00', date: 'Mar 12', type: 'subscription', initials: 'JL', color: 'linear-gradient(135deg,#f4732a,#fbbf24)' },
  { id: '2', name: 'Alex Chen',    tier: 'gold',   amount: '+$19.00', date: 'Mar 12', type: 'subscription', initials: 'AC', color: 'linear-gradient(135deg,#f4732a,#f472b6)' },
  { id: '3', name: 'Mike K',       tier: 'silver', amount: '+$9.00',  date: 'Mar 11', type: 'subscription', initials: 'MK', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)' },
  { id: '4', name: 'Luna Park',    tier: 'gold',   amount: '+$19.00', date: 'Mar 10', type: 'subscription', initials: 'LP', color: 'linear-gradient(135deg,#34d399,#fbbf24)' },
  { id: '5', name: 'Priya Sharma', tier: 'silver', amount: '+$9.00',  date: 'Mar 8',  type: 'subscription', initials: 'PS', color: 'linear-gradient(135deg,#fbbf24,#34d399)' },
  { id: '6', name: 'Payout',       tier: '',       amount: '-$180.00', date: 'Mar 1', type: 'payout',       initials: '🏦', color: '#f1f5f9' },
]

const TIER_STYLE: Record<string, { bg: string; color: string }> = {
  gold:   { bg: '#fffbeb', color: '#d97706' },
  silver: { bg: '#f1f5f9', color: '#64748b' },
}

const KPIS = [
  { label: 'This Month',     value: '$2,840', change: '+18%',    },
  { label: 'Last Month',     value: '$2,200', change: '+40%',    },
  { label: 'Active Members', value: '44',     change: '+6',      },
  { label: 'Pending Payout', value: '$2,660', change: 'Apr 1',   },
]

export default function EarningsPage() {
  const card: React.CSSProperties = {
    background: '#fff', borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '900px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: '0 0 0.3rem' }}>Earnings</h1>
        <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>Your revenue overview</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.9rem', marginBottom: '1.2rem' }}>
        {KPIS.map(k => (
          <div key={k.label} style={{ ...card, padding: '1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.6rem' }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                borderRadius: '100px', background: '#f0fdf4', color: '#16a34a'
              }}>↑ {k.change}</span>
            </div>
            <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#1a1612' }}>{k.value}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878', marginTop: '0.2rem' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <div style={{ ...card, padding: '1.4rem', marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9c8878', margin: '0 0 1.2rem' }}>
          Revenue Over Time
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4732a" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#f4732a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9c8878', fontWeight: 700 }} />
            <Tooltip
              contentStyle={{ background: 'white', border: '1px solid rgba(244,115,42,0.15)', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}
              formatter={(v: number) => [`$${v}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#f4732a" strokeWidth={2.5} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payout Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #f4732a, #fbbf24)',
        borderRadius: '20px', padding: '1.2rem 1.6rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.2rem', color: '#fff'
      }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>$2,660.00 available</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.85 }}>Next payout on April 1, 2026</div>
        </div>
        <button style={{
          background: '#fff', color: '#f4732a', border: 'none', cursor: 'pointer',
          padding: '0.6rem 1.3rem', borderRadius: '100px', fontWeight: 900,
          fontSize: '0.85rem', fontFamily: 'Nunito, sans-serif'
        }}>
          Request Payout
        </button>
      </div>

      {/* Transactions */}
      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid rgba(244,115,42,0.08)' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', color: '#1a1612', margin: 0 }}>Recent Transactions</h3>
        </div>
        {TRANSACTIONS.map((tx, i) => (
          <div key={tx.id} style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.4rem',
            borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid rgba(244,115,42,0.08)' : 'none',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: tx.type === 'payout' ? '#f1f5f9' : tx.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: tx.type === 'payout' ? '#64748b' : '#fff',
              fontSize: tx.type === 'payout' ? '1rem' : '0.7rem', fontWeight: 900, flexShrink: 0
            }}>
              {tx.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '0.87rem', color: '#1a1612' }}>{tx.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>
                {tx.type === 'payout' ? 'Bank transfer' : `${tx.tier} membership`}
              </div>
            </div>
            {tx.tier && TIER_STYLE[tx.tier] && (
              <span style={{
                fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                borderRadius: '100px', background: TIER_STYLE[tx.tier].bg, color: TIER_STYLE[tx.tier].color
              }}>
                {tx.tier}
              </span>
            )}
            <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>{tx.date}</div>
            <div style={{
              fontWeight: 900, fontSize: '0.88rem', minWidth: '70px', textAlign: 'right',
              color: tx.amount.startsWith('+') ? '#16a34a' : '#ef4444'
            }}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}