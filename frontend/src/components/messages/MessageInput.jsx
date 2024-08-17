import { useState } from 'react';
import { BsSend, BsEmojiSmile } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = ({ inputRef }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { loading, sendMessage } = useSendMessage();

    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
        setShowEmojiPicker(false);
    };

    return (
        <div className="relative">
            <form action="" className="px-4 py-2" onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                    <button
                        type="button"
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"
                        onClick={() => {
                            setShowEmojiPicker(val => !val);
                            inputRef.current?.focus(); // Focus the input field
                        }}
                    >
                        <BsEmojiSmile />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        className="border cursor-text text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-600 text-white focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className={`absolute inset-y-0 right-0 flex items-center pr-3 ${loading ? 'text-gray-500' : 'text-white'}`}>
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                    </button>
                </div>
            </form>
            {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50" style={{ backgroundColor: '#1D232A' }}>
                    <Picker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
            )}
        </div>
    );
};

export default MessageInput;
