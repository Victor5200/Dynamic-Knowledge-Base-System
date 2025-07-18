import { validate } from '../../src/middleware/validate';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

describe('validate Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    const schema = z.object({
        name: z.string(),
        age: z.number().min(18),
    });

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('should call next() for valid request body', () => {
        req.body = { name: 'John Doe', age: 25 };

        validate(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('should return 400 for invalid request body', () => {
        req.body = { name: 'John Doe', age: 15 };

        validate(schema)(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: expect.any(Object),
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for missing required fields', () => {
        req.body = { age: 25 };

        validate(schema)(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: expect.any(Object),
        });
        expect(next).not.toHaveBeenCalled();
    });
});