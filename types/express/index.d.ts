import * as express from 'express';
declare module 'express-serve-static-core' {
    interface Request {
        fleetId: number;
    }
}
