This is a free c.ai plus site that works even when c.ai is down.

This is a lightly modified package of [This package](https://www.npmjs.com/package/node_characterai) so all credits go to the owner.

You will also need puppeteer installed so run
```
npm i puppeteer@latest
```
in your terminal.

How to host it:
run api.js thats in the api folder

then open index.html in public

yea that should be it.
the css is very ugly since i was too lazy and the css is pasted with chatgpt lol.
fixing the uglyness later.

To use the token login you have todo a few things
Some parts of the API, like managing a conversation, requires you to be logged in using an accessToken.

To get it, you can open your browser, go to the Character.AI website in localStorage.

To do so:

Open the Character.AI website in your browser (https://beta.character.ai)
Open the developer tools (F12, Ctrl+J, or Cmd+J)
Go to the Application tab
Go to the Storage section and click on Local Storage
Look for the @@auth0spajs@@::dyD3gE281MqgISG7FuIXYhL2WEknqZzv::https://auth0.character.ai/::openid profile email offline_access key
Open the body with the arrows and copy the access token

![Picture lol](https://camo.githubusercontent.com/38a2db16b7667356f14659cd7d7b03cfa14977d206c5d6185fed1aedeee5cf5f/68747470733a2f2f692e696d6775722e636f6d2f303951396d4c652e706e67)

To also use this you will need the id of your character
Finding your character's ID

You can find your character ID in the URL of a Character's chat page.

For example, if you go to the chat page of the character Test Character you will see the URL https://beta.character.ai/chat?char=8_1NyR8w1dOXmI1uWaieQcd147hecbdIK7CeEAIrdJw.

The last part of the URL is the character ID: ![Picture lol](https://camo.githubusercontent.com/4dd4c40b7ac315e0b2a0342aeea3ad36774fd1edd6c76f1e6f00dd624596abb5/68747470733a2f2f692e696d6775722e636f6d2f6e643836664e342e706e67)

Credits go to owner for the tutorial lol
