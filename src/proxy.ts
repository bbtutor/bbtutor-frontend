import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Get the accessToken from cookies
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // Define route types
  const protectedRoutes = ["/createLesson"];
  const authRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && accessToken) {
    // Check if there's a redirect parameter
    const redirect = request.nextUrl.searchParams.get("redirect");
    const redirectUrl = redirect || "/createLesson";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (optional, if you want to exclude them)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
