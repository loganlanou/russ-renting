import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only use Clerk middleware if configured
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default async function middleware(request: NextRequest) {
  if (!isClerkConfigured) {
    // If Clerk is not configured, allow all requests
    return NextResponse.next();
  }

  // Dynamically import and use Clerk middleware only if configured
  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server');

  const isPublicRoute = createRouteMatcher([
    '/',
    '/properties(.*)',
    '/about',
    '/contact',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/contact',
    '/api/email-capture',
  ]);

  return clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  })(request, {} as never);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
