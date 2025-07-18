import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const service = new UserService();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Editor, Viewer]
 *     responses:
 *       201:
 *         description: User created successfully
 */
export const createUser = (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    const user = service.create(name, email, role);
    res.status(201).json(user);
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
export const getAllUsers = (req: Request, res: Response) => {
    res.json(service.getAll());
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
export const getUserById = (req: Request, res: Response) => {
    const user = service.getById(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
export const deleteUser = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'User not found' });
};
