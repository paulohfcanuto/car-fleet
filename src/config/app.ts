import express from 'express';
import { queryParser } from 'express-query-parser';

import { reqSyntaxErrorHandler } from '../middleware/errorHandler';
import { router } from './router';

export class App {
    private port: number;
    private server: express.Application;

    constructor() {
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        this.server = express();
        this.initMiddleware();
        this.initRouter();
    }

    private initMiddleware() {
        this.server.use(express.json());
        this.server.use(reqSyntaxErrorHandler);
        this.server.use(
            queryParser({
                parseNull: true,
                parseUndefined: true,
                parseBoolean: true,
                parseNumber: true,
            })
        );
    }

    public start(callback: () => void) {
        return this.server.listen(this.port, callback);
    }

    private initRouter() {
        this.server.use(router);
    }
}
