export const sendMessageToGemini = async (userMessage) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/chat`, {
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
