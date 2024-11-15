import { createUser } from "@/prisma/user/userqueries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const { email, password } = formData.data;
        const userData = {email, password};

        const user = await createUser({
            ...userData,
            email: email.toLowerCase(),
        });
        
        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred"}, { status: 500 });
    }
}