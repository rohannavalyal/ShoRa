'use client';

import { useRouter } from "next/navigation"; 
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import EditListingModal from "../components/modals/EditListingModal";

import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ 
    listings, 
    currentUser 
}) => { 
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingListing, setEditingListing] = useState<SafeListing | null>(null);

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted successfully");
                router.refresh(); 
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error );
            })
            .finally(() => {
                setDeletingId("");
            });
    }, [router]);

    const onEdit = useCallback((listing: SafeListing) => {
        setEditingListing(listing);
        setIsEditModalOpen(true);
    }, []);

    return (
        <Container>
            <Heading 
                title="Properties"
                subtitle="List of your properties"
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {/* Reservation items should be mapped here */}
                {listings.map((listing) => (
                    <div key={listing.id} className="relative">
                        <ListingCard 
                            key         = {listing.id}
                            data        = {listing}
                            actionId    = {listing.id}
                            onAction    = {onCancel}
                            disabled    = {deletingId === listing.id}
                            actionLabel = "Delete Properties"
                            currentUser = {currentUser}
                        />
                        <button
                            onClick={() => onEdit(listing)}
                            className="
                                absolute
                                top-2
                                right-2
                                bg-white
                                rounded-full
                                p-2
                                hover:bg-neutral-100
                                transition
                                cursor-pointer
                            "
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
            {editingListing && (
                <EditListingModal 
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingListing(null);
                    }}
                    listing={editingListing}
                />
            )}
        </Container>
    );
};

export default PropertiesClient;
