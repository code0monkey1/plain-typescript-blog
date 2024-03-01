import express from 'express'
import postAuth from '../middlewares/auth/user-auth'
import postController from './post-controller'
const router = express.Router()

router.post('/posts',postAuth,postController.createPost)

router.get('/posts',postController.getAllPosts)

router.get('/posts/:id',postController.getPostById)

router.delete('/posts/:id',postAuth,postController.deletePostById)

router.patch('/posts/:id',postAuth,postController.patchPostById)

export default router
