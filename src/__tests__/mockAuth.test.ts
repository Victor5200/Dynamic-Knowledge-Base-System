import { mockAuth } from '../../src/middleware/mockAuth';
import { Request, Response, NextFunction } from 'express';

describe('mockAuth Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            header: jest.fn(),
            path: '/users',
            user: undefined,
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Create a test for the bypass condition - should bypass authentication for /api-docs

    test('should set user object for valid x-user-role header', () => {
        req.header = jest.fn().mockReturnValue('Admin');

        mockAuth(req as Request, res as Response, next);

        expect(req.user).toEqual({ id: 'mock-user-id', role: 'Admin' });
        expect(next).toHaveBeenCalled();
    });

    test('should return 400 for missing x-user-role header', () => {
        req.header = jest.fn().mockReturnValue(undefined);

        mockAuth(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing x-user-role header' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for invalid x-user-role header', () => {
        req.header = jest.fn().mockReturnValue('InvalidRole');

        mockAuth(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing x-user-role header' });
        expect(next).not.toHaveBeenCalled();
    });
});