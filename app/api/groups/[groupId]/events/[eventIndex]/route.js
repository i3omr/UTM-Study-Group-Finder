// app/api/groups/[groupId]/events/[eventIndex]/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { eventTitle, eventDate } = await request.json();
    const groupId = params.groupId;

    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        eventTitle: eventTitle,
        eventDate: eventDate
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
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const groupId = params.groupId;

    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        eventTitle: null,
        eventDate: null
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

    const transformedGroup = {
      ...updatedGroup,
      events: [],
      resources: updatedGroup.resourcesName && updatedGroup.resourcesLink ? [{
        name: updatedGroup.resourcesName,
        link: updatedGroup.resourcesLink
      }] : []
    };

    return new Response(JSON.stringify(transformedGroup), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}