import { z } from 'zod';

export const ZPostSchema =z.object({
    subject: z.string({description:"The subject is required"}),
    body: z.string()
});

export type ZPostType=z.infer< typeof ZPostSchema>


export const ZUpdatePostSchema = ZPostSchema.partial()

