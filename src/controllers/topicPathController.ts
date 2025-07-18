import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';

const service = new TopicService();

export const getTopicPath = (req: Request, res: Response) => {
    const { fromId, toId } = req.query as { fromId: string, toId: string };
    const path = service.findShortestPath(fromId, toId);

    path ? res.json({ path }) : res.status(404).json({ error: 'Path not found' });
};
