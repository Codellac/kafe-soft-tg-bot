import {IServer} from '@src/interfaces';
import {errorHandler} from '@root/utils';

export class Server implements IServer {
    private readonly _server;

    constructor(server: any) {
        this._server = server;
    }

    async use(url: string, cb: any) {
        this._server.use(url, cb);
    }

    async listen(opts: any) {
        this._server.listen(opts).catch((err: Error) => {
            errorHandler(err, 'Server error');
        });
    }
}
