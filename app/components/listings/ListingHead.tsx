'use client';

import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { useState } from "react";

interface ListingHeadProps {
    title           : string;
    locationValue   : string;
    imageSrc        : string[];  // Changed to array
    id              : string;
    currentUser?    : SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const location = getByValue(locationValue);

    return (
        <>
            <Heading 
                title={title}
                subtitle={`${location?.region},${location?.label}`}
            />
            <div className="relative flex flex-col gap-4">
                <div 
                    className="
                        w-full
                        h-[60vh]
                        overflow-hidden
                        rounded-xl
                        relative
                        group
                    "
                >
                    <Image
                        alt="Image"
                        src={imageSrc[currentImageIndex]}
                        fill
                        className="object-cover w-full"
                    />
                    {imageSrc.length > 1 && (
                        <>
                            <div 
                                onClick={() => setCurrentImageIndex(prev => 
                                    prev === 0 ? imageSrc.length - 1 : prev - 1
                                )}
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
                                onClick={() => setCurrentImageIndex(prev => 
                                    prev === imageSrc.length - 1 ? 0 : prev + 1
                                )}
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
                        </>
                    )}
                    <div className="absolute top-5 right-5">
                        <HeartButton 
                            listingId={id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                {imageSrc.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {imageSrc.map((src, index) => (
                            <button
                                key={src}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`
                                    relative
                                    w-24
                                    h-24
                                    flex-shrink-0
                                    rounded-md
                                    overflow-hidden
                                    ${currentImageIndex === index ? 'ring-2 ring-rose-500' : ''}
                                `}
                            >
                                <Image
                                    alt={`Thumbnail ${index + 1}`}
                                    src={src}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ListingHead;