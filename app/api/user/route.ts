import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    const data = request;
    console.log("Data recived: ", data);
    const registerUser = await prisma.user.create({data:{email:"Omar@gmail.com",major:"ComputerScienceNetworkAndSecurity",password:"omar123"}})
    return NextResponse.json({status:"success"}) 
}

export async function GET() {
    const registerUser = await prisma.user.findMany()
    return NextResponse.json({status:registerUser}) 
}