import {Context as BaseContext, SessionFlavor} from 'grammy';
import {I18nContextFlavor} from '@grammyjs/i18n';

export type BotContext = BaseContext & SessionFlavor<{}> & I18nContextFlavor;
