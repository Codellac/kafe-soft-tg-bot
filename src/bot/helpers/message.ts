import {Other} from 'grammy/out/core/api';
import {Methods, RawApi} from 'grammy/out/core/client';
import {KeyboardMenu, MenuName} from './menu';
import {ContextClass} from './contextClass';
import {Locale} from '@src/bot/helpers/locale';

export class MessageHelper extends ContextClass {
    reply(text: string, other?: Other<RawApi, Methods<RawApi>>) {
        this._ctx.reply(text, other);
    }

    sendMenu(text: string, menuName: MenuName) {
        const {translate} = new Locale(this._ctx);
        const menu = new KeyboardMenu(this._ctx).getMenu(menuName);

        this.reply(translate(text), {
            reply_markup: {resize_keyboard: true, keyboard: menu.build()}
        });
    }
}
