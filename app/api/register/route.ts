import { createUser } from "@/prisma/user/userqueries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.json();
        
        // Validate incoming data
        if (!formData.data || !formData.data.email || !formData.data.password) {
            return NextResponse.json({ 
                error: "Missing required fields" 
            }, { 
                status: 400 
            });
        }

        const { email, password } = formData.data;
        
        // Create user with default values for required fields
        const user = await createUser({
            email: email.toLowerCase(),
            password: password,
        });
        
        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
                major: user.major
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Registration failed" 
        }, { 
            status: 500 
        });
    }
}

