import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces';
import {MessageHelper, NavigationHistory} from '@src/helpers';

export const commandHandler = (ctx: Filter<BotContext, 'message:entities:bot_command'>, text: string) => {
    const message = new MessageHelper(ctx);
    const navigation = new NavigationHistory(ctx);

    switch (text) {
        case '/start':
            navigation.clear();
            message.sendMenu('common.greeting', 'mainMenu');
    }
};
