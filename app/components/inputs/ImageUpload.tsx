'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    // eslint-disable-next-line no-var
    var cloudinary: {
        widget: {
            open: () => void;
        };
    };
}

interface ImageUploadProps {
    onChange: (value: string[]) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        if (result.event === "success") {
            // Ensure we're not replacing existing images
            const newValue = Array.isArray(value) ? [...value] : [];
            newValue.push(result.info.secure_url);
            onChange(newValue);
        }
    }, [onChange, value]);

    const handleRemove = useCallback((imageUrl: string) => {
        onChange(value.filter(url => url !== imageUrl));
    }, [onChange, value]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {value.map((url) => (
                    <div key={url} className="relative aspect-square w-full">
                        <Image
                            alt="Property"
                            fill
                            src={url}
                            className="object-cover rounded-lg"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(url);
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onSuccess={handleUpload}
                uploadPreset="rohan1"
                options={{
                    cloudName: "dwfbnhdov",
                    maxFiles: 1,
                    sources: ['local', 'url', 'camera'],
                    multiple: false
                }}
            >
                {({ open }) => {
                    const canUploadMore = !value || value.length < 5;
                    return (
                        <div
                            onClick={() => canUploadMore && open?.()}
                            className={`
                                relative
                                cursor-pointer
                                hover:opacity-70
                                transition
                                border-dashed
                                border-2
                                p-20
                                border-neutral-300
                                flex
                                flex-col
                                justify-center
                                items-center
                                gap-4
                                text-neutral-600
                                rounded-lg
                                ${!canUploadMore ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            <TbPhotoPlus size={50} />
                            <div className='font-semibold text-lg'>
                                {canUploadMore ? 'Click to upload more images' : 'Maximum images reached'}
                            </div>
                            <div className='text-neutral-500 text-sm'>
                                {value.length} / 5 images uploaded
                            </div>
                        </div>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;

