const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express(); // Express isn't required for a Telegram bot, but I added it so Render stopped whining about the missing port.
const port = process.env.PORT || 10000; // Use the port provided by Render or default to 3000
console.log(`Using port: ${port}`);

// Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// In-memory store to track users
const userMessages = new Set();

// Define list of commands
const commands = ['/start', '/help', '/avadakedavra', '/lumos', '/acciosnitch'];

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toLowerCase();
  
  // Check if it's the user's first message and it's not a valid command
  if (!userMessages.has(chatId) && !commands.includes(messageText)) {
	const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '☄️ Join the Quidditch Channel ☄️', url: 'https://t.me/catch_the_snitch' },
            { text: '✨ Catch the Snitch! ✨', url: 'https://quidditch-mini-app.onrender.com' }
          ]
        ]
      }
    };
    bot.sendMessage(chatId, 'Crucio! 💥 Just kidding :)\nHow can I enchant you? 🧙‍♂️', options);
    userMessages.add(chatId);
  }
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '☄️ Join the Quidditch Channel ☄️', url: 'https://t.me/catch_the_snitch' },
            { text: '✨ Catch the Snitch! ✨', url: 'https://quidditch-mini-app.onrender.com' }
          ]
        ]
      }
    };
  bot.sendMessage(chatId, 'Crucio! 💥 Just kidding :)\nHow can I enchant you? 🧙‍♂️', options);
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'These are the spells you can use:\n/start - Bring me to life\n/help - Retrieve your list of spells\n/avadakedavra - Try to kill me\n/lumos - light a candle\n/acciosnitch - Call the snitch to play Quidditch');
});

// Handle /avada kedavra command
bot.onText(/\/avadakedavra/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ha! That doesn\'t affect me puny human! 💀');
});

// Handle /lumos command
bot.onText(/\/lumos/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '🕯');
});

// Handle /accio snitch command
bot.onText(/\/acciosnitch/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✨ Play ✨', url: 'https://example.com/your_game' }
          ]
        ]
      }
    };
  bot.sendMessage(chatId, '🏆 You summoned the Snitch! Let\'s play Quidditch!', options);
});

// Start the Express server
app.get('/', (req, res) => {
  res.send('Bot is running...');
});

// Health check endpoint to prevent Render from shutting down the service
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}`);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Send a single message to the Channel:
const channelId = '@catch_the_snitch';
const imagePath = 'https://wallpapers.com/downloads/high/the-hogwarts-quidditch-pitch-1280-x-720-wallpaper-r1th6w82zxi1rhy1.webp'; // path to the image
const messageText = 'Congratulations on finding the Quidditch pitch! ✨\n\nReady to catch the Snitch?';
// Inline keyboard button
const inlineKeyboard = {
    reply_markup: {
        inline_keyboard: [[
            {
                text: '✨ Play ✨',
                url: 'https://quidditch-mini-app.onrender.com'
            }
        ]]
    }
};
// Send the photo with the message and inline keyboard
bot.sendPhoto(channelId, imagePath, {
    caption: messageText,
    ...inlineKeyboard
}).then((sentMessage) => {
    // Pin the sent message
    const messageId = sentMessage.message_id;
    bot.pinChatMessage(channelId, messageId)
        .then(() => {
            console.log('Message pinned successfully');
        })
        .catch((error) => {
            console.error('Error pinning message:', error);
        });
}).catch((error) => {
    console.error('Error sending message:', error);
});