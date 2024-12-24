import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";

  const isPublicPath = path === "/";
  const isGamePage = path === "/GamePage";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/GamePage", req.nextUrl));
  }

  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  if (isGamePage && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
