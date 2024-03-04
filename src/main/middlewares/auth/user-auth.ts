import { NextFunction, Request, Response } from "express";
import { AuthTokenNotProvidedError } from "../../errors/AuthTokenNotProvidedError";
import middlewareHelper from '../helper';

const userAuth=async(req:Request,res:Response,next:NextFunction)=>{

   try{
      console.log("user auth")
      const decodedToken = await middlewareHelper.getDecodedToken(req)
   
      req.userId = decodedToken.userId

      if(!req.userId)return res.status(401).send({error:'token is invalid'})
      console.log("Ended user auth")
   }
   catch(e:unknown){
      
      if(e instanceof AuthTokenNotProvidedError){
         return res.status(401).json({error:e.message})
      }
       let message=''

       if(e instanceof Error) message=e.message

      return res.json({"Error":message})
   }

  next()

}


export default userAuth