const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Вставте ваш токен тут
const token = '6764649135:AAFey_nMeNsc3RoW_mXhA5WwSh9v9NEt6BA';
const bot = new TelegramBot(token, { polling: true });

// Функція для конвертації тривалості у години
const parseDuration = (duration) => {
    const [hours, minutes] = duration.split(' ');
    const hoursValue = parseInt(hours, 10);
    const minutesValue = parseInt(minutes, 10);
    return hoursValue + (minutesValue / 60);
};

// Обробка отриманих повідомлень
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const keywords = ['ВВІМКНЕННЯ ЕЛЕКТРОЕНЕРГІЇ', 'ВИМКНЕННЯ ЕЛЕКТРОЕНЕРГІЇ'];

    // Перевірка на ключові слова
    if (keywords.some(keyword => messageText.includes(keyword))) {
        const durationMatch = messageText.match(/Тривалість відключення: (\d+ год \d+ хв)/);
        if (durationMatch) {
            const durationText = durationMatch[1];
            const durationInHours = parseDuration(durationText);
            const timeMatch = messageText.match(/Час: (\d+:\d+:\d+)/);
            if (timeMatch) {
                const time = timeMatch[1];
                const hour = parseInt(time.split(':')[0], 10);

                // Відправка даних на сервер
                axios.post('http://localhost:5000/generate-chart', {
                    hour: hour,
                    duration: durationInHours
                })
                .then(response => {
                    console.log('Data sent successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
            }
        }
    }
});
