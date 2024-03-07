import express, { Request, Response } from 'express'
import UserModel from '../auth/user/user-model'
import CommentModel from '../comment/comment-model'
import PostModel from '../post/post-model'


const route = express.Router()


route.post('/reset',async(_req:Request,res:Response)=>{

     await CommentModel.deleteMany({})
     await UserModel.deleteMany({})
     await PostModel.deleteMany({})

    res.status(200).send({message:"Deleted all Users, Posts and Comments"})
    
})


export default route