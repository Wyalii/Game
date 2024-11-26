import { NextRequest, NextResponse } from "next/server";
import { GetDbConnection } from "@/db/db";
import bcrypt from "bcryptjs";
import sql from "mssql";

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

    const db = await GetDbConnection();

    const checkQuery = `SELECT * FROM users WHERE email = @email`;
    const checkResult = await db
      .request()
      .input("email", sql.VarChar(255), email)
      .query(checkQuery);

    if (checkResult.recordset.length > 0) {
      return NextResponse.json(
        { error: "User with that Email is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (email, pass) VALUES(@email, @password)`;
    const result = await db
      .request()
      .input("email", sql.VarChar(255), email)
      .input("password", sql.VarChar(255), hashedPassword)
      .query(query);

    return NextResponse.json(
      { message: "user registered successfully" },
      { status: 201 }
    );
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
