
import PostModel from "./post-model";
import { Post } from './post-types';

const db={

  create:async(body:Omit<Post,'id'>):Promise<Post>=>{

    return await PostModel.create(body)
         
  },
  remove:async(id:string):Promise<void>=>{
  
  
    return   await PostModel.findByIdAndDelete(id)

  },
  patch:async(id:string,body:Partial<Post>):Promise<void>=>{

    await PostModel.findByIdAndUpdate(id, body, { new: true })
    
   
  },
  getOne:async(id:string):Promise<Post|undefined> =>{

   return await PostModel.findById(id)
    

  },
  getAll:async():Promise<Post[]>=>{

      return await PostModel.find({})

      
  }
}


const create=(post:Omit<Post,'id'>):Promise<Post>=>{
    
  return db.create(post)
    
}

const remove=(id:string)=>{

  return  db.remove(id)

}


const patch=(id:string,post:Partial<Post>)=>{
   
  return  db.patch(id,post)
}


const getOne=(id:string):Promise<Post|undefined>=>{

  return   db.getOne(id)
 
}

const getAll=()=>{
 
 return db.getAll()

}

export default {
  create,
  remove,
  patch,
  getOne,
  getAll
}