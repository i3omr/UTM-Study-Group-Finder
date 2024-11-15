import { prisma } from "@/util/prisma";
import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";


type CreateUserInput = Pick<User, 'email' | 'password'>;
export async function createUser(data: CreateUserInput) {
  let salt = genSaltSync(11);
  let hash = hashSync(data.password, salt);
  
  try {
    return await prisma.user.create({ data: { ...data, password: hash, role: "student", name:"Omar",major:"ComputerScienceNetworkAndSecurity"}});
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}
