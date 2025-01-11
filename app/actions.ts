'use server'
import { createSession } from "@/lib/session";
import { prisma } from "@/util/prisma";
import { compareSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData, state: any):Promise<any> {
    console.log("got in server", formData, "the state", state);
 
   // const potentialUser = await prisma.user.findUnique({ where: { email: state.get('email'), password: state.get('password') } })
   const potentialUser = await prisma.user.findUnique({ where: { email: state.get('email')} })
   if (!potentialUser) {
     return { errors: 'Error-Wrong Email or Password' }
   }
   if(potentialUser){
     const isPasswordValid = comparePasswordAndHash(state.get('password'),potentialUser.password)
     console.log("password validation",isPasswordValid);
 
     console.log("found the user");
     if(!isPasswordValid){
       return {errors:'Error-Wrong Email or Password'}
     }
     const baseUrl='http://localhost:4000/' 
 
     await createSession(potentialUser.id,potentialUser.role)
     return { success: 'okay',potentialUser }
   }
 
 }
 function comparePasswordAndHash(enteredPassword:string, storedHash:string) {
   return compareSync(enteredPassword, storedHash);
 }

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath('/admindashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath('/admindashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update user role' };
  }
}

export async function deleteGroup(groupId: string) {
  try {
    await prisma.group.delete({
      where: { id: groupId },
    });
    revalidatePath('/admindashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete group' };
  }
}

export async function updateGroup(groupId: string, data: {
  topic?: string;
  course?: string;
  description?: string;
  maxMembers?: number;
}) {
  try {
    // Convert maxMembers to number if it's a string
    const maxMembersNum = typeof data.maxMembers === 'string' 
      ? parseInt(data.maxMembers) 
      : data.maxMembers;

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        ...(data.topic && { topic: data.topic }),
        ...(data.course && { course: data.course }),
        ...(data.description && { description: data.description }),
        ...(maxMembersNum && { maxMembers: maxMembersNum }),
      },
    });

    revalidatePath('/admindashboard');
    return { success: true, group: updatedGroup };
  } catch (error) {
    console.error('Failed to update group:', error);
    return { success: false, error: 'Failed to update group' };
  }
}

export async function updateUser(userId: string, data: {
  name?: string;
  email?: string;
  role?: string;
  major?: string;
}) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath('/admindashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update user' };
  }
}