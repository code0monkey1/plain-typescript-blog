
// posts collection
import PostModel from "../post/post-model";
import { Post } from "../post/post-types";
import CommentModel from "./comment-model";
import { Comment } from './comment-types';


const create=async(body:Omit<Comment,'id'>):Promise<Comment>=>{
    
    //create comment
    const response = await CommentModel.create(body) as any & {_id:string}


    const comment:Comment ={
      postId:body.postId,
      content:body.content,
      id:response._id
    }
    
    // store comment reference in post

    const post = await PostModel.findById(body.postId)

    if (!post) throw new Error('Post not found');
    
    post.comments=post.comments.concat(comment.id)
    await post.save()

    return comment
    
}

const deleteComment=async(id:string)=>{

    const comment = await CommentModel.findById(id) as Comment;

    if (!comment) {
        throw new Error("Comment not found");
    }

    const post = await PostModel.findById(comment.postId);

    if (!post) {
        throw new Error("Post not found");
    }

    await CommentModel.findByIdAndDelete(id);

    const index = post.comments.indexOf(id);
    
    if (index > -1) {
        post.comments.splice(index, 1);
    }

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