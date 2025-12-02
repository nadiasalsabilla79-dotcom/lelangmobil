import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // API routes are handled separately
  if (pathname.startsWith('/api/')) {
    return response
  }

  // Static files and Next.js internals
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return response
  }

  // Protected routes only
  const protectedRoutes = ['/dashboard', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return response
  }

  // Check authentication
  const authStorage = request.cookies.get('auth-storage')?.value
  let isAuthenticated = false
  
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage)
      isAuthenticated = parsed.state?.isAuthenticated || false
    } catch {
      // Invalid storage
    }
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.webp).*)',
  ],
}
