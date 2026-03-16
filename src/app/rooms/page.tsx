// src/app/rooms/page.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useUser } from '@/hooks'

const ROOMS = [
  {
    id: 'lobby',
    icon: '🛎️',
    name: 'Hotel Lobby',
    tier: 'free',
    tierLabel: '🌱 Free',
    atm: 'Warm candlelight · Soft piano · Crystal chandeliers',
    atmColor: '#f5d58a',
    online: 12,
    desc: 'Where every story begins — open to all guests',
    gradient: "url('/rooms/lobby.jpg') center/cover",
    particles: ['#f5d58a','#c9952a','#f4732a'],
    messages: [
      { avatar:'🌸', name:'Selin K',  badge:'free',   time:'2m',  text:'This lobby is gorgeous, love the vibe here!' },
      { avatar:'🎸', name:'Cem A',    badge:'free',   time:'5m',  text:"Just joined the town, excited to explore!" },
      { avatar:'🌿', name:'Elif Y',   badge:'silver', time:'8m',  text:'Welcome Cem! The restaurant is amazing btw 🍽️' },
      { avatar:'🔥', name:'Berk D',   badge:'gold',   time:'12m', text:'Gold Suite is where the real magic happens 👑' },
    ]
  },
  {
    id: 'restaurant',
    icon: '🍽️',
    name: 'The Restaurant',
    tier: 'silver',
    tierLabel: '⭐ Silver',
    atm: 'Golden mood lighting · Jazz quartet · Dark marble tables',
    atmColor: '#c9952a',
    online: 7,
    desc: 'Intimate conversations over fine cuisine',
    gradient: "url('/rooms/restaurant.jpg') center/cover",
    particles: ['#c9952a','#8b4d00','#f5d58a'],
    messages: [
      { avatar:'🌿', name:'Elif Y',  badge:'silver', time:'3m',  text:'The content dropped last week was fire 🔥' },
      { avatar:'🎨', name:'Mia T',   badge:'silver', time:'6m',  text:'Agreed! The strategy breakdown was so detailed.' },
      { avatar:'⭐', name:'Kerem S', badge:'gold',   time:'10m', text:"Wait till you see what's coming in the Gold Suite..." },
    ]
  },
  {
    id: 'superior',
    icon: '🛏️',
    name: 'Superior Room',
    tier: 'gold',
    tierLabel: '👑 Gold',
    atm: 'Ring chandelier glow · Mountain view · Warm leather',
    atmColor: '#e8d5b0',
    online: 4,
    desc: 'Exclusive access for Gold members',
    gradient: "url('/rooms/superior.jpg') center/cover",
    particles: ['#e8d5b0','#c9952a','#ffffff'],
    messages: [
      { avatar:'🔥', name:'Berk D',  badge:'gold',   time:'1m', text:'The Q&A doc shared today — absolute gold 📋' },
      { avatar:'💡', name:'Ayşe M',  badge:'gold',   time:'4m', text:'That part about content batching changed my workflow!' },
      { avatar:'🎯', name:'Deniz K', badge:'palace', time:'7m', text:"Live session from the pool tonight 🌊" },
    ]
  },
  {
    id: 'resting',
    icon: '🛋️',
    name: 'Resting Lounge',
    tier: 'gold',
    tierLabel: '👑 Gold',
    atm: 'Brushed brass · Walnut wood · Sputnik chandelier glow',
    atmColor: '#c9952a',
    online: 3,
    desc: 'Quiet conversations in a luxury setting',
    gradient: "url('/rooms/resting.jpg') center/cover",
    particles: ['#c9952a','#f5d58a','#e8c87a'],
    messages: [
      { avatar:'💎', name:'Lara S',  badge:'gold', time:'5m', text:'Love having a quieter corner to chat in 🌙' },
      { avatar:'🌙', name:'Tarık B', badge:'gold', time:'9m', text:'This is my favorite room, the vibe is perfect.' },
    ]
  },
  {
    id: 'pool',
    icon: '🌊',
    name: 'Thermal Pool',
    tier: 'palace',
    tierLabel: '🏯 Palace',
    atm: 'Marble columns · Golden underwater glow · Steam rising',
    atmColor: '#4ecdc4',
    online: 2,
    desc: 'Palace members only — the most exclusive space',
    gradient: "url('/rooms/pool.jpg') center/cover",
    particles: ['#4ecdc4','#7c5cbf','#a8edea'],
    messages: [
      { avatar:'🏯', name:'Kaan Ö',  badge:'palace', time:'2m', text:'Just dropped the strategy session recording 🎯' },
      { avatar:'👑', name:'Naz A',   badge:'palace', time:'4m', text:'Already watched it twice. Life changing content.' },
      { avatar:'🌟', name:'Creator', badge:'palace', time:'6m', text:'Welcome to the pool everyone 🌊 next session is Tuesday' },
    ]
  },
]

