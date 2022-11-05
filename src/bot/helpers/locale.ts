import {Helper} from '@src/bot/helpers/helper';

export class Locale extends Helper {
    readonly translate = this._ctx.t;
    readonly changeLocale = this._ctx.fluent.useLocale;
}
