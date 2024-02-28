import { NextFunction, Request, Response } from 'express';
import postServices from './post-service';


const createPost=async(req:Request,res:Response,next:NextFunction)=>{
      
       const post= await postServices.create(req.body)
         
       res.json(post)

}


const deletePostById =async(req:Request,res:Response,next:NextFunction)=>{
      
     await postServices.remove(req.params.id)
     
     res.end()

}

const patchPostById = async(req:Request,res:Response,next:NextFunction)=>{
      
      await postServices.patch(req.params.id,req.body)
     
      res.end()
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