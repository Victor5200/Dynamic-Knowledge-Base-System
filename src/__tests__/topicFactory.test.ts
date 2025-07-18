import { TopicVersionFactory } from '../../src/factories/topicFactory';
import { TopicVersion } from '../../src/models/topic';

describe('TopicVersionFactory', () => {
    test('should create a TopicVersion object with correct properties', () => {
        const content = 'Sample content';
        const version = 1;

        const result: TopicVersion = TopicVersionFactory.createVersion(content, version);

        expect(result).toEqual({
            content,
            version,
            createdAt: expect.any(Date),
        });
    });

    test('should set the createdAt property to the current date', () => {
        const content = 'Another content';
        const version = 2;

        const result: TopicVersion = TopicVersionFactory.createVersion(content, version);

        const now = new Date();
        expect(result.createdAt.getTime()).toBeCloseTo(now.getTime(), -2);
    });
});