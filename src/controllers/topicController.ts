import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';

const service = new TopicService();

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               parentTopicId:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Topic created successfully
 */
export const createTopic = (req: Request, res: Response) => {
    const { name, content, parentTopicId } = req.body;
    const topic = service.create(name, content, parentTopicId);
    res.status(201).json(topic);
};


/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *     responses:
 *       200:
 *         description: List of topics
 */
export const getAllTopics = (req: Request, res: Response) => {
    res.json(service.getAll());
};

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     summary: Get a topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic found
 *       404:
 *         description: Topic not found
 */
export const getTopicById = (req: Request, res: Response) => {
    const topic = service.getById(req.params.id);
    topic ? res.json(topic) : res.status(404).json({ error: 'Topic not found' });
};

/**
 * @swagger
 * /topics/{id}:
 *   put:
 *     summary: Update a topic
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
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
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       404:
 *         description: Topic not found
 */
export const updateTopic = (req: Request, res: Response) => {
    const topic = service.update(req.params.id, req.body.content);
    topic ? res.json(topic) : res.status(404).json({ error: 'Topic not found' });
};

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     summary: Delete a topic
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *       404:
 *         description: Topic not found
 */
export const deleteTopic = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'Topic not found' });
};

/**
 * @swagger
 * /topics/{id}/tree:
 *   get:
 *     summary: Get a topic and its subtopics recursively
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic tree retrieved successfully
 *       404:
 *         description: Topic not found
 */
export const getTopicTree = (req: Request, res: Response) => {
    const tree = service.getTopicTree(req.params.id);
    tree ? res.json(tree) : res.status(404).json({ error: 'Topic not found' });
};