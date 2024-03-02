import { Request, Response } from "express";
import commentService from "./comment-service";

 const create =async(req:Request,res:Response)=>{
      
    try{
        
       const comment = await commentService.create({...req.body,userId:req.userId})
  
       res.json(comment)

    }catch(e){
        let message =""

        if(e instanceof Error)message=e.message

        res.json({error:message})
    }

}

const getAll =async(_req:Request,res:Response)=>{
    
        try{

            const comments = await commentService.getAll()

            res.json(comments)
        
        }catch(e){
            let message =""

            if(e instanceof Error)message=e.message

            res.json({error:message})
        }
}

const getOne =async(req:Request,res:Response)=>{
  
       try{

            const comment = await commentService.getOne(req.params.id)

            return res.json(comment)
            
       }catch(e){
            let message =""

            if(e instanceof Error)message=e.message

            res.json({error:message})
        }

}

const  deleteComment = async (req: Request, res: Response) => {
        
        try {
                const id = req.params.id;

                const comment = await commentService.getOne(req.params.id)
        
                if(!comment) throw new Error("Post does not exist")

                console.log("The comment is",JSON.stringify(comment,null,2))
        
                if(!(comment.userId.toString()===req.userId))
                    throw new Error("Unauthorized User")


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

const patch=async(req:Request,res:Response)=>{

       try{  
    

            const comment = await commentService.getOne(req.params.id)
        
            if(!comment) throw new Error("Comment does not exist")

            await commentService.patch(req.params.id,req.body)

            res.end()
            
       }catch(e){
        
            let message =""

            if(e instanceof Error)message=e.message

            res.json({error:message})
    }

}

export default { 
 create,
 getAll,
 getOne,
 deleteComment,
 patch
}