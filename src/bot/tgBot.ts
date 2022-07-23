import {IBot} from '@src/interfaces';
import {Bot, webhookCallback} from 'grammy';
import {fastify} from 'fastify';
import {textController} from '@src/controllers';

const domain = String(process.env.DOMAIN);
const token = String(process.env.BOT_TOKEN || '');
const port = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === 'production';

const server = fastify();

export class TgBot implements IBot {
    private readonly _bot;

    constructor() {
        this._bot = new Bot(token);
        this._bot.on('message:text', textController);
    }

    async start() {
        if (isProd) {
            try {
                server.post(`/${token}`, webhookCallback(this._bot, 'fastify'));

                await server.listen({port}, async () => {
                    await this._bot.api.setWebhook(`https://${domain}/${token}`);
                });
            } catch (err) {
                process.exit(1);
            }
        } else {
            this._bot.start();
        }

        console.log('Bot started on port', port);
    }
}