import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  deleteSession();
}