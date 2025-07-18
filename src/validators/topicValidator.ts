import { z } from 'zod';

export const createTopicSchema = z.object({
    name: z.string().min(1),
    content: z.string().min(1),
    parentTopicId: z.string().optional()
});
