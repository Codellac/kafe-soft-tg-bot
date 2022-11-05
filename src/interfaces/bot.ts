import {Context as BaseContext, SessionFlavor} from 'grammy';
import {FluentContextFlavor} from '@grammyjs/fluent';

export type BotContext = BaseContext &
    SessionFlavor<{back_navigation: string | null; __language_code: string}> &
    FluentContextFlavor;

export interface IBot {
    start: () => void;
    webhookCallback: () => any;
    setWebhook: (webhook: string) => void;
}
