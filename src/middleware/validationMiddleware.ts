import { Request, Response } from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: () => void) => {
        const { error } = schema.validate(req.body);
        if (error) {
            let errorMessage = '';
            for (const err of error.details) {
                errorMessage +=
                    err.path.join(' > ') +
                    err.message.slice(err.message.lastIndexOf('"') + 1);
            }
            return res.status(422).json({
                cause: errorMessage,
            });
        }
        next();
    };
};
