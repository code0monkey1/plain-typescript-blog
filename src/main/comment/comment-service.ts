
// posts collection
import { posts } from "../post/post-service"
import { Post } from "../post/post-types"
import { Comment } from "./comment-types"

let id = 0

export let comments =[] as Comment[]

const db={

  create:async(comment:Omit<Comment,'id'>):Promise<Comment>=>{
    
  
   // Simulate a delay of 1 second before pushing the new post
    return await new Promise(resolve => {
        
      setTimeout(() => {
             id+=1
            
            const newComment :Comment  ={id:id+'',...comment}

            comments.push(newComment )

            // also insert it in the posts comments array 
            const postId = comment.postId
            
            const post = posts.find( p=> p.id==postId)

            post?.comments.push(newComment.id)
              
             resolve(newComment)

        }, 1000); // 1 seconds delay
    });

         
  },
  remove:async(id:string):Promise<void>=>{
  
       // Simulate a delay of 1 second before pushing the new post
   return await new Promise(resolve => {
        
        setTimeout(() => {

                  
            const {postId} = comments.find( c => c.id==id)!
            
            comments = comments.filter( c => c.id!==id)

            // also delete it from the post : comments array
        
            const post= (posts.find( p=> p.id==postId)) as Post

            const filteredComments = post.comments.filter( c => c!==id )

        
            const mutatedPosts :Post []= posts.map( p=> p.id==postId? {...p,comments:filteredComments}:p)
            
            //clear all posts
            posts.length=0

            mutatedPosts.forEach( p => posts.push(p))

            resolve()

        }, 1000); // 1 seconds delay
    });
    

  },
  patch:async(id:string,body:Partial<Post>):Promise<void>=>{


       return await new Promise(resolve => {
        setTimeout(() => {
            comments = comments.map( c => id==c.id?{...c,...body}:c)
            resolve()
        }, 1000); // 1 seconds delay
    });

   
  },
  getOne:async(id:string):Promise<Comment|undefined> =>{
    
      return await new Promise(resolve => {
        setTimeout(() => {
        const comment = comments.find(c=> c.id===id)
            resolve(comment)
        }, 1000); // 1 seconds delay
    });

  },
  getAll:async():Promise<Comment[]>=>{

       return await new Promise(resolve => {
        setTimeout(() => {
            resolve(comments);
        }, 1000); // 1 seconds delay
    });
  }
}


const create=(comment:Omit<Comment,'id'>):Promise<Comment>=>{
    
  return db.create(comment)
    
}

const remove=(id:string)=>{

  return  db.remove(id)

}


const patch=(id:string,post:Partial<Post>)=>{
   
  return  db.patch(id,post)
}


const getOne=(id:string):Promise<Comment|undefined>=>{

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