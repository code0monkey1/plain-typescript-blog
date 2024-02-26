import express, { NextFunction, Request, Response } from 'express'
import { comments } from '../comment/comment-routes'


export type Post ={
    id:string,
    subject:string,
    body:string,
    comments: string [] 
}

const router = express.Router()

let id = 0

export let posts =[] as Post[]

router.post('/posts',(req:Request,res:Response,next:NextFunction)=>{
      
      
       console.log("post creation endpoint reached",JSON.stringify(req.body,null,2))
      
       id+=1
       
       const post :Post ={id:id+'',...req.body ,comments:[]}

       posts.push(post )
         
       res.json(post)

})

router.get('/posts',(_req:Request,res:Response,next:NextFunction)=>{

      res.json(posts)

      // you need to populate the comments too
})

router.get('posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = req.params.id

      const post = posts.find( p => p.id==id )


      if(!post) return res.status(404).end()

      // you need to populate the comments too
      
      return res.json(post)

})

router.delete('/posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = (req.params.id)

      const postComments:Comment[] = posts.find(p => p.id===id)!.comments
      

      posts = posts.filter( p => p.id!==id )

      // you need to delete the associated comments too


      comments.length=0
      
     //remove all comments with postComment id from Comments array
     

      res.end()

})


router.patch('/posts/:id',(req:Request,res:Response,next:NextFunction)=>{
      
      const id = req.params.id
       
      const body  = req.body

      posts = posts.map( p => id==p.id?{...p,...body}:p)
     
      res.end()

})

export default router
