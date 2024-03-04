import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { AuthTokenNotProvidedError } from '../errors/AuthTokenNotProvidedError';
import { getPostBody } from './post-helpers';
import postServices from './post-service';
import { ZPostSchema } from './post-validator';

const createPost=async(req:Request,res:Response)=>{

      try{

            console.log("Got to post controller")
            //validate the request body
             ZPostSchema.parse(req.body)
             

             const post= await postServices.create(getPostBody(req.body,req.userId!))
            
             res.json(post)
         
      }catch(e){ 

            console.log("Error handler reached")
            
            if (e instanceof ZodError) {
               const errors = e.errors.map((error) => ({
                        [error.path[0]]: error.message
                  }));
            return  res.json(errors)
            }
            
            let message = ""
            if (e instanceof Error) 
                  message=e.message
            
            console.log("Error handler reached")
            res.status(401).json({"error":message})
      }

}


const deletePostById =async(req:Request,res:Response)=>{


      try{  

            //verify if the user is the same 
            const post = await postServices.getOne(req.params.id)
      
            if(!post) throw new Error("Post does not exist")
      
            if(!(post.userId.toString()===req.userId))
                   throw new Error("Unauthorized User")

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

const patchPostById = async(req:Request,res:Response)=>{

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


const getPostById=async(req:Request,res:Response)=>{


      const post = await postServices.getOne(req.params.id)


      if(!post) return res.status(404).end()

      
      res.json(post)

}


const getAllPosts=async(_req:Request,res:Response)=>{
      
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