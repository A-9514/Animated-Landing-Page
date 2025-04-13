document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseButton = document.getElementById('chat-close-button');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');

    // --- Toggle Chat Window ---
    chatToggleButton.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        chatToggleButton.style.display = chatWindow.classList.contains('hidden') ? 'flex' : 'none'; // Hide toggle button when chat is open
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus(); // Focus input when opening
        }
    });

    chatCloseButton.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatToggleButton.style.display = 'flex'; // Show toggle button when closing
    });


    // --- Send Message ---
    const sendMessage = () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return; // Don't send empty messages

        displayMessage(userMessage, 'user'); // Display user's message
        chatInput.value = ''; // Clear input field

        // Get and display bot's response after a short delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, 'bot');
        }, 600); // Simulate thinking time (600ms)
    };

    chatSendButton.addEventListener('click', sendMessage);

    // Allow sending with Enter key
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });


    // --- Display Message in Chat ---
    const displayMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender); // Adds 'message' and 'user'/'bot' class
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };


    // --- Simple Keyword-Based Bot Logic ---
    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();

        // Define keywords and responses (Customize these!)
        if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput.includes('hey')) {
            return "Hello there! How can I assist you with Quantum, Cosmic, or Satellite topics?";
        }
        else if (lowerCaseInput.includes('quantum') || lowerCaseInput.includes('computing')) {
            return "Quantum Leap involves the fascinating principles of quantum mechanics and computing. It's about the very small scale of the universe!";
        }
        else if (lowerCaseInput.includes('cosmic') || lowerCaseInput.includes('stars') || lowerCaseInput.includes('galaxy') || lowerCaseInput.includes('space')) {
            return "Cosmic Wonders covers star lifecycles, the formation of galaxies, deep space mysteries, and the vastness of our universe.";
        }
        else if (lowerCaseInput.includes('satellite') || lowerCaseInput.includes('orbit') || lowerCaseInput.includes('comms') || lowerCaseInput.includes('network')) {
            return "Satellite Link focuses on simulating orbital networks used for communications, Earth observation (EO), and navigation systems like GPS.";
        }
        else if (lowerCaseInput.includes('help') || lowerCaseInput.includes('?')) {
             return "You can ask me about 'Quantum Leap', 'Cosmic Wonders', or 'Satellite Link'. What are you curious about?";
        }
         else if (lowerCaseInput.includes('thanks') || lowerCaseInput.includes('thank you')) {
             return "You're welcome! Let me know if you have more questions.";
        }
        else if (lowerCaseInput.includes('bye') || lowerCaseInput.includes('goodbye')) {
             return "Goodbye! Have a great day exploring the digital worlds.";
        }
        // Add more keyword checks here based on your page content

        // Default response if no keywords match
        else {
            return "Sorry, I didn't quite understand that. Could you ask about Quantum, Cosmic, or Satellites?";
        }
    };

}); // End DOMContentLoaded