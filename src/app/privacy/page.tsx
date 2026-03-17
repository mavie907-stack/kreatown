// @ts-nocheck
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — KreaTown',
  description: 'How KreaTown collects, uses, and protects your personal information.',
}

const sections = [
  {
    icon: '👋',
    title: 'Introduction',
    content: [
      { type: 'p', text: "Welcome to KreaTown. We're committed to protecting your personal information and being transparent about how we use it. This policy explains what data we collect, why we collect it, and how you can control it." },
      { type: 'p', text: 'By using KreaTown, you agree to the collection and use of information in accordance with this policy.' },
    ],
  },
  {
    icon: '📦',
    title: 'Information We Collect',
    content: [
      { type: 'p', text: 'We collect information you provide directly to us, including:' },
      { type: 'ul', items: [
        'Name, email address, and password when you register',
        'Profile information such as username, bio, and profile photo',
        'Payment information processed securely through QNB',
        'Content you post, upload, or share on the platform',
        'Messages sent between creators and fans',
        'Communications with our support team',
      ]},
      { type: 'p', text: 'We also collect information automatically, such as device info, IP address, browser type, and usage data.' },
    ],
  },
  {
    icon: '🎯',
    title: 'How We Use Your Information',
    content: [
      { type: 'p', text: 'We use the information we collect to:' },
      { type: 'ul', items: [
        'Provide, operate, and improve the KreaTown platform',
        'Process payments and send payout notifications',
        'Send you updates, newsletters, and platform announcements',
        'Respond to your questions and support requests',
        'Monitor and analyze usage trends to improve your experience',
        'Detect and prevent fraud or abuse',
      ]},
    ],
  },
  {
    icon: '🤝',
    title: 'Sharing Your Information',
    content: [
      { type: 'p', text: 'We do not sell your personal information. We may share your data with:' },
      { type: 'ul', items: [
        'QNB Finansbank — for secure payment processing and creator payouts',
        'Supabase — our database and authentication provider',
        'Cloudinary — for media storage and delivery',
        'Pusher — for real-time messaging features',
        'Resend — for transactional email delivery',
        'Law enforcement when required by applicable law',
      ]},
    ],
  },
  {
    icon: '🔒',
    title: 'Data Security',
    content: [
      { type: 'p', text: 'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. All data is encrypted in transit using SSL/TLS. Passwords are hashed and never stored in plain text.' },
      { type: 'p', text: "However, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your KreaTown account." },
    ],
  },
  {
    icon: '⚙️',
    title: 'Your Rights & Choices',
    content: [
      { type: 'p', text: 'You have the right to:' },
      { type: 'ul', items: [
        'Access and download your personal data at any time',
        'Correct inaccurate information in your profile',
        'Delete your account and associated data',
        'Opt out of marketing emails at any time',
        'Request a copy of the data we hold about you',
      ]},
      { type: 'p', text: 'To exercise any of these rights, contact us at privacy@kreatown.com' },
    ],
  },
  {
    icon: '🍪',
    title: 'Cookies',
    content: [
      { type: 'p', text: 'We use cookies and similar tracking technologies to improve your experience on KreaTown. You can control cookies through your browser settings, though disabling them may affect some platform features.' },
    ],
  },
  {
    icon: '✉️',
    title: 'Contact Us',
    content: [
      { type: 'p', text: 'If you have any questions about this Privacy Policy, please reach out to us at privacy@kreatown.com' },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#fffbf5', color: '#1a1612', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Nunito:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { line-height:1.8; }
        .nav-logo { font-family:'Cabinet Grotesk',sans-serif; font-weight:800; font-size:1.4rem; color:#1a1612; text-decoration:none; }
        .nav-back:hover { color:#f4732a !important; }
        .section-title { font-family:'Cabinet Grotesk',sans-serif; font-size:1.25rem; font-weight:800; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem; }
        .icon-wrap { width:28px; height:28px; background:#fff0e6; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0; }
        p { color:#3d3530; margin-bottom:0.8rem; font-size:0.97rem; }
        ul { list-style:none; padding:0; margin:0.5rem 0; }
        li { padding:0.3rem 0 0.3rem 1.4rem; position:relative; color:#3d3530; font-size:0.97rem; }
        li::before { content:'→'; position:absolute; left:0; color:#f4732a; font-weight:700; }
        a { color:#f4732a; text-decoration:none; }
      `}</style>

      {/* Nav */}
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.2rem 2rem', borderBottom:'1px solid #ede8e3', background:'#fffbf5', position:'sticky', top:0, zIndex:100 }}>
        <Link href="/" className="nav-logo">KreaTown<span style={{ color:'#f4732a' }}>.</span></Link>
        <Link href="/" className="nav-back" style={{ fontSize:'0.9rem', fontWeight:600, color:'#9c8878', textDecoration:'none', transition:'color .2s' }}>← Back to home</Link>
      </nav>

      {/* Hero */}
      <div style={{ background:'#fff0e6', borderBottom:'1px solid #ede8e3', padding:'4rem 2rem 3rem', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'#f4732a', color:'white', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.3rem 0.9rem', borderRadius:'999px', marginBottom:'1.2rem' }}>Legal</div>
        <h1 style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, marginBottom:'0.8rem' }}>Privacy Policy</h1>
        <p style={{ color:'#9c8878', fontSize:'1rem', fontWeight:500 }}>Last updated: March 2026 · Effective immediately</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth:760, margin:'0 auto', padding:'3rem 2rem 5rem' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom:'2.5rem', paddingBottom:'2.5rem', borderBottom: i < sections.length - 1 ? '1px solid #ede8e3' : 'none' }}>
            <div className="section-title">
              <span className="icon-wrap">{section.icon}</span>
              {section.title}
            </div>
            {section.content.map((block: any, j) => (
              block.type === 'p'
                ? <p key={j}>{block.text.includes('@') ? <>{block.text.split('@')[0]}<a href={`mailto:${block.text.split(' ').find((w: string) => w.includes('@'))}`}>{block.text.split(' ').find((w: string) => w.includes('@'))}</a></> : block.text}</p>
                : <ul key={j}>{block.items.map((item: string, k: number) => <li key={k}>{item}</li>)}</ul>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign:'center', padding:'2rem', borderTop:'1px solid #ede8e3', fontSize:'0.85rem', color:'#9c8878', fontWeight:600 }}>
        <p>© 2026 KreaTown. Where creators belong. · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <a href="mailto:hello@kreatown.com">Contact</a></p>
      </footer>
    </div>
  )
}

