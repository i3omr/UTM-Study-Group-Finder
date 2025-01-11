import { prisma } from "@/util/prisma";

export async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      groups: true,
    },
  });
}

export async function getAllGroups() {
  return await prisma.group.findMany({
    include: {
      members: true,
    },
  });
}

export async function getNumberOfUsers() {
  return await prisma.user.count();
}

export async function getNumberOfGroups() {
  return await prisma.group.count();
} 