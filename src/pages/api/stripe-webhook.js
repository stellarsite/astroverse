// /api/stripe-webhook.js
import Stripe from 'stripe';
import { sendEmail } from '../utils/mailer'; // We'll create this utility function

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);
const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const prerender = false;

export async function POST({ request }) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Send email with ebook download link
    await sendEmail(session.customer_email, 'Your ebook download', 'Thank you for your purchase. Here is your download link: https://web.readrealtyreach.com/rrebookcover.pdf');
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}