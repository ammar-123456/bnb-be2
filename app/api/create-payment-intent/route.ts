import prismadb from "../../../lib/prismadb";
import { currentUser } from "../../../lib/mock-auth";
import { NextResponse } from "next/server";
import { Booking } from "@prisma/client";

export async function POST(req: Request){
    const user = await currentUser();

    if(!user){
        return new NextResponse("Unauthorized", {status: 401})
    }
    const body: {
        booking: Booking
        payment_intent_id: string
    } = await req.json();
    const {booking, payment_intent_id} = body;

    const bookingData: Booking = {
        ...booking,
        userName: user.firstName || "unkown",
        userEmail:user.emailAddresses[0]. emailAddress, 
        userId: user.id,
        currency: "usd",
        paymentIntentId: payment_intent_id,

    }
    let foundBooking;

    if(payment_intent_id){
        foundBooking = await prismadb.booking.findUnique({
            where: {paymentIntentId: payment_intent_id, userId: user.id}
        })
    }

    if(foundBooking && payment_intent_id){
        //apdate
        try {
            const updatedBooking = await prismadb.booking.update({
                where: {paymentIntentId : payment_intent_id, userId: user.id},
                data: bookingData
            })
            
            return NextResponse.json(updatedBooking)
        } catch (error: any) {
            console.log("Error updating booking:", error)
            return NextResponse.json({
                message: "Booking to updated not found"
            }, { status: 404})
        }
    }else{
        //create
        const paymenIntentId = Math.floor(Math.random() * 1000000)

        bookingData.paymentIntentId = paymenIntentId.toString()
        try {
            const newBooking = await prismadb.booking.create({
                data: bookingData
            })
            
            return NextResponse.json(newBooking)
        } catch (error: any) {
            console.log("Error creating booking:", error)
            return NextResponse.json({
                message: "Booking could not be created"
            }, { status: 400})
        }
    }

}