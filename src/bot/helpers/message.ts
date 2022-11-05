import {BotContext} from '@src/interfaces';
import {Other} from 'grammy/out/core/api';
import {Methods, RawApi} from 'grammy/out/core/client';
import {KeyboardMenu, MenuName} from '@src/helpers';

export class MessageHelper {
    private readonly _ctx;

    constructor(ctx: BotContext) {
        this._ctx = ctx;
    }

    reply(text: string, other?: Other<RawApi, Methods<RawApi>>) {
        this._ctx.reply(text, other);
    }

    sendMenu(text: string, menuName: MenuName) {
        const keyboard = new KeyboardMenu(this._ctx);
        const menu = keyboard.getMenu(menuName);

        this.reply(this._ctx.t(text), {
            reply_markup: {resize_keyboard: true, keyboard: menu.build()}
        });
    }
}
