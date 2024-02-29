import registerRouter from './main/auth/register/register-routes';
import commentRouter from './main/comment/comment-routes';
import postRouter from './main/post/post-routes';
import server from "./server";

import db from './utils/db';

(async()=>{

  await db.connect()
  
})()


server.use('/api/v1/',[postRouter,commentRouter,registerRouter])

const PORT = 3001


server.listen(PORT,()=>{
   console.log("The express server is listening to port",PORT)
})     


