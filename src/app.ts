import userRouter from './main/auth/user/user-routes';
import commentRouter from './main/comment/comment-routes';
import postRouter from './main/post/post-routes';
import server from "./server";

import db from './utils/db';


(async()=>{

  await db.connect()
  
})()


declare module 'express' {
  interface Request {
    userId?: string;
  }
}

server.use('/api/v1/',[postRouter,commentRouter,userRouter] )


const PORT = 3001

server.listen(PORT,()=>{
   console.log("The express server is listening to port",PORT)
})     

export default server