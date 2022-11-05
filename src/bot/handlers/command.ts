import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces/bot';
import {MessageHelper, BackNavigation} from '@src/bot/helpers';

export const commandHandler = (ctx: Filter<BotContext, 'message:entities:bot_command'>, text: string) => {
    const message = new MessageHelper(ctx);
    const navigation = new BackNavigation(ctx);

    switch (text) {
        case '/start':
            navigation.remove();
            message.sendMenu('common.greeting', 'mainMenu');
    }
};
