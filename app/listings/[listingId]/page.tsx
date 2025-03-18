import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

// interface IParams {
//     listingId? : string;
// }

// interface ListingPageProps {
//     params: IParams; // Ensure params is explicitly typed as an object
// }
interface IParams {
    listingId: string;
  }
  
  interface ListingPageProps {
    params: IParams;
  }

const ListingPage = async ({ params }: ListingPageProps) => {
    const { listingId } = params; // Ensure we're using an object, not a promise

    if (!listingId) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    // Fetch data concurrently
    const [listing, reservations, currentUser] = await Promise.all([
        getListingById({ listingId }),
        getReservations({ listingId }),
        getCurrentUser(),
    ]);

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ListingPage;
