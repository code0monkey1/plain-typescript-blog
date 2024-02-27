import express from 'express'

import postController from './post-controller'

const router = express.Router()



router.post('/posts',postController.createPost)

router.get('/posts',postController.getAllPosts)

router.get('/posts/:id',postController.getPostById)

router.delete('/posts/:id',postController.deletePostById)


router.patch('/posts/:id',postController.patchPostById)

export default router
