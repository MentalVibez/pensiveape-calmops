import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 })
  }

  const body = await req.text()

  try {
    stripe.webhooks.constructEvent(body, sig, secret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  return NextResponse.json({ received: true })
}
