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

  describe('/create-comment', () => {
    beforeEach(async () => {
      await PostModel.deleteMany({});
      await PostModel.insertMany(helper.initialPosts);
      await CommentModel.deleteMany({});
    });

    it("should create a new comment", async () => {
      const posts = await getPostsInDb();
      const userId = helper.someUserInfo.userId;
      const token = helper.someUserInfo.token;

      const comment: Omit<Comment, 'id'> = {
        postId: posts[0].id,
        content: 'myContent',
        userId
      };

      await api
        .post(COMMENT_URL)
        .send(comment)
        .expect(200)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/);

      const commentsInDb = await getCommentsInDb();
      expect(commentsInDb[0].content).toBe(comment.content);
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
});