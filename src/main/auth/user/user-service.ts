import UserModel from "./user-model"
import { User } from "./user-types"

const findByEmailId=async(email:string):Promise<User> =>{

       const user= await UserModel.findOne({email}) as User

       return user
    
}

const create =async(userInfo:User):Promise<User> =>{
  
    const user = await UserModel.create(userInfo) as any & User

    return user

}

const findById = async(id:string):Promise<User> => {

      const user = await UserModel.findById({id}) as User

      return user
}



export default {
   findByEmailId,
   findById,
   create
}