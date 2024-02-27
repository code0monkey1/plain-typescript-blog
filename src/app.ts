
import commentRouter from './main/comment/comment-routes';
import postRouter from './main/post/post-routes';
import server from "./server";

server.use('/api/v1/',[postRouter,commentRouter])

const PORT = 3001


server.listen(PORT,()=>{
   console.log("The express server is listening to port",PORT)
})     


