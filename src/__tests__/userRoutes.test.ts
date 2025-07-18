import request from 'supertest';
import express from 'express';
import userRoutes from '../../src/routes/userRoutes';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../../src/controllers/userController';

jest.mock('../../src/controllers/userController', () => ({
    createUser: jest.fn((req, res) => res.status(201).send({ message: 'User created' })),
    getAllUsers: jest.fn((req, res) => res.status(200).send([{ id: '1', name: 'John Doe', email: 'john.doe@example.com' }])),
    getUserById: jest.fn((req, res) => res.status(200).send({ id: req.params.id, name: 'John Doe', email: 'john.doe@example.com' })),
    updateUser: jest.fn((req, res) => res.status(200).send({ message: 'User updated' })),
    deleteUser: jest.fn((req, res) => res.status(200).send({ message: 'User deleted' })),
}));

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
    // TODO: implement tests for user routes
    test('Dummy test ', async () => {
        expect(1 + 1).toBe(2);
    });
});