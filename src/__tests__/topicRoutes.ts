import request from 'supertest';
import express from 'express';
import topicRoutes from '../../src/routes/topicRoutes';
import { createTopic, getAllTopics, getTopicById, updateTopic, deleteTopic, getTopicTree } from '../../src/controllers/topicController';
import { getTopicPath } from '../../src/controllers/topicPathController';

jest.mock('../../src/controllers/topicController', () => ({
    createTopic: jest.fn((req, res) => res.status(201).send({ message: 'Topic created' })),
    getAllTopics: jest.fn((req, res) => res.status(200).send([{ id: '1', name: 'Topic 1' }])),
    getTopicById: jest.fn((req, res) => res.status(200).send({ id: req.params.id, name: 'Topic 1' })),
    updateTopic: jest.fn((req, res) => res.status(200).send({ message: 'Topic updated' })),
    deleteTopic: jest.fn((req, res) => res.status(200).send({ message: 'Topic deleted' })),
    getTopicTree: jest.fn((req, res) => res.status(200).send({ tree: 'Topic Tree' })),
}));

jest.mock('../../src/controllers/topicPathController', () => ({
    getTopicPath: jest.fn((req, res) => res.status(200).set('x-user-role', 'Admin').send({ path: 'Topic Path' })),
}));

const app = express();
app.use(express.json());
app.use('/topics', topicRoutes);

describe('Topic Routes', () => {
    // TODO: implement tests for topic routes
    test('Dummy test ', async () => {
        expect(1 + 1).toBe(2);
    });
});