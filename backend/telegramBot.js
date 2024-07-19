const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Вставте ваш токен тут
 const token = 'YOUR_TOKEN';
// https://api.telegram.org/bot
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Обробка повідомлення для витягнення даних
  const { hour, duration } = parseMessage(messageText);

  if (hour && duration) {
      // Відправка даних на сервер
      axios.post('http://localhost:5000/generate-chart', {
          hour: hour,
          duration: duration
      })
      .then(response => {
          bot.sendMessage(chatId, 'Дані успішно відправлені на сервер.');
      })
      .catch(error => {
          console.error('Error sending data to server:', error);
          bot.sendMessage(chatId, 'Помилка при відправці даних на сервер.');
      });
  } else {
      bot.sendMessage(chatId, 'Не вдалося обробити повідомлення.');
  }
});

// Функція для парсингу повідомлень
function parseMessage(message) {
  const timePattern = /(\d{2}:\d{2})/;
  const durationPattern = /(\d+год \d+хв)/;

  const timeMatch = message.match(timePattern);
  const durationMatch = message.match(durationPattern);

  if (timeMatch && durationMatch) {
      const hour = timeMatch[1];
      const duration = parseDuration(durationMatch[1]);
      return { hour, duration };
  }
  return { hour: null, duration: null };
}

// Функція для перетворення тривалості у години
function parseDuration(durationStr) {
  const [hours, minutes] = durationStr.split(' ').map(part => parseInt(part.replace(/[^0-9]/g, '')));
  return hours + minutes / 60; // Тривалість у годинах
}