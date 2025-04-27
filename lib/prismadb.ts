// import { Prisma, PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined
// }

// const prismadb = globalThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV === "production") globalThis.prisma = prismadb

// export default prismadb;





// Mock implementation of Prisma client
const mockHotels = [
    {
      id: "1",
      title: "Luxury Beach Resort",
      description: "A beautiful resort on the beach with stunning ocean views.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      country: "Thailand",
      state: "Phuket",
      city: "Patong",
      locationDescription: "Located directly on Patong Beach",
      userId: "mock-user-id-123",
      createdAt: new Date() ,
      updatedAt: new Date()
    },
    {
      id: "2",
      title: "Mountain View Lodge",
      description: "Cozy lodge with breathtaking mountain views.",
      image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=2069&auto=format&fit=crop",
      country: "Switzerland",
      state: "Bern",
      city: "Interlaken",
      locationDescription: "Nestled in the Swiss Alps",
      userId: "mock-user-id-123",
      createdAt: new Date() ,
      updatedAt: new Date()
    }
  ];
  
  const mockRooms = [
    {
      id: "1",
      title: "Deluxe Ocean View",
      description: "Spacious room with a private balcony and ocean views.",
      roomPrice: 200,
      breakFastPrice: 25,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      hotelId: "1",
      createdAt: new Date() ,
      updatedAt: new Date()
    },
    {
      id: "2",
      title: "Garden Suite",
      description: "Elegant suite with garden access and sitting area.",
      roomPrice: 150,
      breakFastPrice: 20,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2067&auto=format&fit=crop",
      hotelId: "1",
      createdAt: new Date() ,
      updatedAt: new Date()
    },
    {
      id: "3",
      title: "Alpine Suite",
      description: "Luxurious suite with panoramic mountain views.",
      roomPrice: 250,
      breakFastPrice: 30,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop",
      hotelId: "2",
      createdAt: new Date() ,
      updatedAt: new Date()
    }
  ];
  
  const mockBookings = [
    {
      id: "1",
      userId: "mock-user-id-123",
      userName: "Test User",
      userEmail: "test@example.com",
      hotelId: "1",
      hotelOwnerId: "mock-user-id-123",
      roomId: "1",
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-05"),
      breakFastIncluded: true,
      totalPrice: 900,
      paymentIntentId: "mock_payment_intent_1",
      paymentStatus: "complete",
      currency: "usd",
      bookedAt: new Date(),
    }
  ];
  
  // Create a mock Prisma client
  const prismadb = {
    hotel: {
      findMany: async (params: any = {}) => {
        let hotels = [...mockHotels];
        
        // Handle where conditions
        if (params.where) {
          if (params.where.userId) {
            hotels = hotels.filter(hotel => hotel.userId === params.where.userId);
          }
          if (params.where.id) {
            hotels = hotels.filter(hotel => hotel.id === params.where.id);
          }
        }
        
        // Handle include
        if (params.include) {
          if (params.include.rooms) {
            hotels = hotels.map(hotel => ({
              ...hotel,
              rooms: mockRooms.filter(room => room.hotelId === hotel.id)
            }));
          }
        }
        
        return hotels;
      },
      findUnique: async (params: any) => {
        const hotel = mockHotels.find(h => h.id === params.where.id);
        
        if (!hotel) return null;
        
        // Handle include
        if (params.include) {
          if (params.include.rooms) {
            return {
              ...hotel,
              rooms: mockRooms.filter(room => room.hotelId === hotel.id)
            };
          }
        }
        
        return hotel;
      },
      create: async (params: any) => {
        const newHotel = {
          id: `${mockHotels.length + 1}`,
          ...params.data,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockHotels.push(newHotel as any);
        return newHotel;
      },
      update: async (params: any) => {
        const index = mockHotels.findIndex(h => h.id === params.where.id);
        if (index === -1) throw new Error("Hotel not found");
        
        const updatedHotel = {
          ...mockHotels[index],
          ...params.data,
          updatedAt: new Date()
        };
        
        mockHotels[index] = updatedHotel;
        return updatedHotel;
      },
      delete: async (params: any) => {
        const index = mockHotels.findIndex(h => h.id === params.where.id);
        if (index === -1) throw new Error("Hotel not found");
        
        const deletedHotel = mockHotels[index];
        mockHotels.splice(index, 1);
        return deletedHotel;
      }
    },
    room: {
      findMany: async (params: any = {}) => {
        let rooms = [...mockRooms];
        
        // Handle where conditions
        if (params.where) {
          if (params.where.hotelId) {
            rooms = rooms.filter(room => room.hotelId === params.where.hotelId);
          }
          if (params.where.id) {
            rooms = rooms.filter(room => room.id === params.where.id);
          }
        }
        
        return rooms;
      },
      findUnique: async (params: any) => {
        return mockRooms.find(r => r.id === params.where.id) || null;
      },
      create: async (params: any) => {
        const newRoom = {
          id: `${mockRooms.length + 1}`,
          ...params.data,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockRooms.push(newRoom as any);
        return newRoom;
      },
      update: async (params: any) => {
        const index = mockRooms.findIndex(r => r.id === params.where.id);
        if (index === -1) throw new Error("Room not found");
        
        const updatedRoom = {
          ...mockRooms[index],
          ...params.data,
          updatedAt: new Date()
        };
        
        mockRooms[index] = updatedRoom;
        return updatedRoom;
      },
      delete: async (params: any) => {
        const index = mockRooms.findIndex(r => r.id === params.where.id);
        if (index === -1) throw new Error("Room not found");
        
        const deletedRoom = mockRooms[index];
        mockRooms.splice(index, 1);
        return deletedRoom;
      }
    },
    booking: {
      findMany: async (params: any = {}) => {
        let bookings = [...mockBookings];
        
        // Handle where conditions
        if (params.where) {
          if (params.where.userId) {
            bookings = bookings.filter(booking => booking.userId === params.where.userId);
          }
          if (params.where.hotelOwnerId) {
            bookings = bookings.filter(booking => booking.hotelOwnerId === params.where.hotelOwnerId);
          }
          if (params.where.roomId) {
            bookings = bookings.filter(booking => booking.roomId === params.where.roomId);
          }
        }
        
        // Handle include
        if (params.include) {
          bookings = bookings.map(booking => {
            const result: any = { ...booking };
            
            if (params.include.Room) {
              result.Room = mockRooms.find(room => room.id === booking.roomId);
            }
            
            if (params.include.Hotel) {
              result.Hotel = mockHotels.find(hotel => hotel.id === booking.hotelId);
            }
            
            return result;
          });
        }
        
        // Handle orderBy
        if (params.orderBy && params.orderBy.bookedAt === "desc") {
          bookings.sort((a, b) => b.bookedAt.getTime() - a.bookedAt.getTime());
        }
        
        return bookings;
      },
      findUnique: async (params: any) => {
        let booking = null;
        
        if (params.where.id) {
          booking = mockBookings.find(b => b.id === params.where.id);
        } else if (params.where.paymentIntentId && params.where.userId) {
          booking = mockBookings.find(
            b => b.paymentIntentId === params.where.paymentIntentId && b.userId === params.where.userId
          );
        }
        
        if (!booking) return null;
        
        // Handle include
        if (params.include) {
          const result: any = { ...booking };
          
          if (params.include.Room) {
            result.Room = mockRooms.find(room => room.id === booking.roomId);
          }
          
          if (params.include.Hotel) {
            result.Hotel = mockHotels.find(hotel => hotel.id === booking.hotelId);
          }
          
          return result;
        }
        
        return booking;
      },
      create: async (params: any) => {
        const newBooking = {
          id: `${mockBookings.length + 1}`,
          ...params.data,
          bookedAt: new Date()
        };
        mockBookings.push(newBooking as any);
        return newBooking;
      },
      update: async (params: any) => {
        let index = -1;
        
        if (params.where.id) {
          index = mockBookings.findIndex(b => b.id === params.where.id);
        } else if (params.where.paymentIntentId && params.where.userId) {
          index = mockBookings.findIndex(
            b => b.paymentIntentId === params.where.paymentIntentId && b.userId === params.where.userId
          );
        }
        
        if (index === -1) throw new Error("Booking not found");
        
        const updatedBooking = {
          ...mockBookings[index],
          ...params.data
        };
        
        mockBookings[index] = updatedBooking;
        return updatedBooking;
      }
    }
  };
  
  export default prismadb;
  