// import { Post } from "./post-types";

import { ZPostType } from "./post-validator"

export const getPostBody=(body:any,userId:string):Omit<ZPostType,'id'| 'comments'> =>{

   return{
     subject:body.subject,
      body:body.subject,
      userId
   }

}