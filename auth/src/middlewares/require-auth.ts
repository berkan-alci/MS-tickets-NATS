import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new AuthorizationError();
    }

    next();
};