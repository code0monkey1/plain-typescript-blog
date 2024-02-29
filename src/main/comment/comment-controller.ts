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

const  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await commentService.deleteComment(id);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
           res.status(404).json({ error: error.message });
        } else {
             res.status(500).json({ error: "Failed to delete comment. Please try again." });
        }
    }
};


const patch=async(req:Request,res:Response,next:NextFunction)=>{
         
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