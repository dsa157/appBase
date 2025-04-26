import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export async function POST(request: Request) {
  const { planId } = await request.json();
  
  const prices = {
    basic: process.env.STRIPE_BASIC_PRICE_ID!,
    pro: process.env.STRIPE_PRO_PRICE_ID!,
    enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: prices[planId as keyof typeof prices],
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.headers.get('origin')}/pricing`,
  });

  return NextResponse.json({ sessionId: session.id });
}
