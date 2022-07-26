import {IServer} from '@src/interfaces';
import {fastify} from 'fastify';
import middiePlugin from '@fastify/middie';
import {errorHandler} from '@root/utils';

export class Server implements IServer {
    private readonly _server;

    constructor() {
        this._server = fastify();
    }

    async use(url: string, cb: any) {
        await this._server.register(middiePlugin);
        this._server.use(url, cb);
    }

    async listen(opts: any) {
        this._server.listen(opts).catch(err => {
            errorHandler(err, 'Server error');
        });
    }
}