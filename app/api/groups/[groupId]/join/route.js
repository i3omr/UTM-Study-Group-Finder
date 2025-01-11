// app/api/groups/[groupId]/join/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { userId } = await request.json();
    const groupId = params.groupId;

    // Add the user to the group
    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        members: {
          connect: {
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
    console.error('Error joining group:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to join group', 
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}