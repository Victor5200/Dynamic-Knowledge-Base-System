import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const service = new UserService();

export const createUser = (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    const user = service.create(name, email, role);
    res.status(201).json(user);
};

export const getAllUsers = (req: Request, res: Response) => {
    res.json(service.getAll());
};

export const getUserById = (req: Request, res: Response) => {
    const user = service.getById(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

export const deleteUser = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'User not found' });
};
