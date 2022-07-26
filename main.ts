import {TgBot} from '@src/bot/tgBot';
import {fastify} from 'fastify';
import middlewarePlugin from '@fastify/express';
import {errorHandler} from '@root/utils';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const token = String(process.env.BOT_TOKEN || '');
const webhook = `https://${process.env.DOMAIN}/${token}`;

async function main() {
    const bot = new TgBot(token);

    if (isProd) {
        const fastifyServer = fastify();
        await fastifyServer.register(middlewarePlugin);

        await bot.setWebhook(webhook);

        await fastifyServer.use(`/${token}`, bot.webhookCallback());
        await fastifyServer.listen({port, host: '0.0.0.0'}, (err, address) => {
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
