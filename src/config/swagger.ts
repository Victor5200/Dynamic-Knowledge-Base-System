// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Knowledge Base API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'], // onde estão as anotações
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
