'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';

import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';


interface UserMenuProps{
    currentUser? : SafeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    },[currentUser,loginModal,rentModal]);

    const handleMenuItemClick = useCallback((action: () => void) => {
        action();
        setIsOpen(false);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    ShoRa your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:p-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-2
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu size={18} />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            <div
                className={`
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                    transition-all
                    duration-300
                    ease-in-out
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                `}
            >
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => handleMenuItemClick(() => router.push('/trips'))}
                                label='My trips'
                            />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(() => router.push('/favorites'))}
                                label='My favorites'
                            />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(() => router.push("/reservations"))}
                                label='My reservations'
                            />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(() => router.push('/properties'))}
                                label='My properties'
                            />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(rentModal.onOpen)}
                                label='ShoRa your home'
                            />
                            <hr />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(() => signOut())}
                                label='Logout'
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem 
                                onClick={() => handleMenuItemClick(loginModal.onOpen)}
                                label='Login'
                            />
                            <MenuItem 
                                onClick={() => handleMenuItemClick(registerModal.onOpen)}
                                label='Sign up'
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
