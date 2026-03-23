# 🏡 Kreatown — Where Creators Belong

> Your town. Your fans. Your money.

A creator membership platform where your success literally builds your world. Start with a cottage. Earn your mansion.

🌐 **Live site:** [kreatown.vercel.app](https://kreatown.vercel.app)

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
# Fill in all values in .env.local
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Copy & paste contents of `src/lib/schema.sql`
4. Click **Run**

### 4. Set Up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Enable **Stripe Connect** (for creator payouts)
3. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`, `invoice.payment_succeeded`

### 5. Set Up Cloudinary

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Create an **upload preset** named `kreatown_media`

### 6. Run Development Server

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
│   │   │   ├── login/         ← Login page
│   │   │   └── register/      ← Registration (2-step)
│   │   ├── dashboard/         ← Creator dashboard
│   │   │   ├── content/       ← Manage posts
│   │   │   ├── members/       ← View members
│   │   │   ├── messages/      ← DMs with fans
│   │   │   ├── earnings/      ← Revenue & payouts
│   │   │   └── settings/      ← Profile & Stripe setup
│   │   ├── u/[username]/      ← Public creator Hub page
│   │   └── api/
│   │       └── webhooks/stripe/  ← Stripe webhook handler
│   ├── components/
│   │   ├── layout/            ← DashboardLayout (sidebar nav)
│   │   ├── dashboard/         ← DashboardOverview, charts
│   │   ├── creator/           ← Public Hub page components
│   │   └── ui/                ← Reusable UI components
│   ├── hooks/                 ← useUser, useDashboardStats, etc.
│   ├── lib/
│   │   ├── supabase.ts        ← Browser + server clients
│   │   ├── stripe.ts          ← Stripe utilities
│   │   └── schema.sql         ← Full database schema
│   └── types/                 ← TypeScript types
├── .env.example               ← All required env vars
└── tailwind.config.js         ← Brand colors & fonts
```

---

## 🎨 Brand

| Token | Value |
|---|---|
| Primary Orange | `#f4732a` |
| Orange Light | `#ff9555` |
| Orange Pale | `#fff0e6` |
| Cream BG | `#fffbf5` |
| Brown Text | `#1a1612` |
| Muted | `#9c8878` |
| Display Font | Cabinet Grotesk |
| Body Font | Nunito |
| Mono Font | DM Mono |

---

## 🏠 House Level System

| Level | Range | House | Unlocks |
|---|---|---|---|
| 1 | 0–1K members | 🏠 Cottage | Content feed + 2 tiers |
| 2 | 1K–5K | 🏡 House | DMs + 3D garden |
| 3 | 5K–10K | 🏘️ Villa | 3D Radio + pool + competitions |
| 4 | 10K–25K | 🏰 Estate | 3D TV + live events |
| 5 | 50K+ | 🏯 Mansion | Full town. Helipad. Legend status. |

---

## 🗺️ Build Roadmap

- ✅ **Landing page** (kreatown.html)
- ✅ **Project structure**
- ✅ **Auth** (login + 2-step register)
- ✅ **Dashboard layout** (sidebar nav)
- ✅ **Dashboard overview** (KPIs + charts)
- ✅ **Database schema** (Supabase SQL)
- ✅ **Stripe webhook** handler
- 🔄 **Creator Hub page** (public profile fans see)
- 🔄 **Content feed** (posts with tier gating)
- 🔄 **Members page** (manage subscribers)
- 🔄 **Messages** (DMs with Pusher)
- 🔄 **Earnings page** (revenue + Stripe payouts)
- 🔄 **Settings** (profile + Stripe Connect)

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

## 💰 Business Model

- **Starter** — $0 for 3 months, then $19/mo + 5% revenue cut
- **Pro** — $29/mo + 5% revenue cut
- **Studio** — $49/mo + 3% revenue cut

**Target:** 100 creators × $29 = **$2,900 MRR** by Month 4
