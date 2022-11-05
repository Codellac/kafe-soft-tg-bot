import {BotContext} from "@src/interfaces";

export class HelperClass {
    readonly _ctx;

    constructor(ctx: BotContext) {
        this._ctx = ctx;
    }
}