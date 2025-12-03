import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { sendMessageToGemini } from '../services/gemini';

import botIcon from '../assets/bot.svg';

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

    // Helper function to format markdown-like text (bolding and bullet points)
    const formatMessage = (text) => {
        if (!text) return null;

        const lines = text.split('\n');
        const formattedElements = [];
        let currentList = [];

        const processInlineFormatting = (line) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                }
                return part;
            });
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                currentList.push(
                    <li key={`li-${index}`}>
                        {processInlineFormatting(trimmedLine.substring(2))}
                    </li>
                );
            } else {
                if (currentList.length > 0) {
                    formattedElements.push(
                        <ul key={`ul-${index}`} className="message-list">
                            {currentList}
                        </ul>
                    );
                    currentList = [];
                }
                if (trimmedLine) {
                    formattedElements.push(
                        <div key={`p-${index}`} className="message-paragraph">
                            {processInlineFormatting(line)}
                        </div>
                    );
                } else {
                    // Preserve empty lines for spacing if needed, or ignore
                    formattedElements.push(<br key={`br-${index}`} />);
                }
            }
        });

        if (currentList.length > 0) {
            formattedElements.push(
                <ul key={`ul-end`} className="message-list">
                    {currentList}
                </ul>
            );
        }

        return formattedElements;
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbot-toggle" onClick={toggleChat}>
                    <img src={botIcon} alt="Chat with us" />
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
                    <form className="chatbot-input-form" onSubmit={handleSubmit}>
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
