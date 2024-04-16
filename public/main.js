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
    const computerMessage = generateComputerResponse(message);
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

function generateComputerResponse(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
        return ["Hello!", "How", "can", "I", "help", "you"];
    } else if (lowercaseMessage.includes("how are you")) {
        return ["I'm", "just", "a", "chatbot,", "so", "I'm", "always", "ready", "to", "assist", "you!"];
    } else if (lowercaseMessage.includes("what is your name?")) {
        return ["My", "name", "is", "Chatbot.", "Nice", "to", "meet", "you!"];
    } else if (lowercaseMessage.includes("what is my name")) {
        return ["Sorry,", "I", "don't", "know", "your", "name."];
    }

    return ["Sorry,", "I", "didn't", "understand", "that.", "Please", "ask", "me", "something", "else."];
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
        }, index * 100); // Adjust the delay (in milliseconds) between each word
    });
}
