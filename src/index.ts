import express from 'express';
import topicRoutes from './routes/topicRoutes';
import resourceRoutes from './routes/resourceRoutes';
import userRoutes from './routes/userRoutes';
import { swaggerUi, swaggerSpec } from './config/swagger';

import { mockAuth } from './middleware/mockAuth';
const app = express();

const PORT = 3000;
app.use(express.json());

app.use(mockAuth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/topics', topicRoutes);
app.use('/resources', resourceRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
