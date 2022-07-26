import {TgBot} from '@src/bot/tgBot';
import {fastify} from 'fastify';
import {errorHandler} from '@root/utils';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const token = String(process.env.BOT_TOKEN || '');
const webhook = `https://${process.env.DOMAIN}/${token}`;

async function main() {
    const bot = new TgBot(token);

    if (isProd) {
        const server = fastify();

        await bot.setWebhook(webhook);

        await server.post(`/${token}`, bot.webhookCallback());

        await server.listen({port, host: '0.0.0.0'}, (err, address) => {
            if (err) {
                errorHandler(err, `Server listening error on address: ${address}`);
            }
        });

        console.log('Server started on port: ', port);
    } else {
        await bot.start();
        console.log('Bot started...');
    }
}

main();
