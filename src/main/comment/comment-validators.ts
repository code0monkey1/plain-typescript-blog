
import { z } from 'zod';
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
    userId:z.string(),
});

export type ZCommentType=z.infer< typeof ZCommentSchema>

