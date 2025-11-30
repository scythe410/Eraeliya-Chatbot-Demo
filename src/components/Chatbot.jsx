import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { sendMessageToGemini } from '../services/gemini';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the Eraeliya virtual assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const botResponseText = await sendMessageToGemini(userMessage.text);
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: "Sorry, something went wrong. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Helper function to format markdown-like text (bolding)
    const formatMessage = (text) => {
        if (!text) return null;
        // Split by bold markers (**text**)
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            // Handle newlines
            return part.split('\n').map((line, i) => (
                <span key={`${index}-${i}`}>
                    {line}
                    {i < part.split('\n').length - 1 && <br />}
                </span>
            ));
        });
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbot-toggle" onClick={toggleChat}>
                    <span role="img" aria-label="chat">💬</span>
                </button>
            )}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>Eraeliya Assistant</h3>
                        <button className="close-btn" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    {formatMessage(msg.text)}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-content typing-indicator">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
