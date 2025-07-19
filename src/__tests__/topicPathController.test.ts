import request from 'supertest';
import express from 'express';
import { getTopicPath } from '../../src/controllers/topicPathController';
import { mockAuth } from '../../src/middleware/mockAuth';

const app = express();
app.use(express.json());
app.use(mockAuth);
app.get('/topic-paths', getTopicPath);

jest.mock('../../src/services/topicService', () => ({
    TopicService: jest.fn().mockImplementation(() => ({
        findShortestPath: jest.fn((fromId, toId) =>
            fromId === '1' && toId === '2' ? ['1', '2'] : null
        ),
    })),
}));

describe('Topic Path Controller Integration Tests', () => {
    test('GET /topic-paths - should retrieve the shortest path between two topics', async () => {
        const response = await request(app)
            .get('/topic-paths')
            .query({ fromId: '1', toId: '2' })
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ path: ['1', '2'] });
    });

    test('GET /topic-paths - should return 404 if no path is found', async () => {
        const response = await request(app)
            .get('/topic-paths')
            .query({ fromId: '1', toId: '3' })
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Path not found' });
    });
});