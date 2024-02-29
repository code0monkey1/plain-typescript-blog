
import CommentModel from "../comment/comment-model";
import PostModel from "./post-model";
import { Post } from './post-types';

const create=async(body:Omit<Post,'id'>):Promise<Post>=>{
    
  return await PostModel.create(body)
    
}

const deletePost=async(id:string)=>{

    //delete all  associated comments 
    await CommentModel.deleteMany({ postId:id });
  
    return   await PostModel.findByIdAndDelete(id)

}


const patch=async(id:string,body:Partial<Post>)=>{
   
    await PostModel.findByIdAndUpdate(id, body, { new: true })
}


const getOne=async (id:string):Promise<Post|undefined>=>{

     return await PostModel.findById(id)
 
}

const getAll=async()=>{
 
 return await PostModel.find({})

}

export default {
  create,
  deletePost,
  patch,
  getOne,
  getAll
}