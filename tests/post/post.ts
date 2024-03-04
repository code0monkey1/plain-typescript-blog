/* This code snippet is a test suite written in TypeScript using Jest and Supertest for testing an API
endpoint related to posts. Here's a breakdown of what the code is doing: */
// import supertest from "supertest";
// import app from '../../src/app';
// import UserModel from "../../src/main/auth/user/user-model";
// import CommentModel from "../../src/main/comment/comment-model";
// import PostModel from "../../src/main/post/post-model";
// import Database from '../../src/utils/db';
// import helper, { getPostsInDb, initialPosts } from "./helper";

// const api = supertest(app)

// const postUrl="/api/v1/posts"

// describe('POST', () => {

//       beforeAll(async () => {
//          await Database.connect()
//       });

//       afterAll(async () => {
//         await Database.disconnect()
//       });
  
//       beforeEach(async () => {
      
//         // delete all notes 
//         await PostModel.deleteMany({}) 
//         await UserModel.deleteMany({}) 
//         await CommentModel.deleteMany({})

      
//         // saved all notes synchronously 
//         for( let post of initialPosts ){
//                 const newPost = new PostModel(post)
//                 await newPost.save()
//           }
      
//       })

//   describe('POST /post ', () => {
    
 
//     it('is created when token is present', async() => {
        
//        const {token}=helper.someUserInfo
       
//        const post = helper.initialPosts[0]
    
//         const actual=  await  api
//       // Add the bearer token to the request headers
//             .post(postUrl)
//             .send(post)
//             .set('Authorization', `Bearer ${token}`)
//             .expect(200)
//             .expect('Content-Type','application\/json; charset=utf-8')
    
       
//        expect(actual.body.subject).toBe(post.subject)
  
//     })
    


//     it('is not created when token is not present', async() => {
      
//         await  api
//           .post(postUrl)
//           .send(helper.initialPosts[0])
//           .expect(401)
//           .expect('Content-Type','application\/json; charset=utf-8')

//     })
    
   
//   })


// describe('UPDATE', () => {
// //   it('user is updated when provided a valid token', async () => {
// //     // Arrange
// //     const { token } = helper.someUserInfo;
// //     const storedPosts = await PostModel.find()
// //     const postId = storedPosts[0]._id.toString();
// //     const expected = 'changed body';

// //     // Act
// //     const response = await api
// //         .patch(postUrl + `/${postId}`)
// //         .send({ ...helper.initialPosts[0], body: expected })
// //         .set('Authorization', `Bearer ${token}`)
// //         .expect(200);

// //     // Assert
// //     expect(response.body.body).toBe(expected);
// // });
//     //   it.skip('user is not updated when not provided a valid token',async()=>{

//     //   //arrange
      
//     //    const storedPosts = await getDbPosts() as any
//     //        const postId = await storedPosts[0].id

//     //       // act

//     //         const actual=  await  api
//     //       // Add the bearer token to the request headers
//     //             .patch(postUrl+`/${postId}`)
//     //             .send({...helper.initialPosts[0],body:'changed body' })
//     //             .expect(401)
//     //             .expect('Content-Type','application\/json; charset=utf-8')

//     //         // assert

//     //     expect(actual.body.body).toBe(storedPosts[0].body)
    


//     // })
  
// })


//  // post is not updated when token is not present

//  // post is not updated when user is not authorized

//  // post is not updated when auth token is invalid


//  // 3. Delete

//   // user is deleted when provided a valid token with authenticated user

//  // post is not deleted when token is not present

//  // post is not deleted when user is not authorized

//  // post is not deleted when auth token is invalid



//  // 4. GetOne

//   // you get proper message when post is not present

//   // you get the post when id is provided and post is present


//   describe('GET /posts', () => {
//       // you get all the posts

//       it('gets all the notes in json format',async()=>{

//           await  api
//           .get(postUrl)
//           .expect(200)
//           .expect('Content-Type','application\/json; charset=utf-8')

//       })  


//       test('all posts are returned',async() => {
        
//         const response = await api.get(postUrl)
//         expect(response.body).toHaveLength(initialPosts.length)

//       })


//       test('a specific post is within the returned posts',async() => {
//         const response=  await api.get(postUrl)
//         const allContent=response.body.map((res:any) => res.body)

//         expect(allContent).toContain(initialPosts[0].body)
//       })

          
//     })

  

//     } )