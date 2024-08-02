import Stripe from 'stripe';

export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await request.json();
    const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

    // Get the host dynamically
    const host = request.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const siteUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.ebookTitle,
            },
            unit_amount: Math.round(data.price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      customer_email: data.customerEmail, // Add this line
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe API error:', error);
    return new Response(JSON.stringify({ message: 'Failed to create checkout session. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}