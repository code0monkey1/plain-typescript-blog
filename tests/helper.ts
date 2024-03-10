import CommentModel from "../src/main/comment/comment-model";
import { Comment } from "../src/main/comment/comment-types";
import PostModel from "../src/main/post/post-model";
import { Post } from "../src/main/post/post-types";

export const initialPosts:Omit<Post,'id'|'comments'|'createdAt'|'updatedAt'> []=[
    {
      body:"a",
      subject:"s1",
      userId:"65e587aa491c70c47fae49d1",
    },
      {
      body:"b",
      subject:"s2",
      userId:"65e587aa491c70c47fae49d1",
    },
      {
      body:"c",
      subject:"s3",
       userId:"65e587aa491c70c47fae49d1",
    }
  ]


  const someUserInfo={
    
     user : {
          name:"some_name",
          username:"some_username",
          email:"some_email@gmail.com",
          password:"some_password"
        },

      userId:"65e587aa491c70c47fae49d1",

       token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODdhYTQ5MWM3MGM0N2ZhZTQ5ZDEiLCJ1c2VybmFtZSI6InNvbWVfdXNlcm5hbWUiLCJpYXQiOjE3MDk1NDEzODl9.geaEYzY-jtEg5y7zU5pvz9InlZOSDgxYymzVVr269GY"
  }


  export const getPostsInDb=async()=>{

       const posts= await PostModel.find({})

       return posts.map( (p:any) => p.toJSON())
  }

    export const getCommentsInDb=async()=>{

       const comments= await CommentModel.find({})

       return comments.map( (c:any) => c.toJSON())
  }


  const otherUserInfo={

       user:{
            username: "some_other_username",
            name: "some_other_name",
            email: "some_other_email@gmail.com",
            id : "65e58956491c70c47fae49d8"
        }, 
        
        userId: "65e58956491c70c47fae49d8",
        
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODk1NjQ5MWM3MGM0N2ZhZTQ5ZDgiLCJ1c2VybmFtZSI6InNvbWVfb3RoZXJfdXNlcm5hbWUiLCJpYXQiOjE3MDk1NDE4MTd9.a-Rn-QjAcPecVn2zrgxlr5Mj2-zRBOAp6geVxicwa9Q"
    
  }

  const nonExistingId = async () => {
  const post = new PostModel({body:"b",subject:"sub"})
  await post.save()
  await post.deleteOne()

  return post._id.toString()
}


const initialComments:Omit<Comment,'id'|'postId'>[]=[
    {
      
      content:'some_content',
      userId:"65e587aa491c70c47fae49d1",

    },
    {
      
      content:'other_content',
      userId:"65e587aa491c70c47fae49d1",

    }

]

  export const getInvalidToken=()=>"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ODAyMTEwNmM5OTM0ZWE2MjUwMjMiLCJ1c2VybmFtZSI6InNrZCIsImlhdCI6MTcwOTUzOTM2N30.sdsXf_CgGzozF1VrwNXWXjE96mEFIkN_UmdC3ApKfk"


   export const createCommentsUsingPostIdAndUserId=async(userId:string,postId:string)=>{

      let result = initialComments.map( c => new CommentModel({...c,userId,postId})).map(c => c.save())
      
      await Promise.all( result)

      return result

   }

   export const initializeComments=async()=>{
    await PostModel.deleteMany({});
    await PostModel.insertMany(initialPosts.slice(0,2));


    await CommentModel.deleteMany({});
   }

   export const assertCommentAdded=async(commentsInDbBefore:any[],newCommentContent:string)=>{
       
     const commentsInDbAfter = await getCommentsInDb()

      expect(commentsInDbAfter.length).toBe(commentsInDbBefore.length+1)
     
      expect(commentsInDbAfter.map( c => c.content)).toContain(newCommentContent)
    
   }

   export const assertCommentWasDeleted=async(commentsInDbBefore:any[], commentBeingDeleted:Comment)=>{
   
         const commentsInDbAfter = await getCommentsInDb()

         const postCountCommentAfter = (await getPostsInDb())[0].comments

        expect(commentsInDbAfter.length).toBe(commentsInDbBefore.length-1)

        const commentContents = commentsInDbAfter.map(c => c.content)

        expect(commentContents).not.toContain(commentBeingDeleted.content)

   }

   export const assertPostCommentsCountWasReducedByOne=async(parentPost:Post)=>{

        const commentsCountBefore = parentPost.comments
      
        const {comments:commentsCountAfter} = (await PostModel.findById(parentPost.id))

        expect(commentsCountAfter).toBe(commentsCountBefore-1)
   }

  export  const getPostIdAndAutToken=async()=>{

     const posts = await getPostsInDb();
     const postId = posts[0].id
     const token = someUserInfo.token

     return {postId,token}

   }

   export const assertContentIsInCommentsDb =async(content:string)=>{
         
         const contentsDbEntries = await CommentModel.find({})

         expect(contentsDbEntries.map( c => c.content)).toContain(content)
   }

  export const assertContentsAreInCommentsDb=async(contents:string[])=>{
       
   await Promise.all(contents.map(content => assertContentIsInCommentsDb(content)));

    const contentsDbEntries = await CommentModel.find({})
    
    expect(initialComments.length).toBe(contentsDbEntries.length)

  }
  export default {
    initialPosts,
    getInvalidToken,
    someUserInfo,
    otherUserInfo,
    getPostsInDb,
    getCommentsInDb,
    nonExistingId,
    initialComments,
    assertCommentAdded, 
    assertCommentWasDeleted,
    assertContentsAreInCommentsDb, 
    assertPostCommentsCountWasReducedByOne,
    createCommentsUsingPostIdAndUserId,
    getPostIdAndAutToken,
    initializeComments
  }