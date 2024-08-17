import { useEffect, useState, useRef, useCallback } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import ProfileR from './profileR';
import { IoClose } from 'react-icons/io5';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const inputRef = useRef(null);
    const chatRef = useRef(null);

    const updateChatWidth = useCallback(() => {
        if (chatRef.current) {
            chatRef.current.clientWidth;
        }
    }, []);

    useEffect(() => {
        if (selectedConversation && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedConversation]);

    useEffect(() => {
        const handlePopState = () => {
            if (selectedConversation) {
                setSelectedConversation(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('resize', updateChatWidth);

        updateChatWidth();

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('resize', updateChatWidth);
        };
    }, [selectedConversation, setSelectedConversation, updateChatWidth]);

    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <>
            <div className="bg-[#647080b8] px-4 py-2 mb-2 flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
                <div className={`chat-image avatar flex-shrink-0 ${isOnline ? 'online' : ''}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={profilePic} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                </div>
                <div className="flex-1">
                    <span className="text-gray-900 font-bold text-lg">{selectedConversation.fullName}</span>
                    <div className={`text-sm ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </div>
                </div>
            </div>
            <Messages />
            <MessageInput inputRef={inputRef} />
            {isProfileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl bg-[#01090f82] z-50" onClick={handleCloseProfileModal}>
                    <div className="relative bg-[#647080] p-4 rounded-lg shadow-sm max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 z-10 cursor-pointer"
                            onClick={handleCloseProfileModal}
                        >
                            <IoClose className="text-gray-700 text-xl cursor-pointer" />
                        </button>
                        <ProfileR selectedConversation={selectedConversation} />
                    </div>
                </div>
            )}
        </>
    );
}

export default MessageContainer;
