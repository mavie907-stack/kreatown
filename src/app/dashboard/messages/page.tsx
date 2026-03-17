// @ts-nocheck
'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'

const CONVERSATIONS = [
  { id: '1', name: 'Jenna Loves',  username: 'jenna_loves', lastMsg: 'Loved the last post! 🔥', time: '2m',  unread: 2, initials: 'JL', color: 'linear-gradient(135deg,#f4732a,#fbbf24)', tier: 'gold' },
  { id: '2', name: 'Mike K',       username: 'mikek90',     lastMsg: 'When is the next Q&A?',   time: '1h',  unread: 0, initials: 'MK', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)', tier: 'silver' },
  { id: '3', name: 'Sara Reads',   username: 'sara_reads',  lastMsg: 'Thanks for the reply!',   time: '3h',  unread: 1, initials: 'SR', color: 'linear-gradient(135deg,#34d399,#60a5fa)', tier: 'gold' },
  { id: '4', name: 'Luna Park',    username: 'lunapark',    lastMsg: 'Can\'t wait for the collab!', time: '1d', unread: 0, initials: 'LP', color: 'linear-gradient(135deg,#34d399,#fbbf24)', tier: 'gold' },
  { id: '5', name: 'Tom Nova',     username: 'tomnova',     lastMsg: 'Hey, just joined!',        time: '2d', unread: 0, initials: 'TN', color: 'linear-gradient(135deg,#f472b6,#f4732a)', tier: 'free' },
]

const MESSAGES: Record<string, { id: string; from: 'me' | 'them'; text: string; time: string }[]> = {
  '1': [
    { id: '1', from: 'them', text: 'Hey! I just saw your latest post about content strategy 🙌', time: '10:22' },
    { id: '2', from: 'me',   text: 'Thanks so much! Glad it resonated with you 😊', time: '10:24' },
    { id: '3', from: 'them', text: 'Loved the last post! 🔥', time: '10:25' },
  ],
  '2': [
    { id: '1', from: 'them', text: 'Hi! Big fan of your work', time: '9:00' },
    { id: '2', from: 'them', text: 'When is the next Q&A?', time: '9:01' },
    { id: '3', from: 'me',   text: 'Planning one for next week! Stay tuned 🎉', time: '9:15' },
  ],
  '3': [
    { id: '1', from: 'me',   text: 'Hey Sara! Thanks for being a gold member 👑', time: '8:00' },
    { id: '2', from: 'them', text: 'Thanks for the reply!', time: '8:05' },
  ],
}

const TIER_BADGE: Record<string, { bg: string; color: string }> = {
  gold:   { bg: '#fffbeb', color: '#d97706' },
  silver: { bg: '#f1f5f9', color: '#64748b' },
  free:   { bg: '#f0fdf4', color: '#16a34a' },
}

export default function MessagesPage() {
  const [activeId, setActiveId] = useState('1')
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState(MESSAGES)

  const active = CONVERSATIONS.find(c => c.id === activeId)!
  const messages = localMessages[activeId] || []

  const sendMessage = () => {
    if (!input.trim()) return
    setLocalMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), {
        id: Date.now().toString(), from: 'me', text: input.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]
    }))
    setInput('')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Nunito, sans-serif', overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{
        width: '280px', background: '#fff', borderRight: '1px solid rgba(244,115,42,0.1)',
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ padding: '1.5rem 1.2rem 1rem', borderBottom: '1px solid rgba(244,115,42,0.08)' }}>
          <h2 style={{ fontWeight: 900, fontSize: '1.1rem', color: '#1a1612', margin: 0 }}>Messages</h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {CONVERSATIONS.map(conv => {
            const badge = TIER_BADGE[conv.tier]
            const isActive = conv.id === activeId
            return (
              <div key={conv.id} onClick={() => setActiveId(conv.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1.2rem', cursor: 'pointer',
                background: isActive ? '#fff0e6' : 'transparent',
                borderLeft: isActive ? '3px solid #f4732a' : '3px solid transparent',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: conv.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '0.75rem', fontWeight: 900, flexShrink: 0, position: 'relative'
                }}>
                  {conv.initials}
                  {conv.unread > 0 && (
                    <span style={{
                      position: 'absolute', top: '-2px', right: '-2px',
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: '#f4732a', color: '#fff', fontSize: '0.6rem',
                      fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{conv.unread}</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1a1612' }}>{conv.name}</span>
                    <span style={{ fontSize: '0.68rem', color: '#9c8878', fontWeight: 600 }}>{conv.time}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9c8878', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.lastMsg}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fffbf5' }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem', background: '#fff',
          borderBottom: '1px solid rgba(244,115,42,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.75rem'
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: active.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '0.72rem', fontWeight: 900
          }}>{active.initials}</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#1a1612' }}>{active.name}</div>
            <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>@{active.username}</div>
          </div>
          <span style={{
            marginLeft: '0.5rem', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem',
            borderRadius: '100px', background: TIER_BADGE[active.tier].bg, color: TIER_BADGE[active.tier].color
          }}>
            {active.tier}
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '65%', padding: '0.65rem 1rem', borderRadius: '16px',
                background: msg.from === 'me' ? '#f4732a' : '#fff',
                color: msg.from === 'me' ? '#fff' : '#1a1612',
                fontWeight: 600, fontSize: '0.88rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                borderBottomRightRadius: msg.from === 'me' ? '4px' : '16px',
                borderBottomLeftRadius: msg.from === 'them' ? '4px' : '16px',
              }}>
                {msg.text}
                <div style={{ fontSize: '0.65rem', opacity: 0.65, marginTop: '0.25rem', textAlign: 'right' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: '1rem 1.5rem', background: '#fff',
          borderTop: '1px solid rgba(244,115,42,0.1)',
          display: 'flex', gap: '0.75rem', alignItems: 'center'
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1, padding: '0.65rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(244,115,42,0.2)', background: '#fffbf5',
              fontFamily: 'Nunito, sans-serif', fontSize: '0.88rem',
              fontWeight: 600, outline: 'none', color: '#1a1612'
            }}
          />
          <button onClick={sendMessage} style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: '#f4732a', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)', flexShrink: 0
          }}>
            <Send size={16} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  )
}