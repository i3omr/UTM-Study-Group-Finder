/*import { db } from "@/util/prisma";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt-ts'

export async function POST(req: Request){
    try {
    const body = await req.json();
    const {email,password} = body;

    //check if email already exists
    const existingUserByEmail = await db.user.findUnique({
        where: {email: email}
    });
    if (existingUserByEmail) {
         return NextResponse.json({user: null, message: "email is registered"},{status: 409})
    }

    const hashedPassword = await hash(password,10);

    const newUser =await db.user.create({
        data: {
            email: "user@example.com",   // Make sure email is provided
            password: "securepassword123", // Make sure password is provided
            name: "John Doe",             // Add the required name field
            major: "ComputerScienceNetworkAndSecurity" // Add the required major field
        }
    })
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({user: newUser, message: 'user created successfully'},{status: 201});
    } catch(error) {
        return NextResponse.json({ message: 'something went wrong'},{status: 500});
    }
    }*/
    
    
import { createUser } from "@/prisma/user/userqueries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const { username, email, password ,major} = formData.data;
        const userData = {username, email, password,major};

        const user = await createUser({
            ...userData,
            email: email.toLowerCase(),
        });
        
        return NextResponse.json({
            user: {
                
                name: user.name,
                email: user.email,
                major: user.major
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred"}, { status: 500 });
    }
}

