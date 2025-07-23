document.addEventListener('DOMContentLoaded', () => {

    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');
    const endpoint = '/chatbot';

    /**
     * Handles the form submission event.
     * @param {Event} event - The form submission event.
     */
    const sendMessage = async (event) => {
        event.preventDefault();
        const userInput = messageInput.value.trim();
        if (userInput === '') return;

        createBubble(userInput, 'user');
        messageInput.value = '';
        autoResizeTextarea();
        showLoadingIndicator();

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userInput })
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
            }

            const data = await response.json();
            removeLoadingIndicator();
            createBubble(data.response, 'aibot');

        } catch (error) {
            console.error('Fetch Error:', error);
            removeLoadingIndicator();
            createBubble('Sorry, something went wrong. Please check the server connection and try again.', 'error');
        }
    };

    /**
     * Creates and appends a new chat bubble to the message container.
     * @param {string} text - The message text.
     * @param {string} type - The bubble type ('user', 'aibot', or 'error').
     */
    const createBubble = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        const avatarSrc = {
            user: '/static/user.jpeg',
            aibot: '/static/Bot_logo.png',
            error: '/static/Error.png'
        };

        messageDiv.innerHTML = `
            <img src="${avatarSrc[type]}" alt="${type} avatar">
            <p>${text.replace(/\n/g, '<br>')}</p> 
        `; // Replaces newlines with <br> for better formatting
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    /**
     * Displays a loading indicator.
     */
    const showLoadingIndicator = () => {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.classList.add('loading-container');
        loadingDiv.innerHTML = `
            <div class="loading-animation"></div>
            <p class="loading-text">Assistant is thinking...</p>
        `;
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    /**
     * Removes the loading indicator.
     */
    const removeLoadingIndicator = () => {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            messagesContainer.removeChild(loadingIndicator);
        }
    };

    /**
     * Automatically resizes the textarea to fit its content.
     */
    const autoResizeTextarea = () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
    };

    messageForm.addEventListener('submit', sendMessage);
    messageInput.addEventListener('input', autoResizeTextarea);

    // Allow sending message with Enter key, but new line with Shift+Enter
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage(event);
        }
    });
});