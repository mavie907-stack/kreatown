import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST(req: Request) {
  const body = await req.json()
  const { tierId, creatorId, currency, payMethod, eftData } = body

  if (!tierId || !creatorId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const merchantId = process.env.QNB_MERCHANT_ID
  const apiKey     = process.env.QNB_API_KEY

  if (!merchantId || !apiKey) {
    if (payMethod === 'eft') {
      return NextResponse.json({ status: 'pending', message: 'EFT logged — awaiting transfer confirmation' })
    }
    return NextResponse.json({ error: 'Payment provider not yet configured. QNB keys arriving soon.', code: 'KEYS_PENDING' }, { status: 503 })
  }

  return NextResponse.json({ status: 'ok' })
}
