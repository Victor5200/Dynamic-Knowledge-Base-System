import request from 'supertest';
import express, {NextFunction, Request, Response} from 'express';
import resourceRoutes from '../../src/routes/resourceRoutes';
import { UserRole } from '../../src/models/user';
import { mockAuth } from '../../src/middleware/mockAuth';
import {ResourceType} from "../models/resource";

const app = express();
app.use(express.json());
app.use(mockAuth);
app.use('/resources', resourceRoutes);

jest.mock('../../src/services/resourceService', () => ({
    ResourceService: jest.fn().mockImplementation(() => ({
        create: jest.fn(() => ({
            id: '1',
            topicId: '123',
            url: 'https://example.com/resource1',
            description: 'Example resource',
            type: ResourceType.Video,
        })),
        getAll: jest.fn(() => [
            { id: '1', topicId: '123', url: 'http://example.com', description: 'Example resource', type: ResourceType.Video },
        ]),
        getById: jest.fn((id) => (id === '1' ? { id, topicId: '123', url: 'http://example.com', description: 'Example resource', type: ResourceType.Video } : null)),
        update: jest.fn((id) => (id === '1' ? { id, topicId: '123', url: 'http://updated.com', description: 'Updated resource', type: ResourceType.Video } : null)),
        delete: jest.fn((id) => id === '1'),
    })),
}));

describe('Resource Controller Integration Tests', () => {
    test('POST /resources - should create a new resource', async () => {
        const response = await request(app)
            .post('/resources')
            .send({
                topicId: '123',
                url: 'https://example.com/resource1',
                description: 'Example resource',
                type: ResourceType.Video,
            })
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: '1',
            topicId: '123',
            url: 'https://example.com/resource1',
            description: 'Example resource',
            type: ResourceType.Video,
        });
    });


    test('GET /resources - should retrieve all resources', async () => {
        const response = await request(app)
            .get('/resources')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: '1', topicId: '123', url: 'http://example.com', description: 'Example resource', type: ResourceType.Video },
        ]);
    });

    test('GET /resources/:id - should retrieve a resource by ID', async () => {
        const response = await request(app)
            .get('/resources/1')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            topicId: '123',
            url: 'http://example.com',
            description: 'Example resource',
            type: ResourceType.Video,
        });
    });

    test('PUT /resources/:id - should update a resource', async () => {
        const response = await request(app)
            .put('/resources/1')
            .send({
                topicId: '123',
                url: 'http://updated.com',
                description: 'Updated resource',
                type: ResourceType.Video,
            })
            .set('x-user-role', 'Editor');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            topicId: '123',
            url: 'http://updated.com',
            description: 'Updated resource',
            type: ResourceType.Video,
        });
    });

    test('DELETE /resources/:id - should delete a resource', async () => {
        const response = await request(app)
            .delete('/resources/1')
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(200);
    });
});