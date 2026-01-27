import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Add custom headers to demonstrate middleware functionality
  response.headers.set("x-middleware-test", "active");
  response.headers.set("x-request-time", new Date().toISOString());
  response.headers.set("x-request-path", request.nextUrl.pathname);

  // Set a cookie to track middleware visits
  if (!request.cookies.has("middleware-visited")) {
    response.cookies.set("middleware-visited", new Date().toISOString(), {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all test pages
    "/tests/:path*",
    // Match API routes
    "/api/:path*",
  ],
};
