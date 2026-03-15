// src/app/api/webhooks/qnb/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { verifyWebhookSignature } from '@/lib/qnb'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('x-qnb-signature') ?? ''

  // Verify the webhook is genuinely from QNB
  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)
  const supabase = createClient()

  switch (event.type) {

    // ── PAYMENT SUCCESS → activate subscription ──
    case 'payment.success': {
      const { transactionId, metadata, amount, currency, recurringId } = event.data
      const { userId, creatorId, tier } = metadata

      // Calculate next billing date (1 month from now)
      const nextBilling = new Date()
      nextBilling.setMonth(nextBilling.getMonth() + 1)

      // Upsert subscription in Supabase
      await supabase.from('subscriptions').upsert({
        user_id:        userId,
        creator_id:     creatorId,
        tier,
        status:         'active',
        currency,
        amount,
        transaction_id: transactionId,
        recurring_id:   recurringId,
        started_at:     new Date().toISOString(),
        next_billing:   nextBilling.toISOString(),
      }, { onConflict: 'user_id,creator_id' })

      // Update creator member count
      await supabase.rpc('increment_member_count', { p_creator_id: creatorId })

      // Update creator house level based on new member count
      const { data: profile } = await supabase
        .from('profiles')
        .select('member_count')
        .eq('id', creatorId)
        .single()

      if (profile) {
        const newLevel = getHouseLevelFromCount(profile.member_count)
        await supabase.from('profiles').update({ house_level: newLevel }).eq('id', creatorId)
      }

      console.log(`[QNB] Payment success: ${transactionId} — ${userId} subscribed to ${creatorId} (${tier})`)
      break
    }

    // ── SUBSCRIPTION CANCELLED ──
    case 'subscription.cancelled': {
      const { userId, creatorId } = event.data.metadata
      await supabase.from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('user_id', userId)
        .eq('creator_id', creatorId)

      await supabase.rpc('decrement_member_count', { p_creator_id: creatorId })
      console.log(`[QNB] Subscription cancelled: ${userId} → ${creatorId}`)
      break
    }

    // ── PAYMENT FAILED ──
    case 'payment.failed': {
      const { userId, creatorId } = event.data.metadata
      await supabase.from('subscriptions')
        .update({ status: 'paused' })
        .eq('user_id', userId)
        .eq('creator_id', creatorId)

      // TODO: send email notification via Resend
      console.log(`[QNB] Payment failed: ${userId} → ${creatorId}`)
      break
    }

    // ── RECURRING RENEWAL SUCCESS ──
    case 'subscription.renewed': {
      const { userId, creatorId, nextBilling } = event.data
      await supabase.from('subscriptions')
        .update({ status: 'active', next_billing: nextBilling })
        .eq('user_id', userId)
        .eq('creator_id', creatorId)
      break
    }

    default:
      console.log(`[QNB] Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

function getHouseLevelFromCount(count: number): number {
  if (count >= 25000) return 5
  if (count >= 10000) return 4
  if (count >= 5000)  return 3
  if (count >= 1000)  return 2
  return 1
}

