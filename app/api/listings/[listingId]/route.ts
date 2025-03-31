import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
    request: Request,
    { params }: { params: { listingId: string } }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listing id");
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}

export async function PUT(
    request: Request,
    { params }: { params: { listingId: string } }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    const body = await request.json();

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listing id");
    }

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;

    // Verify ownership
    const existingListing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    });

    if (!existingListing) {
        return new NextResponse("Listing not found", { status: 404 });
    }

    if (existingListing.userId !== currentUser.id) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const listing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
        }
    });

    return NextResponse.json(listing);
}
