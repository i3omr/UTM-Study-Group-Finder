import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('securesession');

    if (!sessionCookie) {
      console.log('No session cookie found');
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log the raw cookie value
    console.log('Raw cookie value:', sessionCookie.value);

    // Get all users (temporary solution for debugging)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    console.log('Available users:', users);

    // For now, return the first user (for testing)
    if (users.length > 0) {
      return new Response(JSON.stringify(users[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'No users found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error getting user:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get user',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 