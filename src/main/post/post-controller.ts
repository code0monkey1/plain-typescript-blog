import { Request, Response } from 'express';
import { getPostBody } from './post-helpers';
import postServices from './post-service';

const createPost=async(req:Request,res:Response)=>{

      try{
            
             const post= await postServices.create(getPostBody(req.body,req.userId!))
               
             res.json(post)
         
      }catch(e){ 

            let message = ""
            if (e instanceof Error) message=e.message

            res.json({"error":message})

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