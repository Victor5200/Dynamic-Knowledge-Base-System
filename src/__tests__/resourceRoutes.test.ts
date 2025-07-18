import request from 'supertest';
import express from 'express';
import resourceRoutes from '../../src/routes/resourceRoutes';
import {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
} from '../../src/controllers/resourceController';

jest.mock('../../src/controllers/resourceController', () => ({
    createResource: jest.fn((req, res) => res.status(201).send({ message: 'Resource created' })),
    getAllResources: jest.fn((req, res) => res.status(200).send([{ id: '1', url: 'http://example.com', type: 'video' }])),
    getResourceById: jest.fn((req, res) => res.status(200).send({ id: req.params.id, url: 'http://example.com', type: 'video' })),
    updateResource: jest.fn((req, res) => res.status(200).send({ message: 'Resource updated' })),
    deleteResource: jest.fn((req, res) => res.status(200).send({ message: 'Resource deleted' })),
}));

const app = express();
app.use(express.json());
app.use('/resources', resourceRoutes);

describe('Resource Routes', () => {
    // TODO: implement tests for resource routes
    test('Dummy test ', async () => {
        expect(1 + 1).toBe(2);
    });
});