import { Request, Response } from "express";
import { ZodErrorCapturer } from "../../utils/error-capture";
import { paginationConfig } from "../config/pagination";
import { UnauthorizedUserError } from "../errors/UnauthorizedUserError";
import { ValidationError } from "../errors/ValidationError";
import CommentModel from "./comment-model";
import commentService from "./comment-service";
import { ZCommentSchema, ZUpdateCommentSchema } from "./comment-validators";
import { CommentNotFoundError } from "./errors/CommentNotFoundError";
import { mapCollection } from "./utils";


 const create =async(req:Request,res:Response)=>{
      
       try{
           ZCommentSchema.parse(req.body)
           
      }catch(e){
         throw new ValidationError( new ZodErrorCapturer().getErrors(e))
      }

       const comment = await commentService.create({...req.body,userId:req.userId})
  
       res.json({id:comment.id})

}


const getOne =async(req:Request,res:Response)=>{
  


            const comment = await commentService.getOne(req.params.id)

            return res.json(comment)
            
    

}

const  deleteComment = async (req: Request, res: Response) => {
        
  
                const id = req.params.id;

                const comment = await commentService.getOne(req.params.id)
        
                if(!comment)  throw new CommentNotFoundError()

        
                if(!(comment.userId.toString()===req.userId))
                      throw  new UnauthorizedUserError()


                await commentService.deleteComment(id);
                
                res.json({ message: "Comment deleted successfully" });
    
};


 const getLatestCommentsByPostId = async(req:Request,res:Response)=>{
           
            const {postId}= req.params
            
            const { page = 1 } = req.query;
               
             const {  paginationLimit } = paginationConfig
                  // Paginate comments for a specific post
      
            const options = {
                        page: page,
                        limit: paginationLimit,
                        sort: { createdAt: -1 }, // Sort comments by createdAt date in descending order
                        };
 
            let result= await CommentModel.paginate({ postId }, options)!;

            result.data = mapCollection(result.docs)

           //delete the docs array
            delete result.docs;
            
            res.json(result)
      }


const patch=async(req:Request,res:Response)=>{

            try{
                  ZUpdateCommentSchema.parse(req.body)
                  
            }catch(e){
                  
               throw new ValidationError( new ZodErrorCapturer().getErrors(e))
            }


            const comment = await commentService.getOne(req.params.id)
        
            if(!comment) throw new CommentNotFoundError()

           const updatedComment= await commentService.patch(req.params.id,req.body)

            res.json(updatedComment)
            
  
}

export default { 
 create,
 getOne,
 getLatestCommentsByPostId,
 deleteComment,
 patch
}