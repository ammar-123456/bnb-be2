


"use client";

// Using mock auth implementation instead of Clerk
import { UserButton, useAuth } from "../../lib/mock-auth";
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
                        <UserButton afterSignOutUr1="/" />
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
