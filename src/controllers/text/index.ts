import {Middleware} from 'grammy/out/composer';
import {Filter} from 'grammy/out/filter';
import {Context} from 'grammy/out/context';
import {ButtonTexts} from '@src/texts';
import {customMenu} from '@src/elements';

export const textController: Middleware<Filter<Context, 'message:text'>> = async (ctx) => {
    const text = ctx.message.text.toLowerCase().replace(/^\//, '');

    switch (text) {
        case 'start':
            await ctx.reply('Welcome text!', {reply_markup: customMenu});
            break;
        case ButtonTexts.Menu:
            await ctx.reply(`Menu`);
            break;
        case ButtonTexts.Contacts:
            await ctx.reply(`Наши контакты: +${1234567}`);
            break;
        case ButtonTexts.Bin:
            await ctx.reply(`Bin`);
            break;
        case ButtonTexts.Feedback:
            await ctx.reply(`Feedback`);
    }
};