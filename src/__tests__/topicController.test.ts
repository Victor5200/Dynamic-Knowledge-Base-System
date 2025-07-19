import request from 'supertest';
import express from 'express';
import topicRoutes from '../../src/routes/topicRoutes';
import { mockAuth } from '../../src/middleware/mockAuth';

const app = express();
app.use(express.json());
app.use(mockAuth);
app.use('/topics', topicRoutes);

jest.mock('../../src/services/topicService', () => ({
    TopicService: jest.fn().mockImplementation(() => ({
        create: jest.fn((name, content, parentTopicId) => ({
            id: '1',
            name,
            content,
            parentTopicId,
        })),
        getAll: jest.fn(() => [
            { id: '1', name: 'Topic 1', content: 'Content 1', parentTopicId: null },
            { id: '2', name: 'Topic 2', content: 'Content 2', parentTopicId: '1' },
        ]),
        getById: jest.fn((id) => (id === '1' ? { id, name: 'Topic 1', content: 'Content 1', parentTopicId: null } : null)),
        update: jest.fn((id, content) => (id === '1' ? { id, name: 'Topic 1', content, parentTopicId: null } : null)),
        delete: jest.fn((id) => id === '1'),
        getTopicTree: jest.fn((id) => (id === '1' ? { id, name: 'Topic 1', content: 'Content 1', subtopics: [] } : null)),
    })),
}));

describe('Topic Controller Integration Tests', () => {
    test('GET /topics - should retrieve all topics', async () => {
        const response = await request(app)
            .get('/topics')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: '1', name: 'Topic 1', content: 'Content 1', parentTopicId: null },
            { id: '2', name: 'Topic 2', content: 'Content 2', parentTopicId: '1' },
        ]);
    });

    test('GET /topics/:id - should retrieve a topic by ID', async () => {
        const response = await request(app)
            .get('/topics/1')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            name: 'Topic 1',
            content: 'Content 1',
            parentTopicId: null,
        });
    });

    test('DELETE /topics/:id - should delete a topic', async () => {
        const response = await request(app)
            .delete('/topics/1')
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted' });
    });

    test('GET /topics/:id/tree - should retrieve a topic tree', async () => {
        const response = await request(app)
            .get('/topics/1/tree')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            name: 'Topic 1',
            content: 'Content 1',
            subtopics: [],
        });
    });

    test('POST /topics - should create a new topic', async () => {
        const response = await request(app)
            .post('/topics')
            .send({
                name: 'Topic 1',
                content: 'Content 1',
                parentTopicId: '1',
            })
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: '1',
            name: 'Topic 1',
            content: 'Content 1',
            parentTopicId: '1',
        });
    });

    test('PUT /topics/:id - should update a topic', async () => {
        const response = await request(app)
            .put('/topics/1')
            .send({
                name: 'Topic 1',
                content: 'Updated Content',
                parentTopicId: null,
            })
            .set('x-user-role', 'Editor');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            name: 'Topic 1',
            content: 'Updated Content',
            parentTopicId: null,
        });
    });
});