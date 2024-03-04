
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../src/app'
import PostModel from "../../src/main/post/post-model"
import helper from './helper'

const api = supertest(app)

const postsUrl = '/api/v1/posts'

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await PostModel.deleteMany({})
    await PostModel.insertMany(helper.initialPosts)
  })

  it('posts are returned as json', async () => {
    await api
      .get(postsUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
})

  it('all posts are returned', async () => {
    const response = await api.get(postsUrl)

    expect(response.body.length).toBe(helper.initialPosts.length)
 
  })

  it('a specific note is within the returned notes', async () => {
    const response = await api.get(postsUrl)

    const subjects = response.body.map((r:any) => r.subject)
    
    expect(subjects).toContain('s1')
  })

  describe('viewing a specific note', () => {

    it('succeeds with a valid id', async () => {
      const postsAtStart = await helper.getPostsInDb()

      const postToView = postsAtStart[0]

      const resultNote = await api
        .get(postsUrl+`/${postToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(resultNote.body.body).toBe(postToView.body)
    })

    it('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(postsUrl+`/${validNonexistingId}`)
        .expect(404)
    })

    it('fails with statuscode 400 id is invalid', async () => {
      
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(postsUrl+`/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    it('does not succeeds without auth', async () => {
      const newPost = {
        body: 'async/await simplifies making async calls',
        subject: 'subj',
      }

      await api
        .post(postsUrl)
        .send(newPost)
        
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.getPostsInDb()
      expect(notesAtEnd.length).toBe( helper.initialPosts.length )

      const contents = notesAtEnd.map((n:any) => n.body)
      expect(contents).not.toContain('async/await simplifies making async calls')
    })

        it('succeeds with auth', async () => {
          const newPost = {
            body: 'async/await simplifies making async calls',
            subject: 'subj',
          }
            const token = helper.someUserInfo.token

          await api
            .post(postsUrl)
            .send(newPost)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)

          const notesAtEnd = await helper.getPostsInDb()
          expect(notesAtEnd.length).toBe( helper.initialPosts.length+1)

          const contents = notesAtEnd.map((n:any) => n.subject)
          expect(contents).toContain(newPost.subject)
        })

   

  describe('deletion of a note', () => {
    it('succeeds with status code 204 if id is valid', async () => {
      const postsAtStart = await helper.getPostsInDb()
      const postToDelete = postsAtStart[0]
     
      const token = helper.someUserInfo.token
      
      await api
        .delete(postsUrl+`/${postToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const postsAtEnd = await helper.getPostsInDb()

      expect(postsAtEnd.length).toStrictEqual(postsAtStart.length- 1)

      const contents = postsAtEnd.map((r:any) => r.body)

      expect(contents).not.toContain(postToDelete.body)

    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})