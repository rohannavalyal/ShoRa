import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: NextRequest,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId");
    }

    const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds },
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId");
    }

    const favoriteIds = (currentUser.favoriteIds || []).filter(
        (id) => id !== listingId
    );

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds },
    });

    return NextResponse.json(user);
}
