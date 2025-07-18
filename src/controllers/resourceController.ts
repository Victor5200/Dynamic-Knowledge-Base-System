import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';

const service = new ResourceService();

export const createResource = (req: Request, res: Response) => {
    const { topicId, url, description, type } = req.body;
    const resource = service.create(topicId, url, description, type);
    res.status(201).json(resource);
};

export const getAllResources = (req: Request, res: Response) => {
    res.json(service.getAll());
};

export const getResourceById = (req: Request, res: Response) => {
    const resource = service.getById(req.params.id);
    resource ? res.json(resource) : res.status(404).json({ error: 'Resource not found' });
};

export const updateResource = (req: Request, res: Response) => {
    const { url, description, type } = req.body;
    const resource = service.update(req.params.id, url, description, type);
    resource ? res.json(resource) : res.status(404).json({ error: 'Resource not found' });
};

export const deleteResource = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'Resource not found' });
};
