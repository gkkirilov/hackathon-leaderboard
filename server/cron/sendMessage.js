export default function () {
    const TelegramBot = require('node-telegram-bot-api');
    const schedule = require('node-schedule');
    const fs = require('fs');

    // Replace the value below with the Telegram token you receive from @BotFather
    const token = 'YOUR_TELEGRAM_BOT_TOKEN';
    const bot = new TelegramBot(token, { polling: true });

    // Define your PDF sets
    const pdfSets = {
        set1: ['./pdfs/set1/pdf1.pdf', /* ... */ './pdfs/set1/pdf10.pdf'],
        set2: ['./pdfs/set2/pdf1.pdf', /* ... */ './pdfs/set2/pdf10.pdf'],
        // Add your other sets here up to set6
    };

    // This example uses a simple object to track chat states. For production, consider using a database.
    let chatStates = {};

    function askForPDFSet(chatId) {
        bot.sendMessage(chatId, "Hello! Please tell me which set of PDFs to send (1-6) by sending /set<number>, for example: /set1");
    }

    function schedulePDFs(chatId, pdfSet) {
        pdfSet.forEach((pdfPath, index) => {
            const scheduleTime = new Date(new Date().getTime() + ((index + 1) * 24 * 60 * 60 * 1000));
            scheduleTime.setHours(6, 30, 0); // Schedule for 6:30 AM

            schedule.scheduleJob(scheduleTime, function () {
                bot.sendDocument(chatId, fs.createReadStream(pdfPath)).then(() => {
                    console.log(`PDF ${index + 1} sent successfully.`);
                }).catch(console.error);
            });
        });

        bot.sendMessage(chatId, "Your PDFs are scheduled to be sent at 6:30 AM daily starting from tomorrow.");
    }

    bot.on('message', (msg) => {
        if (msg.new_chat_members && msg.new_chat_members.some(member => member.username === 'YourBotUsername')) {
            chatStates[msg.chat.id] = { awaitingSetSelection: true };
            askForPDFSet(msg.chat.id);
        } else if (msg.text && msg.text.startsWith('/set') && chatStates[msg.chat.id]?.awaitingSetSelection) {
            const setNumber = parseInt(msg.text.slice(4), 10);
            if (setNumber >= 1 && setNumber <= 6) {
                const selectedSet = `set${setNumber}`;
                schedulePDFs(msg.chat.id, pdfSets[selectedSet]);
                chatStates[msg.chat.id] = {}; // Reset state
            } else {
                bot.sendMessage(msg.chat.id, "Invalid set number. Please choose a number from 1 to 6.");
            }
        }
    });

    console.log('Bot has been started...');
}