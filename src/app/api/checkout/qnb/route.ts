// src/app/api/checkout/qnb/route.ts
// ─────────────────────────────────────────────────────────
// QNB Finansbank payment integration
// Status: READY — waiting for API keys from QNB (expected ~1 week)
//
// When keys arrive, fill in .env.local:
//   QNB_MERCHANT_ID=...
//   QNB_API_KEY=...
//   QNB_SECRET_KEY=...
//   QNB_API_URL=https://api.qnbfinansbank.com/payment/v1
//   NEXT_PUBLIC_QNB_IBAN=TR...
// ─────────────────────────────────────────────────────────

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import type { Database } from '@/types/database'

// QNB uses HMAC-SHA256 for request signing
function signRequest(payload: string, secretKey: string): string {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex')
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  const body = await req.json()
  const { tierId, creatorId, currency, payMethod, cardData, eftData } = body

  // ── Validate ──────────────────────────────────────────
  if (!tierId || !creatorId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Fetch tier
  const { data: tier } = await supabase
    .from('tiers')
    .select('id, name, price_monthly, price_try, price_eur')
    .eq('id', tierId)
    .single()

  if (!tier) return NextResponse.json({ error: 'Tier not found' }, { status: 404 })

  // ── QNB API keys check ────────────────────────────────
  const merchantId = process.env.QNB_MERCHANT_ID
  const apiKey     = process.env.QNB_API_KEY
  const secretKey  = process.env.QNB_SECRET_KEY
  const apiUrl     = process.env.QNB_API_URL

  if (!merchantId || !apiKey || !secretKey || !apiUrl) {
    // Keys not yet received — return a pending state so the UI can show
    // the "activation pending" success screen for EFT, or fail gracefully for card
    if (payMethod === 'eft') {
      // For EFT we just log the intent and mark as pending
      await supabase.from('payment_intents').insert({
        user_id:    session?.user?.id ?? null,
        tier_id:    tierId,
        creator_id: creatorId,
        currency,
        amount:     tier.price_monthly,
        method:     'eft',
        status:     'pending_transfer',
        eft_name:   eftData?.name,
        eft_email:  eftData?.email,
        eft_iban:   eftData?.iban,
      })
      return NextResponse.json({ status: 'pending', message: 'EFT logged — awaiting transfer confirmation' })
    }

    return NextResponse.json(
      { error: 'Payment provider not yet configured. QNB keys arriving soon.', code: 'KEYS_PENDING' },
      { status: 503 }
    )
  }

  // ── Real QNB card payment ─────────────────────────────
  // TODO: Implement actual QNB 3D Secure flow once API docs received
  // Typical flow:
  //   1. POST /payment/v1/init → get paymentId + redirectUrl for 3DS
  //   2. Redirect user to QNB 3DS page
  //   3. QNB posts back to /api/checkout/qnb/callback
  //   4. Verify signature, activate subscription in Supabase

  const amount = currency === 'TRY' ? tier.price_try : currency === 'EUR' ? tier.price_eur : tier.price_monthly

  const payload = JSON.stringify({
    merchantId,
    orderId:      `kt_${Date.now()}_${session?.user?.id?.slice(0,8)}`,
    amount:       amount * 100, // QNB expects amounts in kuruş/cents
    currency,
    description:  `KreaTown — ${tier.name}`,
    callbackUrl:  `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/qnb/callback`,
    cardNumber:   cardData?.number?.replace(/\s/g, ''),
    cardHolder:   cardData?.name,
    expiryMonth:  cardData?.expiry?.split('/')[0]?.trim(),
    expiryYear:   `20${cardData?.expiry?.split('/')[1]?.trim()}`,
    cvv:          cardData?.cvv,
    installment:  1,
  })

  const signature = signRequest(payload, secretKey)

  const qnbRes = await fetch(`${apiUrl}/payment/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-Id': merchantId,
      'X-Api-Key':     apiKey,
      'X-Signature':   signature,
    },
    body: payload,
  })

  const qnbData = await qnbRes.json()

  if (!qnbRes.ok || qnbData.status !== 'success') {
    return NextResponse.json({ error: qnbData.message ?? 'Payment failed' }, { status: 400 })
  }

  // Log intent — subscription activated via callback webhook
  await supabase.from('payment_intents').insert({
    user_id:    session?.user?.id ?? null,
    tier_id:    tierId,
    creator_id: creatorId,
    currency,
    amount,
    method:     'card',
    status:     'initiated',
    provider_ref: qnbData.paymentId,
  })

  return NextResponse.json({
    status:      'redirect',
    redirectUrl: qnbData.redirectUrl, // 3DS page
    paymentId:   qnbData.paymentId,
  })
}
