import { NextFunction, Request, Response } from "express"
import commentService from "./comment-service"

 const create =async(req:Request,res:Response,next:NextFunction)=>{
      
      const comment = await commentService.create(req.body)

      res.json(comment)

}

const getAll =async(_req:Request,res:Response,next:NextFunction)=>{

      const comments = await commentService.getAll()

      res.json(comments)
}

const getOne =async(req:Request,res:Response,next:NextFunction)=>{

       const comment = await commentService.getOne(req.params.id)
    
       return res.json(comment)

}

const remove =async(req:Request,res:Response,next:NextFunction)=>{
       
       await commentService.remove(req.params.id)


       res.end()
}

const patch=async(req:Request,res:Response,next:NextFunction)=>{
         
       await commentService.patch(req.params.id,req.body)

       res.end()

}


export default { 
 create,
 getAll,
 getOne,
 remove,
 patch
}