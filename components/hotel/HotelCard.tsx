"use client"

import { usePathname } from "next/navigation";
import { HotelWithRooms } from "./AddHotelForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dumbbell, MapPin, Waves } from "lucide-react";
import useLocation from "../../hooks/useLocation";
import { Country } from "country-state-city";
import AmenityItem from "../AmenityItem";
import { Button } from "../ui/button";
import { FaSwimmer } from "react-icons/fa";
import { cn } from "../../lib/utils";

const HotelCard = ({hotel}:{hotel: HotelWithRooms}) => {
    
    const pathname = usePathname()
    const isMyHotels = pathname.includes("my-hotels")
    const router = useRouter()
    const {getCountryByCode} = useLocation()
    const country = getCountryByCode(hotel.country)

    return ( <div onClick={() => !isMyHotels && router.push(`/hotel-details/${hotel.id}`)} className={cn
    ("col-span-1 cursor-pointer transition hover:scale-105",isMyHotels && "cursor-default" )}>
        <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
                <Image fill src={hotel.image} alt={hotel.title} className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
                <h3 className="font-semibold text-x1">{hotel.title}</h3>
                <div className="text-primary/90">{hotel.description.substring(0, 45)}...</div>
                <div className="text-primary/90">
                    <AmenityItem>
                        <MapPin className="w-4 h-4"/> {country?.name},{hotel.city}
                    </AmenityItem>
                    {hotel.swimmingPool && <AmenityItem><FaSwimmer size={18}/>Pool</AmenityItem>}
                    {hotel.gym && <AmenityItem><Dumbbell className="w-4 h-4"/>Gym</AmenityItem>}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        {hotel.rooms?.length > 0 && hotel?.rooms[0]?.roomPrice && <>
                            <div className="font-semibold text-base">${hotel?.rooms[0].roomPrice}</div>
                            <div className="text-xs">24hrs</div>
                        </>}
                    </div>
                    {isMyHotels && <Button onClick = {() => router.push(`/hotel/${hotel.id}`)} variant= "outline">Edit</Button>}
                </div>
            </div>
        </div>
    </div> );
}
 
export default HotelCard;