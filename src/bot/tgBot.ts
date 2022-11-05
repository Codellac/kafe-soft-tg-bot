import {BotContext, IBot} from '@src/interfaces/bot';
import {Bot, session, webhookCallback} from 'grammy';
import {commandMiddleware, textMiddleware, localeMiddleware} from '@src/bot/middlewares';
import {errorHandler} from '@root/utils';
import {freeStorage} from '@grammyjs/storage-free';

export class TgBot implements IBot {
    private readonly _bot;

    constructor(token: string) {
        const bot = new Bot<BotContext>(token);

        bot.catch(err => {
            errorHandler(err, 'Bot error');
        });

        // Store middleware
        bot.use(
            session({
                initial: () => ({
                    back_navigation: null,
                    __language_code: 'ru'
                }),
                storage: freeStorage(token)
            })
        );

        bot.use(localeMiddleware);

        bot.on('message:entities:bot_command', commandMiddleware);
        bot.on('message:text', textMiddleware);

        this._bot = bot;
    }

    async start() {
        this._bot.start();
    }

    webhookCallback() {
        return webhookCallback(this._bot, 'fastify');
    }

    setWebhook(webhook: string) {
        this._bot.api.setWebhook(webhook).catch(err => {
            errorHandler(err, 'Bot error');
        });
    }
}
