import { Request, Response } from 'express';
import { getPostBody } from './post-helpers';
import postServices from './post-service';
import { ZPostSchema, ZUpdatePostSchema } from './post-validator';

const createPost=async(req:Request,res:Response)=>{

            console.log("Got to post controller")
            //validate the request body
            ZPostSchema.parse(req.body)
             

             const post= await postServices.create(getPostBody(req.body,req.userId!))
            
             res.status(201).json(post)


}


const deletePostById =async(req:Request,res:Response)=>{


            //verify if the user is the same 
            const post = await postServices.getOne(req.params.id)
      
            if(!post) throw new Error("Post does not exist")
      
            if(!(post.userId.toString()===req.userId))
                   throw new Error("Unauthorized User")

            //delete post
            await postServices.deletePost(req.params.id)
            
            // delete comments associated with post
            res.status(204).end()

   
}

const patchPostById = async(req:Request,res:Response)=>{
             
            ZUpdatePostSchema.parse(req.body)
 
            await postServices.patch(req.params.id,req.body)
           
            res.end()

      
}


const getPostById=async(req:Request,res:Response)=>{
           console.log("got to getPostById controller")
          const post = await postServices.getOne(req.params.id)
    
          if(!post) return res.status(404).end()
          console.log("Got post",JSON.stringify(post,null,2))
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