import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from '../../zustand/useConversation';
import { getDateString } from '../../utils/extractTime';

const Messages = ({ inputRef }) => {
    const { selectedConversation } = useConversation();
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    const handlePlaceholderClick = () => {
        inputRef.current?.focus(); // Focus the input field
    };

    // Group messages by date
    const groupMessagesByDate = (messages) => {
        const groupedMessages = [];
        let lastDate = null;

        messages.forEach((message) => {
            const messageDate = new Date(message.createdAt);
            const dateString = getDateString(messageDate);

            if (dateString !== lastDate) {
                // If the date is different from the lastDate, add a date separator
                groupedMessages.push({
                    type: 'dateSeparator',
                    dateString: dateString,
                });
                lastDate = dateString;
            }

            groupedMessages.push(message);
        });

        return groupedMessages;
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className='px-4 flex-1 overflow-auto '>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && groupedMessages.length > 0 && groupedMessages.map((item, index) => (
                item.type === 'dateSeparator' ? (
                    <div key={index} className="date-separator text-center   text-gray-200 text-xs my-2">
                      <span  className=" bg-[#1D232A] rounded-lg p-[4px]">
                         {item.dateString}
                    </span> 
                    </div>
                ) : (
                    <div key={item._id} ref={index === groupedMessages.length - 1 ? lastMessageRef : null}>
                        <Message message={item} />
                    </div>
                )
            ))}

            {!loading && groupedMessages.length === 0 && (
                <p
                    className='text-center flex justify-center items-center text-[#f0f0f0] mt-5 cursor-pointer' // Add cursor-pointer class
                    onClick={handlePlaceholderClick} // Add click handler
                >
                            <span className="">
                                <span className="mr-1">
                    Send a message to start the conversation with 
                                </span>
                                
                                 <span className="font-semibold">
                                     {selectedConversation.fullName}
                                    </span>
                                </span>
                    {/* <span className="font-semibold ml-1">  */}
                        {/* </span> */}
                </p>
            )}
        </div>
    );
};

export default Messages;
