'use client'
import { useEffect } from 'react'

export default function LandingPage() {
  useEffect(() => {
    const btn = document.getElementById('hamBtn')
    const menu = document.getElementById('mobileMenu')
    if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('open'))
  }, [])

  return (
    <iframe
      srcDoc={srcDoc}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="KreaTown"
    />
<<<<<<< HEAD
  )
}

const srcDoc = `<!DOCTYPE html>
```

Then open your `index.html`, copy everything from `<!DOCTYPE html>` to the end, paste it after that last backtick line.

Then close the file with just this on the very last line:
```
`
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--brown);
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(255,251,245,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(244,115,42,0.12);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 700;
    color: var(--brown);
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links a {
    font-size: 0.875rem; font-weight: 400; color: var(--muted);
    text-decoration: none; transition: color 0.2s;
    letter-spacing: 0.01em;
  }
  .nav-links a:hover { color: var(--brown); }
  .btn-nav {
    background: var(--orange); color: white;
    padding: 0.6rem 1.4rem; border-radius: 100px;
    font-size: 0.875rem; font-weight: 500;
    text-decoration: none; transition: all 0.2s;
    box-shadow: 0 2px 12px rgba(244,115,42,0.3);
  }
  .btn-nav:hover { background: var(--orange-light); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(244,115,42,0.4); }
  .hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    padding: 4px; background: none; border: none;
  }
  .hamburger span { width: 22px; height: 2px; background: var(--brown); border-radius: 2px; transition: all .25s; display: block; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: translateX(-8px); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-menu {
    display: none; position: fixed; top: 56px; left: 0; right: 0; z-index: 99;
    background: rgba(255,251,245,0.98); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(244,115,42,0.12);
    flex-direction: column; padding: 1rem 1.25rem;
    gap: 0.25rem;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-size: 1rem; color: var(--brown); text-decoration: none;
    padding: 0.65rem 0; border-bottom: 1px solid rgba(156,136,120,0.1);
    font-weight: 400;
  }
  .mobile-menu a:last-child { border-bottom: none; color: var(--orange); font-weight: 500; }
  @media (max-width: 600px) {
    .hamburger { display: flex; }
    .btn-nav { display: none; }
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 8rem 3rem 4rem;
    gap: 3rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 60%; height: 100%;
    background: radial-gradient(ellipse at 70% 40%, rgba(244,115,42,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--orange-pale); border: 1px solid rgba(244,115,42,0.2);
    color: var(--orange); padding: 0.35rem 0.9rem;
    border-radius: 100px; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .hero-eyebrow::before { content: '🏡'; font-size: 0.9rem; }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 900; line-height: 1.08;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  .hero-title em {
    font-style: normal;
    background: linear-gradient(135deg, var(--orange), var(--gold));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 1.1rem; color: var(--muted); line-height: 1.7;
    max-width: 480px; margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .hero-ctas { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--orange); color: white;
    padding: 0.9rem 2rem; border-radius: 100px;
    font-size: 0.95rem; font-weight: 500;
    text-decoration: none; transition: all 0.25s;
    box-shadow: 0 4px 20px rgba(244,115,42,0.35);
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(244,115,42,0.45); }
  .btn-secondary {
    color: var(--brown); font-size: 0.95rem; font-weight: 500;
    text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;
    border-bottom: 1px solid var(--orange); padding-bottom: 2px;
    transition: gap 0.2s;
  }
  .btn-secondary:hover { gap: 0.7rem; }

  .hero-stats {
    display: flex; gap: 2.5rem; margin-top: 3.5rem;
    padding-top: 2rem; border-top: 1px solid rgba(156,136,120,0.2);
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 700; color: var(--brown);
    display: block; letter-spacing: -0.02em;
  }
  .stat-label { font-size: 0.8rem; color: var(--muted); letter-spacing: 0.02em; }

  /* HERO VISUAL — TOWN ILLUSTRATION */
  .hero-visual {
    position: relative; display: flex; align-items: center; justify-content: center;
  }
  .town-container {
    position: relative; width: 100%; max-width: 560px;
    aspect-ratio: 4/5;
  }
  .town-img {
    width: 100%; height: 100%; object-fit: cover;
    border-radius: 2rem;
    box-shadow: 0 32px 80px rgba(26,22,18,0.2);
  }
  .town-badge {
    position: absolute;
    background: white; border-radius: 1rem;
    padding: 0.75rem 1.1rem; box-shadow: 0 8px 32px rgba(26,22,18,0.15);
    display: flex; align-items: center; gap: 0.75rem;
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .town-badge.b1 { top: 12%; left: -8%; animation-delay: 0s; }
  .town-badge.b2 { bottom: 22%; right: -8%; animation-delay: 1s; }
  .town-badge.b3 { top: 48%; left: -10%; animation-delay: 0.5s; }
  .badge-icon { font-size: 1.4rem; }
  .badge-text strong { display: block; font-size: 0.9rem; font-weight: 500; color: var(--brown); }
  .badge-text span { font-size: 0.75rem; color: var(--muted); }

  /* SECTION: THE CONCEPT */
  .section-concept {
    padding: 6rem 3rem;
    background: var(--brown);
    color: white; position: relative; overflow: hidden;
  }
  .section-concept::before {
    content: '';
    position: absolute; top: -50%; left: 30%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(244,115,42,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .concept-inner { max-width: 1100px; margin: 0 auto; }
  .concept-header { text-align: center; margin-bottom: 4rem; }
  .section-tag {
    display: inline-block; font-family: 'DM Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--orange); margin-bottom: 1rem;
  }
  .concept-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
    line-height: 1.15; color: white; letter-spacing: -0.02em;
  }
  .concept-title em { font-style: normal; color: var(--gold-light); }
  .concept-sub {
    font-size: 1rem; color: rgba(255,255,255,0.55); margin-top: 1rem;
    font-weight: 300; max-width: 520px; margin: 1rem auto 0; line-height: 1.7;
  }

  /* LEVELS */
  .levels-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;
    margin-top: 3rem;
  }
  .level-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1.25rem; padding: 1.5rem 1rem;
    text-align: center; transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .level-card:hover {
    background: rgba(255,255,255,0.09);
    transform: translateY(-4px);
    border-color: rgba(244,115,42,0.4);
  }
  .level-card.featured {
    background: rgba(244,115,42,0.15);
    border-color: rgba(244,115,42,0.5);
  }
  .level-num {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem; color: rgba(255,255,255,0.35); letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 0.8rem;
  }
  .level-icon { font-size: 2.2rem; margin-bottom: 0.8rem; display: block; }
  .level-members {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 700; color: white;
    letter-spacing: -0.01em;
  }
  .level-name {
    font-size: 0.75rem; color: rgba(255,255,255,0.5);
    margin-top: 0.25rem; font-weight: 300;
  }
  .level-unlock {
    font-size: 0.7rem; color: var(--gold-light);
    margin-top: 0.8rem; line-height: 1.4;
    min-height: 2.5rem;
    display: flex; align-items: center; justify-content: center;
  }
  .level-bar {
    height: 3px; background: rgba(255,255,255,0.08);
    border-radius: 100px; margin-top: 1rem; overflow: hidden;
  }
  .level-bar-fill { height: 100%; background: var(--orange); border-radius: 100px; }

  /* FEATURES */
  .section-features { padding: 7rem 3rem; background: var(--cream); }
  .features-inner { max-width: 1100px; margin: 0 auto; }
  .features-header { margin-bottom: 4rem; }
  .features-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 700;
    letter-spacing: -0.025em; line-height: 1.15; max-width: 480px;
  }
  .features-title em { font-style: italic; color: var(--orange); }
  .features-sub {
    font-size: 0.95rem; color: var(--muted); font-weight: 300;
    max-width: 400px; margin-top: 0.75rem; line-height: 1.7;
  }

  .features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .feature-card {
    padding: 2rem; border-radius: 1.5rem;
    border: 1px solid rgba(156,136,120,0.15);
    transition: all 0.3s;
    background: white;
  }
  .feature-card:hover {
    border-color: rgba(244,115,42,0.25);
    box-shadow: 0 8px 40px rgba(244,115,42,0.08);
    transform: translateY(-3px);
  }
  .feature-card.accent {
    background: var(--orange); color: white;
    border-color: transparent;
  }
  .feature-card.accent .feature-title,
  .feature-card.accent .feature-desc { color: white; }
  .feature-card.accent .feature-desc { opacity: 0.8; }
  .feature-icon {
    font-size: 1.6rem; margin-bottom: 1.2rem; display: block;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700; color: var(--brown);
    margin-bottom: 0.6rem; letter-spacing: -0.01em;
  }
  .feature-desc {
    font-size: 0.875rem; color: var(--muted); line-height: 1.7; font-weight: 300;
  }

  /* CREATOR SHOWCASE */
  .section-creators { padding: 6rem 3rem; background: var(--cream-dark); }
  .creators-inner { max-width: 1100px; margin: 0 auto; }
  .creators-header { text-align: center; margin-bottom: 3.5rem; }
  .creators-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; letter-spacing: -0.025em;
  }
  .creators-sub { font-size: 0.95rem; color: var(--muted); margin-top: 0.5rem; font-weight: 300; }

  .creators-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .creator-card {
    background: white; border-radius: 1.5rem;
    border: 1px solid rgba(156,136,120,0.12);
    overflow: hidden; transition: all 0.3s;
  }
  .creator-card:hover {
    box-shadow: 0 12px 48px rgba(26,22,18,0.1);
    transform: translateY(-4px);
  }
  .creator-banner {
    height: 80px; position: relative;
    display: flex; align-items: flex-end; padding: 0.8rem;
  }
  .creator-level-badge {
    background: white; border-radius: 0.5rem;
    padding: 0.25rem 0.6rem; font-size: 0.7rem; font-weight: 500;
    color: var(--brown); display: flex; align-items: center; gap: 0.3rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .creator-body { padding: 1.25rem; }
  .creator-avatar {
    width: 52px; height: 52px; border-radius: 50%;
    font-size: 1.4rem; display: flex; align-items: center; justify-content: center;
    margin-top: -2rem; margin-bottom: 0.75rem;
    border: 3px solid white; box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    background: var(--cream-dark);
  }
  .creator-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700; color: var(--brown);
    letter-spacing: -0.01em;
  }
  .creator-handle { font-size: 0.78rem; color: var(--muted); margin-top: 0.1rem; }
  .creator-stats {
    display: flex; gap: 1.5rem; margin-top: 1.2rem;
    padding-top: 1rem; border-top: 1px solid rgba(156,136,120,0.12);
  }
  .c-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700; color: var(--brown); display: block;
  }
  .c-stat-label { font-size: 0.72rem; color: var(--muted); }
  .creator-tier {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.7rem; font-weight: 500; padding: 0.2rem 0.6rem;
    border-radius: 100px; margin-top: 0.75rem;
  }
  .tier-gold { background: rgba(212,168,67,0.12); color: #8a6500; }
  .tier-silver { background: rgba(158,175,191,0.15); color: #4a6070; }
  .tier-bronze { background: rgba(244,115,42,0.1); color: var(--orange); }

  /* BUSINESS MODEL */
  .section-plans { padding: 7rem 3rem; background: var(--cream); }
  .plans-inner { max-width: 1000px; margin: 0 auto; }
  .plans-header { text-align: center; margin-bottom: 4rem; }
  .plans-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; letter-spacing: -0.025em;
  }
  .plans-sub { font-size: 0.95rem; color: var(--muted); margin-top: 0.5rem; font-weight: 300; }

  .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .plan-card {
    border-radius: 1.5rem; padding: 2rem;
    border: 1px solid rgba(156,136,120,0.15); background: white;
    position: relative; transition: all 0.3s;
  }
  .plan-card.popular {
    background: var(--brown); color: white; border-color: transparent;
    box-shadow: 0 16px 56px rgba(26,22,18,0.2);
  }
  .plan-card:not(.popular):hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(26,22,18,0.08);
  }
  .popular-tag {
    position: absolute; top: -0.75rem; left: 50%; transform: translateX(-50%);
    background: var(--orange); color: white;
    font-size: 0.7rem; font-weight: 500; padding: 0.3rem 0.9rem;
    border-radius: 100px; letter-spacing: 0.04em; text-transform: uppercase;
    white-space: nowrap;
  }
  .plan-name {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); margin-bottom: 1rem;
  }
  .plan-card.popular .plan-name { color: rgba(255,255,255,0.5); }
  .plan-price {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem; font-weight: 700; color: var(--brown);
    letter-spacing: -0.03em; line-height: 1;
  }
  .plan-card.popular .plan-price { color: white; }
  .plan-price sup { font-size: 1rem; vertical-align: top; margin-top: 0.4rem; margin-right: 0.1rem; }
  .plan-price span { font-size: 0.85rem; font-weight: 300; color: var(--muted); }
  .plan-card.popular .plan-price span { color: rgba(255,255,255,0.5); }
  .plan-cut {
    font-size: 0.82rem; color: var(--orange); font-weight: 500;
    margin-top: 0.3rem; margin-bottom: 1.5rem;
  }
  .plan-card.popular .plan-cut { color: var(--gold-light); }
  .plan-features { list-style: none; }
  .plan-features li {
    font-size: 0.875rem; color: var(--muted); padding: 0.45rem 0;
    border-bottom: 1px solid rgba(156,136,120,0.1);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .plan-card.popular .plan-features li { color: rgba(255,255,255,0.65); border-color: rgba(255,255,255,0.08); }
  .plan-features li::before { content: '✓'; color: var(--orange); font-size: 0.8rem; flex-shrink: 0; }
  .plan-card.popular .plan-features li::before { color: var(--gold-light); }
  .plan-cta {
    display: block; text-align: center; margin-top: 2rem;
    padding: 0.85rem; border-radius: 100px; font-size: 0.875rem; font-weight: 500;
    text-decoration: none; transition: all 0.2s;
    border: 1.5px solid rgba(156,136,120,0.25); color: var(--brown);
  }
  .plan-card.popular .plan-cta {
    background: var(--orange); color: white; border-color: transparent;
    box-shadow: 0 4px 20px rgba(244,115,42,0.4);
  }
  .plan-cta:hover { border-color: var(--orange); color: var(--orange); }
  .plan-card.popular .plan-cta:hover { background: var(--orange-light); }

  /* CTA SECTION */
  .section-cta {
    padding: 8rem 3rem;
    background: var(--brown);
    text-align: center; position: relative; overflow: hidden;
  }
  .section-cta::before {
    content: '';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(244,115,42,0.15) 0%, transparent 65%);
    pointer-events: none;
  }
  .cta-tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--orange); display: block; margin-bottom: 1.5rem;
  }
  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900;
    color: white; line-height: 1.1; letter-spacing: -0.03em;
    max-width: 700px; margin: 0 auto 1.5rem;
  }
  .cta-title em { font-style: normal; color: var(--gold-light); }
  .cta-sub {
    font-size: 1rem; color: rgba(255,255,255,0.5);
    max-width: 460px; margin: 0 auto 3rem; line-height: 1.7; font-weight: 300;
  }
  .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-cta-primary {
    background: var(--orange); color: white;
    padding: 1rem 2.5rem; border-radius: 100px;
    font-size: 1rem; font-weight: 500; text-decoration: none;
    box-shadow: 0 4px 24px rgba(244,115,42,0.4);
    transition: all 0.25s; display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(244,115,42,0.5); }
  .btn-cta-secondary {
    color: rgba(255,255,255,0.65); font-size: 1rem; text-decoration: none;
    padding: 1rem 2rem; border: 1px solid rgba(255,255,255,0.15); border-radius: 100px;
    transition: all 0.25s;
  }
  .btn-cta-secondary:hover { border-color: rgba(255,255,255,0.4); color: white; }

  /* FOOTER */
  footer {
    background: #0f0d0b; color: rgba(255,255,255,0.4);
    padding: 2.5rem 3rem; display: flex; align-items: center;
    justify-content: space-between; font-size: 0.82rem;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: white; font-weight: 700;
  }
  .footer-logo span { color: var(--orange); }
  footer a { color: rgba(255,255,255,0.4); text-decoration: none; }
  footer a:hover { color: rgba(255,255,255,0.7); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity: 0; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s ease forwards; opacity: 0; }
  .fade-up-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity: 0; }

  /* RESPONSIVE */
  /* ── TABLET ── */
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; padding: 7rem 1.5rem 3rem; }
    .hero-visual { order: -1; max-width: 380px; margin: 0 auto; }
    .town-badge { display: none; }
    .levels-grid { grid-template-columns: repeat(3, 1fr); }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .creators-grid { grid-template-columns: 1fr 1fr; }
    .plans-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .section-concept, .section-features, .section-creators, .section-plans, .section-cta { padding: 4rem 1.5rem; }
  }

  /* ── MOBILE ── */
  @media (max-width: 600px) {
    /* NAV */
    nav { padding: 0.9rem 1.25rem; }
    .nav-logo { font-size: 1.25rem; }
    .btn-nav { padding: 0.5rem 1rem; font-size: 0.78rem; }

    /* HERO */
    .hero {
      padding: 5.5rem 1.25rem 2.5rem;
      gap: 2rem; text-align: center;
    }
    .hero-visual { max-width: 100%; }
    .town-img { border-radius: 1.25rem; max-height: 300px; }
    .hero-eyebrow { font-size: 0.7rem; }
    .hero-title { font-size: clamp(2rem, 9vw, 2.8rem); }
    .hero-sub { font-size: 0.95rem; max-width: 100%; }
    .hero-ctas { justify-content: center; flex-direction: column; align-items: center; }
    .btn-primary { width: 100%; max-width: 280px; justify-content: center; padding: 1rem 1.5rem; font-size: 1rem; }
    .btn-secondary { font-size: 0.9rem; }
    .hero-stats { justify-content: center; gap: 1.5rem; flex-wrap: wrap; padding-top: 1.5rem; }
    .stat-num { font-size: 1.5rem; }

    /* LEVELS — horizontal scroll on mobile */
    .levels-grid {
      grid-template-columns: repeat(5, 200px);
      overflow-x: auto; padding-bottom: 1rem;
      scrollbar-width: none; gap: 0.75rem;
      scroll-snap-type: x mandatory;
    }
    .levels-grid::-webkit-scrollbar { display: none; }
    .level-card { scroll-snap-align: start; }
    .concept-title { font-size: clamp(1.6rem, 7vw, 2.2rem); }
    .concept-sub { font-size: 0.875rem; }
    .section-concept { padding: 3.5rem 1.25rem; }

    /* FEATURES — single column */
    .features-grid { grid-template-columns: 1fr; gap: 0.875rem; }
    .feature-card { padding: 1.5rem; }
    .features-title { font-size: clamp(1.6rem, 7vw, 2rem); }
    .section-features { padding: 3.5rem 1.25rem; }

    /* CREATORS — single column */
    .creators-grid { grid-template-columns: 1fr; gap: 1rem; }
    .creators-title { font-size: clamp(1.4rem, 6vw, 1.8rem); }
    .section-creators { padding: 3.5rem 1.25rem; }

    /* PLANS */
    .plans-grid { grid-template-columns: 1fr; gap: 1rem; max-width: 100%; }
    .plan-card { padding: 1.5rem; }
    .plan-price { font-size: 2rem; }
    .section-plans { padding: 3.5rem 1.25rem; }

    /* CTA */
    .section-cta { padding: 5rem 1.25rem; }
    .cta-title { font-size: clamp(1.8rem, 8vw, 2.8rem); }
    .cta-btns { flex-direction: column; align-items: center; }
    .btn-cta-primary { width: 100%; max-width: 280px; justify-content: center; }
    .btn-cta-secondary { width: 100%; max-width: 280px; text-align: center; }

    /* FOOTER */
    footer { flex-direction: column; text-align: center; gap: 0.75rem; padding: 1.75rem 1.25rem; }
    footer div:last-child { display: flex; gap: 1.5rem; justify-content: center; }

    /* MOBILE BOTTOM BAR */
    .mobile-cta-bar {
      display: flex !important;
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
      background: rgba(255,251,245,0.96); backdrop-filter: blur(16px);
      border-top: 1px solid rgba(244,115,42,0.15);
      padding: 0.75rem 1.25rem calc(0.75rem + env(safe-area-inset-bottom));
      gap: 0.75rem; align-items: center;
    }
    .mobile-cta-bar .btn-primary { flex: 1; justify-content: center; border-radius: 0.875rem; }
    .mobile-cta-bar .btn-login { color: var(--muted); font-size: 0.82rem; text-decoration: none; white-space: nowrap; }
    body { padding-bottom: 80px; }
  }

  @media (max-width: 380px) {
    .hero-title { font-size: 1.9rem; }
    .hero-ctas { gap: 0.75rem; }
    .hero-stats { gap: 1rem; }
  }

  .mobile-cta-bar { display: none; }

      `}</style>
      <div>


{/* NAV */}
<nav>
{/* MOBILE MENU */}
  <div className="nav-logo">Krea<span>Town</span></div>
  <div className="nav-links">
    <a href="#concept">How it works</a>
    <a href="#creators">Creators</a>
    <a href="#plans">Pricing</a>
    <a href="/auth/login">Log in</a>
    <a href="/auth/register" className="btn-nav">Start for free 🏡</a>
    <button className="hamburger" id="hamBtn" onClick="toggleMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>

{/* MOBILE MENU */}
<div className="mobile-menu" id="mobileMenu">
  <a href="#concept">How it works</a>
  <a href="#features">Features</a>
  <a href="#creators">Creators</a>
  <a href="#plans">Pricing</a>
  <a href="/auth/login">Log in</a>
  <a href="/auth/register">Start for free 🏡</a>
</div>
<script>
function toggleMenu() {
  const btn = document.getElementById('hamBtn');
  const menu = document.getElementById('mobileMenu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('hamBtn').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  });
});
</script>

{/* HERO */}
<section className="hero">
  <div className="hero-text">
    <div className="hero-eyebrow fade-up">Your town. Your fans. Your money.</div>
    <h1 className="hero-title fade-up-2">
      Build your world.<br>
      <em>Grow your empire.</em>
    </h1>
    <p className="hero-sub fade-up-3">
      Kreatown is the only creator platform where your success literally builds your world. Start with a cottage. Earn your mansion. Every member gets you closer to the top of the hill.
    </p>
    <div className="hero-ctas fade-up-4">
      <a href="/auth/register" className="btn-primary">Start building free 🏡</a>
      <a href="#concept" className="btn-secondary">See how it works →</a>
    </div>
    <div className="hero-stats fade-up-4">
      <div>
        <span className="stat-num">500+</span>
        <span className="stat-label">Creators</span>
      </div>
      <div>
        <span className="stat-num">$120K+</span>
        <span className="stat-label">Paid out</span>
      </div>
      <div>
        <span className="stat-num">12K+</span>
        <span className="stat-label">Members</span>
      </div>
    </div>
  </div>

  <div className="hero-visual fade-up-3">
    <div className="town-container">
      <img src="Luxury.png" alt="KreaTown — creator town" className="town-img" onerror="this.style.background='linear-gradient(135deg,#f4732a22,#d4a84322)';this.style.display='block'">

      <div className="town-badge b1">
        <div className="badge-icon">🏡</div>
        <div className="badge-text">
          <strong>Topraq</strong>
          <span>44 members · Level 2</span>
        </div>
      </div>

      <div className="town-badge b2">
        <div className="badge-icon">💰</div>
        <div className="badge-text">
          <strong>$6,200/mo</strong>
          <span>Jenna · 128 members</span>
        </div>
      </div>

      <div className="town-badge b3">
        <div className="badge-icon">🔥</div>
        <div className="badge-text">
          <strong>Level up!</strong>
          <span>Pool unlocked</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* THE CONCEPT: LEVELS */}
<section className="section-concept" id="concept">
  <div className="concept-inner">
    <div className="concept-header">
      <div className="section-tag">The KreaTown system</div>
      <h2 className="concept-title">
        Your house grows<br>
        <em>with your audience</em>
      </h2>
      <p className="concept-sub">
        Every new member you earn upgrades your world. From a cozy starter cottage to a hilltop mansion with a helipad — the platform rewards your growth visually, tangibly, and financially.
      </p>
    </div>

    <div className="levels-grid">
      <div className="level-card">
        <div className="level-num">Level 1</div>
        <span className="level-icon">🏠</span>
        <div className="level-members">0 – 1K</div>
        <div className="level-name">The Cottage</div>
        <div className="level-unlock">Basic content feed + 2 tiers</div>
        <div className="level-bar"><div className="level-bar-fill" style="width:20%"></div></div>
      </div>
      <div className="level-card">
        <div className="level-num">Level 2</div>
        <span className="level-icon">🏡</span>
        <div className="level-members">1K – 5K</div>
        <div className="level-name">The House</div>
        <div className="level-unlock">Unlock DMs + 3D garden</div>
        <div className="level-bar"><div className="level-bar-fill" style="width:40%"></div></div>
      </div>
      <div className="level-card featured">
        <div className="level-num">Level 3</div>
        <span className="level-icon">🏘️</span>
        <div className="level-members">5K – 10K</div>
        <div className="level-name">The Villa</div>
        <div className="level-unlock">3D Radio 🎵 + pool + competitions</div>
        <div className="level-bar"><div className="level-bar-fill" style="width:60%"></div></div>
      </div>
      <div className="level-card">
        <div className="level-num">Level 4</div>
        <span className="level-icon">🏰</span>
        <div className="level-members">10K – 25K</div>
        <div className="level-name">The Estate</div>
        <div className="level-unlock">3D TV 📺 + live events</div>
        <div className="level-bar"><div className="level-bar-fill" style="width:80%"></div></div>
      </div>
      <div className="level-card">
        <div className="level-num">Level 5</div>
        <span className="level-icon">🏯</span>
        <div className="level-members">50K+</div>
        <div className="level-name">The Mansion</div>
        <div className="level-unlock">Full town. Helipad. Legend status.</div>
        <div className="level-bar"><div className="level-bar-fill" style="width:100%"></div></div>
      </div>
    </div>
  </div>
</section>

{/* FEATURES */}
<section className="section-features" id="features">
  <div className="features-inner">
    <div className="features-header">
      <div className="section-tag" style="color:var(--orange)">Everything you need</div>
      <h2 className="features-title">
        Not just a page.<br>
        <em>A living world.</em>
      </h2>
      <p className="features-sub">Every tool a creator needs — from payments to community — built inside your growing universe.</p>
    </div>

    <div className="features-grid">
      <div className="feature-card accent">
        <span className="feature-icon">🏡</span>
        <div className="feature-title">Your own town</div>
        <p className="feature-desc">Your creator page is a living 3D world that evolves as you grow. Share kreatown.com/@you everywhere.</p>
      </div>
      <div className="feature-card">
        <span className="feature-icon">💰</span>
        <div className="feature-title">Get paid monthly</div>
        <p className="feature-desc">Fans subscribe to your tiers. You earn automatically every month, with direct payouts via Stripe.</p>
      </div>
      <div className="feature-card">
        <span className="feature-icon">🔒</span>
        <div className="feature-title">Gated content rooms</div>
        <p className="feature-desc">Different rooms of your house unlock different content. Free fans get the garden. Gold members get the penthouse.</p>
      </div>
      <div className="feature-card">
        <span className="feature-icon">🎮</span>
        <div className="feature-title">Level-up competitions</div>
        <p className="feature-desc">Compete with other creators in monthly growth challenges. Win rewards, house upgrades, and platform boosts.</p>
      </div>
      <div className="feature-card">
        <span className="feature-icon">💬</span>
        <div className="feature-title">Direct messages</div>
        <p className="feature-desc">Connect 1-on-1 with your biggest fans through built-in messaging. Unlocks at 1K members.</p>
      </div>
      <div className="feature-card">
        <span className="feature-icon">📊</span>
        <div className="feature-title">Creator analytics</div>
        <p className="feature-desc">Track revenue, member growth, content performance, and your house level progress in one dashboard.</p>
      </div>
    </div>
  </div>
</section>

{/* CREATOR SHOWCASE */}
<section className="section-creators" id="creators">
  <div className="creators-inner">
    <div className="creators-header">
      <div className="section-tag" style="color:var(--orange)">Already earning</div>
      <h2 className="creators-title">Creators building their towns</h2>
      <p className="creators-sub">See how creators are growing their worlds on Kreatown</p>
    </div>
    <div className="creators-grid">

      <div className="creator-card">
        <div className="creator-banner" style="background: linear-gradient(135deg, #f4732a22, #d4a84322);">
          <div className="creator-level-badge">🏘️ Level 3 · Villa</div>
        </div>
        <div className="creator-body">
          <div className="creator-avatar">🎨</div>
          <div className="creator-name">Topraq Toros</div>
          <div className="creator-handle">@topraq · Creator & Storyteller</div>
          <div className="creator-tier tier-bronze">🔥 Growing fast</div>
          <div className="creator-stats">
            <div><span className="c-stat-num">44</span><span className="c-stat-label">Members</span></div>
            <div><span className="c-stat-num">$2,840</span><span className="c-stat-label">Per month</span></div>
            <div><span className="c-stat-num">4</span><span className="c-stat-label">Posts</span></div>
          </div>
        </div>
      </div>

      <div className="creator-card">
        <div className="creator-banner" style="background: linear-gradient(135deg, #9eafbf22, #d4a84322);">
          <div className="creator-level-badge">🏰 Level 4 · Estate</div>
        </div>
        <div className="creator-body">
          <div className="creator-avatar">📸</div>
          <div className="creator-name">Jenna Williams</div>
          <div className="creator-handle">@jenna · Photographer</div>
          <div className="creator-tier tier-silver">⭐ Silver status</div>
          <div className="creator-stats">
            <div><span className="c-stat-num">128</span><span className="c-stat-label">Members</span></div>
            <div><span className="c-stat-num">$6,200</span><span className="c-stat-label">Per month</span></div>
            <div><span className="c-stat-num">22</span><span className="c-stat-label">Posts</span></div>
          </div>
        </div>
      </div>

      <div className="creator-card">
        <div className="creator-banner" style="background: linear-gradient(135deg, #d4a84322, #f4732a22);">
          <div className="creator-level-badge">🏯 Level 5 · Mansion</div>
        </div>
        <div className="creator-body">
          <div className="creator-avatar">🎵</div>
          <div className="creator-name">MikeNova</div>
          <div className="creator-handle">@mikenova · Music Producer</div>
          <div className="creator-tier tier-gold">👑 Gold status</div>
          <div className="creator-stats">
            <div><span className="c-stat-num">89</span><span className="c-stat-label">Members</span></div>
            <div><span className="c-stat-num">$4,100</span><span className="c-stat-label">Per month</span></div>
            <div><span className="c-stat-num">17</span><span className="c-stat-label">Posts</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* PLANS */}
<section className="section-plans" id="plans">
  <div className="plans-inner">
    <div className="plans-header">
      <div className="section-tag" style="color:var(--orange)">Simple pricing</div>
      <h2 className="plans-title">Grow together, earn together</h2>
      <p className="plans-sub">The bigger you grow, the better your deal gets.</p>
    </div>
    <div className="plans-grid">

      <div className="plan-card">
        <div className="plan-name">Starter</div>
        <div className="plan-price"><sup>$</sup>0 <span>/ 3 months then $19/mo</span></div>
        <div className="plan-cut">+ 5% revenue share</div>
        <ul className="plan-features">
          <li>Your own town page</li>
          <li>Up to 2 membership tiers</li>
          <li>Content feed + gating</li>
          <li>Basic analytics</li>
          <li>Level 1–2 house upgrades</li>
        </ul>
        <a href="/auth/register" className="plan-cta">Get started free</a>
      </div>

      <div className="plan-card popular">
        <div className="popular-tag">Most Popular</div>
        <div className="plan-name">Pro</div>
        <div className="plan-price"><sup>$</sup>29 <span>/ month</span></div>
        <div className="plan-cut">+ 5% revenue share</div>
        <ul className="plan-features">
          <li>Everything in Starter</li>
          <li>Unlimited membership tiers</li>
          <li>DMs with fans</li>
          <li>Level competitions access</li>
          <li>All house levels unlocked</li>
          <li>Priority support</li>
        </ul>
        <a href="/auth/register" className="plan-cta">Start Pro free</a>
      </div>

      <div className="plan-card">
        <div className="plan-name">Studio</div>
        <div className="plan-price"><sup>$</sup>49 <span>/ month</span></div>
        <div className="plan-cut">+ 3% revenue share</div>
        <ul className="plan-features">
          <li>Everything in Pro</li>
          <li>Lowest revenue share (3%)</li>
          <li>3D TV & Radio early access</li>
          <li>Custom town branding</li>
          <li>Advanced analytics</li>
          <li>Dedicated account manager</li>
        </ul>
        <a href="/auth/register" className="plan-cta">Go Studio</a>
      </div>

    </div>
  </div>
</section>

{/* CTA */}
<section className="section-cta">
  <span className="cta-tag">Ready to build?</span>
  <h2 className="cta-title">
    Your town is waiting.<br>
    <em>Start with a cottage.</em>
  </h2>
  <p className="cta-sub">
    Join hundreds of creators already building their worlds on KreaTown. It's free to start — no credit card needed.
  </p>
  <div className="cta-btns">
    <a href="/auth/register" className="btn-cta-primary">Build your town free 🏡</a>
    <a href="#concept" className="btn-cta-secondary">See how it works</a>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="footer-logo">Krea<span>Town</span></div>
  <div>© 2026 KreaTown. Where creators belong.</div>
  <div style="display:flex;gap:1.5rem">
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">Contact</a>
  </div>
</footer>

{/* MOBILE BOTTOM CTA BAR */}
<div className="mobile-cta-bar">
  <a href="/auth/register" className="btn-primary">🏡 Start free</a>
  <a href="/auth/login" className="btn-login">Log in</a>
</div>


      </div>
    </>
=======
>>>>>>> c759273 (use iframe for landing page)
  )
}

const srcDoc = `<!DOCTYPE html>
```

Then open your `index.html`, copy everything from `<!DOCTYPE html>` to the end, paste it after that last backtick line.

Then close the file with just this on the very last line:
```
`