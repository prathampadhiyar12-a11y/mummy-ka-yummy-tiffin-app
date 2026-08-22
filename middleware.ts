import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "./src/lib/auth-session";

const protectedAdminPrefix = "/admin";
const protectedCustomerPaths = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(request.cookies.get("mkyt_session")?.value);
  const isAdminRoute = pathname.startsWith(protectedAdminPrefix);
  const isCustomerRoute = protectedCustomerPaths.some((path) => pathname.startsWith(path));

  if (isAdminRoute && session?.role !== "admin") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    loginUrl.searchParams.set("role", "admin");
    return NextResponse.redirect(loginUrl);
  }

  if (isCustomerRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    loginUrl.searchParams.set("role", "customer");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/dashboard", "/dashboard/:path*"],
};
