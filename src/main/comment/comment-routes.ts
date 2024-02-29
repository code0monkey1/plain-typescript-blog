import express from 'express'

import commentController from './comment-controller'

const router = express.Router()

router.post('/comments',commentController.create)

router.get('/comments',commentController.getAll)

router.get('/comments/:id',commentController.getOne)

router.delete('/comments/:id',commentController.deleteComment)

router.patch('/comments/:id',commentController.patch)



export default router
