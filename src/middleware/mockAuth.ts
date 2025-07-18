import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; role: UserRole };
        }
    }
}

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {
    // Bypass authentication for API documentation endpoint
    if (req.path.startsWith('/api-docs')) {
        return next();
    }
    // Mock authentication logic
    const role = req.header('x-user-role') as UserRole;

    if (!role || !['Admin', 'Editor', 'Viewer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid or missing x-user-role header' });
    }

    req.user = {
        id: 'mock-user-id',
        role
    };

    next();
};
