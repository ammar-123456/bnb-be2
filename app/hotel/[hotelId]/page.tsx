import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
    params: {
        hotelId: string
    }
}

const Hotel = async ({params}: HotelPageProps) => {
    console.log(params)
    const hotel = await getHotelById(params.hotelId)
    const {userId, ...rest} = auth()
    console.log("USER", userId, hotel)
    if (!userId) return <div>Not authenticated...</div>

    if (!hotel || hotel.userId != userId) return <div>Access denied...</div>

    return ( <div>
        <AddHotelForm hotel={hotel} /> 
    </div> );
}

export default Hotel;