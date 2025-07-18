import { createTopicSchema } from '../../src/validators/topicValidator';

describe('createTopicSchema Validator', () => {
    test('should validate correct input', () => {
        const validInput = {
            name: 'Topic Name',
            content: 'Topic Content',
            parentTopicId: '123',
        };

        expect(() => createTopicSchema.parse(validInput)).not.toThrow();
    });

    test('should validate input without parentTopicId', () => {
        const validInput = {
            name: 'Topic Name',
            content: 'Topic Content',
        };

        expect(() => createTopicSchema.parse(validInput)).not.toThrow();
    });

    test('should reject invalid name', () => {
        const invalidInput = {
            name: '',
            content: 'Topic Content',
            parentTopicId: '123',
        };

        expect(() => createTopicSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid content', () => {
        const invalidInput = {
            name: 'Topic Name',
            content: '',
            parentTopicId: '123',
        };

        expect(() => createTopicSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid parentTopicId type', () => {
        const invalidInput = {
            name: 'Topic Name',
            content: 'Topic Content',
            parentTopicId: 123,
        };

        expect(() => createTopicSchema.parse(invalidInput)).toThrow();
    });
});