import { prisma } from "@/util/prisma";
import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";


type CreateUserInput = Pick<User, 'email' | 'password'>;
export async function createUser(data: CreateUserInput) {
  try {
    const salt = genSaltSync(11);
    const hash = hashSync(data.password, salt);
    
    return await prisma.user.create({ 
      data: { 
        email: data.email,
        password: hash,
        name: "New User", // Default name
        major: "ComputerScienceNetworkAndSecurity", // Default major
        role: "student"
      }
    });
  } catch (error) {
    console.error("Create user error:", error);
    throw error;
  }
}


export async function getNumberOfUsers() {
  const userCount = await prisma.user.count();
  return userCount;
}

export async function getNumberOfGroups() {
  const groupCount = await prisma.group.count();
  return groupCount;
}

export async function getNumberOfGroupsForUser(userId: string) {
  const groupCount = await prisma.group.count({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
  });

  return groupCount;
}

export async function getUserInfo(userId: string) {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      groups: {
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          course: true,
          major: true
        }
      }
    }
  });
  return userInfo;
}