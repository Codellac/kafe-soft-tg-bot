import {Keyboard} from 'grammy';
import {BackNavigation, Locale} from "@src/bot/helpers";
import {Helper} from '../helper';

export type MenuName = 'mainMenu' | 'settingsMenu' | 'localeMenu';

export class KeyboardMenu extends Helper {
    getMenu(menuName: MenuName) {
        const {translate} = new Locale(this._ctx);
        const navigation = new BackNavigation(this._ctx);
        let keyboard = new Keyboard();

        switch (menuName) {
            case 'mainMenu':
                keyboard = keyboard
                    .text(translate('main-menu.menu'))
                    .row()
                    .text(translate('main-menu.our-contacts'))
                    .text(translate('main-menu.shopping-basket'))
                    .row()
                    .text(translate('main-menu.feedback'))
                    .text(translate('main-menu.settings'));
                break;
            case 'settingsMenu':
                keyboard = keyboard.text(translate('settings.locale-change'));
                break;
            case 'localeMenu':
                keyboard = keyboard
                    .text(translate('settings.locale-ru'))
                    .text(translate('settings.locale-uz'));
        }

        if (navigation.hasNavigation()) {
            keyboard = keyboard.row().text(translate('common.back'));
        }

        return keyboard;
    }
}
