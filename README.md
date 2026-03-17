# 🏡 Kreatown — Where Creators Belong

> **Your town. Your fans. Your money.**
> A creator membership platform where fans subscribe directly to creators they love.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mavie907-stack/kreatown)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase)
![Stripe](https://img.shields.io/badge/Stripe-Connect-635BFF?logo=stripe)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss)

---

## 🗺️ What Is Kreatown?

Kreatown lets creators build their own membership hub — with tiered subscriptions, exclusive content, direct messages, and real earnings. Think Patreon, but with a warmer home.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (Postgres + Auth + Storage) |
| Payments | Stripe + Stripe Connect |
| Media | Cloudinary |
| Email | Resend |
| Real-time DMs | Pusher |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/mavie907-stack/kreatown.git
cd kreatown
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
# Open .env.local and fill in all values
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Copy & paste the contents of `src/lib/schema.sql`
4. Click **Run**

### 4. Set Up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Enable **Stripe Connect** (for creator payouts)
3. Add a webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Subscribe to these events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`

### 5. Set Up Cloudinary

1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Create an **upload preset** named `kreatown_media`

### 6. Run the Dev Server

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
kreatown/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/              ← Login page
│   │   │   └── register/           ← Registration (2-step)
│   │   ├── dashboard/              ← Creator dashboard
│   │   │   ├── content/            ← Manage posts
│   │   │   ├── members/            ← View subscribers
│   │   │   ├── messages/           ← DMs with fans
│   │   │   ├── earnings/           ← Revenue & payouts
│   │   │   └── settings/           ← Profile & Stripe setup
│   │   ├── u/[username]/           ← Public creator Hub page
│   │   └── api/
│   │       └── webhooks/stripe/    ← Stripe webhook handler
│   ├── components/
│   │   ├── layout/                 ← DashboardLayout (sidebar nav)
│   │   ├── dashboard/              ← DashboardOverview, charts
│   │   ├── creator/                ← Public Hub page components
│   │   └── ui/                     ← Reusable UI components
│   ├── hooks/                      ← useUser, useDashboardStats, etc.
│   ├── lib/
│   │   ├── supabase.ts             ← Browser + server clients
│   │   ├── stripe.ts               ← Stripe utilities
│   │   └── schema.sql              ← Full database schema
│   └── types/                      ← TypeScript types
├── .env.example                    ← All required env vars (copy to .env.local)
└── tailwind.config.js              ← Brand colors & fonts
```

---

## 🎨 Brand Tokens

| Token | Value | Preview |
|---|---|---|
| Primary Orange | `#f4732a` | 🟠 |
| Orange Light | `#ff9555` | 🔶 |
| Orange Pale | `#fff0e6` | |
| Cream BG | `#fffbf5` | |
| Brown Text | `#1a1612` | |
| Muted | `#9c8878` | |
| Display Font | Cabinet Grotesk | |
| Body Font | Nunito | |
| Mono Font | DM Mono | |

---

## 💰 Business Model

| Plan | Price | Revenue Cut |
|---|---|---|
| Starter | Free for 3 months → $19/mo | 5% |
| Pro | $29/mo | 5% |
| Studio | $49/mo | 3% |

**Target:** 100 creators × $29 = **$2,900 MRR** by Month 4 🎯

---

## 🗺️ Build Roadmap

- [x] Landing page
- [x] Project structure
- [x] Auth (login + 2-step register)
- [x] Dashboard layout (sidebar nav)
- [x] Dashboard overview (KPIs + charts)
- [x] Database schema (Supabase SQL)
- [x] Stripe webhook handler
- [ ] Creator Hub page (public profile fans see)
- [ ] Content feed (posts with tier gating)
- [ ] Members page (manage subscribers)
- [ ] Messages (DMs with Pusher)
- [ ] Earnings page (revenue + Stripe payouts)
- [ ] Settings (profile + Stripe Connect)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © [Kreatown](https://kreatown.com)
