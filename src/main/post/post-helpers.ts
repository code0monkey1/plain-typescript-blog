import { Post } from "./post-types";

export const getPostBody=(body:any,userId:string):Omit<Post,'id'| 'comments'> =>{

   return{
     subject:body.subject,
      body:body.subject,
      userId
   }

}