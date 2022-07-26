import {MiddlewareFn} from 'grammy/out/composer';
import {Filter} from 'grammy/out/filter';
import {BotContext, ControllerText, LocaleType} from '@src/interfaces';
import {
    localeChangeMenuTxt,
    mainMenuTexts,
    MenuCreator,
    localeChangeMenuTexts
} from '@src/bot/controllers/text_controller/menus';
import {MessageHelper} from '@src/bot/message_helper';

export const textController: MiddlewareFn<Filter<BotContext, 'message:text'>> = async ctx => {
    const text = ctx.message.text as ControllerText;
    const locale = ctx.i18n.locale() as LocaleType;
    const mainMenu = mainMenuTexts[locale];
    const settingsMenu = localeChangeMenuTexts[locale];

    const messageHelper = new MessageHelper(ctx);
    const menuCreator = new MenuCreator(ctx);

    const selectActionMsg = 'common.select_action';

    switch (text) {
        case '/start':
            messageHelper.sendMenu('common.greeting', menuCreator.getMainMenu());
            break;
        case mainMenu.settings:
            messageHelper.sendMenu(selectActionMsg, menuCreator.getSettingsMenu());
            break;
        case settingsMenu.locale:
            messageHelper.sendMenu(selectActionMsg, menuCreator.getLocaleMenu());
            break;
        case localeChangeMenuTxt.ru.locale:
        case localeChangeMenuTxt.uz.locale:
            if (text === localeChangeMenuTxt.uz.locale) {
                ctx.i18n.locale('uz');
            } else {
                ctx.i18n.locale('ru');
            }
            messageHelper.sendMenu(selectActionMsg, menuCreator.getMainMenu());
    }

    console.log(text);
    console.log(`session - ${JSON.stringify(ctx.session)}`, `i18n - ${ctx.i18n.locale()}`);
};
