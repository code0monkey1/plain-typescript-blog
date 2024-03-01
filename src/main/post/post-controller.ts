import { NextFunction, Request, Response } from 'express';

import postServices from './post-service';
import { Post } from './post-types';
declare module 'express' {
  interface Request {
    userId?: string;
  }
}
const createPost=async(req:Request,res:Response)=>{

    
      try{

            const postBody:Omit<Post,'id'> ={
                  subject: req.body.subject,
                  body: req.body.body,
                  comments: [],
                  userId: req.userId!
            }

            console.log("The post body is",JSON.stringify(postBody,null,4))

             const post= await postServices.create( postBody)
               
             res.json(post)
      
      
      }catch(e){ 

            let message = ""
            if (e instanceof Error) message=e.message

            res.json({"error":message})

      }

}


const deletePostById =async(req:Request,res:Response,next:NextFunction)=>{


      try{  

            
            //verify if the user is the same 
            const post = await postServices.getOne(req.params.id)
      
            if(!post) throw new Error("Post does not exist")

            console.log("The post is",JSON.stringify(post,null,2))
      
            if(!(post.userId.toString()===req.userId))throw new Error("Unauthorized User")

            //delete post
            await postServices.deletePost(req.params.id)
            
            // delete comments associated with post
            res.end()

      }
      catch(e){
            let message =''

            if(e instanceof Error) message = e.message
            
            res.send({error:message})
      }


}

const patchPostById = async(req:Request,res:Response,next:NextFunction)=>{

      try{ 

            await postServices.patch(req.params.id,req.body)
           
            res.end()

      }
      catch(e){
            let message =''

            if(e instanceof Error) message = e.message
            
            res.send({error:message})
      }

      
}


const getPostById=async(req:Request,res:Response,next:NextFunction)=>{


      const post = await postServices.getOne(req.params.id)


      if(!post) return res.status(404).end()

      
      res.json(post)

}


const getAllPosts=async(_req:Request,res:Response,next:NextFunction)=>{
      
      const posts =await postServices.getAll()
      
      res.json(posts)

}



export default {
  createPost,
  deletePostById,
  patchPostById,
  getPostById,
  getAllPosts
}