import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';

const service = new TopicService();

export const createTopic = (req: Request, res: Response) => {
    const { name, content, parentTopicId } = req.body;
    const topic = service.create(name, content, parentTopicId);
    res.status(201).json(topic);
};

export const getAllTopics = (req: Request, res: Response) => {
    res.json(service.getAll());
};

export const getTopicById = (req: Request, res: Response) => {
    const topic = service.getById(req.params.id);
    topic ? res.json(topic) : res.status(404).json({ error: 'Topic not found' });
};

export const updateTopic = (req: Request, res: Response) => {
    const topic = service.update(req.params.id, req.body.content);
    topic ? res.json(topic) : res.status(404).json({ error: 'Topic not found' });
};

export const deleteTopic = (req: Request, res: Response) => {
    service.delete(req.params.id)
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ error: 'Topic not found' });
};

export const getTopicTree = (req: Request, res: Response) => {
    const tree = service.getTopicTree(req.params.id);
    tree ? res.json(tree) : res.status(404).json({ error: 'Topic not found' });
};