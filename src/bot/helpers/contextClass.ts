import {BotContext} from "@src/interfaces/bot";

export class ContextClass {
    readonly _ctx;

    constructor(ctx: BotContext) {
        this._ctx = ctx;
    }
}