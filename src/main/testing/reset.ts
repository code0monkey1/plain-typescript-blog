import express, { Request, Response } from 'express'
import UserModel from '../auth/user/user-model'
import CommentModel from '../comment/comment-model'
import PostModel from '../post/post-model'


const app = express()


app.use('/reset',async(_req:Request,res:Response)=>{

     await CommentModel.deleteMany({})
     await UserModel.deleteMany({})
     await PostModel.deleteMany({})

    res.status(200).send({message:"deleted all Users, Posts and associated Comments"})
})


export default app