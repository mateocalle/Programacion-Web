const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-container');

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const conversation = document.getElementById('conversation');
const closeButton = document.getElementById('close-chat');

closeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatButton.style.display = 'block';
});


let chatOpen = false;

chatButton.addEventListener('click', function () {
    chatContainer.style.display = 'block';
    chatButton.style.display = 'none';
    chatOpen = true;
});

closeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatButton.style.display = 'block';
    chatOpen = false;
});

messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = messageInput.value;
    if (message.trim() !== '') {
        appendMessage('Tu', message);
        messageInput.value = '';
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    conversation.appendChild(messageElement);
    conversation.scrollTop = conversation.scrollHeight;
}