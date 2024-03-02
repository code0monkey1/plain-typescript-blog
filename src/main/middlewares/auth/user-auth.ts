import { NextFunction, Request, Response } from "express";
import middlewareHelper from '../helper';

const userAuth=async(req:Request,res:Response,next:NextFunction)=>{

   try{

      const decodedToken = await middlewareHelper.getDecodedToken(req)
   
      req.userId = decodedToken.userId

      if(!req.userId)return res.status(401).send({error:'token is invalid'})
      
   }
   catch(e:unknown){

       let message=''

       if(e instanceof Error) message=e.message

      return res.json({"Error":message})
   }


   next()
}


export default userAuth