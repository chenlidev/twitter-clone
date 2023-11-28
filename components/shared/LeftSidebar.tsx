"use client";
import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {SignOutButton, SignedIn, useAuth} from "@clerk/nextjs";
import {sidebarLinks} from "@/constants";
import {DotsHorizontalIcon} from "@heroicons/react/outline";
import {fetchUser} from "@/lib/actions/user.actions";
import {Button} from "@/components/ui/button";
import PostModal from "@/components/shared/PostModal";


const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const {userId} = useAuth();

    interface UserInfo {
        _id: string;
        name: string;
        username: string;
        image: string;
    }

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the logout prompt
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        async function loadUserInfo() {
            if (userId) {
                const data = await fetchUser(userId);
                setUserInfo(data);
            }
        }

        loadUserInfo();
    }, [userId]);

    const toggleLogoutPrompt = () => {
        setShowDropdown(!showDropdown); // Toggle the visibility of the logout prompt
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className='leftsidebar'>
            <div className='flex flex-col items-start gap-3'>
                <div className='ml-5 rounded-full hover:bg-gray-200'>
                    <Link href='/'>
                        <Image
                            src='/assets/twitter-logo.svg'
                            alt='Twitter Logo'
                            width={30}
                            height={30}
                        />
                    </Link>
                </div>

                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    if (link.route === "/profile") link.route = `${link.route}/${userId}`;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className='hover:bg-gray-200 leftsidebar_link'>
                            <link.icon width={30}
                                       height={30}/>

                            <h2 className={`text-dark-1 max-lg:hidden ${isActive && "font-bold "}`}>{link.label}</h2>
                        </Link>
                    );
                })}


                <Button onClick={handleShowModal}
                        className="hidden lg:inline-block text-white rounded-full w-56 h-12 font-bold shadow-md ml-5 text-lg">
                    Tweet
                </Button>

                <div onClick={handleShowModal} className="lg:hidden pl-2.5">
                    <Image
                        className="rounded-full cursor-pointer"
                        src="/assets/tweet-icon.png"
                        alt="Tweet"
                        width={40}
                        height={40}/>
                </div>
                <PostModal show={showModal} onClose={handleCloseModal} userId={userInfo?._id || ""}
                           userImage={userInfo?.image || '/assets/default-profile.png'}/>


            </div>

            <div ref={dropdownRef} className='flex items-center gap-3'>
                <div onClick={toggleLogoutPrompt} className='flex cursor-pointer p-2 sm:p-5 items-center'>
                    {/* User Image */}
                    <div className='relative h-11 w-11'>
                        <Image
                            src={userInfo?.image || '/assets/default-profile.png'} // Fallback to default image if user image is not available
                            alt='User profile'
                            layout='fill'
                            className='rounded-full'
                        />
                    </div>

                    {/* User Information */}
                    <div className='flex-1 ml-2 max-lg:hidden'>
                        <h2 className='text-black font-bold'>
                            {userInfo?.name}
                        </h2>
                        <p className='text-gray-500 text-sm'>@{userInfo?.username}</p>
                    </div>
                    {showDropdown && (
                        <div className="fixed bottom-14 w-30 sm:bottom-20 sm:left-36 bg-white p-3 shadow-lg rounded-lg">
                            <SignedIn>
                                <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                                    <div className='flex cursor-pointer gap-4 p-4 hover:bg-gray-200'>
                                        Add an existing account
                                    </div>
                                </SignOutButton>
                            </SignedIn>

                            <SignedIn>
                                <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                                    <div className='flex cursor-pointer gap-4 p-4 hover:bg-gray-200'>
                                        Logout @{userInfo?.username}
                                    </div>
                                </SignOutButton>
                            </SignedIn>


                        </div>
                    )}
                    <DotsHorizontalIcon className="h-5 xl:ml-8 inline max-lg:hidden"/>
                </div>
            </div>
        </section>
    );
};

export default LeftSidebar;
