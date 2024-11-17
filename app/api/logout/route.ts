import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });
  
  // Clear the secure session cookie
  response.cookies.set("secretsession", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Expire immediately
    path: "/",
    value: ""
  });

  return response;
}