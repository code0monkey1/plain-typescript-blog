import { Request, Response } from "express";
import { ZodErrorCapturer } from "../../utils/error-capture";
import { CreateCommentValidationError } from "../errors/CreateCommentValidationError";
import { UnauthorizedUserError } from "../errors/UnauthorizedUserError";
import commentService from "./comment-service";
import { ZCommentSchema } from "./comment-validators";

 const create =async(req:Request,res:Response)=>{
      
       try{
           ZCommentSchema.parse(req.body)
           
      }catch(e){
         throw new CreateCommentValidationError( new ZodErrorCapturer().getErrors(e))
      }

       const comment = await commentService.create({...req.body,userId:req.userId})
  
       res.json(comment)

}

const getAll =async(_req:Request,res:Response)=>{
    


            const comments = await commentService.getAll()

            res.json(comments)
        
}

const getOne =async(req:Request,res:Response)=>{
  


            const comment = await commentService.getOne(req.params.id)

            return res.json(comment)
            
    

}

const  deleteComment = async (req: Request, res: Response) => {
        
  
                const id = req.params.id;

                const comment = await commentService.getOne(req.params.id)
        
                if(!comment) throw new Error("Post does not exist")

                console.log("The comment is",JSON.stringify(comment,null,2))
        
                if(!(comment.userId.toString()===req.userId))
                      throw  new UnauthorizedUserError()


                await commentService.deleteComment(id);
                
                res.json({ message: "Comment deleted successfully" });
    
};

const patch=async(req:Request,res:Response)=>{



            const comment = await commentService.getOne(req.params.id)
        
            if(!comment) throw new Error("Comment does not exist")

            await commentService.patch(req.params.id,req.body)

            res.end()
            
  

}

export default { 
 create,
 getAll,
 getOne,
 deleteComment,
 patch
}