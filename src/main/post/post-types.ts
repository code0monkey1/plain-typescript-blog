import { ZPostType } from "./post-validator"


export type Post ={
    id:string,
    subject:string,
    body:string,
    comments: string [] 
    userId:string
}


export type TUpdatePost =  Partial<ZPostType>



