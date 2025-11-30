import React, { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../data/knowledgeBase';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! Welcome to Eraeliya Villas & Gardens. How can I assist you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const processInput = (input) => {
        const lowerInput = input.toLowerCase();
        let response = knowledgeBase.default;

        if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey') || lowerInput.includes('good morning') || lowerInput.includes('good afternoon') || lowerInput.includes('good evening')) {
            response = "Hello! I'm here to help you plan your perfect stay at Eraeliya. Ask me about our offers, villas, or dining!";
        } else if (lowerInput.includes('menu') || lowerInput.includes('food list') || lowerInput.includes('drink list')) {
            response = "You can view our full menu here: /menu.pdf";
        } else if (lowerInput.includes('offer') || lowerInput.includes('deal') || lowerInput.includes('discount')) {
            const offersList = knowledgeBase.offers.map(o => `• ${o.title}: ${o.description}`).join('\n\n');
            response = "Here are our current offers:\n\n" + offersList;
        } else if (lowerInput.includes('villa') || lowerInput.includes('room') || lowerInput.includes('stay') || lowerInput.includes('accommodation') || lowerInput.includes('suite')) {
            const villaList = knowledgeBase.villas.map(v => `• ${v.name}: ${v.description}`).join('\n\n');
            response = "We have the following accommodations:\n\n" + villaList;
        } else if (lowerInput.includes('food') || lowerInput.includes('dining') || lowerInput.includes('eat') || lowerInput.includes('restaurant') || lowerInput.includes('breakfast')) {
            response = `${knowledgeBase.dining.description}\n\nPhilosophy: ${knowledgeBase.dining.philosophy}\n\nBreakfast: ${knowledgeBase.dining.breakfast}\n\nDon't miss our signature dish: ${knowledgeBase.dining.signatureDish}`;
        } else if (lowerInput.includes('experience') || lowerInput.includes('activity') || lowerInput.includes('do') || lowerInput.includes('yoga') || lowerInput.includes('surf') || lowerInput.includes('spa') || lowerInput.includes('massage') || lowerInput.includes('excursion')) {
            response = "You can enjoy:\n" + knowledgeBase.experiences.join('\n');
        } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('address')) {
            response = `You can reach us at ${knowledgeBase.contact.phone} or ${knowledgeBase.contact.email}. We are located at ${knowledgeBase.contact.address}.`;
        }

        return response;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Simulate bot thinking delay
        setTimeout(() => {
            const botResponseText = processInput(inputValue);
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        }, 600);

        setInputValue("");
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button className="chatbot-toggle" onClick={toggleChat}>
                    Chat
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
                                <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type your question..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
