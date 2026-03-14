// src/lib/qnb.ts
// ── QNB Finansbank Payment Integration ──
// Plug in your credentials from .env.local when QNB delivers them

export const QNB_CONFIG = {
  apiUrl:      process.env.QNB_API_URL      ?? '',  // e.g. https://api.qnbpay.com.tr/v1
  merchantId:  process.env.QNB_MERCHANT_ID  ?? '',
  apiKey:      process.env.QNB_API_KEY       ?? '',
  apiSecret:   process.env.QNB_API_SECRET    ?? '',
  // Bank transfer details (for Havale/EFT)
  iban:        process.env.QNB_IBAN          ?? 'TR00 0011 1000 0000 0000 0000 00',
  accountName: process.env.QNB_ACCOUNT_NAME  ?? 'KreaTown Teknoloji A.Ş.',
  sandboxMode: process.env.NODE_ENV !== 'production',
}

export type Currency = 'TRY' | 'USD' | 'EUR'
export type PaymentMethod = 'card' | 'eft'

export interface QNBPaymentRequest {
  amount: number
  currency: Currency
  method: PaymentMethod
  // Card payment
  cardNumber?: string
  cardHolder?: string
  expiry?: string
  cvv?: string
  // Customer
  email: string
  userId: string
  // Subscription
  creatorId: string
  tier: string
  recurring: boolean
}

export interface QNBPaymentResponse {
  status: 'success' | 'failed' | 'pending'
  transactionId: string
  message?: string
  redirectUrl?: string   // For 3D Secure
}

export interface QNBSubscriptionResponse {
  subscriptionId: string
  status: 'active' | 'pending'
  nextBilling: string
}

// ── CREATE PAYMENT ──
export async function createPayment(req: QNBPaymentRequest): Promise<QNBPaymentResponse> {
  if (!QNB_CONFIG.apiKey) {
    // Mock response for development — remove when keys arrive
    console.warn('[QNB] Running in mock mode — no API key configured')
    return {
      status: 'success',
      transactionId: 'MOCK_' + Date.now().toString(36).toUpperCase(),
    }
  }

  const response = await fetch(`${QNB_CONFIG.apiUrl}/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-ID': QNB_CONFIG.merchantId,
      'X-API-Key': QNB_CONFIG.apiKey,
      'X-Timestamp': Date.now().toString(),
    },
    body: JSON.stringify({
      merchantId:   QNB_CONFIG.merchantId,
      amount:       req.amount,
      currency:     req.currency,
      paymentType:  req.method === 'card' ? 'CARD' : 'EFT',
      cardNumber:   req.cardNumber,
      cardHolder:   req.cardHolder,
      expiryDate:   req.expiry,
      cvv:          req.cvv,
      email:        req.email,
      description:  `KreaTown ${req.tier} subscription`,
      recurring:    req.recurring,
      recurringInterval: 'MONTHLY',
      callbackUrl:  `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/qnb`,
      metadata: {
        userId:    req.userId,
        creatorId: req.creatorId,
        tier:      req.tier,
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message ?? 'QNB payment failed')
  }

  return response.json()
}

// ── CANCEL SUBSCRIPTION ──
export async function cancelSubscription(subscriptionId: string): Promise<{ success: boolean }> {
  if (!QNB_CONFIG.apiKey) {
    return { success: true } // mock
  }

  const response = await fetch(`${QNB_CONFIG.apiUrl}/subscription/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: {
      'X-Merchant-ID': QNB_CONFIG.merchantId,
      'X-API-Key': QNB_CONFIG.apiKey,
    },
  })

  return response.json()
}

// ── VERIFY WEBHOOK SIGNATURE ──
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!QNB_CONFIG.apiSecret) return true // skip in dev
  const crypto = require('crypto')
  const expected = crypto
    .createHmac('sha256', QNB_CONFIG.apiSecret)
    .update(payload)
    .digest('hex')
  return expected === signature
}

// ── PRICE HELPERS ──
export const TIER_PRICES: Record<string, Record<Currency, number>> = {
  silver: { TRY: 290,  USD: 9,   EUR: 8.5 },
  gold:   { TRY: 590,  USD: 19,  EUR: 17.5 },
  palace: { TRY: 1490, USD: 49,  EUR: 45   },
}

export function formatPrice(amount: number, currency: Currency): string {
  switch (currency) {
    case 'TRY': return '₺' + amount.toLocaleString('tr-TR')
    case 'USD': return '$' + amount
    case 'EUR': return '€' + amount
  }
}
