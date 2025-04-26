import prismadb from "@/lib/prismadb";
import { auth } from "@/lib/mock-auth";

export const getHotelsByUserId = async () => {
  
  try {

    const {userId} = auth()

    if(!userId){
        throw new Error('Unauthorize')
    }

    const hotels = await prismadb.hotel.findMany({
      where: {
        userId,
      },
      include: {
        rooms: true,
      },
    });
    
    
    return hotels;
  } catch (error: any) {
    throw new Error(`Failed to get hotels for user: ${error.message}`);
  }
};