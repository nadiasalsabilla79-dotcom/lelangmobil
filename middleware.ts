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

  // Public routes
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/lelang',
    '/cara-kerja',
    '/tentang',
    '/kontak',
    '/verify-email',
    '/forgot-password',
    '/reset-password'
  ]
  
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/lelang/')
  )

  if (isPublicRoute) {
    return response
  }

  // Check authentication for protected routes
  const authStorage = request.cookies.get('auth-storage')?.value
  let isAuthenticated = false
  
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage)
      isAuthenticated = parsed.state?.isAuthenticated || false
    } catch {
      // Invalid storage, continue as unauthenticated
    }
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
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
