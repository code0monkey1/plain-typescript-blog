import express from 'express'

import userAuth from '../middlewares/auth/user-auth'
import commentController from './comment-controller'

const router = express.Router()

router.post('/comments',userAuth,commentController.createComment)

router.get('/comments/:postId',commentController.getLatestCommentsByPostId)

router.delete('/comments/:id',userAuth,commentController.deleteComment)

router.patch('/comments/:id',userAuth,commentController.updateComment)


export default router
