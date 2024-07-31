const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const port = process.env.PORT || 10000; // Use the port provided by Render or default to 3000
console.log(`Using port: ${port}`);

// Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toLowerCase();
  
  // Check if it's the user's first message
  if (!userMessages.has(chatId)) {
    bot.sendMessage(chatId, 'Crucio! Just kidding :)\nHow can I enchant you?');
    userMessages.add(chatId);
  }
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Crucio! Just kidding :)\nHow can I enchant you?');
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'These are the spells you can use:\n/start - Bring me to life\n/help - Retrieve your list of spells\n/avada kedavra - Try to kill me\n/lumos - light a candle\n/accio snitch - Call the snitch to play Quidditch');
});

// Handle /avada kedavra command
bot.onText(/\/avada\skedavra/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ha! That doesn\'t affect me puny human!');
});

// Handle /lumos command
bot.onText(/\/lumos/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, ':candle:!');
});