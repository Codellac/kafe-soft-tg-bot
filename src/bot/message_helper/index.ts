import {BotContext} from '@src/interfaces';
import {Other} from 'grammy/out/core/api';
import {Methods, RawApi} from "grammy/out/core/client";
import {Keyboard} from "grammy";

export class MessageHelper {
    private _ctx;

    constructor(ctx: BotContext) {
        this._ctx = ctx;
    }

    reply(message: string, other?: Other<RawApi, Methods<RawApi>>) {
        this._ctx.reply((message), other);
    }

    sendMenu(text: string, menu: Keyboard) {
        this._ctx.reply(this._ctx.i18n.t(text), {
            reply_markup: {resize_keyboard: true, keyboard: menu.build()}
        });
    }
}
