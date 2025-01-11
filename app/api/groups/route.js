import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create the group in the database
    const newGroup = await prisma.group.create({
      data: {
        course: data.course,
        topic: data.topic,
        description: data.description,
        eventTitle: null,
        eventDate: null,
        resourcesName: null,
        resourcesLink: null,
        major: "ComputerScienceSoftwareEngineering", // Default value, adjust as needed
        groupDate: new Date(),
        members: {
          connect: [] // We'll handle member connections separately if needed
        }
      }
    });

    return new Response(JSON.stringify(newGroup), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error creating group:', error);
    return new Response(JSON.stringify({ error: 'Failed to create group', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
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

    // Transform the data to include events and resources arrays
    const transformedGroups = groups.map(group => ({
      id: group.id,
      course: group.course,
      topic: group.topic,
      description: group.description,
      major: group.major,
      groupDate: group.groupDate,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      members: group.members,
      events: group.eventTitle && group.eventDate ? [{
        title: group.eventTitle,
        date: group.eventDate
      }] : [],
      resources: group.resourcesName && group.resourcesLink ? [{
        name: group.resourcesName,
        link: group.resourcesLink
      }] : []
    }));

    return new Response(JSON.stringify(transformedGroups), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}