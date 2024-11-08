// import prismadb from "@/lib/prismadb";

// export const getHotels = async (searchParams: {
//     title: string;
//     country: string;
//     state: string;
//     city: string;
// }) => {
//     try {
//         const { title, country, state, city } = searchParams;

//         const hotels = await prismadb.hotel.findMany({
//             where: {
//                 title: {
//                     contains: title,
//                 },
//                 country,
//                 state,
//                 city,
//             },
//             include: { rooms: true },
//         });

//         return hotels;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error instanceof Error ? error.message : String(error));
//     }
// };



// import prismadb from "@/lib/prismadb";

// export const getHotels = async (searchParams: {
//     title: string;
//     country: string;
//     state: string;
//     city: string;
// }) => {
//     try {
//         const { title, country, state, city } = searchParams;

//         const hotels = await prismadb.hotel.findMany({
//             where: {
//                 title: {
//                     contains: title,
//                 },
//                 country,
//                 state,
//                 city,
//             },
//             include: { rooms: true },
//         });

//         return hotels;
//     } catch (error) {
//         console.error("Error fetching hotels:", error);
//         // Kontrollera om error är en instans av Error och kasta ett nytt fel
//         throw new Error(error instanceof Error ? error.message : "An unknown error occurred while fetching hotels.");
//     }
// };


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

export const getHotels = async (searchParams: {
    title: string
    country: string
    state: string
    city: string
}) =>{
    try{
        const{title, country, state, city} = searchParams;
        const hotels = await prisma.hotel.findMany()
        console.log(hotels)
        return hotels;
    } catch (error: any) {
        console.log(error);
        return []
    }
    
};