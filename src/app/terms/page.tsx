import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — KreaTown',
  description: 'KreaTown terms of service — read before using the platform.',
}

const sections = [
  {
    icon: '👋',
    title: 'Welcome to KreaTown',
    content: [
      { type: 'p', text: 'These Terms of Service govern your use of the KreaTown platform. By creating an account or using our services, you agree to be bound by these terms. Please read them carefully.' },
      { type: 'p', text: 'If you do not agree to these terms, please do not use KreaTown.' },
    ],
  },
  {
    icon: '🏡',
    title: 'Your Account',
    content: [
      { type: 'p', text: 'To use KreaTown you must:' },
      { type: 'ul', items: [
        'Be at least 18 years old',
        'Provide accurate and complete registration information',
        'Keep your password secure and confidential',
        'Be responsible for all activity that occurs under your account',
        'Notify us immediately of any unauthorized use of your account',
      ]},
      { type: 'p', text: 'You may not create multiple accounts or transfer your account to another person without our consent.' },
    ],
  },
  {
    icon: '🎨',
    title: 'Content & Conduct',
    content: [
      { type: 'p', text: 'You are solely responsible for the content you post on KreaTown. You agree not to post content that:' },
      { type: 'ul', items: [
        'Is illegal, harmful, threatening, or abusive',
        "Infringes on any third party's intellectual property rights",
        'Contains spam, malware, or deceptive practices',
        'Harasses, bullies, or discriminates against others',
        'Violates any applicable laws or regulations',
      ]},
      { type: 'p', text: 'KreaTown reserves the right to remove content and suspend accounts that violate these terms.' },
    ],
  },
  {
    icon: '💰',
    title: 'Payments & Fees',
    content: [
      { type: 'p', text: 'KreaTown charges a platform fee on creator earnings based on your subscription plan:' },
      { type: 'ul', items: [
        'Starter — Free for 3 months, then $19/mo + 5% revenue share',
        'Pro — $29/mo + 5% revenue share',
        'Studio — $49/mo + 3% revenue share',
      ]},
      { type: 'p', text: 'All payments are processed securely through QNB Finansbank. KreaTown is not responsible for disputes between creators and their subscribers. Payouts are subject to QNB terms and conditions.' },
    ],
  },
  {
    icon: '🔄',
    title: 'Subscriptions & Refunds',
    content: [
      { type: 'p', text: 'KreaTown subscriptions renew automatically unless cancelled. You may cancel your plan at any time from your account settings. Cancellations take effect at the end of the current billing period.' },
      { type: 'p', text: 'We generally do not offer refunds for partial months. If you believe you were charged in error, contact us at billing@kreatown.com within 14 days.' },
    ],
  },
  {
    icon: '🛡️',
    title: 'Intellectual Property',
    content: [
      { type: 'p', text: 'You retain ownership of all content you create and post on KreaTown. By posting content, you grant KreaTown a non-exclusive, royalty-free license to display and distribute your content on the platform.' },
      { type: 'p', text: 'The KreaTown name, logo, and platform design are the intellectual property of KreaTown and may not be used without our written permission.' },
    ],
  },
  {
    icon: '⚠️',
    title: 'Limitation of Liability',
    content: [
      { type: 'p', text: 'KreaTown is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including loss of earnings, data, or business opportunities.' },
      { type: 'p', text: 'Our total liability to you shall not exceed the amount you paid to KreaTown in the 12 months preceding the claim.' },
    ],
  },
  {
    icon: '📝',
    title: 'Changes to These Terms',
    content: [
      { type: 'p', text: 'We may update these Terms from time to time. We will notify you of significant changes via email or a prominent notice on the platform. Continued use of KreaTown after changes constitutes acceptance of the new terms.' },
    ],
  },
  {
    icon: '✉️',
    title: 'Contact Us',
    content: [
      { type: 'p', text: 'For questions about these Terms of Service, please contact us at legal@kreatown.com' },
    ],
  },
]

export default function TermsPage() {
  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:'#fffbf5', color:'#1a1612', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Nunito:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .section-title { font-family:'Cabinet Grotesk',sans-serif; font-size:1.25rem; font-weight:800; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem; }
        .icon-wrap { width:28px; height:28px; background:#fff0e6; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0; }
        p { color:#3d3530; margin-bottom:0.8rem; font-size:0.97rem; line-height:1.8; }
        ul { list-style:none; padding:0; margin:0.5rem 0; }
        li { padding:0.3rem 0 0.3rem 1.4rem; position:relative; color:#3d3530; font-size:0.97rem; }
        li::before { content:'→'; position:absolute; left:0; color:#f4732a; font-weight:700; }
        a { color:#f4732a; text-decoration:none; }
        .nav-back:hover { color:#f4732a !important; }
      `}</style>

      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.2rem 2rem', borderBottom:'1px solid #ede8e3', background:'#fffbf5', position:'sticky', top:0, zIndex:100 }}>
        <Link href="/" style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontWeight:800, fontSize:'1.4rem', color:'#1a1612', textDecoration:'none' }}>
          KreaTown<span style={{ color:'#f4732a' }}>.</span>
        </Link>
        <Link href="/" className="nav-back" style={{ fontSize:'0.9rem', fontWeight:600, color:'#9c8878', textDecoration:'none' }}>← Back to home</Link>
      </nav>

      <div style={{ background:'#fff0e6', borderBottom:'1px solid #ede8e3', padding:'4rem 2rem 3rem', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'#f4732a', color:'white', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.3rem 0.9rem', borderRadius:'999px', marginBottom:'1.2rem' }}>Legal</div>
        <h1 style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, marginBottom:'0.8rem' }}>Terms of Service</h1>
        <p style={{ color:'#9c8878', fontSize:'1rem', fontWeight:500 }}>Last updated: March 2026 · Effective immediately</p>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'3rem 2rem 5rem' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom:'2.5rem', paddingBottom:'2.5rem', borderBottom: i < sections.length - 1 ? '1px solid #ede8e3' : 'none' }}>
            <div className="section-title">
              <span className="icon-wrap">{section.icon}</span>
              {section.title}
            </div>
            {section.content.map((block: any, j) => (
              block.type === 'p'
                ? <p key={j}>{block.text}</p>
                : <ul key={j}>{block.items.map((item: string, k: number) => <li key={k}>{item}</li>)}</ul>
            ))}
          </div>
        ))}
      </div>

      <footer style={{ textAlign:'center', padding:'2rem', borderTop:'1px solid #ede8e3', fontSize:'0.85rem', color:'#9c8878', fontWeight:600 }}>
        <p>© 2026 KreaTown. Where creators belong. · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <a href="mailto:hello@kreatown.com">Contact</a></p>
      </footer>
    </div>
  )
}

