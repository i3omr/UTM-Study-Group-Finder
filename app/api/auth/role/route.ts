// app/api/auth/role/route.js
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return new Response(JSON.stringify({ error: 'No session found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sessionData = JSON.parse(session.value);
    const role = sessionData.role;

    if (!role) {
      return new Response(JSON.stringify({ error: 'Role not found in session' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching role:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}