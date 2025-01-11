import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('securesession');

    console.log('Raw Session Cookie:', sessionCookie?.value);

    if (!sessionCookie) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try to parse the cookie value as base64 first
    try {
      const decodedValue = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
      console.log('Base64 Decoded:', decodedValue);
      const sessionData = JSON.parse(decodedValue);
      return new Response(JSON.stringify(sessionData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.log('Base64 decode failed, trying direct parse');
      try {
        const sessionData = JSON.parse(sessionCookie.value);
        return new Response(JSON.stringify(sessionData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e2) {
        console.log('Direct parse failed, trying URL decode');
        const sessionData = JSON.parse(decodeURIComponent(sessionCookie.value));
        return new Response(JSON.stringify(sessionData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  } catch (error) {
    console.error('Error getting session:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get session',
      details: error.message,
      rawCookie: sessionCookie?.value
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 