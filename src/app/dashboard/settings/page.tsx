'use client'
import { useState } from 'react'
import { useUser } from '@/hooks'

export default function SettingsPage() {
  const { user } = useUser()
  const [tab, setTab] = useState<'profile' | 'tiers' | 'payouts'>('profile')

  const card: React.CSSProperties = {
    background: '#fff', borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
    padding: '1.6rem',
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '0.65rem 1rem',
    borderRadius: '12px', border: '1px solid rgba(244,115,42,0.2)',
    background: '#fffbf5', fontFamily: 'Nunito, sans-serif',
    fontSize: '0.88rem', fontWeight: 600, outline: 'none',
    color: '#1a1612', boxSizing: 'border-box',
  }

  const label: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 800,
    textTransform: 'uppercase', letterSpacing: '0.07em',
    color: '#9c8878', marginBottom: '0.4rem',
  }

  const TIERS = [
    { name: 'Fan',      price: '$9/mo',  color: '#60a5fa', emoji: '⭐', perks: ['Exclusive posts', 'Monthly Q&A', 'Discord access'] },
    { name: 'Superfan', price: '$19/mo', color: '#f4732a', emoji: '👑', perks: ['Everything in Fan', '1-on-1 message', 'Early access', 'Behind the scenes'] },
  ]

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '700px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: '0 0 0.3rem' }}>Settings</h1>
        <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>Manage your profile and preferences</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['profile', 'tiers', 'payouts'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.45rem 1.2rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '0.8rem',
            background: tab === t ? '#f4732a' : '#fff',
            color: tab === t ? '#fff' : '#9c8878',
            boxShadow: tab === t ? '0 4px 14px rgba(244,115,42,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
            textTransform: 'capitalize'
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div style={card}>
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#f4732a,#fbbf24)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', fontWeight: 900, color: '#fff', flexShrink: 0
            }}>
              {user?.user_metadata?.display_name?.[0]?.toUpperCase() || 'T'}
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612' }}>{user?.user_metadata?.display_name || 'Topraq Basyurt'}</div>
              <div style={{ fontSize: '0.8rem', color: '#9c8878', fontWeight: 600 }}>@{user?.username || 'topraq'}</div>
            </div>
            <button style={{
              marginLeft: 'auto', padding: '0.4rem 1rem', borderRadius: '100px',
              border: '1.5px solid rgba(244,115,42,0.3)', background: 'transparent',
              color: '#f4732a', fontFamily: 'Nunito, sans-serif', fontWeight: 800,
              fontSize: '0.78rem', cursor: 'pointer'
            }}>
              Change photo
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={label}>Display Name</span>
              <input style={input} defaultValue={user?.user_metadata?.display_name || 'Topraq Basyurt'} />
            </div>
            <div>
              <span style={label}>Username</span>
              <input style={input} defaultValue={user?.username || 'topraq'} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={label}>Bio</span>
            <textarea style={{ ...input, height: '90px', resize: 'none' as const }}
              defaultValue="Creator, storyteller, and community builder. Building my town one post at a time 🏡" />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={label}>Email</span>
            <input style={input} defaultValue={user?.email || 'topraq@email.com'} type="email" />
          </div>

          <button style={{
            background: '#f4732a', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '0.65rem 1.6rem', borderRadius: '100px', fontWeight: 900,
            fontSize: '0.88rem', fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
          }}>
            Save Changes
          </button>
        </div>
      )}

      {/* Tiers Tab */}
      {tab === 'tiers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{ ...card, display: 'flex', gap: '1.2rem' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: tier.color + '22', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0
              }}>
                {tier.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, fontSize: '1rem', color: '#1a1612' }}>{tier.name}</span>
                  <span style={{ fontWeight: 900, fontSize: '0.9rem', color: tier.color }}>{tier.price}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem' }}>
                  {tier.perks.map(perk => (
                    <span key={perk} style={{
                      fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                      borderRadius: '100px', background: '#fff0e6', color: '#f4732a'
                    }}>✓ {perk}</span>
                  ))}
                </div>
              </div>
              <button style={{
                alignSelf: 'center', padding: '0.4rem 1rem', borderRadius: '100px',
                border: '1.5px solid rgba(244,115,42,0.3)', background: 'transparent',
                color: '#f4732a', fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: '0.78rem', cursor: 'pointer', flexShrink: 0
              }}>
                Edit
              </button>
            </div>
          ))}
          <button style={{
            background: '#f4732a', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '0.65rem 1.6rem', borderRadius: '100px', fontWeight: 900,
            fontSize: '0.88rem', fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)', alignSelf: 'flex-start'
          }}>
            + Add Tier
          </button>
        </div>
      )}

      {/* Payouts Tab */}
      {tab === 'payouts' && (
        <div style={card}>
          <div style={{ marginBottom: '1.2rem' }}>
            <span style={label}>Bank Account</span>
            <input style={input} defaultValue="**** **** **** 4242" />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <span style={label}>Payout Schedule</span>
            <select style={{ ...input, cursor: 'pointer' }}>
              <option>Monthly (1st of each month)</option>
              <option>Weekly</option>
              <option>Manual</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={label}>Minimum Payout Amount</span>
            <input style={input} defaultValue="$50.00" />
          </div>
          <button style={{
            background: '#f4732a', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '0.65rem 1.6rem', borderRadius: '100px', fontWeight: 900,
            fontSize: '0.88rem', fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
          }}>
            Save Payout Settings
          </button>
        </div>
      )}
    </div>
  )
}