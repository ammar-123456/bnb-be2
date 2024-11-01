// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./glabals.css"

// import { ClerkProvider } from "@clerk/nextjs"
// import NavBar from "@/Components/layout/NavBar"

// const inter = Inter{{ subsets: ["latin" ] }}

// export const metadata: Metadata = {
//     title: "StaySavvy",
//     description: "Book a hotel of your choice" ,
//     icons:
// }

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     return (
//         <ClerkProvider>
//             <html lang="en" suppressHydrationWarning>
//                 <body className={inter.className}>
//                     <main className="flex flex-col min-h-screen bg-secondary">
//                         <NavBar />
//                         <section className="flex-grow">
//                             {children}
//                         </section>
//                     </main>
//                 </body>
//             </html>
//         </ClerkProvider>
//     )
// }




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // Korrigerad stavning

import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] }); 

export const metadata: Metadata = {
    title: "StaySavvy",
    description: "Book a hotel of your choice",
    icons: {
        icon: "/public/hotel-svg.ico", 
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider attribute="class"
                                    defaultTheme="system"
                                    enableSystem
                                    disableTransitionOnChange>
                                        <Toaster/>
                        <main className="flex flex-col min-h-screen bg-secondary">
                            <NavBar />
                            <section className="flex-grow">
                                <Container>
                                  {children}  
                                </Container>
                            </section>
                        </main>
                    </ThemeProvider>                   
                </body>
            </html>
        </ClerkProvider>
    );
}
