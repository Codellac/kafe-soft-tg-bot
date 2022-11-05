import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces/bot';
import {MessageHelper, BackNavigation, Locale} from '@src/bot/helpers';

export const textHandler = (ctx: Filter<BotContext, 'message:text'>, text: string) => {
    const {translate, changeLocale} = new Locale(ctx);
    const message = new MessageHelper(ctx);
    const backNavigation = new BackNavigation(ctx);

    const selectActionTxt = 'common.select-action';

    switch (text) {
        case 'start':
            backNavigation.remove();
            message.sendMenu(selectActionTxt, 'mainMenu');
            break;
        case translate('main-menu.settings'):
            backNavigation.add('start');
            message.sendMenu(selectActionTxt, 'settingsMenu');
            break;
        case translate('settings.locale-change'):
            backNavigation.add('main-menu.settings');
            message.sendMenu(selectActionTxt, 'localeMenu');
            break;
        case translate('settings.locale-ru'):
        case translate('settings.locale-uz'):
            backNavigation.add('settings.locale-change');

            if (text === translate('settings.locale-uz')) {
                changeLocale('uz');
                ctx.session.__language_code = 'uz';
            } else {
                changeLocale('ru');
                ctx.session.__language_code = 'ru';
            }

            textHandler(ctx, translate('main-menu.settings'));
            break;
        case translate('common.back'):
            const navigation = backNavigation.getNavigation() || 'start';
            backNavigation.remove();
            textHandler(ctx, translate(navigation));
    }

    console.log(ctx.session);
    console.log(text);
};
