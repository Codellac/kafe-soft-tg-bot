import {IBot} from '@src/interfaces';
import {Bot, webhookCallback} from 'grammy';
import fastify from 'fastify';
import fastifyMiddleware from '@fastify/middie';
import {textController} from '@src/controllers';

const domain = process.env.DOMAIN;
const token = process.env.BOT_TOKEN || '';
const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);

export class TgBot implements IBot {
    private readonly _bot;

    constructor() {
        this._bot = new Bot(token);
        this._bot.on('message:text', textController);
    }

    async start() {
        if (isProd) {
            const server = fastify({logger: true});

            try {
                await server.register(fastifyMiddleware);

                server.use(`/${token}`, webhookCallback(this._bot, 'fastify'));

                await server.listen({port}, async () => {
                    await this._bot.api.setWebhook(`https://${domain}/${token}`);
                });
            } catch (err) {
                server.log.error(err);
                process.exit(1);
            }
        } else {
            this._bot.start();
        }

        console.log('Bot started on port', port);
    }
}