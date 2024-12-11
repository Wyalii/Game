import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const path = req.nextUrl.pathname;
  console.log("Middleware triggered. Current path:", path);

  if (!token && path === "/ProfilePage") {
    console.log("No token, redirecting to home page.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && path === "/") {
    console.log("Token present, redirecting to ProfilePage.");
    return NextResponse.redirect(new URL("/ProfilePage", req.url));
  }
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      console.log("JWT token verified, proceeding.");
      return NextResponse.next();
    }
  } catch (error) {
    const response = NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );

    response.cookies.delete("token");
  }

  return NextResponse.next();
}
