/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = [
  "/signin",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];
const SIGN_IN_URL = "/signin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  // If user is on an auth page and has a token, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is on a protected page and has no token, redirect to signin
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/users",
    "/orders",
    "/earnings",
    "/retailers",
    "/subscribers",
    "/affiliate-users",
    "/settings",
    "/signin",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ],
};
