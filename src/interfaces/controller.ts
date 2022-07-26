import {
    RuChangeLocale,
    RuMainMenu,
    UzChangeLocale,
    UzMainMenu
} from '@src/bot/controllers/text_controller/menus';
import {
    RuSettingsMenu,
    UzSettingsMenu
} from '@src/bot/controllers/text_controller/menus/settingsMenu';

export type ControllerText =
    | '/start'
    | RuMainMenu
    | UzMainMenu
    | RuSettingsMenu
    | UzSettingsMenu
    | RuChangeLocale
    | UzChangeLocale;
