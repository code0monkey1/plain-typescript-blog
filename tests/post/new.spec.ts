
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

//   describe('addition of a new note', () => {
//     it('succeeds with valid data', async () => {
//       const newNote = {
//         content: 'async/await simplifies making async calls',
//         important: true,
//       }

//       await api
//         .post('/api/notes')
//         .send(newNote)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//       const notesAtEnd = await helper.notesInDb()
//       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

//       const contents = notesAtEnd.map(n => n.content)
//       assert(contents.includes('async/await simplifies making async calls'))
//     })

//     it('fails with status code 400 if data invalid', async () => {
//       const newNote = {
//         important: true
//       }

//       await api
//         .post('/api/notes')
//         .send(newNote)
//         .expect(400)

//       const notesAtEnd = await helper.notesInDb()

//       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
//     })
//   })

//   describe('deletion of a note', () => {
//     it('succeeds with status code 204 if id is valid', async () => {
//       const notesAtStart = await helper.notesInDb()
//       const noteToDelete = notesAtStart[0]

//       await api
//         .delete(`/api/notes/${noteToDelete.id}`)
//         .expect(204)

//       const notesAtEnd = await helper.notesInDb()

//       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

//       const contents = notesAtEnd.map(r => r.content)
//       assert(!contents.includes(noteToDelete.content))
//     })
//   })
// })

afterAll(async () => {
  await mongoose.connection.close()
})