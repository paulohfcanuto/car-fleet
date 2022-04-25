import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from './../common/token-key';

interface jwt {
    user_id: number;
    user_email: string;
    fleetId: number;
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(403)
            .json({ cause: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.fleetId = (decoded as jwt).fleetId;
        next();
    } catch (error) {
        return res.status(401).json({ cause: 'Invalid Token' });
    }
};
