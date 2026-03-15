// src/app/api/subscriptions/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { createPayment, TIER_PRICES, QNB_CONFIG } from '@/lib/qnb'
import type { Currency } from '@/lib/qnb'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { creatorId, tier, currency = 'TRY', paymentMethod = 'card', cardDetails } = body

    // Validate tier
    if (!['silver', 'gold', 'palace'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const amount = TIER_PRICES[tier][currency as Currency]

    // ── CARD PAYMENT ──
    if (paymentMethod === 'card') {
      const result = await createPayment({
        amount,
        currency: currency as Currency,
        method: 'card',
        cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
        cardHolder:  cardDetails.cardHolder,
        expiry:      cardDetails.expiry,
        cvv:         cardDetails.cvv,
        email:       cardDetails.email,
        userId:      user.id,
        creatorId,
        tier,
        recurring:   true,
      })

      if (result.status === 'failed') {
        return NextResponse.json({ error: result.message ?? 'Payment failed' }, { status: 402 })
      }

      // If 3D Secure redirect needed
      if (result.redirectUrl) {
        return NextResponse.json({ requiresRedirect: true, redirectUrl: result.redirectUrl })
      }

      // Payment successful — subscription created by webhook
      return NextResponse.json({ success: true, transactionId: result.transactionId })
    }

    // ── EFT / HAVALE ──
    if (paymentMethod === 'eft') {
      // Create pending subscription — activated when payment confirmed
      const nextBilling = new Date()
      nextBilling.setMonth(nextBilling.getMonth() + 1)

      await supabase.from('subscriptions').insert({
        user_id:      user.id,
        creator_id:   creatorId,
        tier,
        status:       'pending', // activated when QNB confirms transfer
        currency,
        amount,
        started_at:   new Date().toISOString(),
        next_billing: nextBilling.toISOString(),
      })

      return NextResponse.json({
        success: true,
        pending: true,
        bankDetails: {
          bank:        'QNB Finansbank A.Ş.',
          iban:        QNB_CONFIG.iban,
          accountName: QNB_CONFIG.accountName,
          amount,
          currency,
          reference:   `KT-${user.id.slice(0,8).toUpperCase()}-${tier.toUpperCase()}`,
        },
        message: 'Transfer details sent to your email. Access activates within 2 business hours.',
      })
    }

    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })

  } catch (err) {
    console.error('[Subscription Create]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
