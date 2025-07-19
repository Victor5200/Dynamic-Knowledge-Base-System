import request from 'supertest';
import express from 'express';
import userRoutes from '../../src/routes/userRoutes';
import { mockAuth } from '../../src/middleware/mockAuth';

const app = express();
app.use(express.json());
app.use(mockAuth);
app.use('/users', userRoutes);

jest.mock('../../src/services/userService', () => ({
    UserService: jest.fn().mockImplementation(() => ({
        create: jest.fn((name, email, role) => ({
            id: '1',
            name,
            email,
            role,
        })),
        getAll: jest.fn(() => [
            { id: '1', name: 'User 1', email: 'user1@example.com', role: 'Admin' },
            { id: '2', name: 'User 2', email: 'user2@example.com', role: 'Viewer' },
        ]),
        getById: jest.fn((id) => (id === '1' ? { id, name: 'User 1', email: 'user1@example.com', role: 'Admin' } : null)),
        update: jest.fn((id, name, email, role) => (id === '1' ? { id: '1', name: 'Updated User', email: 'updated@example.com', role: 'Editor' } : null)),
        delete: jest.fn((id) => id === '1'),
    })),
}));

describe('User Controller Integration Tests', () => {
    test('POST /users - should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'User 1',
                email: 'user1@example.com',
                role: 'Admin',
            })
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: '1',
            name: 'User 1',
            email: 'user1@example.com',
            role: 'Admin',
        });
    });

    test('GET /users - should retrieve all users', async () => {
        const response = await request(app)
            .get('/users')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: '1', name: 'User 1', email: 'user1@example.com', role: 'Admin' },
            { id: '2', name: 'User 2', email: 'user2@example.com', role: 'Viewer' },
        ]);
    });

    test('GET /users/:id - should retrieve a user by ID', async () => {
        const response = await request(app)
            .get('/users/1')
            .set('x-user-role', 'Viewer');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            name: 'User 1',
            email: 'user1@example.com',
            role: 'Admin',
        });
    });

    test('PUT /users/:id - should update a user', async () => {
        const response = await request(app)
            .put('/users/1')
            .send({
                name: 'Updated User',
                email: 'updated@example.com',
                role: 'Editor',
            })
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            name: 'Updated User',
            email: 'updated@example.com',
            role: 'Editor',
        });
    });

    test('DELETE /users/:id - should delete a user', async () => {
        const response = await request(app)
            .delete('/users/1')
            .set('x-user-role', 'Admin');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted' });
    });
});