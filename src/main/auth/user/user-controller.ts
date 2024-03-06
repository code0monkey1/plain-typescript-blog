import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import userService from './user-service'

const register = async(req:Request,res:Response)=>{
  
  try{
  
     const registeredUser= await userService.findByEmailId(req.body.email)
     
     if(registeredUser) throw new Error("user already present")

     const passwordHash = await bcrypt.hash(req.body.password,10)

     const userInfo  ={
        name: req.body.name,
        username: req.body.username,
        passwordHash,
        email:req.body.email
      }

      const user = await userService.create(userInfo)

      //return json web token

      const jwtPayload = {
        userId:user.id.toString(),
        username:user.username
      }
    
      console.log("The jwt secret is",process.env.JWT_SECRET)
      
      const token = jwt.sign(jwtPayload,process.env.JWT_SECRET!)

      res.json({token})



    }catch(e){
      
         let message =''
         if (e instanceof Error) message =e.message

         res.json({"error":message})
    }


}

const login =async(req:Request,res:Response)=>{

  try{
      // verify if the user exists , if not , throw error
      
    const registeredUser=await userService.findByEmailId(req.body.email) as any & {_id:string}

    if(!registeredUser)throw new Error("User Not Registered")

    // if exists , verify if the password is same for given username , if no , throw error
    
    const isValidUser = await bcrypt.compare(req.body.password,registeredUser.passwordHash)

    if(!isValidUser) throw new Error("The User Name or Password is invalid")
   
    // if the user is authentic , give the user a jwt  
    
    const jwtPayload = {
      userId:registeredUser._id.toString(),
      username:registeredUser.username
    }
   
    console.log("The jwt secret is",process.env.JWT_SECRET)
    
    const token = jwt.sign(jwtPayload,process.env.JWT_SECRET!)

    res.json({token})

  }catch(e){
    
     let message =''

     if(e instanceof Error) message=e.message

     res.json({"error":message})

  }

}



export default{
  register,
  login
}