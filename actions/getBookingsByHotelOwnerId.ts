// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs/server";

// export const getBookingsByHotelOwnerId = async() =>{
//     try {
//         const {userId} = auth()

//         if(!userId){
//             throw new Error('Unauthorized')
//         }

//         const bookings = await prismadb.booking.findMany({
//             where:{
//                 hotelOwnerId: userId
//             },
//             include:{
//                 Room: true,
//                 Hotel: true,
//             },
//             orderBy:{
//                 bookedAt: "desc"
//             },
//         });

//         if(!bookings) return null;

//         return bookings

//     } catch (error) {
//         console.log(error);
//         throw new Error(error)
//     }
// };


import prismadb from "@/lib/prismadb";
import { auth } from "@/lib/mock-auth";


export const getBookingsByHotelOwnerId = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            throw new Error('Unauthorized');
        }

        const bookings = await prismadb.booking.findMany({
            where: {
                hotelOwnerId: userId,
            },
            include: {
                Room: true,
                Hotel: true,
            },
            orderBy: {
                bookedAt: "desc",
            },
        });

        if (!bookings) return null;

        return bookings;

    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to get bookings for hotel owner: ${error instanceof Error ? error.message : String(error)}`);
    }
};
