import { z } from 'zod';

export const ZPostSchema =z.object({
    subject: z.string({description:"The subject is required"}),
    body: z.string(),
    comments:z.array(z.string()).default([]),
    userId:z.string().optional()
});

export type ZCommentType=z.infer< typeof ZPostSchema>
