const chatMessages = document.getElementById('chat-messages');
const inputField = document.getElementById('input');
const sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', () => {
    sendMessage(inputField.value);
});

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage(inputField.value);
    }
});

function sendMessage(message) {
    if (!message.trim()) return;

    appendMessage('user', message);

    // Simulate computer response
    const computerMessage = generateComputerResponse();
    setTimeout(() => {
        streamText('computer', computerMessage);
    }, 500);

    inputField.value = '';
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateComputerResponse() {
    const responses = [
        "Hello! How can I help you?",
        "What's on your mind?",
        "Nice to meet you!",
        "I'm a chatbot. Ask me anything!",
        "How can I assist you today?",
        "Sorry, I didn't understand that.",
        "Good Morning",
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don't know actually"
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    // Split the selected response into individual words
    return responses[randomIndex].split(/\s+/);
}

// Function to stream text in the chat container

function streamText(sender, words) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    chatMessages.appendChild(messageElement);

    words.forEach((word, index) => {
        setTimeout(() => {
            const wordElement = document.createElement('span');
            wordElement.textContent = word;
            messageElement.appendChild(wordElement);
            
            // Add space between words, except for the last word
            if (index < words.length - 1) {
                const spaceElement = document.createTextNode(' ');
                messageElement.appendChild(spaceElement);
            }
        }, index * 1000); // Adjust the delay (in milliseconds) between each word
    });
}
