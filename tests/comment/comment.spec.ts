import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import helper from "../helper";

const api = supertest(app);

describe('COMMENT', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const COMMENT_URL = '/api/v1/comments';
 

  beforeEach(async () => {
     
    await helper.initializeComments()


    const postId = (await helper.getPostsInDb())[0].id;
    
    await helper.createCommentsUsingPostIdAndUserId(helper.someUserInfo.userId,postId)

  });
  describe('create-comment', () => {
   it("should create a new comment when comment body is valid", async () => {
     
     const {postId,token} = await helper.getPostIdAndAutToken()

     const commentsInDbBefore = await helper.getCommentsInDb()
     
     const new_comment={
       content:"some_content",
       postId
     }

      await api
        .post(COMMENT_URL)
        .send(new_comment)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
     
     await helper.assertCommentAdded(commentsInDbBefore,new_comment.content)
      
    });

    it("should return validation error when comment body is invalid", async () => {
     
     const userId =helper.someUserInfo.userId

     const {postId,token}=await helper.getPostIdAndAutToken()
   
     const error_message="Expected string, received number"
  
     const commentsInDbBefore = await helper.getCommentsInDb()

        const comment=  {
        content:1,
        userId,
        postId
      }

      const result= await api
        .post(COMMENT_URL)
        .send(comment)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const commentsInDbAfter = await helper.getCommentsInDb()
      
         //assert
       expect(JSON.parse(result.body.error)[0].content).toBe(error_message)
       
       expect(commentsInDbBefore.length).toBe(commentsInDbAfter.length)
      
    });

    it("should return 401 error when JWT not provided",async()=>{
    
      const posts = await helper.getPostsInDb();
      const userId = helper.someUserInfo.userId;;

      const comment = {
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

      const posts = await helper.getPostsInDb();
      const postId= await posts[0].id

      await api
        .get(COMMENT_URL+`/${postId}`)
        .expect(200)
     
     const initialCommentsContents =helper.initialComments.map(c => c.content)

     await  helper.assertContentsAreInCommentsDb(initialCommentsContents)
  
    })

    it('should return a 401 with `malformatted id` in case the commentId is invalid',async()=>{

        const invalidCommentId = 'abc'
        const expected_error_message ='malformatted id'

       const result = await api
        .get(COMMENT_URL+`/${invalidCommentId}`)
        .expect(400)

       expect(result.body.error).toBe(expected_error_message)
      
    })


    it('should return no comments for a userId , which did not create any',async()=>{

       const postsInDb = await helper.getPostsInDb()

       const result = await api
        .get(COMMENT_URL+`/${postsInDb[1].id}`)
        .expect(200)

        expect(result.body.data).toStrictEqual([])
      
    })
    
  })

  describe('update-comment', () => {

    it('should return validation-error , when the comment update body is invalid',async()=>{
      
        // arrange
        const commentsInDb = await helper.getCommentsInDb()
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
        const commentsInDb = await helper.getCommentsInDb()
        
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

    it('should not update when user is unauthorized',async()=>{
     // arrange
        const commentsInDb = await helper.getCommentsInDb()
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

  describe('delete-comment', () => {
      it('should return a 401 with `malformatted id` in case the commentId is invalid',async()=>{

          const invalidPostId = 'abc'
          const expected_error_message ='malformatted id'
          const token = helper.someUserInfo.token
          
        const result = await api
          .delete(COMMENT_URL+`/${invalidPostId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        expect(result.body.error).toBe(expected_error_message)
        
    })

        it('should return 401 if token is not provided',async()=>{
       
        // arrange
         const commentsInDb = await helper.getCommentsInDb()
          
        // act 

        //assert
        await api
        .delete(COMMENT_URL+`/${commentsInDb[0].id}`)
        .expect(401)
      })

     
      it('should return 401 if token is not provided',async()=>{
       
        // arrange
         const commentsInDb = await helper.getCommentsInDb()
          
        // act 

        //assert
        await api
        .delete(COMMENT_URL+`/${commentsInDb[0].id}`)
        .expect(401)
      })

      it('should return 404 if  comment is not found',async()=>{
       // arrange

        const error_message = "Comment Does Not Exist"

        const non_existant_id= await helper.nonExistingId()

       const token = helper.someUserInfo.token

        //act 
        const result=  await api
        .delete(COMMENT_URL+`/${non_existant_id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        
        //assert
       expect(result.body.error).toBe(error_message)

      })

    

      it('should not delete comment if unauthorized user',async()=>{
      
      // arrange
        const commentsInDb = await helper.getCommentsInDb()
        const error_message = "User Not Authorized To Perform The Operation"
      
       const token = helper.otherUserInfo.token

        //act 
        const result=  await api
        .delete(COMMENT_URL+`/${commentsInDb[1].id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        
        //assert
       expect(result.body.error).toBe(error_message)
      })



      it('should delete if user is authorized , and should reduce the count of comments in the associated post by 1',async()=>{
         
       // arrange
        const commentsInDbBefore = await helper.getCommentsInDb()
        const token = helper.someUserInfo.token
        const parentPostBefore = (await helper.getPostsInDb())[0]
        const commentBeingDeleted=commentsInDbBefore[0]

        //act 
         await api
        .delete(COMMENT_URL+`/${commentBeingDeleted.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        
        //assert

        await helper.assertCommentWasDeleted(commentsInDbBefore,commentBeingDeleted)
        
        await helper.assertPostCommentsCountWasReducedByOne(parentPostBefore)
       

      })

    
  })
  
  
});