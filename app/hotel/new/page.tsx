import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
    params: {
        hotelId: string
    }
}

const Hotel = async ({params}: HotelPageProps) => {
    const {userId} = auth()

    if (!userId) return <div>Nots authenticated...</div>

    return ( <div>
        <AddHotelForm /  > 
    </div> );
}

export default Hotel;