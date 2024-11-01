import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { Currency } from "lucide-react";
import { NextResponse } from "next/server";
import Stripe from "stripe"
import { Booking } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion: "2024-09-30.acacia"
});

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
        const Currency_intent = stripe.paymentIntents.retrieve(payment_intent_id)
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id,{
                amount: booking.totalPrice * 100
            })

            const res = await prismadb.booking.update({
                where: {paymentIntentId : payment_intent_id, userId: user.id},
                data: bookingData
            })

            if(!res){
                return NextResponse.error()
            }

            return NextResponse.json({paymentIntent: updated_intent})
    }else{
        //create
        const paymenIntent = await stripe.paymentIntents.create({
            amount: booking.totalPrice * 100,
            currency: bookingData.currency,
            automatic_payment_methods: {enabled: true}
        }) 

        bookingData.paymentIntentId = paymenIntent.id;

        await prismadb.booking.create({
            data: bookingData
        })

        return NextResponse.json({paymenIntent})
    }

    return new NextResponse("Internal Server Error", {status: 500});
}