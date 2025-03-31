import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Get all listings with string imageSrc
    const listings = await prisma.listing.findMany();
    
    // Update each listing
    for (const listing of listings) {
        // If imageSrc is a string, convert it to an array
        if (typeof listing.imageSrc === 'string') {
            await prisma.listing.update({
                where: { id: listing.id },
                data: {
                    imageSrc: [listing.imageSrc]
                }
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 