import {MiddlewareFn} from 'grammy/out/composer';
import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces';
import {commandHandler} from '../handlers';

export const commandMiddleware: MiddlewareFn<
    Filter<BotContext, 'message:entities:bot_command'>
> = async ctx => {
    commandHandler(ctx, ctx.message.text);
};
