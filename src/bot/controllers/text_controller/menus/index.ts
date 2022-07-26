import {BotContext, LocaleType} from '@src/interfaces';
import {mainMenuTexts} from '@src/bot/controllers/text_controller/menus/mainMenu';
import {Keyboard} from 'grammy';
import {localeChangeMenuTexts} from '@src/bot/controllers/text_controller/menus/settingsMenu';
import {localeChangeMenuTxt} from '@src/bot/controllers/text_controller/menus/localeMenu';

export * from './mainMenu';
export * from './settingsMenu';
export * from './localeMenu';

export class MenuCreator {
    private readonly _ctx;

    constructor(ctx: BotContext) {
        this._ctx = ctx;
    }

    private getLocale() {
        return this._ctx.i18n.locale() as LocaleType;
    }

    getMainMenu() {
        const mainMenu = mainMenuTexts[this.getLocale()];
        return new Keyboard()
            .text(mainMenu.menu)
            .row()
            .text(mainMenu.our_contacts)
            .text(mainMenu.shopping_basket)
            .row()
            .text(mainMenu.feedback)
            .text(mainMenu.settings);
    }

    getSettingsMenu() {
        return new Keyboard().text(localeChangeMenuTexts[this.getLocale()].locale);
    }

    getLocaleMenu() {
        return new Keyboard()
            .text(localeChangeMenuTxt.ru.locale)
            .text(localeChangeMenuTxt.uz.locale)
            .row();
    }
}
