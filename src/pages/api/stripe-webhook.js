import Stripe from 'stripe';
import { sendEmail } from '@utils/mailersend';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);
const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const prerender = false;

export async function POST({ request }) {
  console.log('Webhook received at readrealtyreach.ca');
  
  let event;

  try {
    const payload = await request.text();
    const sig = request.headers.get('stripe-signature');

    console.log('Payload received, signature:', sig ? 'Present' : 'Missing');
    console.log('Endpoint secret:', endpointSecret ? 'Set' : 'Not set');

    if (!sig || !endpointSecret) {
      console.error('Missing signature or endpoint secret');
      return new Response('Missing signature or endpoint secret', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log('Event constructed successfully:', event.type);

  } catch (err) {
    console.error('Webhook Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Processing completed checkout for:', session.customer_email);
      
      await sendEmail(
        session.customer_email, 
        'Your ebook download', 
        'Thank you for your purchase. Here is your download link: https://web.readrealtyreach.com/rrebookcover.pdf'
      );
      console.log('Email sent successfully');
    } else {
      console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(`Error processing webhook: ${error.message}`, { status: 500 });
  }
}