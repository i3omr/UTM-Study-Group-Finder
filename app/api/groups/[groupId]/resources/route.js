// app/api/groups/[groupId]/resources/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { resourceName, resourceLink } = await request.json();
    const groupId = params.groupId;

    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        resourcesName: resourceName,
        resourcesLink: resourceLink
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    // Transform the response to match the expected format
    const transformedGroup = {
      ...updatedGroup,
      events: updatedGroup.eventTitle && updatedGroup.eventDate ? [{
        title: updatedGroup.eventTitle,
        date: updatedGroup.eventDate
      }] : [],
      resources: updatedGroup.resourcesName && updatedGroup.resourcesLink ? [{
        name: updatedGroup.resourcesName,
        link: updatedGroup.resourcesLink
      }] : []
    };

    return new Response(JSON.stringify(transformedGroup), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding resource:', error);
    return new Response(JSON.stringify({ error: 'Failed to add resource' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}