'use server'
import { createSession } from "@/lib/session";
import { prisma } from "@/util/prisma";
import { compareSync } from "bcrypt-ts";

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