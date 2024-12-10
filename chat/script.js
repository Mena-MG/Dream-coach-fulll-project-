document.addEventListener('DOMContentLoaded', function() {
    const chatList = [
        { 
            name: 'John Smith',  
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
            messages: [
                { text: "Hi Clint! I need help with my resume.", type: "sent", important: false, read: false },
                { text: "Sure, John! Let's work on your resume today.", type: "received", important: false, read: false }
            ],
            time: '10:30',
            unread: 1,
            online: true
        },
        { 
            name: 'Sarah Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
            messages: [
                { text: "Can we go over my interview prep next?", type: "sent", important: false, read: false },
                { text: "Absolutely! I'll help you prep for the interview.", type: "received", important: false, read: false }
            ],
            time: '09:15',
            unread: 0,
            online: false
        },
        { 
            name: 'Mark Williams',
            avatar: 'https://ui-avatars.com/api/?name=Mark+Williams&background=random',
            messages: [
                { text: "I received great feedback on the job applications!", type: "sent", important: false, read: false },
                { text: "That's awesome, Mark! Keep up the great work.", type: "received", important: false, read: false }
            ],
            time: 'Yesterday',
            unread: 2,
            online: true
        },
        { 
            name: 'Emma Davis',
            avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=random',
            messages: [
                { text: "Can we schedule a career coaching call?", type: "sent", important: false, read: false },
                { text: "Of course, Emma! When would be a good time for you?", type: "received", important: false, read: false }
            ],
            time: 'Yesterday',
            unread: 0,
            online: false
        }
    ];

    const chatListContainer = document.querySelector('.chat-list');
    const chatMessagesContainer = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.input-container input');
    const sendButton = document.querySelector('.send-btn');
    const filterButtons = document.querySelectorAll('.chat-filters button');
    const chatHeaderName = document.querySelector('.chat-header .chat-info h3');
    const chatHeaderAvatar = document.querySelector('.chat-header .profile-pic');
    const chatHeaderStatus = document.querySelector('.chat-header .status');

    // Function to render the chat list with animations
    function renderChatList(filter = 'all') {
        chatListContainer.innerHTML = ''; // Clear chat list
        chatList.forEach(chat => {
            let messagesToDisplay = chat.messages;
            if (filter === 'unread') {
                messagesToDisplay = chat.messages.filter(msg => !msg.read);
            } else if (filter === 'important') {
                messagesToDisplay = chat.messages.filter(msg => msg.important);
            }

            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.innerHTML = `
                <div class="chat-item-content">
                    <img src="${chat.avatar}" alt="${chat.name}" class="profile-pic">
                    <div class="chat-item-info">
                        <h4>${chat.name}</h4>
                        <p>${messagesToDisplay[messagesToDisplay.length - 1]?.text || ''}</p>
                    </div>
                    <div class="chat-item-meta">
                        <span class="time">${chat.time}</span>
                        ${chat.unread ? `<span class="unread-count">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            chatListContainer.appendChild(chatItem);

            // Add click event to each chat item
            chatItem.addEventListener('click', () => {
                openChat(chat);
                chat.unread = 0; // Mark messages as read
                renderChatList(filter);
            });
        });
    }

    // Function to open a chat
    function openChat(chat) {
        // Update the chat header with the new name and avatar
        chatHeaderName.textContent = chat.name;
        chatHeaderAvatar.src = chat.avatar;
        chatHeaderStatus.textContent = chat.online ? "Online" : "Offline";

        // Clear the current chat messages
        chatMessagesContainer.innerHTML = '';

        // Add each message to the chat window
        chat.messages.forEach((message, index) => {
            setTimeout(() => {
                addMessage(message.text, message.type, message.important);
            }, index * 100); // Stagger each message by 100ms
        });

        // Focus the input field
        messageInput.focus();
    }

    // Function to add a message to the chat
    function addMessage(text, type, important = false) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        if (important) {
            message.style.fontWeight = 'bold';
            message.style.color = 'red';  // Highlight important messages in red
        }
        chatMessagesContainer.appendChild(message);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const activeChat = chatList.find(chat => chat.name === chatHeaderName.textContent);
            const isImportant = messageText.toLowerCase().includes('important'); // Example: if the message contains the word "important"
            
            // Add the sent message to the active chat
            activeChat.messages.push({ text: messageText, type: 'sent', important: isImportant, read: true });

            // Increase unread count for others
            chatList.forEach(chat => {
                if (chat !== activeChat) {
                    chat.unread += 1;
                }
            });

            // Add sent message to the chat window
            addMessage(messageText, 'sent', isImportant);

            // Clear input
            messageInput.value = '';

            // Simulate received message after 1 second
            setTimeout(() => {
                const randomResponse = [
                    "Great job! Let's keep improving your CV.",
                    "I'll get back to you soon with more interview tips.",
                    "That sounds great! Keep it up.",
                    "Let me check and get back to you soon.",
                    "Perfect! Thanks for the update."
                ][Math.floor(Math.random() * 5)];

                // Add received message to the chat
                activeChat.messages.push({ text: randomResponse, type: 'received', important: false, read: true });
                addMessage(randomResponse, 'received');
            }, 1000);
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Handle "Enter" key to send message
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.textContent.toLowerCase();
            renderChatList(filter);
        });
    });

    // Initial render of the chat list
    renderChatList('all');
});
