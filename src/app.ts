import dotenv from 'dotenv';
import 'express-async-errors';
import mongoose from 'mongoose';
import resetRouter from '../src/main/testing/reset';
import userRouter from './main/auth/user/user-routes';
import commentRouter from './main/comment/comment-routes';
import middlewares from './main/middlewares';
import postRouter from './main/post/post-routes';
import server from "./server";
import logger from './utils/logger';

dotenv.config()

mongoose.set('strictQuery', false)


mongoose.connect(process.env.MONGODB_URL!)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
  
  declare module 'express' {
  interface Request {
    userId?: string;
  }
}

server.use(middlewares.requestLogger)

server.use('/api/v1/',[postRouter,commentRouter,userRouter] )



if (process.env.NODE_ENV === 'dev') server.use('/api/v1/',resetRouter)


server.use(middlewares.unknownEndpoint)

server.use(middlewares.errorHandler)

const PORT = process.env.NODE_ENV === 'prod' ? 3001 : 0

server.listen(PORT,()=>{
   logger.info("The express server is listening to port",PORT)
}) 



export default server