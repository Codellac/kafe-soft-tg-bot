import {ContextClass} from './contextClass';

export class BackNavigation extends ContextClass {
    getNavigation() {
        return this._ctx.session.back_navigation;
    }

    add(navigation: string) {
        this._ctx.session.back_navigation = navigation;
    }

    remove() {
        if (this.hasNavigation()) {
            this._ctx.session.back_navigation = null;
        }
    }

    hasNavigation() {
        return Boolean(this._ctx.session.back_navigation);
    }
}
