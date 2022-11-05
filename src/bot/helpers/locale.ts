import {ContextClass} from '@src/bot/helpers/contextClass';

export class Locale extends ContextClass {
    readonly translate = this._ctx.t;
    readonly changeLocale = this._ctx.fluent.useLocale;
}
