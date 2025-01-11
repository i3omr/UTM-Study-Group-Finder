// app/api/groups/[groupId]/exit/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { userId } = await request.json();
    const groupId = params.groupId;

    // Remove the user from the group
    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        members: {
          disconnect: {
            id: userId
          }
        }
      },
      include: {
        members: true
      }
    });

    return new Response(JSON.stringify(updatedGroup), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error exiting group:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to exit group', 
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}