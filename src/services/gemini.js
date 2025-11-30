export const sendMessageToGemini = async (userMessage) => {
    try {
        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error communicating with backend:", error);
        return "I'm having trouble connecting to the server right now. Please check your internet connection or try again later.";
    }
};
