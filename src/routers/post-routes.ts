import express, { NextFunction, Request, Response } from 'express'
import { Post } from '../types/post'

const router = express.Router()

let id = 0

let posts =[] as Post[]

router.post('/posts',(req:Request,res:Response,next:NextFunction)=>{
      
      
       console.log("post creation endpoint reached",JSON.stringify(req.body,null,2))
      
       id+=1
       
       const post ={id,...req.body }

       posts.push(post )
         
       res.json(post)

})

router.get('/posts',(_req:Request,res:Response,next:NextFunction)=>{

      res.json(posts)
})

router.get('posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = parseInt(req.params.id)

      const post = posts.find( p => p.id==id )


      if(!post) return res.status(404).end()
      
      return res.json(post)

})

router.delete('/posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = parseInt(req.params.id)

      posts = posts.filter( p => p.id!==id )
     
      res.end()

})


router.patch('/posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = parseInt(req.params.id)
       
      const body :Partial<Post> = req.body

      posts = posts.map( p => id==p.id?{...p,...body}:p)
     
      res.end()

})

export default router
