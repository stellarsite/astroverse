export const prerender = false;

export async function POST({ request }) {
  try {
    const { email } = await request.json();
    
    const API_TOKEN = import.meta.env.MAILERLITE_API_TOKEN;
    const GROUP_ID = '128478436140255110'; // Your actual group ID

    const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ 
        email,
        groups: [GROUP_ID]
      }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: 'Subscribed successfully!' }), { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      const errorData = await response.json();
      console.error('MailerLite API error:', errorData);
      return new Response(JSON.stringify({ message: 'Failed to subscribe. Please try again.' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occurred.' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}