import { getBookingsByHotelOwnerId } from "@/actions/getBookingsByHotelOwnerId";
import { getBookingByUserId } from "@/actions/getBookingsByUserId";
import MyBookingClient from "@/components/booking/MyBookingsClient";

const MyBookings = async() => {
    const bookingsFromVisitors = await getBookingsByHotelOwnerId()
    const bookingsIHaveMade = await getBookingByUserId()

    if(!bookingsFromVisitors && !bookingsIHaveMade) return <div>No bookings found</div>

    return ( <div className="flex flex-col gap-10">
        {!!bookingsIHaveMade?.length && <div>
            <h2 className="text-x1 md:text-2x1 font-semibold mb-6 mt-2">Here are bookings you have made</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 x1:grid-cols-3 gap-6">
                {bookingsIHaveMade.map(booking => <MyBookingClient key={booking.id} booking={booking}/>)}
            </div>
            </div>}
            {!!bookingsFromVisitors?.length && <div>
            <h2 className="text-x1 md:text-2x1 font-semibold mb-6 mt-2">Here are bookings visitors made on your properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 x1:grid-cols-3 gap-6">
                {bookingsFromVisitors.map(booking => <MyBookingClient key={booking.id} booking={booking}/>)}
            </div>
            </div>}
    </div> );
}
 
export default MyBookings;