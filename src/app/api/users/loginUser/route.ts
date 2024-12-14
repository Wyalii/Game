import { NextRequest, NextResponse } from "next/server";
import Database from "@/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    const query = `SELECT * FROM public."RegisteredUsers" WHERE "Email" = $1`;
    const result = await Database(query, [email]);

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result[0];

    const comparePassword = await bcrypt.compare(password, user.Password);

    if (!comparePassword) {
      return NextResponse.json(
        { error: "User password is incorrect." },
        { status: 401 }
      );
    }
    console.log(user.id);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "User authenticated successfully.", redirectTo: "/GamePage" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error checking user credentials" },
      { status: 500 }
    );
  }
}
