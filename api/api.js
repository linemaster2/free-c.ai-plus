// api.js

const express = require('express');
const bodyParser = require('body-parser');
const CharacterAI = require('./module/client.js');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const authenticatedUsers = [];

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

app.post('/authenticate/guest', async (req, res) => {
  const characterAI = new CharacterAI();
  
  try {
    await characterAI.authenticateAsGuest();

    const userId = generateUniqueId();
    authenticatedUsers.push({ userId, characterAI });

    res.send(`${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error authenticating as guest: ${error.message}`);
  }
});

app.post('/authenticate/token', async (req, res) => {
  const token = req.body.token;

  if (token) {
    try {
      const characterAI = new CharacterAI();
      await characterAI.authenticateWithToken(token);

      const userId = generateUniqueId();
      authenticatedUsers.push({ userId, characterAI });

      res.send(`${userId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error authenticating with token: ${error.message}`);
    }
  } else {
    res.status(400).send('Token not provided');
  }
});

app.post('/chat/createOrContinue', async (req, res) => {
  const userId = req.body.userId;
  const characterId = req.body.characterId;

  if (userId && characterId) {
    const user = authenticatedUsers.find(user => user.userId === userId);

    if (user) {
      try {
        const chat = await user.characterAI.createOrContinueChat(characterId);
        user.chat = chat;
        res.send(`Chat created or continued for user ID: ${userId} with character ID: ${characterId}`);
      } catch (error) {
        console.log(error);
        res.status(500).send(`Error creating or continuing chat: ${error.message}`);
      }
    } else {
      res.status(400).send('User not found');
    }
  } else {
    res.status(400).send('Invalid user ID or character ID');
  }
});

app.post('/chat/sendMessage', async (req, res) => {
  const userId = req.body.userId;
  const message = req.body.message;
  const awaitResponse = req.body.awaitResponse || false;

  if (userId && authenticatedUsers.some(user => user.userId === userId && user.chat)) {
    try {
      const user = authenticatedUsers.find(user => user.userId === userId);
      const response = await user.chat.sendAndAwaitResponse(message, awaitResponse);
      res.json({ message: `Message sent: "${message}"`, response });
    } catch (error) {
      res.status(500).json({ error: `Error sending message: ${error.message}` });
    }
  } else {
    res.status(400).json({ error: 'Invalid user ID, user not authenticated, or chat not created' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});