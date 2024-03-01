import express from 'express'

import userAuth from '../middlewares/auth/user-auth'
import commentController from './comment-controller'

const router = express.Router()

router.post('/comments',userAuth,commentController.create)

router.get('/comments',commentController.getAll)

router.get('/comments/:id',commentController.getOne)

router.delete('/comments/:id',userAuth,commentController.deleteComment)

router.patch('/comments/:id',userAuth,commentController.patch)



export default router
