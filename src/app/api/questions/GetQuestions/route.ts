import Database from "@/db/db";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const query = `SELECT * FROM public."Questions"`;
    const result = await Database(query);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
