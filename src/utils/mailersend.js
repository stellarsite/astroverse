// /utils/mailersend.js
import fetch from 'node-fetch';

export async function sendEmail(to, subject, content) {
  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${import.meta.env.MAILERSEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: {
        email: 'hello@readrealtyreach.com',
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      text: content,
      html: content,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}