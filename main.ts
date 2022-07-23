import {TgBot} from '@src/bot/tgBot';

const token = process.env.BOT_TOKEN || '';

const bot = new TgBot(token);

bot.start();