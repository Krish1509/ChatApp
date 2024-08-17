import Sidebar from '../../components/UserSidebar/Sidebar';
import NavSidebar from '../../components/NavigatSidebar/NavSidebar';
import { useEffect, useState, useRef, useCallback } from 'react';
import ChatNotSelected from "../../components/NavigatSidebar/ChatNotSelected";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from '../../zustand/useConversation';

const Home = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [chatWidth, setChatWidth] = useState(0);
    const chatRef = useRef(null);

    const updateChatWidth = useCallback(() => {
        if (chatRef.current) {
            setChatWidth(chatRef.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        if (selectedConversation && chatRef.current) {
            chatRef.current.focus();
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

        // Initial width update
        updateChatWidth();

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('resize', updateChatWidth);
        };
    }, [selectedConversation, setSelectedConversation, updateChatWidth]);

    return (
        <div className="flex h-screen rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <NavSidebar />
            <div className={`md:flex ${selectedConversation ? 'hidden' : 'flex'}`}>
                <Sidebar />
            </div>

                <div
                    ref={chatRef}
                    className={`flex flex-col w-full ${selectedConversation ? 'w-full' : 'hidden md:block w-full'} ${chatWidth <= 550 ? 'border-l border-gray-400' : ''}`}
                >
                    {!selectedConversation ? (
                        <ChatNotSelected  />
                    ) : (
                        <MessageContainer />
                    )}
                </div>
        </div>
    );
}

export default Home;
