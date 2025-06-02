import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || 
                      path === "/auth/signin" || 
                      path.startsWith("/api/auth") || 
                      path.startsWith("/_next") || 
                      path === "/favicon.ico";

  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirect to sign in page if accessing protected route without token
  if (!token && !isPublicPath) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  // Redirect to callback URL or home page if accessing sign in page with token
  if (token && path === "/auth/signin") {
    const callbackUrl = new URL(request.url).searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/dream", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/signin (sign in page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth/signin).*)",
  ],
}; 