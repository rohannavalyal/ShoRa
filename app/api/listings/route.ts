import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
    request: Request,
){
    const currentUser = await getCurrentUser(); 

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const{
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location,
    }= body;

    // Ensure imageSrc is always an array
    const imageArray = Array.isArray(imageSrc) ? imageSrc : [imageSrc];

    // Object.keys(body).forEach((value:any) => {
    //     if(!body[value]){
    //         NextResponse.error();
    //     }
    // });

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc: imageArray,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            price: parseInt(price, 10),
            locationValue: location.value,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}