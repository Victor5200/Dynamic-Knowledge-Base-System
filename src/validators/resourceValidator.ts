import { z } from 'zod';

export const createResourceSchema = z.object({
    topicId: z.string().min(1),
    url: z.string().url(),
    description: z.string().min(1),
    type: z.enum(['video', 'article', 'pdf']),
});
