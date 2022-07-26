import {TgBot} from '@src/bot/tgBot';
import {Server} from '@src/server';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const token = String(process.env.BOT_TOKEN || '');
const webhook = `https://${process.env.DOMAIN}/${token}`;

async function main() {
    const bot = new TgBot(token);

    if (isProd) {
        const server = new Server();

        await bot.setWebhook(webhook);
        await server.use(`/${token}`, bot.webhookCallback());
        await server.listen({port, host: '0.0.0.0'});

        console.log('Server started on port: ', port);
    } else {
        await bot.start();
        console.log('Bot started...');
    }
}

main();
