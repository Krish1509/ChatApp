  import { useAuthContext } from '../../context/AuthContext';
  import useConversation from '../../zustand/useConversation';
  import { extractTime } from '../../utils/extractTime';
  import useDeleteMessage from '../../hooks/useDeleteMessage';
  import toast from 'react-hot-toast';
  import { MdDelete } from "react-icons/md";
  
  const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation, setMessages, messages } = useConversation();
    const { loading, deleteMessage } = useDeleteMessage();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || 'defaultProfilePic.png';
    const bubbleBgColor = fromMe ? "bg-blue-500 sendanimation " : "bg-gray-500 receiveranimation";

    const handleDelete = async () => {
      try {
        await deleteMessage(message._id);
        setMessages(messages.filter(msg => msg._id !== message._id));
        toast.success('Message deleted successfully');
        fromMe ? " receiveranimation" : " ";
      } catch (error) {
        toast.error('Failed to delete message');
      }
    };

    return (
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} alt="Profile" />
          </div>
        </div>
        <div className="message-container flex items-center">
          {fromMe && (
            <button onClick={handleDelete} disabled={loading} className="delete-button mr-2 text-xs text-[#e8edf1]"><MdDelete /></button>
          )}
          <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2 break-words overflow-hidden max-w-full `}>
            {message.message}
          </div>
        </div>
        <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formattedTime}</div>
      </div>
    );
  };

  export default Message;
