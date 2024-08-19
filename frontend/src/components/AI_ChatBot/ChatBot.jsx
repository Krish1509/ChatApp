import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            sender: 'user',
            text: input,
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/chatbot', {
                message: input,
            });

            const botMessage = {
                sender: 'bot',
                text: response.data.message,
            };

            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error fetching response from GPT:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container bg-gray-900 text-white p-4 rounded-md">
            <div className="messages-container mb-4 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`p-2 rounded-md inline-block ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="input-container flex">
                <input
                    type="text"
                    className="flex-1 p-2 bg-gray-800 rounded-md outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button
                    className="ml-2 px-4 py-2 bg-blue-600 rounded-md"
                    onClick={sendMessage}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
