// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');

    // Add typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Remove typing indicator
    function removeTypingIndicator(indicator) {
        if (indicator) {
            indicator.remove();
        }
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            
            if (message) {
                // Add user message with animation
                addMessageToChat('user', message);
                chatInput.value = '';

                // Show typing indicator
                const typingIndicator = showTypingIndicator();

                try {
                    // Send message to server
                    const response = await fetch('/chat_messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ msg: message })
                    });

                    const data = await response.json();
                    
                    // Remove typing indicator
                    removeTypingIndicator(typingIndicator);
                    
                    // Add bot response with animation
                    if (data.msg) {
                        addMessageToChat('bot', data.msg);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    removeTypingIndicator(typingIndicator);
                    addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
                }
            }
        });
    }

    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Animate message appearance
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add input animation
    if (chatInput) {
        chatInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        chatInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
}); 