import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const COOKIE_NAME = "accessToken";

// Cookie options - works for both development and production
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 60 * 60 * 24, // 24 hours
  path: "/",
} as const;

// Server-side: Set auth cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, cookieOptions);
}

// Server-side: Get auth cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Server-side: Delete auth cookie
export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Helper to set cookie in API route response
export function setAuthCookieInResponse(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, cookieOptions);
  return response;
}

// Helper to delete cookie in API route response
export function deleteAuthCookieInResponse(response: NextResponse) {
  response.cookies.delete(COOKIE_NAME);
  return response;
}
