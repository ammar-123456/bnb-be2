// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
  
// });

// export const config = {
//   matcher: [
//     // Ignorera interna Next.js-filer och statiska filer
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Applicera middleware på API-rutter
//     '/(api|trpc)(.*)',
//     '/hotel/new'
//   ],
// };




// middleware.ts
// import { clerkMiddleware } from "@clerk/nextjs/server";

// // Kontrollera om Clerk ska vara avstängt i utvecklingsläge
// export default function middleware(req: Request) {
//   const isClerkDisabled = process.env.NEXT_PUBLIC_DISABLE_CLERK === 'true';

//   if (isClerkDisabled) {
//     // Returnera en enkel respons om Clerk är inaktiverad
//     return new Response("Clerk is disabled in development.");
//   }

//   // Om Clerk är aktiverad, använd Clerk-middleware
//   return clerkMiddleware(req);
// }



// import { NextResponse } from 'next/server';
// import { clerkMiddleware } from '@clerk/nextjs/server';

// export function middleware(req: Request) {
//   const isClerkDisabled = process.env.NEXT_PUBLIC_DISABLE_CLERK === 'true';

//   if (isClerkDisabled) {
//     // Returnera en korrekt Response när Clerk är inaktiverad
//     return NextResponse.json({ message: 'Clerk is disabled in development.' }, { status: 200 });
//   }

//   // Om Clerk inte är inaktiverad, använd Clerk-middleware
//   return clerkMiddleware(req);
// }




import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

export function middleware(req: Request) {
  const isClerkDisabled = process.env.NEXT_PUBLIC_DISABLE_CLERK === 'true';

  if (isClerkDisabled) {
    // När Clerk är inaktiverad, returnera en 200 OK response istället för JSON.
    const response = NextResponse.next(); // Använd NextResponse.next() för att fortsätta processen
    return response;
  }

  // Annars använd Clerk middleware
  return clerkMiddleware(req);
}
