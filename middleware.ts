import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  
});

export const config = {
  matcher: [
    // Ignorera interna Next.js-filer och statiska filer
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Applicera middleware på API-rutter
    '/(api|trpc)(.*)',
    '/hotel/new'
  ],
};
