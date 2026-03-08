import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Use service role for webhook (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {

    // ── New subscription created ──────────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.CheckoutSession
      const { creatorId, fanId } = session.metadata || {}
      if (!creatorId || !fanId) break

      // Find which tier this price belongs to
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const priceId   = lineItems.data[0]?.price?.id

      const { data: tier } = await supabase
        .from('tiers')
        .select('*')
        .eq('stripe_price_id', priceId)
        .single()

      if (tier) {
        await supabase.from('memberships').upsert({
          fan_id:                   fanId,
          creator_id:               creatorId,
          tier_id:                  tier.id,
          tier_level:               tier.level,
          stripe_subscription_id:   session.subscription as string,
          status:                   'active',
        })
      }
      break
    }

    // ── Subscription cancelled ────────────────────────────────
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('memberships')
        .update({ status: 'cancelled', ends_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id)
      break
    }

    // ── Payment failed ────────────────────────────────────────
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await supabase
        .from('memberships')
        .update({ status: 'past_due' })
        .eq('stripe_subscription_id', invoice.subscription as string)
      break
    }

    // ── Payment recovered ─────────────────────────────────────
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      await supabase
        .from('memberships')
        .update({ status: 'active' })
        .eq('stripe_subscription_id', invoice.subscription as string)
      break
    }
  }

  return NextResponse.json({ received: true })
}
