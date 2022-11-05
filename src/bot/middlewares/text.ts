import {MiddlewareFn} from 'grammy/out/composer';
import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces';
import {textHandler} from '../handlers';

export const textMiddleware: MiddlewareFn<Filter<BotContext, 'message:text'>> = async ctx => {
    textHandler(ctx, ctx.message.text);
};
