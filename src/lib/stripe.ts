// @ts-nocheck
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  appInfo: { name: 'Kreatown', version: '0.1.0' },
})

// ─── CREATE CHECKOUT SESSION ──────────────────────────────────
// Fan subscribes to a creator's tier
export async function createCheckoutSession({
  priceId,
  creatorId,
  fanId,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  creatorId: string
  fanId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { creatorId, fanId },
    subscription_data: {
      metadata: { creatorId, fanId },
    },
  })
  return session
}

// ─── CREATE CONNECTED ACCOUNT ────────────────────────────────
// Each creator gets their own Stripe Connect account
export async function createConnectedAccount(email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  })
  return account
}

// ─── ONBOARDING LINK ─────────────────────────────────────────
export async function createAccountLink(accountId: string, origin: string) {
  const link = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${origin}/dashboard/settings?stripe=refresh`,
    return_url: `${origin}/dashboard/settings?stripe=success`,
    type: 'account_onboarding',
  })
  return link
}

// ─── FORMAT CENTS TO USD ─────────────────────────────────────
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}
