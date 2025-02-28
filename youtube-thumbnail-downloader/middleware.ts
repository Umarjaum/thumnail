import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Only apply middleware to /api/thumbnail
  if (path.startsWith("/api/thumbnail")) {
    // Check if the request has a referer header
    const referer = request.headers.get("referer")

    // Rate limiting could be implemented here
    // For now, we'll just add some basic validation

    // Add security headers
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}

