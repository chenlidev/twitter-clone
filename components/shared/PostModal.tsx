import React, {useEffect, useRef} from 'react';
import PostTweet from "@/components/forms/PostTweet";
import Image from "next/image";

interface PostModalProps {
    onClose: () => void;
    show: boolean;
    userId: string;
    userImage: string;
}

const PostModal: React.FC<PostModalProps> = ({onClose, show, userId, userImage}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside of it
    const handleCloseOnClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    // Close modal on pressing the Escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleCloseOnClick);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleCloseOnClick);
        };
    }, [onClose]);

    if (!show) {
        return null;
    }

    return (
        <div className="post-modal">
            <div className="rounded-3xl bg-white p-5" ref={modalRef}>
                <button onClick={onClose} className="rounded-full hover:bg-gray-200">
                    <Image
                        src={'/assets/close.svg'}
                        alt='close_icon'
                        width={25}
                        height={25}/>
                </button>
                <PostTweet userId={userId} userImage={userImage} onClose={onClose}/>

            </div>
        </div>
    );
};

export default PostModal;