const TIER_ORDER = ['free','silver','gold','palace']

const BADGE: Record<string, { bg:string; color:string }> = {
  free:   { bg:'rgba(45,171,128,0.15)',   color:'#2dab80' },
  silver: { bg:'rgba(143,163,181,0.15)',  color:'#8fa3b5' },
  gold:   { bg:'rgba(201,149,42,0.15)',   color:'#c9952a' },
  palace: { bg:'rgba(124,92,191,0.15)',   color:'#a98cdf' },
}

const LOCK_CONFIG: Record<string, { icon:string; title:string; desc:string; btnText:string; btnBg:string; btnColor:string }> = {
  silver: { icon:'⭐', title:'Silver Members Only',  desc:'Join the Inside the House tier to access the Restaurant — exclusive conversations await.', btnText:'⭐ Upgrade to Silver · $9/mo',  btnBg:'rgba(143,163,181,0.2)', btnColor:'#8fa3b5' },
  gold:   { icon:'👑', title:'Gold Suite Access',    desc:'The Superior Room and Resting Lounge are reserved for Gold members. Unlock strategy sessions, DMs, and more.', btnText:'👑 Upgrade to Gold · $19/mo',    btnBg:'linear-gradient(135deg,#c9952a,#f5d58a)', btnColor:'#3a2000' },
  palace: { icon:'🏯', title:'Palace Access Only',   desc:'The Thermal Pool is the most exclusive space in the town. Palace members only.', btnText:'🏯 Enter the Palace · $49/mo', btnBg:'linear-gradient(135deg,#7c5cbf,#a98cdf)', btnColor:'white' },
}

