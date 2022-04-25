import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';

import HttpException from '../common/http-exception';

export const reqSyntaxErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (err instanceof SyntaxError) {
        console.error(err);
        return res.status(400).send({ cause: err.message });
    }
    next();
};

export const prismaErrorHandler = (error: unknown) => {
    if (error instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException(400, 'Wrong parameters on client side.', {
            cause: 'Incorrect parameters sent in the request.',
        });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            throw new HttpException(404, error.message, error.meta);
        }
        if (error.code === 'P2002') {
            throw new HttpException(409, error.message, {
                cause: 'Unique constraint failed',
            });
        }
    } else if (error instanceof HttpException) {
        throw new HttpException(500, 'Unknown error.', {
            cause: 'Unknown error.',
        });
    }
};
