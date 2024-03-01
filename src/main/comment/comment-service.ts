
// posts collection
import PostModel from "../post/post-model";
import { Post } from "../post/post-types";
import CommentModel from "./comment-model";
import { Comment } from './comment-types';

const isComment=(body:unknown) :body is Comment=>{
    
  return (body as Comment).postId!==undefined &&
         (body as Comment).content!==undefined &&
         (body as Comment).userId!==undefined &&
         (body as Comment).id!==undefined 
}

const create=async(body:Omit<Comment,'id'>):Promise<Comment>=>{
    
    //create comment
    const comment = await CommentModel.create(body) 

    if(!isComment(comment)) 
        throw new Error("The comment is not of correct type")

    // store commentId reference in post
    const post = await PostModel.findById(body.postId)

    if (!post) throw new Error('Post not found');
    
    post.comments=post.comments.concat(comment.id)
    await post.save()

    return comment
    
}

const deleteComment=async(id:string)=>{

    const comment = await CommentModel.findById(id) as Comment;

    if (!comment)  throw new Error("Comment not found");

    // delete comment reference from respective post
    const post = await PostModel.findById(comment.postId);

    if (!post) throw new Error("Post not found");
    
    await CommentModel.findByIdAndDelete(id);

    const index = post.comments.indexOf(id);
    
    if (index > -1)  post.comments.splice(index, 1);
    else throw new Error("Comment does not belong to the Post")

    await post.save();

}


const patch=async(id:string,body:Partial<Post>)=>{
   
  return  await CommentModel.findByIdAndUpdate(id, body, { new: true })
}


const getOne=async(id:string):Promise<Comment|null>=>{

    return await CommentModel.findById(id)
 
}

const getAll=async()=>{
 
 return await CommentModel.find({})

}

export default {
  create,
  deleteComment,
  patch,
  getOne,
  getAll
}