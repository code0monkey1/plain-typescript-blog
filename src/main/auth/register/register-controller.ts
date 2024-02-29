import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import registerService from './register-service'
import { User } from './register-types'

const register = async(req:Request,res:Response)=>{
  
  try{
  
     const registeredUser= await registerService.findByUsername(req.body.username)
     
     if(registeredUser) throw new Error("user already present")

      const passwordHash = await bcrypt.hash(req.body.password,10)

      const userInfo :User ={
        name: req.body.name,
        username: req.body.username,
        passwordHash
      }

      const user=  await registerService.create(userInfo)

      res.json({user})


    }catch(e){
      
         let message =''
         if (e instanceof Error) message =e.message

         res.json({"error":message})
    }


}

export default {
  register
}