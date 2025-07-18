import { createUserSchema } from '../../src/validators/userValidator';

describe('createUserSchema Validator', () => {
    test('should validate correct input', () => {
        const validInput = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
        };

        expect(() => createUserSchema.parse(validInput)).not.toThrow();
    });

    test('should reject invalid name', () => {
        const invalidInput = {
            name: '',
            email: 'john.doe@example.com',
            role: 'Admin',
        };

        expect(() => createUserSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid email', () => {
        const invalidInput = {
            name: 'John Doe',
            email: 'invalid-email',
            role: 'Admin',
        };

        expect(() => createUserSchema.parse(invalidInput)).toThrow();
    });

    test('should reject invalid role', () => {
        const invalidInput = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'InvalidRole',
        };

        expect(() => createUserSchema.parse(invalidInput)).toThrow();
    });
});