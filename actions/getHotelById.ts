import prismadb from "@/lib/prismadb";

export const getHotelById = async (hotelId: string) => {
  console.log("Getting hotel")
  try {
    const hotel = await prismadb.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        rooms: true,
      },
    });
    if (!hotel) return null;
    
    console.log("Hotel", hotel)
    return hotel;
  } catch (error: any) {
    console.log(`Failed to get hotel with ID ${hotelId}: ${error.message}`)
    // Lägg till ett mer beskrivande felmeddelande och inkludera originalfelet
    throw new Error(`Failed to get hotel with ID ${hotelId}: ${error.message}`);
  }
};
