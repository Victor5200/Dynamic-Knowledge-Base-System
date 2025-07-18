import { Topic } from '../models/topic';
import { db } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';

export class TopicService {
    create(name: string, content: string, parentTopicId?: string): Topic {
        const id = uuidv4();
        const topic = new Topic(id, name, content, parentTopicId);
        db.topics.set(id, topic);
        return topic;
    }

    getAll(): Topic[] {
        return Array.from(db.topics.values());
    }

    getById(id: string): Topic | undefined {
        return db.topics.get(id);
    }

    update(id: string, newContent: string): Topic | undefined {
        const topic = db.topics.get(id);
        if (!topic) return undefined;

        topic.addVersion(newContent);
        db.topics.set(id, topic);
        return topic;
    }

    delete(id: string): boolean {
        return db.topics.delete(id);
    }

    getTopicTree(id: string): any {
        const buildTree = (topicId: string): any => {
            const topic = db.topics.get(topicId);
            if (!topic) return null;

            const children = Array.from(db.topics.values())
                .filter(t => t.parentTopicId === topicId)
                .map(child => buildTree(child.id));

            return {
                id: topic.id,
                name: topic.name,
                content: topic.getLatestContent(),
                children
            };
        };

        return buildTree(id);
    }

    findShortestPath(fromId: string, toId: string): string[] | null {
        const visited = new Set<string>();
        const queue: { id: string, path: string[] }[] = [{ id: fromId, path: [fromId] }];

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) continue;

            if (current.id === toId) return current.path;

            visited.add(current.id);

            const neighbors = Array.from(db.topics.values())
                .filter(t => t.parentTopicId === current.id || t.id === db.topics.get(current.id)?.parentTopicId)
                .map(t => t.id);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push({ id: neighbor, path: [...current.path, neighbor] });
                }
            }
        }

        return null;
    }
}
