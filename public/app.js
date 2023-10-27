document.addEventListener('DOMContentLoaded', () => {
  showLoginOptions();
});

let userId;
let authenticated = false;

function showLoginOptions() {
  const loginContainer = document.getElementById('login-container');
  const chatContainer = document.getElementById('chat-container');
  const tokenInput = document.getElementById('token-input');
  const characterInput = document.getElementById('character-input');

  tokenInput.style.display = 'none';
  characterInput.style.display = 'none';
  loginContainer.style.display = 'block';
  chatContainer.style.display = 'none';
}

async function loginAsGuest() {
  try {
    const response = await fetch('http://localhost:3000/authenticate/guest', { method: 'POST' });
    userId = await response.text();

    authenticated = true;
    showCharacterInput();
  } catch (error) {
    console.error('Error authenticating as guest:', error.message);
  }
}

function showTokenInput() {
  const tokenInput = document.getElementById('token-input');
  const characterInput = document.getElementById('character-input');

  tokenInput.style.display = 'block';
  characterInput.style.display = 'none';
}

async function loginWithToken() {
  const tokenInput = document.getElementById('token-input');
  const characterInput = document.getElementById('character-input');
  const token = document.getElementById('token').value;

  try {
    const response = await fetch('http://localhost:3000/authenticate/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      userId = await response.text();
      authenticated = true;
      showCharacterInput();
    } else {
      console.error('Error authenticating with token:', response.statusText);
      tokenInput.style.display = 'block';
    }
  } catch (error) {
    console.error('Error authenticating with token:', error.message);
    tokenInput.style.display = 'block';
  }
}

async function startChat() {
  if (authenticated) {
    const characterId = document.getElementById('characterId').value;

    try {
      await fetch('http://localhost:3000/chat/createOrContinue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, characterId }),
      });
      
      showChat();
    } catch (error) {
      console.error('Error creating or continuing chat:', error.message);
    }
  } else {
    console.error('User not authenticated');
  }
}

function showCharacterInput() {
  const tokenInput = document.getElementById('token-input');
  const characterInput = document.getElementById('character-input');

  tokenInput.style.display = 'none';
  characterInput.style.display = 'block';
}

function showChat() {
  const loginContainer = document.getElementById('login-container');
  const chatContainer = document.getElementById('chat-container');

  loginContainer.style.display = 'none';
  chatContainer.style.display = 'block';
}

async function sendMessage() {
  if (authenticated) {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    
    try {
      const response = await fetch('http://localhost:3000/chat/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message, awaitResponse: true }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Message sent:', message);
        console.log('Response Text:', responseData.response.text);
        const messageHistory = document.getElementById('message-history');
        const sentMessageElement = document.createElement('div');
        sentMessageElement.textContent = `You: ${message}`;
        messageHistory.appendChild(sentMessageElement);
        const responseElement = document.createElement('div');
        responseElement.textContent = `The Character: ${responseData.response.text}`;
        messageHistory.appendChild(responseElement);
        messageInput.value = '';
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  } else {
    console.error('User not authenticated');
  }
}