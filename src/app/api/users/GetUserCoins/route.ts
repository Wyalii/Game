import { NextRequest, NextResponse } from "next/server";
import Database from "@/db/db";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
  console.log("user email is : " + email);
  const query = `
    SELECT "Coins" 
    FROM public."RegisteredUsers" 
    WHERE "Email" = $1;
  `;

  const result = await Database(query, [email]);

  if (result.length === 0) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: `succesfully returned user coins ${result[0].Coins}`,
      Coins: result[0].Coins,
    },
    { status: 200 }
  );
}
