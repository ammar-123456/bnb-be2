"use client"

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEventHandler, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SearchInput = () => {
    const pathname = usePathname()
    const router = useRouter();
    const [value, setValue] = useState('')

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>{
        setValue(e.target.value)
    }

    return ( <div className="relative sm:block hidden">
        <Search className="absolute h-4 w-4 top-3 left-0 text-muted-foreground" />
        <Input value={value} onChange={onChange} placeholder="Search"
        className="p1-10 bg-primary/10" />
    </div> );
}
 
export default SearchInput;