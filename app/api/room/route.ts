import prismadb from "../../../lib/prismadb";
import { auth } from "../../../lib/mock-auth";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const room = await prismadb.room.create({
            data: {
                ...body,
                
            },
        })

        return NextResponse.json(room);
    } catch (error) {
        console.log("Error at /api/room POST", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}