import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    const groupId = params.groupId;

    // Delete the group
    await prisma.group.delete({
      where: {
        id: groupId
      }
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting group:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete group' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 