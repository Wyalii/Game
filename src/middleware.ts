import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";

  console.log("Token:", token);
  console.log("Path:", path);

  const isPublicPath = path === "/";
  const isGamePage = path === "/GamePage";

  if (isPublicPath && token) {
    console.log("Redirecting to /GamePage because token exists.");
    return NextResponse.redirect(new URL("/GamePage", req.nextUrl));
  }

  if (isPublicPath && !token) {
    console.log("Allowing access to / because no token.");
    return NextResponse.next();
  }

  if (isGamePage && !token) {
    console.log("Redirecting to / because no token on /GamePage.");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
