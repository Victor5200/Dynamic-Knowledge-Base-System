import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';

const service = new TopicService();

/**
 * @swagger
 * /topics/path:
 *   get:
 *     summary: Find the shortest path between two topics
 *     tags: [Topics]
 *     parameters:
 *       - name: x-user-role
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: User role required for authorization
 *       - name: fromId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the starting topic
 *       - name: toId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the target topic
 *     responses:
 *       200:
 *         description: Shortest path found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Path not found
 */
export const getTopicPath = (req: Request, res: Response) => {
    const { fromId, toId } = req.query as { fromId: string, toId: string };
    const path = service.findShortestPath(fromId, toId);

    path ? res.json({ path }) : res.status(404).json({ error: 'Path not found' });
};
