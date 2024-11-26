import { NextRequest, NextResponse } from "next/server";
import { GetDbConnection } from "@/db/db";
import bcrypt from "bcryptjs";
import sql from "mssql";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    // Get DB connection
    const db = await GetDbConnection();

    // Query to fetch user by email
    const query = `SELECT * FROM users WHERE email = @email`;
    const result = await db
      .request()
      .input("email", sql.VarChar(255), email)
      .query(query);

    // If user is not found, return 404
    if (result.recordset.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the user from the query result
    const user = result.recordset[0];

    // Compare the provided password with the hashed password in the database
    const comparePassword = await bcrypt.compare(password, user.pass);

    // If password doesn't match, return 401 (Unauthorized)
    if (!comparePassword) {
      return NextResponse.json(
        { error: "User password is incorrect." },
        { status: 401 }
      );
    }

    // If successful, return success message
    return NextResponse.json(
      { message: "User authenticated successfully." },
      { status: 200 }
    );
  } catch (error) {
    // Log any errors and return a 500 error
    console.error(error);
    return NextResponse.json(
      { error: "Error checking user credentials" },
      { status: 500 }
    );
  }
}
