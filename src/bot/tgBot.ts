import {BotContext, IBot} from '@src/interfaces';
import {Bot, session, webhookCallback} from 'grammy';
import {textController} from '@src/bot/controllers';
import {errorHandler} from '@root/utils';
import {I18n} from '@grammyjs/i18n';
import {freeStorage} from '@grammyjs/storage-free';

const i18n = new I18n({
    defaultLanguage: 'ru',
    directory: 'src/bot/locales',
    useSession: true,
    sessionName: 'session'
});

export class TgBot implements IBot {
    private readonly _bot;

    constructor(token: string) {
        this._bot = new Bot<BotContext>(token);

        this._bot.use(
            session({
                initial: () => ({}),
                storage: freeStorage(token)
            })
        );

        this._bot.use(i18n.middleware());

        // Handle message texts
        this._bot.on('message:text', textController);

        this._bot.catch(err => {
            errorHandler(err, 'Bot error');
        });
    }

    async start() {
        this._bot.start();
    }

    webhookCallback() {
        return webhookCallback(this._bot, 'express');
    }

    setWebhook(webhook: string) {
        this._bot.api.setWebhook(webhook).catch(err => {
            errorHandler(err, 'Bot error');
        });
    }
}
