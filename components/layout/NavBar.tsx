// "use client"

// import { UserButton } from "@clerk/nextjs"
// import Container from "../Container"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { Button } from "../ui/button"


// const NavBar = () => {
//     const router = useRouter()
//     const { userId } = useAuth()
//     return (<div className="sticky top-0 border border-b-primary/10 bg-secondary">
//         <Container>
//             <div className="flex justify-between items-center ">
//                 <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push("/") }>
//                     <Image src="/app/favicon.ico" alt="logo" 
//                     width="30" height="30" />
//                     <div className="font-bold text-x1">StaySavvy</div>
//                 </div>
//                 <div className="flex gap-3 items-center">
//                     <div>theme</div>
//                     <UserButton afterSignOutUrl="/" />
//                     {!userId && <>
//                         <Button onClick={() => router.push("/sign-in")} variant="outline" size="sm">Sign in</Button>
//                         <Button onClick={() => router.push("/sign-in")} size="sm">Sign in</Button>
//                     </>}
//                 </div>
//             </div>
//         </Container>
//     </div>);
// }

// export default NavBar;


"use client";

import { UserButton, useAuth } from "@clerk/nextjs"; // Glöm inte att importera useAuth
import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "../Searchlnput";
import { ModeToggle } from "../theme-toggle";
import { NavMenu } from "./NavMenu";

const NavBar = () => {
    const router = useRouter();
    const { userId } = useAuth(); // Hämta userId från useAuth

    return (
        <div className="sticky top-0 border border-b-primary/10 bg-secondary">
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push("/")}>
                        <Image src="/hotel.png" alt="logo" width={30} height={30} />
                        <div className="font-bold text-xl">StaySavvy</div> {/* Korrigerad text-xl */}
                    </div>
                    <SearchInput />
                    <div className="flex gap-3 items-center">
                        <div>
                            <ModeToggle/>
                            <NavMenu />
                            </div>
                        <UserButton afterSignOutUrl="/" />
                        {!userId ? ( // Kontrollera om userId finns
                            <>
                                <Button onClick={() => router.push("/sign-in")} variant="outline" size="sm">Sign in</Button>
                                <Button onClick={() => router.push("/sign-up")} size="sm">Sign up</Button> {/* Byt ut en av knapparna till sign-up */}
                            </>
                        ) : null}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default NavBar;
