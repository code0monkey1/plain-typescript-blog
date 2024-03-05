import 'express-async-errors';
import userRouter from './main/auth/user/user-routes';
import commentRouter from './main/comment/comment-routes';
import middlewares from './main/middlewares';
import postRouter from './main/post/post-routes';
import resetRouter from './main/testing/reset';
import server from "./server";
import db from './utils/db';

(async()=>{
  await db.connect(process.env.MONGODB_URL!)
})()

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

server.use(middlewares.requestLogger)

server.use('/api/v1/',[postRouter,commentRouter,userRouter] )

if(process.env.NODE_ENV!=='prod'  )server.use('/api/v1/',resetRouter)


server.use(middlewares.errorHandler)

server.use(middlewares.unknownEndpoint)

const PORT = process.env.NODE_ENV==='prod'? 3002 :3001

server.listen(PORT,()=>{
   console.log("The express server is listening to port",PORT)
}) 


export default server