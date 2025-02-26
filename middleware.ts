import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Next.js application
 * 
 * This middleware handles:
 * 1. Route protection
 * 2. Redirecting users to the main page when they try to access non-existent routes
 * 3. Other request/response modifications
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define valid routes in the application
  // Add all your valid routes here
  const validRoutes = [
    '/',
    '/blog',
    '/contactos',
    '/servicos',
    '/sobre',
    '/cotacao',
    '/copywrite',
    '/cliente'
  ];
  
  // Check if the current path is a valid route or starts with a valid route prefix
  // This handles nested routes like /blog/post-1
  const isValidRoute = validRoutes.some(route => 
    pathname === route || 
    (pathname.startsWith(route + '/') && route !== '/')
  );
  
  // Check if the path is for static assets or API routes
  const isStaticOrApi = pathname.startsWith('/api') || 
                        pathname.startsWith('/_next') || 
                        pathname.includes('favicon.ico') ||
                        /\.(svg|png|jpg|jpeg|gif|webp)$/.test(pathname);
  
  // If the route is not valid and not a static asset or API route, redirect to home page
  if (!isValidRoute && !isStaticOrApi) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Get response for matching route
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

/**
 * Configure which paths this middleware will run on
 * 
 * This middleware will run on all routes except for:
 * - API routes
 * - Static files (images, fonts, etc.)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 