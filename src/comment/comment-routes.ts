import express, { NextFunction, Request, Response } from 'express'
import { Post, posts } from '../post/post-routes'
import { Comment } from './comment-types'

const router = express.Router()

let id = 0

export let comments =[] as Comment[]



router.post('/comments',(req:Request,res:Response,next:NextFunction)=>{
      
       console.log("comment creation endpoint reached",JSON.stringify(req.body,null,2))
      
       id+=1
       
       const comment :Comment  ={id:id+'',...req.body }

       comments.push(comment )

       // also insert it in the posts comments array 
       const postId = req.body.postId
       
       const post = posts.find( p=> p.id==postId)

       post?.comments.push(comment.id)
       

       console.log("The new comment is",JSON.stringify(comment,null,2))

       console.log("The posts are",JSON.stringify(posts,null,2))
         
       res.json(comment)

})

router.get('/comments',(_req:Request,res:Response,next:NextFunction)=>{

      res.json(comments)
})

router.get('/comments/:id',(req:Request,res:Response,next:NextFunction)=>{


      const comment = comments.find( c => c.id==req.params.id )


      if(!comment) return res.status(404).end()
      
      return res.json(comment)

})

router.delete('/comments/:id',(req:Request,res:Response,next:NextFunction)=>{
       
       const {postId} = comments.find( c => c.id==req.params.id)!
      
       comments = comments.filter( c => c.id!==req.params.id)

      // also delete it from the post : comments array
      
       console.log("The posts are",JSON.stringify(posts,null,2))
       console.log("The postId is",postId)

       const post= (posts.find( p=> p.id==postId)) as Post

       console.log("The post is",JSON.stringify(post,null,2))

       const filteredComments = post.comments.filter( c => c!==req.params.id )

       console.log("The filteredComments are ",JSON.stringify(filteredComments,null,2))
       
       const mutatedPosts :Post []= posts.map( p=> p.id==postId? {...p,comments:filteredComments}:p)
       
       //clear all posts
       posts.length=0

       mutatedPosts.forEach( p => posts.push(p))
      
       console.log("The posts array is",JSON.stringify(posts,null,2))
     
      res.end()

})


router.patch('/comments/:id',(req:Request,res:Response,next:NextFunction)=>{
         
      
      const body = req.body

      comments = comments.map( c => req.params.id==c.id?{...c,...body}:c)

      res.end()

})



export default router
