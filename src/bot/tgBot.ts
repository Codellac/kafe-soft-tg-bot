import {BotContext, IBot} from '@src/interfaces';
import {Bot, session, webhookCallback} from 'grammy';
import {commandMiddleware, textMiddleware} from '@src/middlewares';
import {errorHandler} from '@root/utils';
import {freeStorage} from '@grammyjs/storage-free';
import {Fluent} from '@moebius/fluent';
import {useFluent} from '@grammyjs/fluent';

export class TgBot implements IBot {
    private readonly _bot;

    constructor(token: string) {
        const fluent = new Fluent();
        const bot = new Bot<BotContext>(token);

        fluent.addTranslation({
            locales: 'ru',
            filePath: 'src/locales/ru.ftl'
        });

        fluent.addTranslation({
            locales: 'uz',
            filePath: 'src/locales/uz.ftl'
        });

        bot.catch(err => {
            errorHandler(err, 'Bot error');
        });

        // Store middleware
        bot.use(
            session({
                initial: () => ({
                    navigation_history: [],
                    __language_code: 'ru'
                }),
                storage: freeStorage(token)
            })
        );

        // Locale middleware
        bot.use(
            useFluent({
                fluent,
                defaultLocale: 'ru',
                localeNegotiator: context => context.session.__language_code
            })
        );

        // Middlewares
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
