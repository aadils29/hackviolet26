import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk is configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_publishable_key');

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)",
  "/dashboard(.*)",
  "/lesson(.*)",
]);

// Bypass middleware if Clerk is not configured
function bypassMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default isClerkConfigured 
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : bypassMiddleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
