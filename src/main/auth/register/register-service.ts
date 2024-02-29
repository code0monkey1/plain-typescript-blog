import UserModel from "./register-model"
import { User } from "./register-types"

const findByUsername=async(username:string):Promise<User> =>{

       const user= await UserModel.findOne({username}) as User

       return user
    
}

const create =async(userInfo:User):Promise<User> =>{
  
    const user = await UserModel.create(userInfo) as any & User

    return user

}



export default {
   findByUsername,
   create
}