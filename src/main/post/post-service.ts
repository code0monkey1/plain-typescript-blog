
// posts collection

import { comments } from "../comment/comment-controller"
import { Post } from "./post-types"

let id = 0

let posts =[] as Post[]

const db={

  create:async(post:Omit<Post,'id'>):Promise<Post>=>{
    
    id+=1
       
    const newPost :Post ={id:id+'',...post ,comments:[]}

   // Simulate a delay of 1 second before pushing the new post
    return await new Promise(resolve => {
        setTimeout(() => {
            posts.push(newPost);
            resolve(newPost);
        }, 1000); // 1 seconds delay
    });

         
  },
  remove:async(id:string):Promise<void>=>{
  
       // Simulate a delay of 1 second before pushing the new post
   return await new Promise(resolve => {
        
        setTimeout(() => {

             const  deletedPostCommentsIds = posts.find( p=> p.id===id)!.comments
      
              //delete the post
              posts = posts.filter( p => p.id!==id )

              // you need to delete the associated comments too
              const filteredComments = comments.filter( c =>  !deletedPostCommentsIds.some( d => c.id==d))

              comments.length=0
              
            //populate filtered comments
            filteredComments.forEach( c => comments.push(c))
            resolve()
        }, 1000); // 1 seconds delay
    });
    

  },
  patch:async(id:string,body:Partial<Post>):Promise<void>=>{


       return await new Promise(resolve => {
        setTimeout(() => {
            posts = posts.map( p => id==p.id?{...p,...body}:p)
            resolve()
        }, 1000); // 1 seconds delay
    });

   
  },
  getOne:async(id:string):Promise<Post|undefined> =>{
    
      return await new Promise(resolve => {
        setTimeout(() => {
            const post = posts.find(p => p.id===id)
            resolve(post)
        }, 1000); // 1 seconds delay
    });

  },
  getAll:async():Promise<Post[]>=>{

       return await new Promise(resolve => {
        setTimeout(() => {
            resolve(posts);
        }, 1000); // 1 seconds delay
    });
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