// import { Post } from "./post-types";

import { Post } from "./post-types"


export const getPostBody=(body:any,userId:string):Omit<Post,'id'| 'comments'|'updatedAt'|'createdAt'> =>{

   return{
     subject:body.subject,
      body:body.subject,
      userId
   }

}