import { Request, Response, NextFunction } from 'express';
import {
    AdminStrategy, EditorStrategy, ViewerStrategy,
    PermissionContext
} from '../strategies/permissionStrategy';

export const authorize = (action: 'read' | 'create' | 'update' | 'delete') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if (!role) return res.status(401).json({ error: 'User not authenticated' });

        let strategy;
        switch (role) {
            case 'Admin': strategy = new AdminStrategy(); break;
            case 'Editor': strategy = new EditorStrategy(); break;
            case 'Viewer': strategy = new ViewerStrategy(); break;
            default: return res.status(403).json({ error: 'Invalid role' });
        }

        const permission = new PermissionContext(strategy);

        if (!permission.can(action)) {
            return res.status(403).json({ error: `Role ${role} not allowed to ${action}` });
        }

        next();
    };
};
