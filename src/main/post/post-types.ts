import { ZPostType } from "./post-validator"

export type Post ={
    id:string,
    subject:string,
    body:string,
    comments: number 
    userId:string,
    updatedAt:Date,
    createdAt:Date,
}

export type TUpdatePost =  Partial<ZPostType>



