import supertest from "supertest";
import app from '../../src/app';
import PostModel from "../../src/main/post/post-model";
import Database from '../../src/utils/db';
import { default as helper, default as postHelper } from "./post.helper";

const api = supertest(app)

const postUrl="/api/v1/posts"

describe('POST', () => {

      beforeAll(async () => {
         await Database.connect()
      });

      afterAll(async () => {
        await Database.disconnect()
      });
  
      beforeEach(async () => {
      
        // delete all notes 
        await PostModel.deleteMany({}) 
      
        // saved all notes synchronously 
        for( let post of helper.initialPosts ){
                const newPost = new PostModel(post)
                await newPost.save()
          }
      
      })

  describe('POST /post ', () => {
    
    //post is created when token is present
   
    // post is not created with token is not present
   
    // post in not created when invalid token is present
  })



  // 2. Update

  // user is updated when provided a valid token with authenticated user

 // post is not updated when token is not present

 // post is not updated when user is not authorized

 // post is not updated when auth token is invalid


 // 3. Delete

  // user is deleted when provided a valid token with authenticated user

 // post is not deleted when token is not present

 // post is not deleted when user is not authorized

 // post is not deleted when auth token is invalid



 // 4. GetOne

  // you get proper message when post is not present

  // you get the post when id is provided and post is present


  describe('GET /posts', () => {
      // you get all the posts

      it('gets all the notes in json format',async()=>{

          await  api
          .get(postUrl)
          .expect(200)
          .expect('Content-Type','application\/json; charset=utf-8')

      })  


      test('all posts are returned',async() => {
        
        const response = await api.get(postUrl)

        expect(response.body).toHaveLength(helper.initialPosts.length)
      })


      test('a specific post is within the returned posts',async() => {
        const response=  await api.get(postUrl)
        const allContent=response.body.map((res:any) => res.body)

        expect(allContent).toContain(postHelper.initialPosts[0].body)
      })

          
    })

  
    } )
