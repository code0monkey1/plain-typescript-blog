
import { z } from 'zod';
import { ZPostSchema } from '../post/post-validator';
import { Comment } from "./comment-types";
export const isComment=(body:unknown) :body is Comment=>{
    
  return (body as Comment).postId!==undefined &&
         (body as Comment).content!==undefined &&
         (body as Comment).userId!==undefined &&
         (body as Comment).id!==undefined 
}


export const ZCommentSchema =z.object({
    postId: z.string(),
    content: z.string(),
});

export const ZUpdateCommentSchema= ZPostSchema.partial()

export type ZCommentType=z.infer< typeof ZCommentSchema>

export type ZUpdateCommentType= z.infer< typeof ZUpdateCommentSchema>