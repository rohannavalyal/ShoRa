import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";  

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body;

        // Validate input
        if (!email || !name || !password) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return new NextResponse('Email already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}