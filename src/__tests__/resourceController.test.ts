import request from 'supertest';
import express, {NextFunction, Request, Response} from 'express';
import resourceRoutes from '../../src/routes/resourceRoutes';
import {UserRole} from "../models/user";

jest.mock('../../src/middleware/authorization', () => ({
    authorize: jest.fn((req: Request, res: Response, next: NextFunction) => {
        req = { ...req, user: { id: '1', role: UserRole.Admin } };
        if (typeof next === 'function') {
            next();
        }
    }),
}));

jest.mock('../../src/services/resourceService', () => ({
    ResourceService: jest.fn().mockImplementation(() => ({
        create: jest.fn(() => ({
            id: '1',
            topicId: '123',
            url: 'http://example.com',
            description: 'Example resource',
            type: 'link',
        })),
        getAll: jest.fn(() => [
            { id: '1', topicId: '123', url: 'http://example.com', description: 'Example resource', type: 'link' },
        ]),
        getById: jest.fn((id) => (id === '1' ? { id, topicId: '123', url: 'http://example.com', description: 'Example resource', type: 'link' } : null)),
        update: jest.fn((id) => (id === '1' ? { id, url: 'http://updated.com', description: 'Updated resource', type: 'link' } : null)),
        delete: jest.fn((id) => id === '1'),
    })),
}));

const app = express();
app.use(express.json());
app.use('/resources', resourceRoutes);

describe('Resource Controller Integration Tests', () => {
    test('POST /resources - should create a new resource', async () => {
        const response = await request(app)
            .post('/resources')
            .send({
                topicId: '123',
                url: 'http://example.com',
                description: 'Example resource',
                type: 'link',
            })
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: '1',
            topicId: '123',
            url: 'http://example.com',
            description: 'Example resource',
            type: 'link',
        });
    });

    // Additional tests for GET, PUT, DELETE
});