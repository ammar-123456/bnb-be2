"use client"

import useBookRoom from "../../hooks/useBookRoom"
// Using mock Stripe implementation
import RoomCard from "../room/RoomCard"
import {Elements} from "../../components/booking/MockStripeProvider"
// Mock StripeElementsOptions type
type StripeElementsOptions = any

import RoomPaymentForm from "./RoomPaymentForm"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Value } from "@radix-ui/react-select"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useAuth } from "../../lib/mock-auth";


// Using mock Stripe implementation instead of real Stripe
const stripePromise = { 
    // Mock implementation that returns a Promise resolving to a mock Stripe instance
    then: (callback: any) => callback({
      elements: () => ({}),
      confirmPayment: async () => ({ paymentIntent: { id: `pi_mock_${Date.now()}`, status: 'succeeded' }, error: null })
    })
  }
  
const BookRoomClient = () => {

    const {bookingRoomData, clientSecret} = useBookRoom()
    const [paymentSucess, setPaymentSuccess] = useState(false)
    const [pageLoaded, setPageLoaded] = useState(false)
    const {theme} = useTheme()
    const router= useRouter()


    useEffect(() =>{
        setPageLoaded(true)
    }, [])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance:{
            theme:theme === "dark" ? "night" : "stripe" ,
            labels: "floating"
        }
    }

    

    const handleSetPaymentSuccess = (Value: boolean) =>{
        setPaymentSuccess(Value)
    }

    if(pageLoaded && !paymentSucess && (!bookingRoomData || !clientSecret)) return <div className="flex items-center flex-col gap-4">
        <div className="text-rose-500">Oops! this page could not be propery loaded...</div>
        <div className="flex item-center gap-4">
        <Button variant='outline' onClick={() =>router.push('/')}>Go Home</Button>
        <Button onClick={() =>router.push('/my-bookings')}>View Bookings</Button>
        </div>
    </div>

    if(!paymentSucess) return <div className="flex items-center flex-col gap-4">
    <div className="text-teal-500 text-center">Payment Success</div>
    <Button onClick={() =>router.push('/my-bookings')}>View Bookings</Button>
    </div>

    return ( <div className="max-w-[700px] mx-auto">
        {clientSecret && bookingRoomData && <div>
                <h3 className="text-2x1 font-semibold mb-6">Complete payment to reserve this room!</h3>
                <div className="mb-6">
                    <RoomCard room={bookingRoomData.room}/>
                </div>
                <Elements options={options} stripe={stripePromise}>
                    <RoomPaymentForm clientSecret = {clientSecret} handleSetPaymentSuccess = 
                    {handleSetPaymentSuccess}/>
                </Elements>
        </div> }
        
    </div> );
}
 
export default BookRoomClient;