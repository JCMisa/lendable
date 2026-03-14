import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 1. If trying to access onboarding while not logged in, go to sign-in
  if (!userId && req.nextUrl.pathname === "/onboarding") {
    return (await auth()).redirectToSignIn();
  }

  // 2. Check metadata from the session token
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete;

  // 3. Force onboarding if not completed
  if (userId && !onboardingComplete && req.nextUrl.pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  // 4. Prevent going back to onboarding if already done
  if (userId && onboardingComplete && req.nextUrl.pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
