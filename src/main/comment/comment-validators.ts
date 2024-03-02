import { Comment } from "./comment-types"

export const isComment=(body:unknown) :body is Comment=>{
    
  return (body as Comment).postId!==undefined &&
         (body as Comment).content!==undefined &&
         (body as Comment).userId!==undefined &&
         (body as Comment).id!==undefined 
}
