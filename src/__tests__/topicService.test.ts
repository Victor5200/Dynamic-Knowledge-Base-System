import { TopicService } from '../../src/services/topicService';
import { Topic } from '../../src/models/topic';
import { db } from '../../src/utils/database';

jest.mock('../../src/utils/database', () => ({
    db: {
        topics: new Map(),
    },
}));

describe('TopicService', () => {
    let topicService: TopicService;

    beforeEach(() => {
        topicService = new TopicService();
        db.topics.clear();
    });

    test('should create a new topic', () => {
        const name = 'Topic1';
        const content = 'Initial content';

        const topic = topicService.create(name, content);

        expect(topic).toBeDefined();
        expect(topic.name).toBe(name);
        expect(topic.getLatestContent()).toBe(content);
        expect(db.topics.size).toBe(1);
    });

    test('should retrieve all topics', () => {
        const topic1 = topicService.create('Topic1', 'Content1');
        const topic2 = topicService.create('Topic2', 'Content2');

        const topics = topicService.getAll();

        expect(topics).toEqual([topic1, topic2]);
    });

    test('should retrieve a topic by ID', () => {
        const topic = topicService.create('Topic1', 'Content1');

        const retrievedTopic = topicService.getById(topic.id);

        expect(retrievedTopic).toEqual(topic);
    });

    test('should update a topic content', () => {
        const topic = topicService.create('Topic1', 'Content1');

        const updatedTopic = topicService.update(topic.id, 'Updated content');

        expect(updatedTopic).toBeDefined();
        expect(updatedTopic?.getLatestContent()).toBe('Updated content');
    });

    test('should delete a topic by ID', () => {
        const topic = topicService.create('Topic1', 'Content1');

        const result = topicService.delete(topic.id);

        expect(result).toBe(true);
        expect(db.topics.size).toBe(0);
    });

    test('should return null when finding shortest path between non-existent topics', () => {
        const path = topicService.findShortestPath('non-existent-id1', 'non-existent-id2');

        expect(path).toBeNull();
    });

    test('should find the shortest path between two topics', () => {
        const topic1 = topicService.create('Topic1', 'Content1');
        const topic2 = topicService.create('Topic2', 'Content2', topic1.id);
        const topic3 = topicService.create('Topic3', 'Content3', topic2.id);

        const path = topicService.findShortestPath(topic1.id, topic3.id);

        expect(path).toEqual([topic1.id, topic2.id, topic3.id]);
    });

    test('should build a topic tree', () => {
        const topic1 = topicService.create('Topic1', 'Content1');
        const topic2 = topicService.create('Topic2', 'Content2', topic1.id);
        const topic3 = topicService.create('Topic3', 'Content3', topic2.id);

        const tree = topicService.getTopicTree(topic1.id);

        expect(tree).toEqual({
            id: topic1.id,
            name: topic1.name,
            content: topic1.getLatestContent(),
            children: [
                {
                    id: topic2.id,
                    name: topic2.name,
                    content: topic2.getLatestContent(),
                    children: [
                        {
                            id: topic3.id,
                            name: topic3.name,
                            content: topic3.getLatestContent(),
                            children: [],
                        },
                    ],
                },
            ],
        });
    });
});