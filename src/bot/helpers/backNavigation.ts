import {Helper} from './helper';

export class NavigationHistory extends Helper {
    add(navigation: string) {
        if (this._ctx.session.navigation_history) {
            this._ctx.session.navigation_history.push(navigation);
        } else {
            this._ctx.session.navigation_history = [navigation];
        }
    }

    back() {
        return this._ctx.session.navigation_history.pop();
    }

    hasHistory() {
        return Boolean(this._ctx.session.navigation_history?.length);
    }

    clear() {
        if (this.hasHistory()) {
            this._ctx.session.navigation_history = [];
        }
    }
}
