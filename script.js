// Укажите токен вашего бота
const BOT_TOKEN = "7809293668:AAEyMrFrbxp8Nu97QiglKuOi8mtM3x_IKnw";
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
let offset = 0; // Начальное значение offset

// Функция для обработки входящих сообщений
async function getUpdates() {
    try {
        const response = await fetch(`${TELEGRAM_API}/getUpdates?offset=${offset}`);
        const data = await response.json();

        if (data.ok) {
            data.result.forEach(update => {
                const chatId = update.message.chat.id;
                const text = update.message.text;

                if (text === "/start") {
                    sendMessage(chatId, "Привет! Я тестовый бот.");
                }

                // Устанавливаем offset на следующий update
                offset = update.update_id + 1;
            });
        }
    } catch (error) {
        console.error("Ошибка при получении обновлений:", error);
    }
}

// Функция для отправки сообщения
async function sendMessage(chatId, text) {
    try {
        await fetch(`${TELEGRAM_API}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    }
}

// Запуск регулярного опроса Telegram API
setInterval(getUpdates, 2000);
