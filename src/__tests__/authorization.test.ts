import {authorize} from '../../src/middleware/authorization';
import {Request, Response} from 'express';
import {UserRole} from "../models/user";

describe('authorize Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            user: undefined,
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('should return 401 if user is not authenticated', () => {
        authorize('read')(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 403 if role is not allowed to perform the action', () => {
        req.user = { id: 'mock-user-id', role: UserRole.Viewer };

        authorize('delete')(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Role Viewer not allowed to delete' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should call next() if role is allowed to perform the action', () => {
        req.user = { id: 'mock-user-id', role: UserRole.Admin };

        authorize('delete')(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});