import {Keyboard} from 'grammy';
import {ButtonTexts} from '@src/texts';

export const customMenu = new Keyboard()
    .text(ButtonTexts.Menu).row()
    .text(ButtonTexts.Contacts).text(ButtonTexts.Bin).row()
    .text(ButtonTexts.Feedback);