/** @format */

"use server";

import { cookies } from "next/headers";

// Save access token in cookies
export const saveTokens = async (token: string): Promise<void> => {
  (await cookies()).set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

// Get the access token from cookies
export const getCurrentUser = async (): Promise<string | undefined> => {
  const token = (await cookies()).get("accessToken")?.value;
  return token;
};

// Logout by deleting all auth cookies
export const logout = async (): Promise<void> => {
  (await cookies()).delete("accessToken");
};
