import { swaggerUi, swaggerSpec } from '../config/swagger';
import swaggerJsdoc from 'swagger-jsdoc';

jest.mock('swagger-jsdoc', () => jest.fn(() => ({
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    },
})));

jest.mock('swagger-ui-express', () => ({
    serve: jest.fn(),
    setup: jest.fn(),
}));

describe('Swagger Configuration', () => {
    test('should generate Swagger specification correctly', () => {
        const spec = swaggerSpec;
        expect(swaggerJsdoc).toHaveBeenCalledWith({
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                },
            },
            apis: ['./src/controllers/*.ts'],
        });
        expect(spec).toEqual({
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
            },
        });
    });

    test('should export Swagger UI middleware', () => {
        expect(swaggerUi.serve).toBeDefined();
        expect(swaggerUi.setup).toBeDefined();
    });
});