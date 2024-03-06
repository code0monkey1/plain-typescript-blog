
// posts collection
import { PostNotFoundError } from "../errors/PostNotFoundError";
import PostModel from "../post/post-model";
import { Post } from "../post/post-types";
import CommentModel from "./comment-model";
import { Comment } from './comment-types';
import { isComment } from "./comment-validators";

const create=async(body:Omit<Comment,'id'>):Promise<Comment>=>{
    
    //create comment
    const comment = await CommentModel.create(body) 

    if(!isComment(comment)) 
        throw new Error("The comment is not of correct type")

    // store commentId reference in post
    const post = await PostModel.findById(body.postId)

    if (!post) throw new PostNotFoundError()
    
    post.comments=post.comments+1
    
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
    
    post.comments=post.comments-1

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