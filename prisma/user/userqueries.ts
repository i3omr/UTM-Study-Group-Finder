import { prisma } from "@/util/prisma";
import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";


type CreateUserInput = Pick<User, 'email' | 'password'>;
export async function createUser(data: CreateUserInput) {
  let salt = genSaltSync(11);
  let hash = hashSync(data.password, salt);
  
  try {
    return await prisma.user.create({ data: { ...data, password: hash, role: "student", name:"Omar",major:"ComputerScienceNetworkAndSecurity",phoneNumber:"",gender:"",}});
  } catch (error) {
    console.error("Failed to create user in database");
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
          userId: userId,
        },
      },
    },
  });

  return groupCount;
}

export async function getUserInfo(userId:string){
  const userInfo = await prisma.user.findUnique({
    where:{
      userId: userId
    }, include:{
      groups: true,
    }
  })
  return userInfo;
}