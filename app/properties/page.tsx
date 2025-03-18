import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title    = "Unauthorized"
                    subtitle = "Palese login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId : currentUser.id
    });

    if(listings.length === 0 ){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No Properties Found"
                    subtitle="Looks like you haven't listed any properties yet"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient
                listings     = {listings}
                currentUser  = {currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;