export default function RoomsPage() {
  const { user } = useUser()
  const [currentRoom, setCurrentRoom] = useState('lobby')
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [lockedRoom, setLockedRoom] = useState<string|null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const myTier = 'palace'

  const room = ROOMS.find(r => r.id === currentRoom)!
  const displayName = user?.user_metadata?.display_name || user?.user_metadata?.username || 'You'

  useEffect(() => {
    if (room) setMessages([...room.messages])
  }, [currentRoom])

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  function selectRoom(roomId: string) {
    const r = ROOMS.find(x => x.id === roomId)!
    const myIdx = TIER_ORDER.indexOf(myTier)
    const roomIdx = TIER_ORDER.indexOf(r.tier)
    if (myIdx < roomIdx) { setLockedRoom(roomId); return }
    setCurrentRoom(roomId)
    setLockedRoom(null)
  }

  function sendMessage() {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      avatar: '🎨', name: displayName, badge: myTier, time: 'just now', text: input.trim(), me: true
    }])
    setInput('')
  }

  const lockedConfig = lockedRoom ? LOCK_CONFIG[ROOMS.find(r => r.id === lockedRoom)?.tier ?? 'silver'] : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }
        body { font-family: 'DM Sans', sans-serif; background: #0a0806; color: #e8d5b0; }
        .rooms-app { display: flex; height: 100vh; width: 100%; position: relative; overflow: hidden; }
        .room-bg { position: absolute; inset: 0; transition: all 0.8s ease; z-index: 0; }
        @keyframes particleFloat { 0%{transform:translateY(100vh);opacity:0} 10%{opacity:0.6} 90%{opacity:0.3} 100%{transform:translateY(-20px) translateX(30px);opacity:0} }
        .particle { position: absolute; border-radius: 50%; animation: particleFloat linear infinite; opacity: 0; pointer-events: none; }
        .rooms-sidebar { position: relative; z-index: 10; width: 240px; flex-shrink: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; height: 100vh; }
        .sidebar-logo { padding: 1.5rem 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #f5d58a; }
        .sidebar-logo span { color: #f4732a; }
        .rooms-label { padding: 1rem 1.25rem 0.4rem; font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); font-family: 'DM Mono', monospace; }
        .room-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 1.25rem; cursor: pointer; border-left: 2px solid transparent; transition: all 0.2s; color: rgba(255,255,255,0.5); font-size: 0.82rem; }
        .room-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
        .room-item.active { border-left-color: #f4732a; background: rgba(244,115,42,0.1); color: #f5d58a; }
        .room-item.locked { opacity: 0.4; cursor: not-allowed; }
        .room-name-text { font-size: 0.82rem; }
        .room-tier-text { font-size: 0.62rem; color: rgba(255,255,255,0.35); margin-top: 0.1rem; font-family: 'DM Mono', monospace; }
        .room-item.active .room-tier-text { color: rgba(245,213,138,0.6); }
        .room-count { font-size: 0.65rem; background: rgba(255,255,255,0.1); padding: 0.1rem 0.4rem; border-radius: 100px; color: rgba(255,255,255,0.4); margin-left: auto; }
        .room-item.active .room-count { background: rgba(244,115,42,0.2); color: #f4732a; }
        .online-dot { width: 6px; height: 6px; border-radius: 50%; background: #2dab80; flex-shrink: 0; }
        .sidebar-back { padding: 0.75rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .back-link { font-size: 0.75rem; color: rgba(255,255,255,0.35); text-decoration: none; display: flex; align-items: center; gap: 0.4rem; transition: color 0.2s; }
        .back-link:hover { color: rgba(255,255,255,0.65); }
        .sidebar-footer { margin-top: auto; padding: 1rem 1.25rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 0.6rem; }
        .user-avatar-sm { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #7c5cbf, #f4732a); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }
        .user-name-sm { font-size: 0.78rem; color: rgba(255,255,255,0.75); }
        .user-tier-sm { font-size: 0.6rem; color: #f5d58a; font-family: 'DM Mono', monospace; }
        .rooms-main { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 5; height: 100vh; min-width: 0; }
        .room-header { padding: 1.25rem 1.75rem; background: rgba(0,0,0,0.3); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .room-title-main { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #f5d58a; }
        .room-desc-main { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.15rem; }
        .online-badge { font-size: 0.72rem; color: #2dab80; font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 0.4rem; }
        .messages-container { flex: 1; overflow-y: auto; padding: 1.5rem 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
        .messages-container::-webkit-scrollbar { width: 3px; }
        .messages-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        .msg-row { display: flex; gap: 0.75rem; align-items: flex-start; animation: msgIn 0.3s ease; }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
        .msg-row.me { flex-direction: row-reverse; }
        .msg-avatar-wrap { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; background: rgba(255,255,255,0.08); margin-top: 2px; }
        .msg-body { flex: 1; min-width: 0; }
        .msg-row.me .msg-body { text-align: right; }
        .msg-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; flex-wrap: wrap; }
        .msg-row.me .msg-meta { flex-direction: row-reverse; }
        .msg-sender { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.85); }
        .msg-badge { font-size: 0.58rem; padding: 0.1rem 0.4rem; border-radius: 100px; font-family: 'DM Mono', monospace; text-transform: uppercase; }
        .msg-time { font-size: 0.6rem; color: rgba(255,255,255,0.25); font-family: 'DM Mono', monospace; }
        .msg-text { font-size: 0.85rem; color: rgba(255,255,255,0.72); line-height: 1.55; }
        .msg-row.me .msg-text { background: rgba(244,115,42,0.15); border-radius: 12px 12px 2px 12px; display: inline-block; padding: 0.5rem 0.75rem; text-align: left; }
        .atm-bar { padding: 0.6rem 1.75rem; display: flex; align-items: center; gap: 0.75rem; font-size: 0.7rem; color: rgba(255,255,255,0.3); font-family: 'DM Mono', monospace; border-top: 1px solid rgba(255,255,255,0.04); background: rgba(0,0,0,0.2); flex-shrink: 0; }
        .atm-dot-bar { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .input-area { padding: 1rem 1.75rem 1.25rem; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
        .input-wrap { display: flex; gap: 0.75rem; align-items: center; background: rgba(255,255,255,0.06); border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); padding: 0.5rem 0.5rem 0.5rem 1.25rem; transition: border-color 0.2s; }
        .input-wrap:focus-within { border-color: rgba(244,115,42,0.4); }
        .msg-input { flex: 1; background: none; border: none; outline: none; color: rgba(255,255,255,0.85); font-size: 0.875rem; font-family: 'DM Sans', sans-serif; caret-color: #f4732a; }
        .msg-input::placeholder { color: rgba(255,255,255,0.2); }
        .send-btn { width: 34px; height: 34px; border-radius: 50%; background: #f4732a; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; color: white; font-size: 14px; }
        .send-btn:hover { background: #ff9555; transform: scale(1.05); }
        .locked-overlay { position: absolute; inset: 0; z-index: 20; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; }
        .lock-card { background: rgba(20,15,10,0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; padding: 2.5rem 2rem; text-align: center; max-width: 340px; width: 90%; }
        .lock-icon-big { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
        .lock-title-big { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #f5d58a; margin-bottom: 0.5rem; }
        .lock-desc-big { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem; line-height: 1.6; }
        .lock-upgrade-btn { padding: 0.7rem 1.75rem; border-radius: 100px; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; display: inline-block; text-decoration: none; }
        .lock-upgrade-btn:hover { transform: translateY(-2px); }
        .lock-dismiss { margin-top: 0.75rem; font-size: 0.78rem; color: rgba(255,255,255,0.3); cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }
        .lock-dismiss:hover { color: rgba(255,255,255,0.6); }
        @media (max-width: 640px) { .rooms-sidebar { display: none; } }
      `}</style>

      <div className="rooms-app">
        <div className="room-bg" style={{ background: room.gradient }} />

        {/* Particles */}
        <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', overflow:'hidden' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="particle" style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: (i * 6.25) + '%',
              background: room.particles[i % room.particles.length],
              animationDuration: (Math.random() * 8 + 6) + 's',
              animationDelay: (i * 0.4) + 's',
            }} />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="rooms-sidebar">
          <div className="sidebar-logo">Krea<span>Town</span></div>
          <div className="sidebar-back">
            <Link href="/dashboard" className="back-link">← Back to dashboard</Link>
          </div>
          <div className="rooms-label">Rooms</div>
          {ROOMS.map(r => {
            const myIdx = TIER_ORDER.indexOf(myTier)
            const roomIdx = TIER_ORDER.indexOf(r.tier)
            const isLocked = myIdx < roomIdx
            const isActive = r.id === currentRoom
            return (
              <div key={r.id} className={`room-item${isActive?' active':''}${isLocked?' locked':''}`} onClick={() => selectRoom(r.id)}>
                <span style={{ fontSize:'1rem', width:20, textAlign:'center', flexShrink:0 }}>{r.icon}</span>
                <div style={{ flex:1 }}>
                  <div className="room-name-text">{r.name}</div>
                  <div className="room-tier-text">{r.tierLabel}</div>
                </div>
                <span className="room-count">{r.online}</span>
                {isActive && !isLocked && <div className="online-dot" />}
              </div>
            )
          })}
          <div className="sidebar-footer">
            <div className="user-avatar-sm">🎨</div>
            <div>
              <div className="user-name-sm">{displayName}</div>
              <div className="user-tier-sm">🏯 Palace Member</div>
            </div>
            <div className="online-dot" style={{ marginLeft:'auto' }} />
          </div>
        </aside>

        {/* Main */}
        <main className="rooms-main">
          <div className="room-header">
            <div>
              <div className="room-title-main">{room.icon} {room.name}</div>
              <div className="room-desc-main">{room.desc}</div>
            </div>
            <div className="online-badge">
              <div className="online-dot" />
              {room.online} online
            </div>
          </div>

          <div className="messages-container" ref={messagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row${msg.me?' me':''}`}>
                <div className="msg-avatar-wrap" style={{ background: msg.me ? 'linear-gradient(135deg,#7c5cbf,#f4732a)' : 'rgba(255,255,255,0.08)' }}>
                  {msg.avatar}
                </div>
                <div className="msg-body">
                  <div className="msg-meta">
                    <span className="msg-sender">{msg.name}</span>
                    <span className="msg-badge" style={{ background: BADGE[msg.badge]?.bg, color: BADGE[msg.badge]?.color }}>
                      {msg.badge}
                    </span>
                    <span className="msg-time">{msg.time} ago</span>
                  </div>
                  <div className="msg-text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="atm-bar">
            <div className="atm-dot-bar" style={{ background: room.atmColor }} />
            {room.atm}
          </div>

          <div className="input-area">
            <div className="input-wrap">
              <input className="msg-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==='Enter') sendMessage() }} placeholder={`Say something in ${room.name.toLowerCase()}...`} />
              <button className="send-btn" onClick={sendMessage}>➤</button>
            </div>
          </div>

          {lockedRoom && lockedConfig && (
            <div className="locked-overlay" onClick={e => { if (e.target===e.currentTarget) setLockedRoom(null) }}>
              <div className="lock-card">
                <span className="lock-icon-big">{lockedConfig.icon}</span>
                <div className="lock-title-big">{lockedConfig.title}</div>
                <div className="lock-desc-big">{lockedConfig.desc}</div>
                <Link href="/auth/register" className="lock-upgrade-btn" style={{ background: lockedConfig.btnBg, color: lockedConfig.btnColor }}>
                  {lockedConfig.btnText}
                </Link>
                <br />
                <button className="lock-dismiss" onClick={() => setLockedRoom(null)}>Maybe later</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
