import {Fluent} from '@moebius/fluent';
import {useFluent} from '@grammyjs/fluent';
import {BotContext} from '@src/interfaces';

export const getLocaleMiddleware = () => {
    const fluent = new Fluent();

    fluent.addTranslation({
        locales: 'ru',
        filePath: 'src/locales/ru.ftl'
    });

    fluent.addTranslation({
        locales: 'uz',
        filePath: 'src/locales/uz.ftl'
    });

    return useFluent<BotContext>({
        fluent,
        defaultLocale: 'ru',
        localeNegotiator: context => context.session.__language_code || 'ru'
    });
};
