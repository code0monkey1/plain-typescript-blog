import { NextFunction, Request, Response } from "express";

import middlewareHelper from '../helper';

const userAuth=async(req:Request,res:Response,next:NextFunction)=>{
     
   try{
     
      console.log("user auth")
      const decodedToken = await middlewareHelper.getDecodedToken(req)
   
      req.userId = decodedToken.userId

      if(!req.userId)return res.status(401).send({error:'token is invalid'})
      console.log("Ended user auth")
   }
   catch(e){
        
      next(e)
   }

      next()
}
 



export default userAuth