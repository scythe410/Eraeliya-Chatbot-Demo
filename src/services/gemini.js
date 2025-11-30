export const sendMessageToGemini = async (message) => {
    try {
        // Generate or retrieve session ID
        let sessionId = localStorage.getItem('chatSessionId');
        if (!sessionId) {
            sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatSessionId', sessionId);
        }

        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                sessionId
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
};
