import { Topic } from '../../src/models/topic';

describe('Topic Model', () => {
    test('should initialize with the correct properties', () => {
        const topic = new Topic('1', 'Sample Topic', 'Initial content');

        expect(topic.id).toBe('1');
        expect(topic.name).toBe('Sample Topic');
        expect(topic.parentTopicId).toBeUndefined();
        expect(topic.versions).toHaveLength(1);
        expect(topic.versions[0]).toEqual({
            content: 'Initial content',
            version: 1,
            createdAt: expect.any(Date),
        });
    });

    test('should add a new version correctly', () => {
        const topic = new Topic('1', 'Sample Topic', 'Initial content');
        topic.addVersion('Updated content');

        expect(topic.versions).toHaveLength(2);
        expect(topic.versions[1]).toEqual({
            content: 'Updated content',
            version: 2,
            createdAt: expect.any(Date),
        });
    });

    test('should return the latest content', () => {
        const topic = new Topic('1', 'Sample Topic', 'Initial content');
        topic.addVersion('Updated content');

        const latestContent = topic.getLatestContent();
        expect(latestContent).toBe('Updated content');
    });
});