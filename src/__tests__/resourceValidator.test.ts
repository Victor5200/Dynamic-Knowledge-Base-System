import { createResourceSchema } from '../../src/validators/resourceValidator';

describe('createResourceSchema Validator', () => {
    test('should validate correct input', () => {
        const validInput = {
            topicId: '123',
            url: 'http://example.com',
            description: 'A valid resource description',
            type: 'video',
        };

        expect(() => createResourceSchema.parse(validInput)).not.toThrow();
    });

    test('should reject invalid topicId', () => {
        const invalidInput = {
            topicId: '',
            url: 'http://example.com',
            description: 'A valid resource description',
            type: 'video',
        };

        expect(() => createResourceSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid URL', () => {
        const invalidInput = {
            topicId: '123',
            url: 'invalid-url',
            description: 'A valid resource description',
            type: 'video',
        };

        expect(() => createResourceSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid description', () => {
        const invalidInput = {
            topicId: '123',
            url: 'http://example.com',
            description: '',
            type: 'video',
        };

        expect(() => createResourceSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid type', () => {
        const invalidInput = {
            topicId: '123',
            url: 'http://example.com',
            description: 'A valid resource description',
            type: 'invalid-type',
        };

        expect(() => createResourceSchema.parse(invalidInput)).toThrow();
    });
});