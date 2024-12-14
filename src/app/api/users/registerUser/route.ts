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
        { error: "Email and password is required" },
        { status: 400 }
      );
    }

    const checkQuery = `SELECT * FROM public."RegisteredUsers" WHERE "Email" = $1`;
    const checkResult = await Database(checkQuery, [email]);

    if (checkResult.length > 0) {
      return NextResponse.json(
        { error: "User with that Email is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT INTO public."RegisteredUsers" ("Email", "Password") VALUES($1, $2)`;
    await Database(insertQuery, [email, hashedPassword]);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "user registered successfully", redirectTo: "/GamePage" },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        message: "Error registering user",
        error: error,
      },
      { status: 500 }
    );
  }
}
