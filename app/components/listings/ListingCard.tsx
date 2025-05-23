'use client';

import { useCallback, useMemo, useState } from "react";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data         : SafeListing;
    reservation? : SafeReservation;
    onAction?    : (id: string) => void;
    disabled?    : boolean;
    actionLabel? : string;
    actionId?    : string;
    currentUser? : SafeUser | null;  
    }

const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId=" ",
    currentUser
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const location = getByValue(data.locationValue);
    
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled) return;

            onAction?.(actionId);
        },[disabled, onAction, actionId])

        const price = useMemo(() => {
            if(reservation){
                return reservation.totalPrice;
            }
            return data.price;
        }, [reservation, data.price]);

        const reservationDate = useMemo(() => {
            if(!reservation) return null;

            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            return `${format(start, 'PP')} - ${format(end, 'PP')}`;
        },[reservation]);
        
    return (
        <div 
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
                col-span-1 cursor-pointer group
            "   
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image 
                        fill
                        alt="Listing Image"
                        src={data.imageSrc[currentImageIndex]}
                        className="
                            object-cover
                            w-full
                            h-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    {data.imageSrc.length > 1 && (
                        <>
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(prev => 
                                        prev === 0 ? data.imageSrc.length - 1 : prev - 1
                                    );
                                }}
                                className="
                                    absolute 
                                    left-0
                                    top-0
                                    w-1/4
                                    h-full
                                    cursor-pointer
                                    flex
                                    items-center
                                    justify-start
                                    bg-gradient-to-r
                                    from-black/10
                                    to-transparent
                                    opacity-0
                                    group-hover:opacity-100
                                    transition
                                "
                            />
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(prev => 
                                        prev === data.imageSrc.length - 1 ? 0 : prev + 1
                                    );
                                }}
                                className="
                                    absolute 
                                    right-0
                                    top-0
                                    w-1/4
                                    h-full
                                    cursor-pointer
                                    flex
                                    items-center
                                    justify-end
                                    bg-gradient-to-l
                                    from-black/10
                                    to-transparent
                                    opacity-0
                                    group-hover:opacity-100
                                    transition
                                "
                            />
                            <div className="flex gap-2 absolute bottom-2 left-1/2 -translate-x-1/2">
                                {data.imageSrc.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                        }}
                                        className={`
                                            w-2 
                                            h-2 
                                            rounded-full 
                                            ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}
                                            transition
                                        `}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region},{location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate ||  data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ₹{price}
                    </div>
                    {!reservation &&  (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled = {disabled}
                        small
                        label ={ actionLabel}
                        onClick = {handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard