import React, { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../data/knowledgeBase';
import Fuse from 'fuse.js';
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

        // 1. Check for specific villa matches first
        // Clean input to remove common conversational prefixes for better entity matching
        const cleanInput = lowerInput
            .replace(/tell me about/g, '')
            .replace(/what is/g, '')
            .replace(/show me/g, '')
            .replace(/details of/g, '')
            .replace(/info on/g, '')
            .replace(/can you/g, '')
            .replace(/i want to know about/g, '')
            .trim();

        const villaOptions = {
            includeScore: true,
            threshold: 0.4, // Slightly relaxed threshold since we cleaned input
            keys: ['name']
        };
        const villaFuse = new Fuse(knowledgeBase.villas, villaOptions);
        const villaResult = villaFuse.search(cleanInput);

        if (villaResult.length > 0) {
            const villa = villaResult[0].item;
            return `**${villa.name}**\n\n${villa.description}`;
        }

        // 2. General Intent Matching
        const intents = [
            { id: 'greeting', keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'] },
            { id: 'menu', keywords: ['menu', 'food list', 'drink list', 'eat', 'hungry'] },
            { id: 'offers', keywords: ['offer', 'deal', 'discount', 'promotion', 'price', 'cost'] },
            { id: 'villas', keywords: ['villa', 'room', 'stay', 'accommodation', 'suite', 'sleep', 'bed'] },
            { id: 'dining', keywords: ['food', 'dining', 'restaurant', 'breakfast', 'lunch', 'dinner'] },
            { id: 'experiences', keywords: ['experience', 'activity', 'do', 'yoga', 'surf', 'spa', 'massage', 'excursion', 'tour'] },
            { id: 'contact', keywords: ['contact', 'phone', 'email', 'address', 'location', 'where'] }
        ];

        const intentOptions = {
            includeScore: true,
            threshold: 0.4,
            keys: ['keywords']
        };

        const intentFuse = new Fuse(intents, intentOptions);
        const intentResult = intentFuse.search(input);

        if (intentResult.length > 0) {
            const bestMatch = intentResult[0].item.id;

            if (bestMatch === 'greeting') {
                response = "Hello! I'm here to help you plan your perfect stay at Eraeliya. Ask me about our offers, villas, or dining!";
            } else if (bestMatch === 'menu') {
                response = "You can view our full menu here: /menu.pdf";
            } else if (bestMatch === 'offers') {
                const offersList = knowledgeBase.offers.map(o => `• ${o.title}: ${o.description}`).join('\n\n');
                response = "Here are our current offers:\n\n" + offersList;
            } else if (bestMatch === 'villas') {
                const villaList = knowledgeBase.villas.map(v => `• ${v.name}`).join('\n');
                response = "We have the following accommodations. Ask about any of them for more details:\n\n" + villaList;
            } else if (bestMatch === 'dining') {
                response = `${knowledgeBase.dining.description}\n\nPhilosophy: ${knowledgeBase.dining.philosophy}\n\nBreakfast: ${knowledgeBase.dining.breakfast}\n\nDon't miss our signature dish: ${knowledgeBase.dining.signatureDish}`;
            } else if (bestMatch === 'experiences') {
                response = "You can enjoy:\n" + knowledgeBase.experiences.join('\n');
            } else if (bestMatch === 'contact') {
                response = `You can reach us at ${knowledgeBase.contact.phone} or ${knowledgeBase.contact.email}. We are located at ${knowledgeBase.contact.address}.`;
            }
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
