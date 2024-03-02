import { Request } from 'express';
import jwt from 'jsonwebtoken';

type Token={
  userId:string,
  username:string
}

export const getTokenFrom = (request:Request) =>{
        
 
    const authorization = request.get('authorization')

    console.log("The authorization is ",authorization)
    // will be null if no authorization , if not then check if it starts with bearer 
    // is so, return the token
   if(authorization && authorization.toLowerCase().startsWith('bearer ')){

      return authorization.substring(7)
   }

   return null

}


const getDecodedToken =(request:any):Token=>{

    const token =  getTokenFrom(request)

    if(!token) throw new Error("token is missing")
    
    const decodedToken =  jwt.verify(token,process.env.JWT_SECRET!) as Token
   
    if(!token || !decodedToken.userId!) throw new Error("token is invalid")
    
    return decodedToken
}


export default {
  getDecodedToken
}