import { NextFunction, Request, Response } from "express"

import { posts } from "../post/post-controller"
import { Post } from "../post/post-types"
import { Comment } from "./comment-types"

let id = 0

export let comments =[] as Comment[]

 const create =(req:Request,res:Response,next:NextFunction)=>{
      
       id+=1
       
       const comment :Comment  ={id:id+'',...req.body }

       comments.push(comment )

       // also insert it in the posts comments array 
       const postId = req.body.postId
       
       const post = posts.find( p=> p.id==postId)

       post?.comments.push(comment.id)

         
       res.json(comment)

}

const getAll =(_req:Request,res:Response,next:NextFunction)=>{

      res.json(comments)
}

const getOne =(req:Request,res:Response,next:NextFunction)=>{


      const comment = comments.find( c => c.id==req.params.id )


      if(!comment) return res.status(404).end()
      
      return res.json(comment)

}

const remove =(req:Request,res:Response,next:NextFunction)=>{
       
       const {postId} = comments.find( c => c.id==req.params.id)!
      
       comments = comments.filter( c => c.id!==req.params.id)

      // also delete it from the post : comments array
  
       const post= (posts.find( p=> p.id==postId)) as Post

       const filteredComments = post.comments.filter( c => c!==req.params.id )

  
       const mutatedPosts :Post []= posts.map( p=> p.id==postId? {...p,comments:filteredComments}:p)
       
       //clear all posts
       posts.length=0

       mutatedPosts.forEach( p => posts.push(p))
      
      res.end()

}

const patch=(req:Request,res:Response,next:NextFunction)=>{
         
      const body = req.body

      comments = comments.map( c => req.params.id==c.id?{...c,...body}:c)

      res.end()

}


export default { 
 create,
 getAll,
 getOne,
 remove,
 patch
}