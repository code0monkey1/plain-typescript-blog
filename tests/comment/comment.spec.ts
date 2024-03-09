import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import CommentModel from "../../src/main/comment/comment-model";
import { Comment } from "../../src/main/comment/comment-types";
import PostModel from "../../src/main/post/post-model";
import helper, { getCommentsInDb, getPostsInDb } from "../helper";

const api = supertest(app);


describe('COMMENT', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const COMMENT_URL = '/api/v1/comments';
 

  beforeEach(async () => {
    
    await PostModel.deleteMany({});
    await PostModel.insertMany(helper.initialPosts);
    await CommentModel.deleteMany({});

    //create a post
    const posts = await getPostsInDb();
    const userId = helper.someUserInfo.userId;
    const postId= await posts[0].id
    await CommentModel.insertMany(helper.initialComments.map(c=> ({...c,userId,postId})))

  });
  describe('create-comment', () => {

    it("should create a new comment", async () => {
     
     const posts = await getPostsInDb();
     const postId = posts[0].id

     const result=await api
        .get(COMMENT_URL+`/${postId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
     
      const retrievedContent = result.body.data.map( (d:any) => d.content)

      expect(retrievedContent).toContain(helper.initialComments[0].content)
      
    });

    it("should return 401 error when JWT not provided",async()=>{
    
      const posts = await getPostsInDb();
      const userId = helper.someUserInfo.userId;;

      const comment: Omit<Comment, 'id'> = {
        postId: posts[0].id,
        content: 'myContent',
        userId
      };

      await api
        .post(COMMENT_URL)
        .send(comment)
        .expect(401)


    });
  });

  describe('get-all-comments-by-postId', () => {

    it('should retrieve all the stored comments',async()=>{

      const posts = await getPostsInDb();
      const postId= await posts[0].id

      const commentsInDb = await getCommentsInDb()

      const result= await api
        .get(COMMENT_URL+`/${postId}`)
        .expect(200)
    
      const commentContents = result.body.data.map( (c:any )=> c.content)

      expect(commentContents.length).toBe(commentsInDb.length)
     
      expect(commentContents).toContain(helper.initialComments[0].content)
           
    })

    it('should return a 401 with `malformatted id` in case the postId is invalid',async()=>{

        const invalidPostId = 'abc'
        const expected_error_message ='malformatted id'

       const result = await api
        .get(COMMENT_URL+`/${invalidPostId}`)
        .expect(400)

       expect(result.body.error).toBe(expected_error_message)
      
    })


    it('should return no comments for a userId , which did not create any',async()=>{

       const postsInDb = await getPostsInDb()

       const result = await api
        .get(COMMENT_URL+`/${postsInDb[1].id}`)
        .expect(200)

        expect(result.body.data).toStrictEqual([])
      
    })
    
  })

  describe('update-comment', () => {

    it('should return validation-error , when the comment update body is invalid',async()=>{
      
        // arrange
        const commentsInDb = await getCommentsInDb()
        const error_message ='Expected string, received boolean'
        
       const comment_to_update = {
           content:true
        }

       const token = helper.someUserInfo.token

        //act 
        const result=  await api
        .patch(COMMENT_URL+`/${commentsInDb[1].id}`)
        .send(comment_to_update)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        
        //assert
       expect(JSON.parse(result.body.error)[0].content).toBe(error_message)
    })

    it('should update when right credentials and comment body formats are provided',async()=>{
        // arrange
        const commentsInDb = await getCommentsInDb()
        
       const comment_to_update = {
           content:'updated_comment'
        }

       const token = helper.someUserInfo.token

        //act 
        const result=  await api
        .patch(COMMENT_URL+`/${commentsInDb[1].id}`)
        .send(comment_to_update)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        
        //assert
       expect(result.body.content).toBe(comment_to_update.content)
    })

    it('should not update when the user updating is not the one who created it',async()=>{
 // arrange
        const commentsInDb = await getCommentsInDb()
        const error_message = "User Not Authorized To Perform The Operation"
       const comment_to_update = {
           content:'updated_comment'
        }

       const token = helper.otherUserInfo.token

        //act 
        const result=  await api
        .patch(COMMENT_URL+`/${commentsInDb[1].id}`)
        .send(comment_to_update)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        
        //assert
       expect(result.body.error).toBe(error_message)
    })

    it('should return 401 , when the comment to update is not found',async()=>{
       
       // arrange

        const error_message = "Comment Does Not Exist"
        const comment_to_update = {
            content:'updated_comment'
        }
     
        const non_existant_id= await helper.nonExistingId()

       const token = helper.someUserInfo.token

        //act 
        const result=  await api
        .patch(COMMENT_URL+`/${non_existant_id}`)
        .send(comment_to_update)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        
        //assert
       expect(result.body.error).toBe(error_message)
    })
    
  })
  

  
});