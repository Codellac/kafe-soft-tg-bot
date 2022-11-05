import {Filter} from 'grammy/out/filter';
import {BotContext} from '@src/interfaces';
import {MessageHelper, NavigationHistory} from '@src/helpers';

export const textHandler = (ctx: Filter<BotContext, 'message:text'>, text: string) => {
    const message = new MessageHelper(ctx);
    const navigation = new NavigationHistory(ctx);

    const selectActionTxt = 'common.select-action';

    switch (text) {
        case 'start':
            navigation.clear();
            message.sendMenu(selectActionTxt, 'mainMenu');
            break;
        case ctx.t('main-menu.settings'):
            navigation.add('start');
            message.sendMenu(selectActionTxt, 'settingsMenu');
            break;
        case ctx.t('settings.locale-change'):
            navigation.add('main-menu.settings');
            message.sendMenu(selectActionTxt, 'localeMenu');
            break;
        case ctx.t('settings.locale-ru'):
        case ctx.t('settings.locale-uz'):
            navigation.add('settings.locale-change');

            if (text === ctx.t('settings.locale-uz')) {
                ctx.fluent.useLocale('uz');
                ctx.session.__language_code = 'uz';
            } else {
                ctx.fluent.useLocale('ru');
                ctx.session.__language_code = 'ru';
            }

            textHandler(ctx, ctx.t('main-menu.settings'));
            break;
        case ctx.t('common.back'):
            const prevNav = navigation.back();

            if (prevNav) {
                textHandler(ctx, ctx.t(prevNav));
            }
    }

    console.log(ctx.session);
    console.log(text);
};
