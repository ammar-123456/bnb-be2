import { getHotelsByUserId } from "@/actions/getHotelsByUserId";
import HotelList from "@/components/hotel/HotelList";

const MyHotels = async () => {
    const hotels = await getHotelsByUserId()

    if(!hotels) return <div>No hotels found!</div>
    return ( <div>
        <h2 className="text-2x1 font-semibold">Here are your properties</h2>
        <HotelList hotels={hotels} />
    </div> );
}
 
export default MyHotels;