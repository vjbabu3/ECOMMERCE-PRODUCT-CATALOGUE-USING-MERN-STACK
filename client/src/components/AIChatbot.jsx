import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hi there! I am your ShopZone AI Assistant. How can I help you find products today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await axios.post('/api/ai/chat', { message: userMsg.text });
            setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [...prev, { sender: 'ai', text: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chat Bubble Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-accent text-primary p-4 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center font-bold text-2xl"
                >
                    <FaCommentDots />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[400px] sm:h-[500px]">
                    {/* Header */}
                    <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center space-x-2">
                            <FaRobot className="text-accent text-xl" />
                            <span className="font-bold tracking-wide">ShopZone AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-primary text-white self-end rounded-br-none' : 'bg-white border text-gray-800 self-start rounded-bl-none shadow-sm'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-xs text-gray-400 italic self-start bg-white p-2 rounded-lg border">
                                AI is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={sendMessage} className="p-3 bg-white border-t flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about products..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button disabled={isLoading} type="submit" className="bg-primary text-accent p-2.5 rounded-full hover:bg-opacity-90 transition disabled:opacity-50">
                            <FaPaperPlane className="relative right-0.5" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
