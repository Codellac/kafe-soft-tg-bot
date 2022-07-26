import {IServer} from '@src/interfaces';
import {fastify} from 'fastify';
import middleware from '@fastify/middie';
import {errorHandler} from '@root/utils';

export class Server implements IServer {
    private readonly _server;

    constructor() {
        this._server = fastify();
        this._server.register(middleware);
    }

    async use(url: string, cb: any) {
        this._server.use(url, cb);
    }

    async listen(opts: any) {
        this._server.listen(opts).catch(err => {
            errorHandler(err, 'Server error');
        });
    }
}
