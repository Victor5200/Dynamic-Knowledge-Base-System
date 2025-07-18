import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';

const service = new ResourceService();

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 */
export const createResource = (req: Request, res: Response) => {
    const { topicId, url, description, type } = req.body;
    const resource = service.create(topicId, url, description, type);
    res.status(201).json(resource);
};


/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of resources
 */
export const getAllResources = (req: Request, res: Response) => {
    res.json(service.getAll());
};

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 */
export const getResourceById = (req: Request, res: Response) => {
    const resource = service.getById(req.params.id);
    resource ? res.json(resource) : res.status(404).json({ error: 'Resource not found' });
};

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource
 *     tags: [Resources]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found
 */
export const updateResource = (req: Request, res: Response) => {
    const { url, description, type } = req.body;
    const resource = service.update(req.params.id, url, description, type);
    resource ? res.json(resource) : res.status(404).json({ error: 'Resource not found' });
};

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     tags: [Resources]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */
export const deleteResource = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'Resource not found' });
};
